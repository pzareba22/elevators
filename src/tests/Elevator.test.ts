import ElevatorController from "../logic/ElevatorController";

test("Go up one floor", () => {
    const elevatorController = new ElevatorController(1);
    elevatorController.addElevatorStop(0, 0, 1);
    elevatorController.update();
    const res = elevatorController.getElevatorPositions();
    // console.log(`res is ${res}`);
    expect(res).toEqual([1]);
});

test("Go to the correct floor first", () => {
    const elevatorController = new ElevatorController(1);
    elevatorController.addElevatorStop(0, 2, 1);
    elevatorController.update();
    const res = elevatorController.getElevatorPositions();
    // console.log(`res is ${res}`);
    expect(res).toEqual([2]);
});
