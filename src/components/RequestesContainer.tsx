import React from "react";
import { RequestType } from "../logic/types";
import RequestBox from "./RequestBox";
import "../styles/RequestsContainer.sass";
import { ElevatorRequest } from "./types";

type Props = {
    requests: RequestType[][];
};

const RequestesContainer: React.FC<Props> = ({ requests }) => {
    const reqs: ElevatorRequest[] = requests.flatMap((rs, i) => {
        return rs.map((request) => {
            return { ...request, elevatorNo: i };
        });
    });

    return (
        <div className="requestsContainer">
            <h2>Wezwania</h2>
            {reqs.map((req, i) => {
                return <RequestBox request={req} key={i} />;
            })}
        </div>
    );
};

export default RequestesContainer;
