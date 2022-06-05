import React, { useMemo, useState } from "react";
import Elevator from "./Elevator";
import ElevatorController from "../logic/ElevatorController";
import "../styles/App.sass";
import RequestBox from "./RequestBox";
import Controls from "./Controls";
import { FormData } from "./constants";
import RequestesContainer from "./RequestesContainer";

const ELEVATOR_NUM = 5;
const MAX_FLOOR = 5;

const App: React.FC<{}> = () => {
    const [floors, setFloors] = useState(new Array(ELEVATOR_NUM).fill(0));
    const [requests, setRequests] = useState<Array<Array<number>>>([]);
    const elevatorController = useMemo(
        () => new ElevatorController(ELEVATOR_NUM),
        []
    );

    const onFormSubmit = (data: FormData) => {
        elevatorController.addElevatorStop(
            data.elevatorNo,
            data.floorFrom,
            data.floorTo
        );
        setRequests([...elevatorController.getRequests()]);
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
            <Controls
                elevatorNum={ELEVATOR_NUM}
                maxFloor={MAX_FLOOR}
                submitData={onFormSubmit}
            />
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
            <RequestesContainer requests={requests} />
        </div>
    );
};

export default App;
