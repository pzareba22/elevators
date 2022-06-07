import Elevator from "../logic/Elevator";

describe("Elevator tests", () => {
    test("Go up one floor", () => {
        const elevator = new Elevator(5);
        elevator.addStop(0, 1);
        elevator.move();
        const res = elevator.getFloor();
        expect(res).toEqual(1);
    });

    test("Go to the correct floor first", () => {
        const elevator = new Elevator(5);
        elevator.addStop(2, 1);
        elevator.move();
        const res = elevator.getFloor();
        expect(res).toEqual(2);
    });

    test("Go up and down one floor", () => {
        const elevator = new Elevator(5);
        elevator.addStop(0, 1);
        elevator.move();
        let res = elevator.getFloor();
        expect(res).toEqual(1);
        elevator.addStop(1, 0);
        elevator.move();
        res = elevator.getFloor();
        expect(res).toEqual(0);
    });

    test("Multiple floor requests", () => {
        const elevator = new Elevator(5);
        elevator.addStop(2, 4);
        elevator.addStop(5, 1);
        elevator.move();
        let pos = elevator.getFloor();
        expect(pos).toEqual(2);
        elevator.move();
        pos = elevator.getFloor();
        expect(pos).toEqual(4);
    });

    test("Multiple floor requests 2", () => {
        const elevator = new Elevator(5);

        elevator.addStop(2, 1);
        elevator.addStop(3, 1);
        elevator.move();
        let pos = elevator.getFloor();
        expect(pos).toEqual(2);
        elevator.move();
        pos = elevator.getFloor();
        expect(pos).toEqual(3);
        elevator.move();
        pos = elevator.getFloor();
        expect(pos).toEqual(1);
    });

    test("Adding a single stop", () => {
        const elevator = new Elevator(5);
        elevator.addStop(2);
        elevator.move();

        let res = elevator.getFloor();

        expect(res).toEqual(2);
    });

    test("Going from below floor 0", () => {
        const elevator = new Elevator(5);
        expect(() => elevator.addStop(-2, 3)).toThrowError(
            new Error("Elevator can't go below 0")
        );
    });

    test("Going above max floor", () => {
        const elevator = new Elevator(5);
        expect(() => elevator.addStop(0, 6)).toThrowError(
            new Error("Elevator can't go above 5")
        );
    });
});
