import React, { useEffect, useMemo, useState } from "react";
import Elevator from "./components/Elevator";
import ElevatorController from "./logic/ElevatorController";
import "./styles/App.sass";
import Controls from "./components/Controls";
import { FormData, SetupData } from "./components/types";
import RequestesContainer from "./components/RequestesContainer";
import { RequestType } from "./logic/types";
import SetupDialog from "./components/SetupDialog";

const App: React.FC = () => {
    const [config, setConfig] = useState<SetupData & { setup: boolean }>({
        elevatorsNo: 0,
        floorNo: 0,
        setup: true,
    });
    const [floors, setFloors] = useState(new Array(config.elevatorsNo).fill(0));
    const [requests, setRequests] = useState<RequestType[]>([]);

    // Czy te 2 hooki da się jakoś uprościć?
    const elevatorController = useMemo(
        () => new ElevatorController(config.elevatorsNo, config.floorNo - 1),
        [config]
    );

    useEffect(() => {
        setFloors(elevatorController.getElevatorPositions());
        setRequests([]);
    }, [elevatorController]);

    const handleFormSubmit = (data: FormData) => {
        // Form data requires some additional parsing
        elevatorController.addElevatorStop(
            parseInt(data.elevatorNo as unknown as string),
            parseInt(data.floorFrom as unknown as string),
            parseInt(data.floorTo as unknown as string)
        );
        setRequests(elevatorController.getRequests());
    };

    const handleSetupSubmit = (data: SetupData) => {
        console.log(data);
        setConfig({ ...data, setup: false });
    };

    return (
        <div className="app">
            {config.setup && <SetupDialog submitData={handleSetupSubmit} />}
            <div className="elevatorsContainer">
                {floors.map((floor, i) => (
                    <div className="elevatorContainer" key={i}>
                        <h3>{i}</h3>
                        <Elevator floor={floor} maxFloor={config.floorNo - 1} />
                    </div>
                ))}
            </div>
            <div className="flexContainer">
                <Controls
                    elevatorNum={config.elevatorsNo}
                    maxFloor={config.floorNo - 1}
                    submitData={handleFormSubmit}
                />
                <button
                    className="submitButton"
                    onClick={() => {
                        elevatorController.update();
                        setFloors(elevatorController.getElevatorPositions());
                        setRequests([...elevatorController.getRequests()]);
                    }}
                >
                    Zaktualizuj stan
                </button>
            </div>
            <RequestesContainer requests={requests} />
        </div>
    );
};

export default App;
