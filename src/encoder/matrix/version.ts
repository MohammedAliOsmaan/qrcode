import type { Matrix } from "../types/types.ts";

/**
 * Computes the 18-bit version information value for QR codes version 7 and above.
 * Uses a 32-bit sentinel container to protect leading zero boundaries.
 *
 * @param version The QR code version (7 to 40).
 * @returns A Uint32Array containing the 18-bit version info prefixed by a sentinel flag.
 */

function version(version: number): Uint32Array {
  if (version < 7 || version > 40) {
    throw new Error("Version only valid for versions 7..40");
  }

  const info = new Uint32Array(1);

  // Lock the sentinel bit at position 18 (0x40000) to frame our 18-bit block
  info[0] |= 0x40000;

  // Shift version data into bits 17..12
  info[0] |= version << 12;

  const G = 0x1f25; // x^12 + x^11 + x^10 + x^9 + x^8 + x^5 + x^2 + 1

  let rem = info[0];
  // Clean, deterministic binary polynomial long division
  for (let i = 5; i >= 0; i--) {
    if (((rem >> (12 + i)) & 1) === 1) {
      rem ^= G << i;
    }
  }

  // Combine pristine version data bits with the 12-bit remainder, keeping the sentinel intact
  info[0] = (info[0] & 0x7F000) | (rem & 0x0FFF);
  return info;
}

/**
 * Applies version information bits into the QR code matrix for versions >= 7.
 *
 * @param matrix The target QR code matrix buffer.
 * @param size The dimension of the matrix.
 */

function apply(matrix: Matrix, size: number): void {
  const v = (size - 17) / 4;
  if (v < 7) return;

  // Retrieve our fixed-width 18-bit version information string
  const bits = version(v)[0];

  // 1. Top-Right Block (6 rows x 3 columns)
  // Runs row-by-row: row 0 (cols: size-11, size-10, size-9), then row 1...
  let offset = 0;
  for (let r = 0; r < 6; r++) {
    for (let c = size - 11; c <= (size - 9); c++) {
      const bit = (bits >> offset) & 1;
      matrix[r * size + c] = bit;
      offset++;
    }
  }

  // 2. Bottom-Left Block (3 rows x 6 columns)
  // Runs column-by-column to mirror the top-right block sequence:
  // col 0 (rows: size-11, size-10, size-9), then col 1...
  offset = 0;
  for (let c = 0; c < 6; c++) {
    for (let r = size - 11; r <= (size - 9); r++) {
      const bit = (bits >> offset) & 1;
      matrix[r * size + c] = bit;
      offset++;
    }
  }
}

export { apply, version };
