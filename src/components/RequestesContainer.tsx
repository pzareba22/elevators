import React from "react";
import RequestBox from "./RequestBox";

type Props = {
    requests: Array<Array<number>>;
};

const RequestesContainer: React.FC<Props> = ({ requests }) => {
    return (
        <div className="requests">
            {requests.map((request, i) => {
                return (
                    <RequestBox
                        elevatorNo={i}
                        floorFrom={request[0]}
                        floorTo={request[1]}
                        key={i}
                    />
                );
            })}
        </div>
    );
};

export default RequestesContainer;
