/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 963:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sudoku = void 0;
const utils_1 = __nccwpck_require__(239);
class Sudoku {
    constructor() {
        this._grid = [];
    }
    get grid() {
        return this._grid;
    }
    /**
     * Helper Method to shuffle an array
     */
    _shuffleArray(originalArray) {
        const array = [...originalArray];
        for (let i = 0; i < array.length; i++) {
            const newIndex = (0, utils_1.randomNumber)(0, array.length - 1);
            const tempTargetVal = array[newIndex];
            array[newIndex] = array[i];
            array[i] = tempTargetVal;
        }
        return array;
    }
    _resetGrid() {
        this._grid = [];
    }
    /**
     * Helper method to generate a randomly sorted array containing numbers from 1 to 9
     */
    _generateRandomRow() {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return this._shuffleArray(array);
    }
    /**
     * Retrieves a row from the grid
     */
    _getRow(rowIndex) {
        return this._grid[rowIndex];
    }
    /**
     * Retrieves a column from the grid
     */
    _getCol({ row: rowIndex, col: colIndex }) {
        const cols = [];
        for (let row = rowIndex; row >= 0; row--) {
            const colValue = this._grid[row][colIndex];
            if (colValue) {
                cols.push(colValue);
            }
        }
        return cols;
    }
    /**
     * Retrieves all the values in the target square
     */
    _getSquare({ col, row }) {
        const initRowIndex = (0, utils_1.getInitialSquareIndex)(row);
        const initColIndex = (0, utils_1.getInitialSquareIndex)(col);
        const square = [];
        for (let row = initRowIndex; row <= initRowIndex + 2; row++) {
            // if current row is undefined, exist the loop;
            if (!this._grid[row])
                break;
            for (let col = initColIndex; col <= initColIndex + 2; col++) {
                if (!this._grid[row][col])
                    break;
                const cellValue = this._grid[row][col];
                // if (cellValue !== 0) {
                square.push(cellValue);
                // }
            }
        }
        return square;
    }
    /**
     * Retrieves all the values that are present/forbidden in the target cell
     */
    _getCell({ row, col }) {
        const column = this._getCol({ row, col });
        const rowValues = this._getRow(row);
        const square = this._getSquare({ row, col });
        const combined = [...column, ...rowValues, ...square];
        return (0, utils_1.removeArrayDuplicates)(combined, true);
    }
    _getAllowedInCell({ row, col }) {
        return (0, utils_1.getMissingNumbers)(this._getCell({ row, col }));
    }
    /**
     * Get the possibilites in each cell of the target row
     * @param row the row index
     * @returns
     */
    _getRowPossibilitiesInEachCell(row) {
        // first row is randomly generated, no need to computed its cell possible solutions
        if (row === 0)
            throw new Error("Row cannot be 0");
        const rowCellsSolution = [];
        for (let col = 0; col < 9; col++) {
            const cellPossibleSolution = this._getAllowedInCell({ row, col });
            rowCellsSolution.push(cellPossibleSolution.sort((a, b) => a - b));
        }
        // each number represent the possible numbers that can go in that cell
        return rowCellsSolution;
    }
    /**
     * Geneartes a row of number according the rules taking into account the possiblities that go in each cell of the row.
     *
     * If the method reaches an impass i.e. When it cannot generate unique numbers anymore, it returns -1 rather than an array of numbers.
     * @param rowCellsPossibleSolutions a 2d array containing all the possiblities in each cell
     * @returns an array of number or -1 in case of an inability to generate a valid row
     */
    _generateValidRow(rowCellsPossibleSolutions) {
        const immutablePossibilities = (0, utils_1.cloneArray)(rowCellsPossibleSolutions);
        let possibilities = (0, utils_1.cloneArray)(rowCellsPossibleSolutions);
        const generatedValidRow = {};
        for (let i = 0; i < immutablePossibilities.length; i++) {
            const ignoreIndexList = (0, utils_1.convertObjectKeysToNumbers)(Object.keys(generatedValidRow));
            /** this will be the index of the target cell for which a valid number is to be generated */
            const minNumberIndex = (0, utils_1.getArrayMinNumberIndex)(possibilities, ignoreIndexList);
            // if an impass is reached, exit the function and let the loop rollback
            if (minNumberIndex === -1)
                return -1;
            const minNumber = possibilities[minNumberIndex];
            // const minNumberStr = minNumber.toString();
            let validCellNumber;
            // first three cells are chosen randomly
            // this gives the function the ability to alter the generated numbers in case of a rollback
            if (i <= 2) {
                validCellNumber = (0, utils_1.pickFromNumber)(minNumber);
            }
            else {
                validCellNumber = (0, utils_1.getLeastOccurredNumberCount)(minNumber, possibilities, ignoreIndexList);
            }
            generatedValidRow[minNumberIndex] = validCellNumber;
            // before removing the number from the possibilities
            // add the successfully generated number index to the ignore list index so that
            // it gets ignored by the removeNumberOccurrence function
            ignoreIndexList.push(minNumberIndex);
            // remove the generated number from all the cells, to prevent it from getting picked up again
            possibilities = (0, utils_1.removeNumberOccurrence)(possibilities, validCellNumber, ignoreIndexList);
        }
        return Object.values(generatedValidRow);
    }
    /**
     * Generates a valid sudoku grid
     */
    generate() {
        this._resetGrid();
        console.clear();
        for (let row = 0; row < 9; row++) {
            if (row === 0) {
                // create the first row which is a randomly shuffled array of number
                // this will serve as the base for the next generation process
                const randomlyGeneratedRow = this._generateRandomRow();
                this._grid[row] = randomlyGeneratedRow;
            }
            else {
                this._grid[row] = [];
                const rowPossibleInEachCell = this._getRowPossibilitiesInEachCell(row);
                // const rowPossibilitiesContainNan = hasEmptyArray(rowPossibleInEachCell);
                const generatedRow = this._generateValidRow(rowPossibleInEachCell);
                // when the _generateValidRow method cannot generate a valid number for a cell
                // it exits the with a number (-1) rather than an array of number when it complete successfully,
                // therefore we need to rollback to the previous row and regenerate a new one when the methods return a number
                if (typeof generatedRow === "number") {
                    // Reset the previous row
                    // remove both the current empty and the previously generated row (so that it gets regenerated again)
                    // before rolling back
                    this._grid.splice(row - 1, 2);
                    // rollback 2 rows back so that when the continue statement runs, the previous row will be regenerated
                    row -= 2;
                    // once we rollback, reiterate
                    continue;
                }
                this._grid[row] = generatedRow;
            }
        }
        // temp
        return this._grid;
    }
}
exports.Sudoku = Sudoku;


