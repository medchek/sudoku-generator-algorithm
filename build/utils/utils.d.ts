/**
 * Helper function to generate a random number between the given range
 */
export declare const randomNumber: (min: number, max: number) => number;
/**
 * returns the initial index (of a row or column) inside a 3x3 square of a 9x9 grid
 * @param currentIndex the target row or col index
 */
export declare const getInitialSquareIndex: (currentIndex: number) => number;
/**
 * returns the last index (of a row or column) of a 3x3 square in a 9x9 grid
 * @param currentIndex the target row or col index
 */
export declare const getLastSquareIndex: (currentIndex: number) => number;
export declare const removeArrayDuplicates: (array: number[], sort?: boolean) => number[];
/**
 *  returns the missing numbers from 1 to 9
 * @param array array of number (expected with no duplicates)
 */
export declare const getMissingNumbers: (array: number[]) => number[];
/**
 * returns the index number of the largest number in the array
 * @param numbersArray array containing the numbers
 * @param ignoreIndexList an array of indices used to ignore any value in the numbersArray which index is present in ignoreIndexList
 */
export declare const getArrayMinNumberIndex: (array: number[][], ignoreIndexList: number[]) => number;
/**
 * Remove the target number n from within the array items. Mainly used to remove the a number from the possibilities
 *
 * Note when a numberToRemove is removed from the target number, it's sorted from smaller to larger
 * @param possibilities the array of numbers to process
 * @param numberToRemove the number that should be removed from each item of the array
 * @param ignoreIndices an array that holds the possibilities indices that should not be processed
 * @returns a new array with the omission of the provided number from each item
 * @example array = [15,12,35] & n = 1 returns [5,2,35]
 */
export declare const removeNumberOccurrence: (possibilities: number[][], numberToRemove: number, ignoreIndices: number[]) => number[][];
/**
 * Generates a number from the **targetNumber** that does not occur in the remaining possibilities
 * @param targetNumber the number to extract the valid number from
 * @param possibilities the possibilities to check against
 * @param ignoreIndexList an ignore list to ignore possibilities which index is present inside this array
 * @returns a number which does not occurs in the possibilities array, return 0 if no number meet the requirements
 * @example targetNumber 28 - possibilities = [269, 237, 215] returns 8 (as 8 is not present in any of the possibilities)
 */
export declare const generateSafeNumberFromPossibilities: (targetNumber: string, possibilities: number[]) => number;
export declare const convertObjectKeysToNumbers: (keys: string[]) => number[];
export declare const doesGridContainZero: (grid: number[][]) => {
    row: number;
    col: number;
} | null;
/**
 * Returns the number that occurs the least in the possibilities array
 * @param cellPossibilities the numbers that each number within is checked for its least count
 * @param rowPossibilities the possibilities list
 * @param ignoreIndices the index of the possibilities to be ignored by the function
 * @returns the number within the **numbers** param which count occurs the least in the possibilities
 */
export declare const getLeastOccurredNumberCount: (cellPossibilities: number[], rowPossibilities: number[][], ignoreIndices: number[]) => number;
/**
 * checks if the 2d array contains any empty array in it
 * @param array 2d array of numbers
 * @returns
 */
export declare const hasEmptyArray: (array: number[][]) => boolean;
/**
 * Picks one of the numbers of n randomly
 * @param n the number to pick from
 * @returns a random number that is part of n
 */
export declare const pickFromNumber: (n: number[]) => number;
/**
 * Clones a 2d array
 * @param array the array to clone
 * @returns a new copy of the provided 2d array
 */
export declare const cloneArray: (array: number[][]) => number[][];
