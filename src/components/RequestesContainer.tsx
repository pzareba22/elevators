import React from "react";
import { RequestType } from "../logic/types";
import RequestBox from "./RequestBox";

type Props = {
    requests: RequestType[];
};

const RequestesContainer: React.FC<Props> = ({ requests }) => {
    return (
        <div className="requests">
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
