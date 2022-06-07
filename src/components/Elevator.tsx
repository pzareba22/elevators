import React from "react";
import "../styles/Elevator.sass";

type Props = {
    floor?: number;
    maxFloor: number;
    elevatorID: number;
};

const elevatorPadding = 0.2;
const elevatorHeight = 30;

const Elevator: React.FC<Props> = ({ floor, maxFloor, elevatorID }) => {
    const floorHeight = (elevatorHeight + 2 * elevatorPadding) / (maxFloor + 1);
    const shaftPos = floor
        ? floor * floorHeight - elevatorPadding
        : elevatorPadding;

    const onFloorClick = (floorNo: number) => {
        console.log(`You just clicked floor ${floorNo}`);
    };

    const floors = Array.from({ length: maxFloor + 1 }, (_, i) => {
        return (
            <div
                className="floor"
                style={{ height: `${floorHeight}em` }}
                onClick={() => onFloorClick(maxFloor - i)}
                key={i}
            >
                {maxFloor - i}
            </div>
        );
    });

    return (
        <div className="elevatorContainer">
            <h3>{elevatorID}</h3>
            <div
                className="elevator"
                style={{ padding: `${elevatorPadding}em` }}
            >
                {floors}
                <div
                    className="shaft"
                    style={{
                        bottom: `${shaftPos * 16}px`,
                        height: `${floorHeight}em`,
                    }}
                >
                    {floor}
                </div>
            </div>
        </div>
    );
};

export default Elevator;
