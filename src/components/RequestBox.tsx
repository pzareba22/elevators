import React from "react";

type Props = {
    elevatorNo: number;
    floorFrom: number;
    floorTo: number;
};

const RequestBox: React.FC<Props> = (props) => {
    return (
        <div className="requestBox">
            <p>{props.elevatorNo}</p>
            <p>{props.floorFrom}</p>
            <p>{props.floorTo}</p>
        </div>
    );
};

export default RequestBox;
