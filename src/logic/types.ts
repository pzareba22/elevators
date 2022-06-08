export type RequestType = {
    floorFrom: number;
    floorTo: number;
};

export type FloorEntry = {
    floorNo: number;
    floors_to: Array<number>;
};

export type DirectionType = "UP" | "DOWN";
