import ElevatorController from "../logic/ElevatorController";

describe("ElevatorController tests", () => {
    test("Move an elevator one floor up", () => {
        // given
        let elevatorController = new ElevatorController(1);

        // when
        elevatorController.addElevatorStop(0, 0, 2);
        elevatorController.update();

        //then
        expect(elevatorController.getElevatorPositions()).toEqual([2]);
    });

    test("Move five elevators at the same time", () => {
        // given
        let elevatorController = new ElevatorController(5);

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
        let elevatorController = new ElevatorController(1);

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
});
