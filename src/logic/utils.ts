export type DirectionType = "UP" | "DOWN";

export type FloorEntry = {
    floor_no: number;
    floors_to: Array<number>;
};

// export function findIndex(arr: Array<number>, value: number): number {
//     let left = 0;
//     let right = arr.length;
//     while (left < right) {
//         let middle = Math.floor((left + right) / 2);
//         if (arr[middle] == value) {
//             return middle;
//         } else if (arr[middle] > value) {
//             right = middle - 1;
//         } else {
//             left = middle + 1;
//         }
//     }
//     return left;
// }
export const findIndex = (arr: Array<FloorEntry>, value: number): number => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
        let middle = Math.floor((left + right) / 2);
        if (arr[middle].floor_no == value) {
            return middle;
        } else if (arr[middle].floor_no > value) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }
    return left;
};

export const insertSorted = <T>(arr: Array<T>, value: T) => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
        let middle = Math.floor((left + right) / 2);
        if (arr[middle] == value) return;
        if (arr[middle] > value) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }
    arr.splice(left, 0, value);
};
