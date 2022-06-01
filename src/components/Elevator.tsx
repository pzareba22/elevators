import React from "react";
import "../styles/Elevator.sass";

type Props = {
    floor?: number;
};

const Elevator: React.FC<Props> = ({ floor }) => {
    const shaftPos = floor ? floor * 5 + 0.2 : 0.2;

    return (
        <div className="elevator">
            <div
                className="shaft"
                style={{ bottom: shaftPos.toString() + "em" }}
            ></div>
        </div>
    );
};

export default Elevator;
