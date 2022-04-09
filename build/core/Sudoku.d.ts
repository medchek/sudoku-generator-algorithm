export declare class Sudoku {
    private _grid;
    get grid(): number[][];
    /**
     * Helper Method to shuffle an array
     */
    private _shuffleArray;
    private _resetGrid;
    /**
     * Helper method to generate a randomly sorted array containing numbers from 1 to 9
     */
    private _generateRandomRow;
    /**
     * Retrieves a row from the grid
     */
    private _getRow;
    /**
     * Retrieves a column from the grid
     */
    private _getCol;
    /**
     * Retrieves all the values in the target square
     */
    private _getSquare;
    /**
     * Retrieves all the values that are present/forbidden in the target cell
     */
    private _getCell;
    private _getAllowedInCell;
    /**
     * Get the possibilites in each cell of the target row
     * @param row the row index
     * @returns
     */
    private _getRowPossibilitiesInEachCell;
    /**
     * Geneartes a row of number according the rules taking into account the possiblities that go in each cell of the row.
     *
     * If the method reaches an impass i.e. When it cannot generate unique numbers anymore, it returns -1 rather than an array of numbers.
     * @param rowCellsPossibleSolutions a 2d array containing all the possiblities in each cell
     * @returns an array of number or -1 in case of an inability to generate a valid row
     */
    private _generateValidRow;
    /**
     * Generates a valid sudoku grid
     */
    generate(): number[][];
}
