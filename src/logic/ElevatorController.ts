import Elevator from "./Elevator";

class ElevatorController {
    readonly elevatorsNumber: number;
    // Pivate or ES6 private?
    private readonly elevators: Array<Elevator>;
    private readonly requests: Array<Array<Array<number>>>;
    constructor(elevatorsNumber: number) {
        this.elevatorsNumber = elevatorsNumber;
        this.elevators = new Array(elevatorsNumber);
        this.requests = new Array();
        for (let i = 0; i < elevatorsNumber; i++) {
            this.elevators[i] = new Elevator();
            this.requests[i] = [];
        }
    }

    addElevatorStop(
        elevatorNumber: number,
        floorFrom: number,
        floorTo: number
    ) {
        this.elevators[elevatorNumber].addStop(floorFrom, floorTo);
        this.requests[elevatorNumber].push([floorFrom, floorTo]);
    }

    getElevatorPositions() {
        return this.elevators.map((elevator) => elevator.getFloor());
    }

    getRequests() {
        console.log(this.requests);
        return this.requests.flat();
    }

    update() {
        for (let i = 0; i < this.elevators.length; i++) {
            this.elevators[i].move();
            for (let j = 0; j < this.requests[i].length; j++) {
                if (this.requests[i][j][1] === this.elevators[i].getFloor()) {
                    this.requests[i].splice(j, 1);
                    break;
                }
            }
        }
    }
}

export default ElevatorController;
