import { RequestType } from "../logic/types";

export type ElevatorRequest = RequestType & { elevatorNo: number };

export type FormData = ElevatorRequest;
