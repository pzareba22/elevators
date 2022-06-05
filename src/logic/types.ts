export type RequestType = {
    floorFrom: number;
    floorTo: number;
};

export type FloorEntry = {
    floor_no: number;
    floors_to: Array<number>;
};

export type DirectionType = "UP" | "DOWN";