/***/ }),

/***/ 144:
/***/ ((module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Sudoku_1 = __nccwpck_require__(963);
module.exports = Sudoku_1.Sudoku;


/***/ }),

/***/ 239:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cloneArray = exports.pickFromNumber = exports.hasEmptyArray = exports.getLeastOccurredNumberCount = exports.doesGridContainZero = exports.convertObjectKeysToNumbers = exports.generateSafeNumberFromPossibilities = exports.removeNumberOccurrence = exports.getArrayMinNumberIndex = exports.getMissingNumbers = exports.removeArrayDuplicates = exports.getLastSquareIndex = exports.getInitialSquareIndex = exports.randomNumber = void 0;
/**
 * Helper function to generate a random number between the given range
 */
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.randomNumber = randomNumber;
/**
 * returns the initial index (of a row or column) inside a 3x3 square of a 9x9 grid
 * @param currentIndex the target row or col index
 */
const getInitialSquareIndex = (currentIndex) => {
    if (currentIndex < 0 || currentIndex > 8) {
        throw new Error("invalid currentIndex, must be between 0 and 8");
    }
    if (currentIndex >= 0 && currentIndex <= 2)
        return 0;
    else if (currentIndex >= 3 && currentIndex <= 5)
        return 3;
    else if (currentIndex >= 6 && currentIndex <= 8)
        return 6;
    else
        return 0;
};
exports.getInitialSquareIndex = getInitialSquareIndex;
/**
 * returns the last index (of a row or column) of a 3x3 square in a 9x9 grid
 * @param currentIndex the target row or col index
 */
