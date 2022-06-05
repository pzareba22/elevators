import { DirectionType, findIndex, FloorEntry, insertSorted } from "./utils";

class Elevator {
    private floor: number;
    readonly stops: Array<FloorEntry>;
    private direction: DirectionType;
    constructor() {
        this.floor = 0;
        this.stops = [];
        this.direction = "UP";
    }

    setFloor(floor: number) {
        this.floor = floor;
    }

    getFloor() {
        return this.floor;
    }

    // Zrobic overload
    addStop(floorFrom: number, floorTo: number) {
        if (floorFrom === floorTo) return;
        let newEntry: FloorEntry;
        if (floorFrom === this.floor) {
            newEntry = {
                floor_no: floorTo,
                floors_to: [],
            };
        } else {
            newEntry = {
                floor_no: floorFrom,
                floors_to: floorTo != -1 ? [floorTo] : [],
            };
        }
        if (this.stops.length == 0) {
            this.stops.push(newEntry);
            return;
        }
        const fromIndex = findIndex(this.stops, floorFrom);
        if (
            fromIndex < this.stops.length &&
            this.stops[fromIndex].floor_no == floorFrom
        ) {
            insertSorted(this.stops[fromIndex].floors_to, floorTo);
        } else {
            this.stops.splice(fromIndex, 0, newEntry);
        }
    }

    move() {
        if (this.stops.length === 0) {
            return;
        }
        const currentPositionIndex = findIndex(this.stops, this.floor);
        let newPosition;
        if (this.direction === "DOWN") {
            if (
                currentPositionIndex === 0 &&
                this.stops[0].floor_no > this.floor
            ) {
                this.direction = "UP";
                newPosition = this.stops[currentPositionIndex];
                this.stops.splice(currentPositionIndex, 1);
            } else {
                newPosition = this.stops[currentPositionIndex - 1];
                this.stops.splice(currentPositionIndex - 1, 1);
            }
        } else {
            if (currentPositionIndex == this.stops.length) {
                this.direction = "DOWN";
                newPosition = this.stops[this.stops.length - 1];
                this.stops.splice(this.stops.length - 1, 1);
            } else {
                newPosition = this.stops[currentPositionIndex];
                this.stops.splice(currentPositionIndex, 1);
            }
        }
        this.floor = newPosition.floor_no;
        for (let i = 0; i < newPosition.floors_to.length; i++) {
            this.addStop(newPosition.floors_to[i], -1);
        }
    }
}

export default Elevator;
