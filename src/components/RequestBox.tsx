import React from "react";
import "../styles/RequestBox.sass";

type Props = {
    elevatorNo: number;
    floorFrom: number;
    floorTo: number;
};

const RequestBox: React.FC<Props> = (props) => {
    return (
        <div className="requestBox">
            <p>{props.elevatorNo}</p>
            <p>From: {props.floorFrom}</p>
            <p>To: {props.floorTo}</p>
        </div>
    );
};

export default RequestBox;
