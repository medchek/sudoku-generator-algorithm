import {
  getInitialSquareIndex,
  getMissingNumbers,
  removeArrayDuplicates,
  getArrayMinNumberIndex,
  removeNumberOccurrence,
  convertObjectKeysToNumbers,
  getLeastOccurredNumberCount,
  hasNaN,
  pickFromNumber,
  rowContainsZero,
  randomNumber,
} from "./../utils/utils";

interface CellCoordinates {
  row: number;
  col: number;
}

export class Sudoku {
  private _grid: number[][] = [];

  public get grid() {
    return this._grid;
  }

  /**
   * Helper Method to shuffle an array
   */
  private _shuffleArray(originalArray: number[]): number[] {
    const array = [...originalArray];

    for (let i = 0; i < array.length; i++) {
      const newIndex = randomNumber(0, array.length - 1);
      const tempTargetVal = array[newIndex];
      array[newIndex] = array[i];
      array[i] = tempTargetVal;
    }
    return array;
  }

  private _resetGrid() {
    this._grid = [];
  }
  /**
   * Helper method to generate a randomly sorted array containing numbers from 1 to 9
   */
  private _generateRandomRow() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return this._shuffleArray(array);
  }

  /**
   * Retrieves a row from the grid
   */
  private _getRow(rowIndex: number) {
    return this._grid[rowIndex];
  }

  /**
   * Retrieves a column from the grid
   */
  private _getCol({ row: rowIndex, col: colIndex }: CellCoordinates): number[] {
    const cols: number[] = [];
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
  private _getSquare({ col, row }: CellCoordinates): number[] {
    const initRowIndex = getInitialSquareIndex(row);
    const initColIndex = getInitialSquareIndex(col);
    const square: number[] = [];
    for (let row = initRowIndex; row <= initRowIndex + 2; row++) {
      // if current row is undefined, exist the loop;
      if (!this._grid[row]) break;

      for (let col = initColIndex; col <= initColIndex + 2; col++) {
        if (!this._grid[row][col]) break;
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
  private _getCell({ row, col }: CellCoordinates): number[] {
    const column = this._getCol({ row, col });
    const rowValues = this._getRow(row);
    const square = this._getSquare({ row, col });

    const combined = [...column, ...rowValues, ...square];

    return removeArrayDuplicates(combined, true);
  }

  private _getAllowedInCell({ row, col }: CellCoordinates): number[] {
    return getMissingNumbers(this._getCell({ row, col }));
  }
  /**
   * Get the possibilites in each cell of the target row
   * @param row the row index
   * @returns
   */
  private _getRowPossibilitiesInEachCell(row: number): number[] {
    // first row is randomly generated, no need to computed its cell possible solutions
    if (row === 0) throw new Error("Row cannot be 0");
    const rowCellsSolution: number[] = [];
    for (let col = 0; col < 9; col++) {
      const cellPossibleSolution = this._getAllowedInCell({ row, col });
      rowCellsSolution.push(parseInt(cellPossibleSolution.join(""), 10));
    }
    // each number represent the possible numbers that can go in that cell
    return rowCellsSolution;
  }

  private _generateValidRow(rowCellsPossibleSolutions: number[]): number[] {
    const immutablePossibilities = [...rowCellsPossibleSolutions];
    let possibilities: number[] = [...rowCellsPossibleSolutions];
    const generatedValidRow: { [cachedIndex: string]: number } = {};

    for (let i = 0; i < immutablePossibilities.length; i++) {
      const ignoreIndexList = convertObjectKeysToNumbers(
        Object.keys(generatedValidRow)
      );
      /** this will be the index of the target cell for which a valid number is to be generated */
      const minNumberIndex = getArrayMinNumberIndex(
        possibilities,
        ignoreIndexList
      );
      // transform it to a string so that it can be manipulated
      const minNumber = possibilities[minNumberIndex];
      // const minNumberStr = minNumber.toString();

      let validCellNumber: number;
      // first three cells are chosen randomly
      // this gives the the function the ability to alter the generated numbers in case of a rollback
      if (i <= 2) {
        validCellNumber = pickFromNumber(minNumber);
      } else {
        validCellNumber = getLeastOccurredNumberCount(
          minNumber,
          possibilities,
          ignoreIndexList
        );
      }
      generatedValidRow[minNumberIndex] = validCellNumber;
      // before removing the number from the possibilities
      // add the successfully generated number index to the ignore list index so that
      // it gets ignored by the removeNumberOccurrence function
      ignoreIndexList.push(minNumberIndex);

      // remove the generated number from all the cells, to prevent it from getting picked up again
      possibilities = removeNumberOccurrence(
        possibilities,
        validCellNumber,
        ignoreIndexList
      );
    }

    return Object.values(generatedValidRow);
  }

  /**
   * Generates a valid sudoku grid
   */
  public generate(): number[][] {
    this._resetGrid();
    console.clear();

    for (let row = 0; row < 9; row++) {
      if (row === 0) {
        // create the first row which is a randomly shuffled array of number
        // this will serve as the base of the next generations
        const randomlyGeneratedRow = this._generateRandomRow();
        this._grid[row] = randomlyGeneratedRow;
      } else {
        this._grid[row] = [];

        const rowPossibleInEachCell = this._getRowPossibilitiesInEachCell(row);
        const rowPossibilitiesContainNan = hasNaN(rowPossibleInEachCell);
        // if the row possibilities contain a nan this means that the grid cannot produce a valid row based on the possibilities
        // therefore we need to rollback to the previous row and regenerate a new one
        if (rowPossibilitiesContainNan) {
          // the row at index 1 can never have a NaN therefore, we can safely assume that the rolled back row
          // is never the first one (index 0, which needs a randomly generated row rather than based on possibilities)
          // Reset the previous row

          // remove both the current empty and the previously generated row (so that it gets regenerated again)
          // before rolling back
          this._grid.splice(row - 1, 2);
          // rollback 2 row back so that when the continue state runs, the previous row will be regenerated
          row -= 2;
          // once we rollback, reiterate
          continue;
        }

        const generatedRow = this._generateValidRow(rowPossibleInEachCell);

        // if the generated row contains a zero, roll back to generate new number for the previous row
        // given therefore new possibilities
        if (rowContainsZero(generatedRow)) {
          // this rolls back similarly to when the possibilities contain NaN (read above for more)
          this._grid.splice(row, 1);
          row -= 1;
          continue;
        }

        this._grid[row] = generatedRow;
      }
    }

    // temp
    return this._grid;
  }
}
