import React from "react";
import Elevator from "./Elevator";
import { ConfigType } from "./types";

type Props = {
    floors: number[];
    config: ConfigType;
};

const ElevatorsContainer: React.FC<Props> = ({ floors, config }) => {
    return (
        <div className="elevatorsContainer">
            {floors.map((floor, i) => (
                <Elevator
                    floor={floor}
                    maxFloor={config.floorNo - 1}
                    elevatorID={i}
                    key={i}
                />
            ))}
        </div>
    );
};

export default ElevatorsContainer;
