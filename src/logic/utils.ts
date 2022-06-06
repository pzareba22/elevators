// Function returning index of given element, or the index BEFORE which the element should be inserted
export const findIndex = <T>(
    arr: Array<T>,
    value: number,
    getValue: (arg: T) => number
): number => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
        let middle = Math.floor((left + right) / 2);
        if (getValue(arr[middle]) == value) {
            return middle;
        } else if (getValue(arr[middle]) > value) {
            right = middle;
        } else {
            left = middle + 1;
        }
    }
    return left;
};

// Function inserting a value into a sorted array
export const insertSorted = <T>(
    arr: Array<T>,
    value: T,
    getValue: (arg: T) => number
) => {
    let left = 0;
    let right = arr.length;
    while (left < right) {
        let middle = Math.floor((left + right) / 2);
        if (getValue(arr[middle]) == getValue(value)) return;
        if (getValue(arr[middle]) > getValue(value)) {
            right = middle;
        } else {
            left = middle + 1;
        }
    }
    arr.splice(left, 0, value);
    return arr;
};
