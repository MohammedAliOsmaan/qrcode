import { alignments } from "../core/constants.ts";
import type { Matrix } from "../types/types.ts";

const FINDER_PATTERN: number[][] = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

/**
 * Draws the finder patterns in the three corners of a QR code matrix.
 *
 * @param matrix The target QR code matrix buffer.
 * @param size The dimension of the matrix.
 */

function finder(matrix: Matrix, size: number): void {
  const anchors: [number, number][] = [
    [0, 0], // Top-left
    [0, size - 7], // Top-right
    [size - 7, 0], // Bottom-left
  ];

  for (const [row, column] of anchors) { // O(n^3)
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        // The math: (Row * Stride) + Column
        const index = (row + r) * size + (column + c);
        matrix[index] = FINDER_PATTERN[r][c];
      }
    }
  }
}

/**
 * Draws the separator area around each finder pattern.
 *
 * @param matrix The target QR code matrix buffer.
 * @param size The dimension of the matrix.
 */

function separator(matrix: Matrix, size: number) {
  const anchors: number[][] = [[0, 0], [0, size - 8], [size - 8, 0]];

  for (const [row, column] of anchors) {
    if (row === 0 && column === 0) {
      // top left column
      for (let r = 0; r < 7; r++) {
        matrix[r * size + 7] = 0;
      }
      // top left row
      for (let c = 0; c < 8; c++) {
        matrix[7 * size + c] = 0;
      }
    } else if (row == 0 && column == size - 8) {
      // top right column
      for (let r = 0; r < 7; r++) {
        matrix[r * size + (size - 8)] = 0;
      }
      // top right row
      for (let c = 0; c < 8; c++) {
        matrix[7 * size + (size - 8 + c)] = 0;
      }
    } else if (row == size - 8 && column == 0) {
      // bottom left column
      for (let r = 0; r < 8; r++) {
        matrix[(size - 8 + r) * size + 7] = 0;
      }
      // bottom left row
      for (let c = 0; c < 8; c++) {
        matrix[(size - 8) * size + c] = 0;
      }
    }
  }
}

/**
 * Draws the horizontal and vertical timing patterns in the matrix.
 *
 * @param matrix The target QR code matrix buffer.
 * @param size The dimension of the matrix.
 */

function timing(matrix: Matrix, size: number) {
  // The timing pattern always runs between the finder patterns at Row 6 and Column 6
  const limit = size - 8;

  // 1. Horizontal Timing Pattern (Row 6)
  // Runs from column 8 to (size - 8)
  for (let c = 8; c < limit; c++) {
    const index = 6 * size + c;
    // QR spec: modules at even coordinates are black (1), odd are white (0)
    matrix[index] = (c % 2 === 0) ? 1 : 0;
  }

  // 2. Vertical Timing Pattern (Column 6)
  // Runs from row 8 to (size - 8)
  for (let r = 8; r < limit; r++) {
    const index = r * size + 6;
    // Same logic: even row index is black (1), odd is white (0)
    matrix[index] = (r % 2 === 0) ? 1 : 0;
  }
}

const ALIGNMENT_PATTERN = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
];

/**
 * Draws alignment patterns in the matrix for versions that require them.
 *
 * @param matrix The target QR code matrix buffer.
 * @param size The dimension of the matrix.
 */

function alignment(matrix: Matrix, size: number) {
  const version: number = (size - 17) / 4;
  const centers = alignments[version];
  const coordinates = []; // coordinates that doesn't overlap with finder pattern

  if (!centers || centers.length === 0) return; // version 1

  for (let r = 0; r < centers.length; r++) {
    for (let c = 0; c < centers.length; c++) {
      if (
        (centers[r] < 10 && centers[c] < 10) ||
        (centers[r] < 10 && centers[c] > size - 11) ||
        (centers[r] > size - 11 && centers[c] < 10)
      ) continue;

      coordinates.push([centers[r], centers[c]]);
    }
  }

  for (const [row, column] of coordinates) {
    const anchor = [row - 2, column - 2];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        matrix[(anchor[0] + r) * size + anchor[1] + c] =
          ALIGNMENT_PATTERN[r][c];
      }
    }
  }
}

/**
 * Draws the fixed dark module in the QR code matrix.
 *
 * @param matrix The target QR code matrix buffer.
 * @param size The dimension of the matrix.
 */

function module(matrix: Matrix, size: number) {
  matrix[(size - 8) * size + 8] = 1; // Same as (4 * version + 9) — dark module at (size-8,8)
}

export { alignment, finder, module, separator, timing };
