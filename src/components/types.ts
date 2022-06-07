import { RequestType } from "../logic/types";

export type ElevatorRequest = RequestType & { elevatorNo: number };

export type FormData = ElevatorRequest;

export type SetupDataType = {
    elevatorsNo: number;
    floorNo: number;
};

export type ConfigType = SetupDataType & { setup: boolean };