const getLastSquareIndex = (currentIndex) => {
    if (currentIndex < 0 || currentIndex > 8) {
        throw new Error("invalid currentIndex, must be between 0 and 8");
    }
    if (currentIndex >= 0 && currentIndex <= 2)
        return 2;
    else if (currentIndex >= 3 && currentIndex <= 5)
        return 5;
    else if (currentIndex >= 6 && currentIndex <= 8)
        return 8;
    else
        return 2;
};
exports.getLastSquareIndex = getLastSquareIndex;
const removeArrayDuplicates = (array, sort = false) => {
    const noDupe = Array.from(new Set(array));
    return sort ? noDupe.sort() : noDupe;
};
exports.removeArrayDuplicates = removeArrayDuplicates;
/**
 *  returns the missing numbers from 1 to 9
 * @param array array of number (expected with no duplicates)
 */
const getMissingNumbers = (array) => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => array.indexOf(n) === -1);
};
exports.getMissingNumbers = getMissingNumbers;
/**
 * returns the index number of the largest number in the array
 * @param numbersArray array containing the numbers
 * @param ignoreIndexList an array of indices used to ignore any value in the numbersArray which index is present in ignoreIndexList
 */
const getArrayMinNumberIndex = (array, ignoreIndexList) => {
    const allowed = array.map((n, i) => {
        const arrayToNumber = parseInt(n.join(""), 10);
        return ignoreIndexList.indexOf(i) === -1 ? arrayToNumber : 99999999;
    });
    const minNumber = Math.min(...allowed);
    return allowed.indexOf(minNumber);
};
exports.getArrayMinNumberIndex = getArrayMinNumberIndex;
/**
 * checks if the number exists within the array of numbers
 * @param number
 * @param array
 */
const inArray = (number, array) => {
    return array.indexOf(number) !== -1;
};
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
const removeNumberOccurrence = (possibilities, numberToRemove, ignoreIndices) => {
    const newArray = possibilities.map((n, i) => {
        // if the index of the possibility is present in the ignoreIndices
        // return it without any processing
        if (inArray(i, ignoreIndices))
            return [];
        // get the index of the number to remove
        const numberIndex = n.indexOf(numberToRemove);
        // if the number does no contain the numberToRemove, return it as is
        if (numberIndex === -1)
            return n;
        // else remove number from the array
        n.splice(numberIndex, 1);
        // if the number isNaN, give back a number that will never be considered as the smallest
        //
        return n;
    });
    return newArray;
};
exports.removeNumberOccurrence = removeNumberOccurrence;
/**
 * Generates a number from the **targetNumber** that does not occur in the remaining possibilities
 * @param targetNumber the number to extract the valid number from
 * @param possibilities the possibilities to check against
 * @param ignoreIndexList an ignore list to ignore possibilities which index is present inside this array
 * @returns a number which does not occurs in the possibilities array, return 0 if no number meet the requirements
 * @example targetNumber 28 - possibilities = [269, 237, 215] returns 8 (as 8 is not present in any of the possibilities)
 */
const generateSafeNumberFromPossibilities = (targetNumber, possibilities) => {
    const initialNumber = targetNumber[(0, exports.randomNumber)(0, targetNumber.length - 1)];
    let validNumber = parseInt(initialNumber, 10);
    const targetNumberSplit = targetNumber.split("");
    for (let i = 0; i < targetNumberSplit.length; i++) {
        const n = targetNumberSplit[i];
        const valid = !possibilities.every((e) => {
            // return e.toString().indexOf(n) === -1;
            return e.toString().includes(n);
        });
        if (valid) {
            validNumber = parseInt(n, 10);
            break;
        }
    }
    // console.log("resulting in => ", validNumber);
    return validNumber;
};
exports.generateSafeNumberFromPossibilities = generateSafeNumberFromPossibilities;
const convertObjectKeysToNumbers = (keys) => {
    return keys.map((n) => parseInt(n));
};
exports.convertObjectKeysToNumbers = convertObjectKeysToNumbers;
const doesGridContainZero = (grid) => {
    for (let row = 0; row < grid.length; row++) {
        const rowContent = grid[row];
        const zero = rowContent.indexOf(0);
        if (zero !== -1)
            return { row, col: zero };
    }
    return null;
};
exports.doesGridContainZero = doesGridContainZero;
/**
 * Counts the number n occurrence in all the possibilities, excluding any possibility index found in the
 * ignoreListIndices array
 * @param n the number to count
 * @param possibilities the possibilities
 * @param ignoreListIndices the list of possibilities indexes to ignore
 * @returns the count of the number in all the non-ignored possibilities
 */
