import Elevator from "./Elevator";
import { RequestType } from "./types";

class ElevatorController {
    readonly elevatorsNumber: number;
    private readonly elevators: Array<Elevator>;
    private readonly requests: RequestType[][];
    constructor(elevatorsNumber: number, maxFloor: number) {
        this.elevatorsNumber = elevatorsNumber;
        this.elevators = Array.from(
            { length: elevatorsNumber },
            () => new Elevator(maxFloor)
        );
        this.requests = Array.from({ length: elevatorsNumber }, () => []);
    }

    /**
     * Adds a stop to an elevators internal state
     * @param elevatorID ID of the desired elevator
     * @param floorFrom Number representing floor from which the elevator has to move
     * @param floorTo Number representing floor to which the elevator has to move
     */
    addElevatorStop(elevatorID: number, floorFrom: number, floorTo: number) {
        if (elevatorID < 0 || elevatorID >= this.elevatorsNumber) {
            throw new Error("Invalid elevatorID: " + elevatorID.toString());
        }
        this.elevators[elevatorID].addStop(floorFrom, floorTo);
        this.requests[elevatorID].push({
            floorFrom: floorFrom,
            floorTo: floorTo,
        });
    }

    /**
     * @returns An array of numbers representing positions of the elevators
     */
    getElevatorPositions() {
        return this.elevators.map((elevator) => elevator.getFloor());
    }

    /**
     *
     * @returns An array of all currently loaded requests
     */
    getRequests() {
        return this.requests.flat();
    }

    /**
     * Updates position of each elevator once
     */
    update() {
        for (let i = 0; i < this.elevators.length; i++) {
            this.elevators[i].move();
            for (let j = 0; j < this.requests[i].length; j++) {
                if (
                    this.requests[i][j].floorTo === this.elevators[i].getFloor()
                ) {
                    this.requests[i].splice(j, 1);
                    break;
                }
            }
        }
    }
}

export default ElevatorController;
