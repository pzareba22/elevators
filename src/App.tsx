import React, { useEffect, useMemo, useState } from "react";
import ElevatorController from "./logic/ElevatorController";
import "./styles/App.sass";
import Controls from "./components/Controls";
import { ConfigType, FormData, SetupDataType } from "./components/types";
import RequestesContainer from "./components/RequestesContainer";
import { RequestType } from "./logic/types";
import SetupDialog from "./components/SetupDialog";
import ElevatorsContainer from "./components/ElevatorsContainer";

const App: React.FC = () => {
    const [config, setConfig] = useState<ConfigType>({
        elevatorsNo: 0,
        floorNo: 0,
        setup: true,
    });
    const [floors, setFloors] = useState<number[]>(
        new Array(config.elevatorsNo).fill(0)
    );
    const [requests, setRequests] = useState<RequestType[][]>([]);

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

    const handleSetupSubmit = (data: SetupDataType) => {
        setConfig({ ...data, setup: false });
    };

    return (
        <div className="app">
            {config.setup && <SetupDialog submitData={handleSetupSubmit} />}
            <ElevatorsContainer config={config} floors={floors} />
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