const countNumberInPossibilities = (n, possibilities, ignoreListIndices) => {
    let occurrence = 0;
    possibilities.forEach((possibility, i) => {
        // only process this possibility if it is not in the ignoreListIndices
        if (ignoreListIndices.indexOf(i) === -1) {
            // count how many times the number occurs in it
            if (possibility.indexOf(n) > -1) {
                occurrence++;
            }
        }
    });
    return occurrence;
};
/**
 * returns the number which count is the smallest.
 * @param o the object containing the numbers as keys and their count as value.
 * @returns the number which count is the smallest.
 * @example {"3": 5, "7": 1, "9": 0} returns 9 ("as 9 has the smallest count").
 */
const getSmallestNumberFromObject = (o) => {
    const smallestCount = Math.min(...Object.values(o));
    const smallestNumberCount = Object.entries(o).find((e) => e[1] === smallestCount);
    if (smallestNumberCount) {
        return parseInt(smallestNumberCount[0], 10);
    }
    return 0;
};
/**
 * Checks whether the possibilities which index is not within the ignoreIndices array are equal
 *
 * This function assumes that the numbers within each possibility are sorted from small to large
 * @param possibilities the possibilities array
 * @param ignoreIndices the possibilities indices to ignore
 * @returns
 */
const possibilitiesContainSameNumbers = (possibilities, ignoreIndices) => {
    const filteredPossibilities = possibilities.filter((_, i) => ignoreIndices.indexOf(i) === -1);
    // if any number is different than the first one, exit the function
    const checkAgainst = filteredPossibilities[0];
    return filteredPossibilities.every((n) => n.toString() === checkAgainst.toString());
};
/**
 * Returns the number that occurs the least in the possibilities array
 * @param cellPossibilities the numbers that each number within is checked for its least count
 * @param rowPossibilities the possibilities list
 * @param ignoreIndices the index of the possibilities to be ignored by the function
 * @returns the number within the **numbers** param which count occurs the least in the possibilities
 */
const getLeastOccurredNumberCount = (cellPossibilities, rowPossibilities, ignoreIndices) => {
    if (cellPossibilities.length === 1) {
        return cellPossibilities[0];
    }
    else {
        const counter = {};
        const number = cellPossibilities;
        // if the possibilities contain the same number, return a random number among the numbers contained in the cellPossibilities param
        if (possibilitiesContainSameNumbers(rowPossibilities, ignoreIndices)) {
            return cellPossibilities[(0, exports.randomNumber)(0, number.length - 1)];
        }
        else {
            for (let i = 0; i < cellPossibilities.length; i++) {
                const numberSegment = cellPossibilities[i];
                const numCount = countNumberInPossibilities(cellPossibilities[i], rowPossibilities, ignoreIndices);
                counter[numberSegment] = numCount;
            }
            const smallest = getSmallestNumberFromObject(counter);
            return smallest;
        }
    }
};
exports.getLeastOccurredNumberCount = getLeastOccurredNumberCount;
/**
 * checks if the 2d array contains any empty array in it
 * @param array 2d array of numbers
 * @returns
 */
const hasEmptyArray = (array) => {
    return array.some((a) => a.length === 0);
};
exports.hasEmptyArray = hasEmptyArray;
/**
 * Picks one of the numbers of n randomly
 * @param n the number to pick from
 * @returns a random number that is part of n
 */
const pickFromNumber = (n) => {
    if (n.length === 1)
        return n[0];
    return n[(0, exports.randomNumber)(0, n.length - 1)];
};
exports.pickFromNumber = pickFromNumber;
/**
 * Clones a 2d array
 * @param array the array to clone
 * @returns a new copy of the provided 2d array
 */
const cloneArray = (array) => {
    return array.map((a) => a.slice());
};
exports.cloneArray = cloneArray;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(144);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;