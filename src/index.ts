// import { doesGridContainZero } from "./utils/utils";

import { Sudoku } from "./core/Sudoku";
import { validateSudokuGrid } from "./utils/validator";

console.clear();
const sudoku = new Sudoku({ debug: false });
console.log("Starting...");

const perfStart = performance.now();
sudoku.generate();

// for (let i = 0; i < 1000; i++) {
//   sudoku.generate();
// }

const perfEnd = performance.now();
const totalTime = (perfEnd - perfStart).toFixed(5);
console.log(`Time taken: ${totalTime}ms`);
console.table(sudoku.grid);
console.log("IS A VALID SUDOKU GRID? => ", validateSudokuGrid(sudoku.grid));
console.log(sudoku.grid);
