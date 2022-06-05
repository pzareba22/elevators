import React, { useMemo, useState } from "react";
import Elevator from "./Elevator";
import ElevatorController from "../logic/ElevatorController";
import "../styles/App.sass";
import RequestBox from "./RequestBox";

const ELEVATOR_NUM = 5;
const MAX_FLOOR = 5;

type FormData = {
    elevatorNo: number;
    floorTo: number;
    floorFrom: number;
};

const App: React.FC<{}> = () => {
    const [floors, setFloors] = useState(new Array(ELEVATOR_NUM).fill(0));
    const [formData, setFormData] = useState<FormData>({
        elevatorNo: 0,
        floorFrom: 0,
        floorTo: 0,
    });
    const [requests, setRequests] = useState<Array<Array<number>>>([]);
    const elevatorController = useMemo(
        () => new ElevatorController(ELEVATOR_NUM),
        []
    );

    // Czy to jest potrzebne?
    const updateFloors = (data: Array<number>) => {
        const newFloors = [...data];
        setFloors(newFloors);
    };

    const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.id;
        const value = parseInt(e.target.value);
        if (e.target.id == "elevatorNo" && (value < 0 || value >= ELEVATOR_NUM))
            return;
        if (value < 0 || value > MAX_FLOOR) return;
        setFormData((values) => ({ ...values, [name]: value }));
    };

    return (
        <div className="app">
            <div className="elevatorsContainer">
                {floors.map((floor, i) => (
                    <div className="elevatorContainer" key={i}>
                        <h3>{i}</h3>
                        <Elevator floor={floor} />
                    </div>
                ))}
            </div>
            <div className="elevatorControls">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        // console.log("Adding a stop");
                        // console.log(formData);
                        elevatorController.addElevatorStop(
                            formData.elevatorNo,
                            formData.floorFrom,
                            formData.floorTo
                        );
                        // console.log(elevatorController.getRequests());
                        setRequests([...elevatorController.getRequests()]);
                    }}
                >
                    <label htmlFor="elevatorNo">numer windy</label>
                    <input
                        type="number"
                        id="elevatorNo"
                        onChange={(e) => updateFormData(e)}
                        value={formData.elevatorNo}
                    />
                    <label htmlFor="floorTo">piętro do</label>
                    <input
                        type="number"
                        id="floorTo"
                        onChange={(e) => updateFormData(e)}
                        value={formData.floorTo}
                    />
                    <label htmlFor="floorFrom">piętro z</label>
                    <input
                        type="number"
                        id="floorFrom"
                        onChange={(e) => updateFormData(e)}
                        value={formData.floorFrom}
                    />
                    <input type="submit" value="Wyślij żądanie" />
                </form>
            </div>
            <button
                className="submitButton"
                onClick={() => {
                    elevatorController.update();
                    setFloors(elevatorController.getElevatorPositions());
                    setRequests([...elevatorController.getRequests()]);
                }}
            >
                Zmień
            </button>
            <div className="requests">
                {requests.map((request, i) => {
                    return (
                        <RequestBox
                            elevatorNo={i}
                            floorFrom={request[0]}
                            floorTo={request[1]}
                            key={i}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
