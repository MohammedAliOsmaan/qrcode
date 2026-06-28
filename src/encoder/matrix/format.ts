import { ErrorCorrectionBits } from "../core/constants.ts";
import type { Matrix } from "../types/types.ts";

/**
 * Generates the 15-bit format information sequence.
 */

function format(ec: number, maskId: number): Uint16Array {
  const info = new Uint16Array(1);

  // 1. Lock the 16th bit (Bit 15) to 1 for structural tracking
  info[0] |= 0x8000;

  const ecl = ErrorCorrectionBits.get(ec) as number;
  const bits = (ecl << 3) | maskId; // Pure 5-bit block (e.g., 5 -> 00101)

  // 2. Perform BCH Long Division cleanly in a local variable
  // The 5 data bits are padded with 10 trailing zeros to make room for the remainder
  let rem = bits << 10;

  for (let i = 4; i >= 0; i--) {
    // Check if the current bit position (starting at Bit 14 down to 10) is a 1
    if ((rem & (1 << (10 + i))) !== 0) {
      // XOR with the generator polynomial 0x537 shifted to align with the active bit
      rem ^= 0x537 << i;
    }
  }

  // 3. Assemble the raw 15-bit sequence: Data Bits (14-10) + Remainder Bits (9-0)
  const raw = (bits << 10) | (rem & 0x03FF);

  // 4. Apply the standard ISO XOR safety mask (0x5412)
  // We bitwise-OR with your 0x8000 sentinel to guarantee it stays locked high
  info[0] = 0x8000 | (raw ^ 0x5412);

  return info;
}

/**
 * Applies format information to a given matrix.
 */

function apply(matrix: Matrix, formatBits: Uint16Array, size: number): void {
  // 1. Top-Left Strip: Consecutive coordinates mapping from bit 14 down to bit 0
  // Index 0 -> bit 14, Index 1 -> bit 13, ..., Index 14 -> bit 0
  const topLeftCoords = [
    // Horizontal run along row 8 (Skips column 6)
    [8, 0],
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
    [8, 5],
    [8, 7],
    [8, 8],

    // Vertical run up column 8 (Skips row 6, reaches row 0!)
    [7, 8],
    /* row 6 skipped */ [5, 8],
    [4, 8],
    [3, 8],
    [2, 8],
    [1, 8],
    [0, 8],
  ];

  const bits = formatBits[0];

  for (let i = 0; i < 15; i++) {
    const bit = (bits >> (14 - i)) & 1;
    const [r, c] = topLeftCoords[i];
    matrix[r * size + c] = bit;
  }

  // 2. Split Strip (Bottom-Left Vertical & Top-Right Horizontal)

  // Bottom-Left Vertical: Maps bit 14 (bottom-most) down to bit 8 (top-most)
  // Row goes from (size - 1) up to (size - 7). Column is fixed at 8.
  for (let i = 0; i < 7; i++) {
    const bit = (bits >> (14 - i)) & 1; // Extracts bits 14, 13, 12, 11, 10, 9, 8
    const r = size - 1 - i;
    matrix[r * size + 8] = bit;
  }

  // Top-Right Horizontal: Maps bit 7 (left-most) down to bit 0 (right-most)
  // Column goes from (size - 8) up to (size - 1). Row is fixed at 8.
  for (let i = 0; i < 8; i++) {
    const bit = (bits >> (7 - i)) & 1; // Extracts bits 7, 6, 5, 4, 3, 2, 1, 0
    const c = size - 8 + i;
    matrix[8 * size + c] = bit;
  }
}

export { apply, format };
