import Elevator from "./Elevator";

class ElevatorController {
    readonly elevatorsNumber: number;
    // Pivate or ES6 private?
    private elevators: Array<Elevator>;
    constructor(elevatorsNumber: number) {
        this.elevatorsNumber = elevatorsNumber;
        this.elevators = new Array(elevatorsNumber);
        for (let i = 0; i < elevatorsNumber; i++) {
            this.elevators[i] = new Elevator();
        }
    }

    addElevatorStop(
        elevatorNumber: number,
        floorFrom: number,
        floorTo: number
    ) {
        this.elevators[elevatorNumber].addStop(floorFrom, floorTo);
    }

    getElevatorPositoins() {
        return this.elevators.map((elevator) => elevator.getFloor());
    }

    update() {
        for (let i = 0; i < this.elevators.length; i++) {
            this.elevators[i].move();
        }
    }
}

export default ElevatorController;
