import { DirectionType, findIndex } from "./constants";

class Elevator {
    private floor: number;
    readonly stops: Array<number>;
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

    addStop(floorFrom: number, floorTo: number) {
        if (floorFrom === floorTo) return;
        const fromIndex = findIndex(this.stops, floorFrom);
        if (this.stops[fromIndex] != floorFrom) {
            this.stops.splice(fromIndex, 0, floorFrom);
        }
        const toIndex = findIndex(this.stops, floorTo);
        if (this.stops[toIndex] != floorTo) {
            this.stops.splice(toIndex, 0, floorTo);
        }
    }

    move() {
        if (this.stops.length === 0) {
            return;
        }
        const currentPositionIndex = findIndex(this.stops, this.floor);
        console.log(`current position: ${this.floor}: ${currentPositionIndex}`);
        console.log(this.stops);
        // Zmienić nazwę tego
        let newPosition;
        if (this.direction === "DOWN") {
            if (currentPositionIndex === 0 && this.stops[0] > this.floor) {
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

        // if (this.direction == "DOWN") {
        //     if (currentPositionIndex == 0) {
        //         this.direction = "UP";
        //         newPosition = this.stops[currentPositionIndex + 1];
        //     } else {
        //         newPosition = this.stops[currentPositionIndex - 1];
        //     }
        // } else {
        //     if (currentPositionIndex === this.stops.length) {
        //         this.direction = "DOWN";
        //         newPosition = this.stops[currentPositionIndex - 1];
        //     } else {
        //         newPosition = this.stops[currentPositionIndex + 1];
        //     }
        // }
        this.floor = newPosition;
        console.log(`new position: ${this.floor}: ${currentPositionIndex}`);
        console.log(this.stops);
    }
}

export default Elevator;
