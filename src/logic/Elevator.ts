import { findIndex, insertSorted } from "./utils";
import { DirectionType, FloorEntry } from "./types";

class Elevator {
    private floor: number;
    stops: Array<FloorEntry>;
    private direction: DirectionType;
    private readonly maxFloor;
    constructor(maxFloor: number, startFloor = 0) {
        this.floor = startFloor;
        this.stops = [{ floor_no: startFloor, floors_to: [] }];
        this.direction = "UP";
        this.maxFloor = maxFloor;
    }

    /**
     *
     * @returns A number representing the floor, that the elevator is currently on
     */
    getFloor() {
        return this.floor;
    }

    /**
     *
     * @returns DirectionType representing elevators current direction
     */
    getDirection() {
        return this.direction;
    }

    /**
     * Adds a new stop to the elevators internal state
     * @param floorFrom Number representing floor from which the elevator has to move
     * @param floorTo Number representing floor to which the elevator has to move (can be undefined)
     * @throws Will throw an error if either argument is invalid (below 0 or above highest floor)
     */
    addStop(floorFrom: number, floorTo?: number) {
        // Initial arguments checking
        if (floorFrom < 0 || floorFrom < 0)
            throw new Error("Elevator can't go below 0");
        if (floorFrom > this.maxFloor || (floorTo && floorTo > this.maxFloor))
            throw new Error(`Elevator can't go above ${this.maxFloor}`);
        if (floorFrom === floorTo) return;

        let newEntry: FloorEntry = {
            floor_no: floorFrom,
            floors_to: floorTo !== undefined ? [floorTo] : [],
        };

        // Find where the new entry should be in this.stops array
        const index = findIndex(this.stops, floorFrom, (x) => x.floor_no);
        // If we already have an entry about this floor, we simply add floorTo to its destinations
        if (
            index < this.stops.length &&
            this.stops[index].floor_no === floorFrom &&
            floorTo !== undefined
        ) {
            insertSorted(this.stops[index].floors_to, floorTo, (x) => x);
            return;
        }
        // Otherwise, just add the netire new entry
        this.stops.splice(index, 0, newEntry);
    }

    /**
     * Makes the elevator move one floor, according to its current direction and loaded stops
     */
    move() {
        if (this.stops.length === 0) {
            return;
        }
        let currentPositionIndex = findIndex(
            this.stops,
            this.floor,
            (x) => x.floor_no
        );

        // If we only have one floor in this.stops array, and
        // it has no destitations, we do nothing
        if (
            this.stops[currentPositionIndex].floors_to.length === 0 &&
            this.stops.length === 1
        )
            return;

        let newPosition;

        // Load the destinations from our current floor
        this.stops[currentPositionIndex].floors_to.forEach((floor) =>
            this.addStop(floor)
        );

        // We have to find the index of our current floor again, since
        // this.stops array has changed
        currentPositionIndex = findIndex(
            this.stops,
            this.floor,
            (x) => x.floor_no
        );

        if (this.direction === "DOWN") {
            // If there are no floors below the current one, whe change directions
            if (currentPositionIndex === 0) {
                this.direction = "UP";
                newPosition = this.stops[currentPositionIndex + 1];
            } else {
                newPosition = this.stops[currentPositionIndex - 1];
            }
        } else {
            // If there are no floors above the current one, whe change directions
            if (currentPositionIndex === this.stops.length - 1) {
                this.direction = "DOWN";
                newPosition = this.stops[currentPositionIndex - 1];
            } else {
                newPosition = this.stops[currentPositionIndex + 1];
            }
        }
        this.floor = newPosition.floor_no;
        // We get rid of our old floor entry
        this.stops.splice(currentPositionIndex, 1);
    }
}

export default Elevator;
