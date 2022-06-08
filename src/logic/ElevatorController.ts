import Elevator from "./Elevator";
import { RequestType } from "./types";
import { Set, Map } from "immutable";

class ElevatorController {
    readonly elevatorsNumber: number;
    private readonly elevators: Array<Elevator>;
    private readonly requests: Set<Map<String, number>>[];
    constructor(elevatorsNumber: number, maxFloor: number) {
        this.elevatorsNumber = elevatorsNumber;
        this.elevators = Array.from(
            { length: elevatorsNumber },
            () => new Elevator(maxFloor)
        );
        this.requests = Array.from({ length: elevatorsNumber }, () => Set());
    }

    /**
     * Adds a stop to an elevators internal state
     * @param elevatorID ID of the desired elevator
     * @param floorFrom Number representing floor from which the elevator has to move
     * @param floorTo Number representing floor to which the elevator has to move
     * @throws Throws an error if given an incorrect elevatorID
     */
    addElevatorStop(elevatorID: number, floorFrom: number, floorTo: number) {
        if (elevatorID < 0 || elevatorID >= this.elevatorsNumber) {
            throw new Error("Invalid elevatorID: " + elevatorID.toString());
        }
        const newRequest = Map({
            floorFrom: floorFrom,
            floorTo: floorTo,
        });
        this.elevators[elevatorID].addStop(floorFrom, floorTo);
        this.requests[elevatorID] = this.requests[elevatorID].add(newRequest);
    }

    /**
     * @returns An array of numbers representing positions of the elevators
     */
    getElevatorPositions() {
        return this.elevators.map((elevator) => elevator.getFloor());
    }

    /**
     * @returns An array of all currently loaded requests
     */
    getRequests() {
        return this.requests.map((set) =>
            Array.from(set).map((x) => x.toObject() as RequestType)
        );
    }

    /**
     * Updates position of each elevator once
     */
    update() {
        for (let i = 0; i < this.elevators.length; i++) {
            this.elevators[i].move();

            // Deleting requests that were just completed

            // Getting an array of all requests for ith elevator
            const localRequests = Array.from(this.requests[i]).map((x) =>
                x.toObject()
            );

            for (let j = 0; j < localRequests.length; j++) {
                const request = localRequests[j];
                // Checking if we just arrived at a desired floor
                if (request.floorTo === this.elevators[i].getFloor()) {
                    // Deleting floor from Set
                    this.requests[i] = this.requests[i].delete(
                        Map({
                            floorFrom: request.floorFrom,
                            floorTo: request.floorTo,
                        })
                    );
                }
            }
        }
    }
}

export default ElevatorController;
