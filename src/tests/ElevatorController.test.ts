import ElevatorController from "../logic/ElevatorController";

describe("ElevatorController tests", () => {
    test("Move an elevator one floor up", () => {
        // given
        const elevatorController = new ElevatorController(1, 5);

        // when
        elevatorController.addElevatorStop(0, 0, 2);
        elevatorController.update();

        //then
        expect(elevatorController.getElevatorPositions()).toEqual([2]);
    });

    test("Move five elevators at the same time", () => {
        // given
        const elevatorController = new ElevatorController(5, 5);

        // when
        for (let i = 0; i < 5; i++) {
            elevatorController.addElevatorStop(i, 0, 2);
        }
        elevatorController.update();

        //then
        expect(elevatorController.getElevatorPositions()).toEqual([
            2, 2, 2, 2, 2,
        ]);
    });

    test("Move an elevator several times", () => {
        const elevatorController = new ElevatorController(1, 5);

        elevatorController.addElevatorStop(0, 1, 2);
        elevatorController.update();
        expect(elevatorController.getElevatorPositions()).toEqual([1]);
        elevatorController.update();
        expect(elevatorController.getElevatorPositions()).toEqual([2]);
        elevatorController.addElevatorStop(0, 4, 3);
        elevatorController.update();
        expect(elevatorController.getElevatorPositions()).toEqual([4]);
        elevatorController.update();
        expect(elevatorController.getElevatorPositions()).toEqual([3]);
    });

    test("Try to move an elevator to an incorrect floor", () => {
        const elevatorController = new ElevatorController(1, 5);
        expect(() => elevatorController.addElevatorStop(0, -2, 3)).toThrowError(
            new Error("Elevator can't go below 0")
        );
    });

    test("Try to move a non-existant elevator", () => {
        const elevatorController = new ElevatorController(1, 5);
        expect(() => elevatorController.addElevatorStop(1, 0, 3)).toThrowError(
            new Error("Invalid elevatorID: 1")
        );
    });
});
