import { FloorEntry } from "../logic/types";
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
    test("find existing item in an array 2", () => {
        // given
        let arr = [1, 3, 7];

        // when
        let res = findIndex(arr, 1, (x) => x);

        // then
        expect(res).toEqual(0);
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
        let arr = [1, 2, 5];

        let res = findIndex(arr, 4, (x) => x);

        expect(res).toEqual(2);
    });
    test("find nonexistent item in an array 2", () => {
        let arr = [1, 3, 5];

        let res = findIndex(arr, 2, (x) => x);

        expect(res).toEqual(1);
    });
});
