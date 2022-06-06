import { RequestType } from "../logic/types";

export type ElevatorRequest = RequestType & { elevatorNo: number };

export type FormData = ElevatorRequest;

export type SetupData = {
    elevatorsNo: number;
    floorNo: number;
};
