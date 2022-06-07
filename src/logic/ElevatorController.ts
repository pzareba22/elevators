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

    addElevatorStop(
        elevatorNumber: number,
        floorFrom: number,
        floorTo: number
    ) {
        this.elevators[elevatorNumber].addStop(floorFrom, floorTo);
        this.requests[elevatorNumber].push({
            floorFrom: floorFrom,
            floorTo: floorTo,
        });
    }

    getElevatorPositions() {
        return this.elevators.map((elevator) => elevator.getFloor());
    }

    getRequests() {
        return this.requests.flat();
    }

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
