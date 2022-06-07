import { findIndex, insertSorted } from "./utils";
import { DirectionType, FloorEntry } from "./types";

class Elevator {
    private floor: number;
    stops: Array<FloorEntry>;
    private direction: DirectionType;
    private readonly maxFloor;
    constructor(maxFloor: number) {
        this.floor = 0;
        this.stops = [{ floor_no: 0, floors_to: [] }];
        this.direction = "UP";
        this.maxFloor = maxFloor;
    }

    setFloor(floor: number) {
        this.floor = floor;
    }

    getFloor() {
        return this.floor;
    }

    addStop(floorFrom: number, floorTo?: number) {
        if (floorFrom < 0 || floorFrom < 0)
            throw new Error("Elevator can't go below 0");
        if (floorFrom > this.maxFloor || (floorTo && floorTo > this.maxFloor))
            throw new Error(`Elevator can't go above ${this.maxFloor}`);
        if (floorFrom === floorTo) return;
        let newEntry: FloorEntry = {
            floor_no: floorFrom,
            floors_to: floorTo !== undefined ? [floorTo] : [],
        };

        const index = findIndex(this.stops, floorFrom, (x) => x.floor_no);
        if (
            index < this.stops.length &&
            this.stops[index].floor_no === floorFrom &&
            floorTo !== undefined
        ) {
            insertSorted(this.stops[index].floors_to, floorTo, (x) => x);
            return;
        }
        this.stops.splice(index, 0, newEntry);
    }

    move() {
        if (this.stops.length === 0) {
            return;
        }
        let currentPositionIndex = findIndex(
            this.stops,
            this.floor,
            (x) => x.floor_no
        );

        if (
            this.stops[currentPositionIndex].floors_to.length === 0 &&
            this.stops.length === 1
        )
            return;

        let newPosition;

        this.stops[currentPositionIndex].floors_to.forEach((floor) =>
            this.addStop(floor)
        );
        currentPositionIndex = findIndex(
            this.stops,
            this.floor,
            (x) => x.floor_no
        );

        if (this.direction === "DOWN") {
            if (currentPositionIndex === 0) {
                this.direction = "UP";
                newPosition = this.stops[currentPositionIndex + 1];
            } else {
                newPosition = this.stops[currentPositionIndex - 1];
            }
        } else {
            if (currentPositionIndex === this.stops.length - 1) {
                this.direction = "DOWN";
                newPosition = this.stops[currentPositionIndex - 1];
            } else {
                newPosition = this.stops[currentPositionIndex + 1];
            }
        }
        this.floor = newPosition.floor_no;
        this.stops.splice(currentPositionIndex, 1);
    }
}

export default Elevator;
