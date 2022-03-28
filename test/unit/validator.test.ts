import { validateSudokuGrid } from "../../src/utils/validator";

describe("validateSudokuGrid()", () => {
  it("should return true if the gird is a valid sudoku grid", () => {
    const validSudokuGrid = [
      [3, 1, 9, 4, 7, 6, 5, 8, 2],
      [8, 4, 6, 5, 9, 2, 3, 1, 7],
      [2, 5, 7, 3, 8, 1, 9, 6, 4],
      [5, 8, 1, 7, 6, 4, 2, 9, 3],
      [4, 6, 2, 9, 1, 3, 7, 5, 8],
      [7, 9, 3, 8, 2, 5, 1, 4, 6],
      [9, 3, 8, 1, 4, 7, 6, 2, 5],
      [1, 2, 5, 6, 3, 8, 4, 7, 9],
      [6, 7, 4, 2, 5, 9, 8, 3, 1],
    ];

    const result = validateSudokuGrid(validSudokuGrid);

    expect(result).toBe(true);
  });
  it("should return false if the gird is not a valid sudoku grid", () => {
    const invalidSudokuGrid = [
      // swapped 1 and 3 position in the first row to make it invalid
      [1, 3, 9, 4, 7, 6, 5, 8, 2],
      [8, 4, 6, 5, 9, 2, 3, 1, 7],
      [2, 5, 7, 3, 8, 1, 9, 6, 4],
      [5, 8, 1, 7, 6, 4, 2, 9, 3],
      [4, 6, 2, 9, 1, 3, 7, 5, 8],
      [7, 9, 3, 8, 2, 5, 1, 4, 6],
      [9, 3, 8, 1, 4, 7, 6, 2, 5],
      [1, 2, 5, 6, 3, 8, 4, 7, 9],
      [6, 7, 4, 2, 5, 9, 8, 3, 1],
    ];

    const result = validateSudokuGrid(invalidSudokuGrid);

    expect(result).toBe(false);
  });
});
