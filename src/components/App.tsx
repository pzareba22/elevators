import React, { useState } from "react";
import Elevator from "./Elevator";
import "../styles/App.sass";

const ELEVATOR_NUM = 5;
const MAX_FLOOR = 5;

const App: React.FC<{}> = () => {
    const [floors, setFloors] = useState(new Array(ELEVATOR_NUM).fill(0));
    const [formData, setFormData] = useState(new Array(ELEVATOR_NUM).fill(0));

    const updateFloors = (data: Array<number>) => {
        const newFloors = [...data];
        setFloors(newFloors);
    };

    // Czy to musi być w state?
    const updateFormData = (floorIndex: number, floor: number) => {
        if (floor > MAX_FLOOR || floor < 0) return;
        const newFormData = [...formData];
        newFormData[floorIndex] = floor;
        setFormData(newFormData);
    };

    return (
        <div className="app">
            <div className="elevatorsContainer">
                {floors.map((floor, i) => (
                    <div className="elevatorContainer" key={i}>
                        <h3>{i + 1}</h3>
                        <Elevator floor={floor} />
                    </div>
                ))}
            </div>
            <div className="elevatorControls">
                {floors.map((floor, i) => (
                    <form key={i}>
                        <label htmlFor="floorInput">Winda {i + 1}</label>
                        <input
                            type="number"
                            name="floorInput"
                            id="floorInput"
                            onChange={(e) => {
                                updateFormData(i, parseInt(e.target.value));
                            }}
                            value={formData[i]}
                        />
                        {/* <input type="submit" value="Zmień" /> */}
                    </form>
                ))}
            </div>
            <button
                className="submitButton"
                onClick={() => {
                    updateFloors(formData);
                }}
            >
                Zmień
            </button>
        </div>
    );
};

export default App;
