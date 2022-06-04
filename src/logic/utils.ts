export type DirectionType = "UP" | "DOWN";

export type FloorEntry = {
    floor_no: number;
    floors_to: Array<Number>;
};

export const findIndex = (arr: Array<number>, value: number) => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
        let middle = Math.floor((left + right) / 2);
        if (arr[middle] == value) {
            return middle;
        } else if (arr[middle] > value) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }
    return left;
};
