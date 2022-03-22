/**
 * checks if array a contains all the numbers from 1 to 9
 * @param array the array to be checked
 * @returns true if the array contains all the numbers from 1 to 9
 */
const validateArray = (array: number[]): boolean => {
  const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (array.length !== expected.length) return false;
  const sortedArray = [...array].sort();
  for (let i = 0; i < expected.length; i++) {
    const aNumber = expected[i];
    const bNumber = sortedArray[i];
    if (aNumber !== bNumber) return false;
  }
  return true;
};

/**
 * Returns all the grid columns
 * @param grid the grid 2d array
 * @returns a 2d array containing the grid columns
 */
const getGridCols = (grid: number[][]): number[][] => {
  const cols: number[][] = [];
  const row: number[] = grid[0];

  for (let colIndex = 0; colIndex < row.length; colIndex++) {
    // initialize the column
    cols[colIndex] = [];
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
      const cell = grid[rowIndex][colIndex];
      cols[colIndex][rowIndex] = cell;
    }
  }
  return cols;
};

/**
 * Returns all the grid squares
 * @param grid the grid 2d array
 * @returns a 2d array containing the grid squares
 */
const getGridSquares = (grid: number[][]): number[][] => {
  const squares: number[][] = [];

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const cell = row[colIndex];
      if (rowIndex >= 0 && rowIndex <= 2) {
        if (colIndex >= 0 && colIndex <= 2) {
          const squareNumber = 1;
          const squareIndex = squareNumber - 1;
          if (!squares[squareIndex]) squares[squareIndex] = [];
          squares[squareIndex].push(cell);
        }

        if (colIndex >= 3 && colIndex <= 5) {
          const squareNumber = 2;
          const squareIndex = squareNumber - 1;
          if (!squares[squareIndex]) squares[squareIndex] = [];
          squares[squareIndex].push(cell);
        }
        if (colIndex >= 6 && colIndex <= 8) {
          const squareNumber = 3;
          const squareIndex = squareNumber - 1;
          if (!squares[squareIndex]) squares[squareIndex] = [];
          squares[squareIndex].push(cell);
        }
      }
      if (rowIndex >= 3 && rowIndex <= 5) {
        if (colIndex >= 0 && colIndex <= 2) {
          const squareNumber = 4;
          const squareIndex = squareNumber - 1;
          if (!squares[squareIndex]) squares[squareIndex] = [];
          squares[squareIndex].push(cell);
        }

        if (colIndex >= 3 && colIndex <= 5) {
          const squareNumber = 5;
          const squareIndex = squareNumber - 1;
          if (!squares[squareIndex]) squares[squareIndex] = [];
          squares[squareIndex].push(cell);
        }
        if (colIndex >= 6 && colIndex <= 8) {
          const squareNumber = 6;
          const squareIndex = squareNumber - 1;
          if (!squares[squareIndex]) squares[squareIndex] = [];
          squares[squareIndex].push(cell);
        }
      }
      if (rowIndex >= 6 && rowIndex <= 8) {
        if (colIndex >= 0 && colIndex <= 2) {
          const squareNumber = 7;
          const squareIndex = squareNumber - 1;
          if (!squares[squareIndex]) squares[squareIndex] = [];
          squares[squareIndex].push(cell);
        }

        if (colIndex >= 3 && colIndex <= 5) {
          const squareNumber = 8;
          const squareIndex = squareNumber - 1;
          if (!squares[squareIndex]) squares[squareIndex] = [];
          squares[squareIndex].push(cell);
        }
        if (colIndex >= 6 && colIndex <= 8) {
          const squareNumber = 9;
          const squareIndex = squareNumber - 1;
          if (!squares[squareIndex]) squares[squareIndex] = [];
          squares[squareIndex].push(cell);
        }
      }
    }
  }

  return squares;
};

/**
 * Validates a sudoku grid based on the sudoku rules
 * @param grid the grid to validate
 * @returns true if the grid is valid, false otherwise
 */
export const validateSudokuGrid = (grid: number[][]): boolean => {
  if (grid.length !== 9) return false;
  // checking the rows first
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const row = grid[rowIndex];
    const isValidRow = validateArray(row);
    if (!isValidRow) return false;
  }
  // checking the cols
  const columns = getGridCols(grid);
  for (let colIndex = 0; colIndex < columns.length; colIndex++) {
    const col = columns[colIndex];
    const isValidCol = validateArray(col);
    if (!isValidCol) return false;
  }
  // checking the squares
  const squares = getGridSquares(grid);
  for (let sqrIndex = 0; sqrIndex < squares.length; sqrIndex++) {
    const sqr = squares[sqrIndex];
    const isValidSquare = validateArray(sqr);
    if (!isValidSquare) return false;
  }

  return true;
};
