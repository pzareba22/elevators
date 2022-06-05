import React from "react";
import "../styles/Elevator.sass";

type Props = {
    floor?: number;
};

const elevatorPadding = 0.2;

const Elevator: React.FC<Props> = ({ floor }) => {
    const shaftPos = floor ? floor * 5 + elevatorPadding : elevatorPadding;

    return (
        <div className="elevator" style={{ padding: `${elevatorPadding}em` }}>
            <div
                className="shaft"
                style={{ bottom: shaftPos.toString() + "em" }}
            ></div>
        </div>
    );
};

export default Elevator;
