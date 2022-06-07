import { findIndex, insertSorted } from "../logic/utils";

describe("findIndex tests", () => {
    test("find existing item in an array", () => {
        // given
        let arr = [1, 3, 7];

        // when
        let res = findIndex(arr, 3, (x) => x);

        // then
        expect(res).toEqual(1);
    });

    test("find nonexistent smaller item in an array", () => {
        // given
        let arr = [1, 3, 7];

        // when
        let res = findIndex(arr, 0, (x) => x);

        // then
        expect(res).toEqual(0);
    });

    test("find nonexistent larger item in an array", () => {
        // given
        let arr = [1, 3, 7];

        // when
        let res = findIndex(arr, 9, (x) => x);

        // then
        expect(res).toEqual(3);
    });
    test("find nonexistent item in an array", () => {
        // given
        let arr = [1, 2, 5];

        // when
        let res = findIndex(arr, 4, (x) => x);

        // then
        expect(res).toEqual(2);
    });
});

describe("insertSorted tests", () => {
    test("Insert a value in the begginning", () => {
        // given
        let arr = [2, 3, 7];

        // when
        insertSorted(arr, 1, (x) => x);

        // then
        expect(arr).toEqual([1, 2, 3, 7]);
    });

    test("Insert a value in the end", () => {
        // given
        let arr = [5, 8, 9, 10];

        // when
        insertSorted(arr, 20, (x) => x);

        // then
        expect(arr).toEqual([5, 8, 9, 10, 20]);
    });

    test("Insert a value in the middle", () => {
        // given
        let arr = [-10, 20, 50];

        // when
        insertSorted(arr, 30, (x) => x);

        // then
        expect(arr).toEqual([-10, 20, 30, 50]);
    });
});
