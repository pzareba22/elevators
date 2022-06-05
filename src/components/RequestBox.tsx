import React from "react";
import "../styles/RequestBox.sass";
import { ElevatorRequest } from "./types";

type Props = {
    request: ElevatorRequest;
};

const RequestBox: React.FC<Props> = ({ request }) => {
    return (
        <div className="requestBox">
            <p>{request.elevatorNo}</p>
            <p>From: {request.floorFrom}</p>
            <p>To: {request.floorTo}</p>
        </div>
    );
};

export default RequestBox;
