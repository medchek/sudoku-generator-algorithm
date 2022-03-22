import {
  generateSafeNumberFromPossibilities,
  getArrayMaxNumberIndex,
  getArrayMinNumberIndex,
  getLeastOccurredNumberCount,
  getMissingNumbers,
  getUnprocessedPossibilities,
  hasNaN,
  removeArrayDuplicates,
  removeNumberOccurrence,
} from "../../src/utils/utils";

test("removeNumberOccurrence should return the array without the number to be removed", () => {
  const array: number[] = [154, 1579, 368, 123];
  const result = removeNumberOccurrence(array, 1, [3]);

  expect(result).toStrictEqual([45, 579, 368, 123]);
});

test("generateSafeNumberFromPossibilities should return a number that does not occur in the possibilities", () => {
  const number = "75";
  const possibilities = [125, 354, 9856];
  const result = generateSafeNumberFromPossibilities(number, possibilities);

  expect(result).toBe(7);
});

test("removeArrayDuplicates removes all duplicates in array", () => {
  const arrayWithDupe = [1, 1, 2, 3, 3, 4, 5, 6, 7, 1];
  const removedDuplicates = removeArrayDuplicates(arrayWithDupe).sort();

  expect(removedDuplicates).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
});

test("getUnprocessedPossibilities should return only possibilities which index is not present in the ignore list array ", () => {
  const possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const ignoreList = [0, 3, 4, 7];
  const result = getUnprocessedPossibilities(possibilities, ignoreList);

  expect(result).toEqual([2, 3, 6, 7, 9]);
});

test("getMissingNumbers returns the missing numbers in an array", () => {
  const numbers = [1, 2, 3, 4, 5];
  const expected = [6, 7, 8, 9];
  const result = getMissingNumbers(numbers).sort();
  expect(result).toStrictEqual(expected);
});

test("getArrayMinNumberIndex returns the index of the smallest number in the array", () => {
  // const numbers = [7, 8, 3, 5, 9, 4];
  const numbers = [
    114678, 114678, 124678, 234589, 234589, 234589, 135679, 135679, 135679,
  ];
  const ignoreList = [0]; // ignore number 3, and 4
  const result = getArrayMinNumberIndex(numbers, ignoreList);
  expect(result).toBe(1);
});

test("getArrayMaxNumberIndex returns the index of the largest number in the array", () => {
  const numbers = [7, 8, 3, 4, 5, null];
  const number = getArrayMaxNumberIndex(numbers);
  expect(number).toBe(1);
});

test("getLeastOccurredNumberCount should return the number that is the least present in the possibilities", () => {
  const numbers = 29;
  const possibilities = [2, 39, 0, 2, 0, 39, 3, 0, 29];
  const ignoreList = [0, 2, 3, 4, 6, 7];
  const result = getLeastOccurredNumberCount(
    numbers,
    possibilities,
    ignoreList
  );
  // in the number 29, and while considering the ignoreList, the number 2 is the least present in the possibilities, occurring once in the last value 29 (since all the other values are to be ignored)
  expect(result).toBe(2);
});

test("hasNaN should return true if an array of numbers contains any NaN value", () => {
  const numbers: number[] = [29, 546, 154, NaN];
  const result = hasNaN(numbers);
  expect(result).toBe(true);
});
