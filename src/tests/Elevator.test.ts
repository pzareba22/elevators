import Elevator from "../logic/Elevator";
import ElevatorController from "../logic/ElevatorController";

test("Go up one floor", () => {
    const elevatorController = new ElevatorController(1);
    elevatorController.addElevatorStop(0, 0, 1);
    elevatorController.update();
    const res = elevatorController.getElevatorPositoins();
    // console.log(`res is ${res}`);
    expect(res).toEqual([1]);
});
