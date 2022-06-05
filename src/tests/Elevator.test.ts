import { assert } from "console";
import Elevator from "../logic/Elevator";
import ElevatorController from "../logic/ElevatorController";

test("Go up one floor", () => {
    const elevator = new Elevator();
    elevator.addStop(0, 1);
    elevator.move();
    const res = elevator.getFloor();
    expect(res).toEqual(1);
});

test("Go to the correct floor first", () => {
    const elevator = new Elevator();
    elevator.addStop(2, 1);
    elevator.move();
    const res = elevator.getFloor();
    expect(res).toEqual(2);
});

test("Multiple floor requests", () => {
    const elevator = new Elevator();
    elevator.addStop(2, 4);
    elevator.addStop(5, 1);
    elevator.move();
    let pos = elevator.getFloor();
    expect(pos).toEqual(2);
    elevator.move();
    pos = elevator.getFloor();
    expect(pos).toEqual(4);
});
