import React from "react";
import { RequestType } from "../logic/types";
import RequestBox from "./RequestBox";
import "../styles/RequestsContainer.sass";

type Props = {
    requests: RequestType[];
};

const RequestesContainer: React.FC<Props> = ({ requests }) => {
    return (
        <div className="requestsContainer">
            <h2>Wezwania</h2>
            {requests.map((request, i) => {
                return (
                    <RequestBox
                        request={{ ...request, elevatorNo: i }}
                        key={i}
                    />
                );
            })}
        </div>
    );
};

export default RequestesContainer;
