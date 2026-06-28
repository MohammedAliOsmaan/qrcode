import type { Matrix } from "../types/types.ts";

/**
 * Calculates the total penalty score for a masked QR code matrix.
 *
 * @param matrix The masked QR code matrix.
 * @param size The dimension of the matrix.
 * @returns The combined penalty score.
 */

function penalty(matrix: Matrix, size: number): number {
  return (
    N1(matrix, size) +
    N2(matrix, size) +
    N3(matrix, size) +
    N4(matrix, size)
  );
}

/**
 * Calculates the N1 penalty for consecutive modules of the same color.
 *
 * @param matrix The QR code matrix.
 * @param size The dimension of the matrix.
 * @returns The N1 penalty score.
 */

function N1(matrix: Matrix, size: number): number {
  let score: number = 0;

  // consecutive colors
  for (let r = 0; r < size; r++) {
    let color = matrix[r * size + 0];
    let streak = 1;

    for (let c = 1; c < size; c++) {
      const i = r * size + c;

      if (matrix[i] === color && matrix[i] != 255) {
        streak++;
      } else {
        if (streak >= 5) {
          score += 3 + (streak - 5);
        }
        color = matrix[i];
        streak = 1;
      }
    }

    if (streak >= 5) {
      score += 3 + (streak - 5);
    }
  }

  for (let c = 0; c < size; c++) {
    let color = matrix[0 * size + c];
    let streak = 1;

    for (let r = 1; r < size; r++) {
      const i = r * size + c;

      if (matrix[i] === color && matrix[i] != 255) {
        streak++;
      } else {
        if (streak >= 5) {
          score += 3 + (streak - 5);
        }
        color = matrix[i];
        streak = 1;
      }
    }

    // End-of-row check
    if (streak >= 5) {
      score += 3 + (streak - 5);
    }
  }

  return score;
}

/**
 * Calculates the N2 penalty for 2x2 blocks of identical modules.
 *
 * @param matrix The QR code matrix.
 * @param size The dimension of the matrix.
 * @returns The N2 penalty score.
 */

function N2(matrix: Matrix, size: number): number {
  let score = 0;

  // 2x2 Block

  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const i = r * size + c;

      if (
        matrix[i] === matrix[i + 1] &&
        matrix[i] === matrix[i + size] &&
        matrix[i] === matrix[i + size + 1]
      ) score += 3;
    }
  }

  return score;
}

// Finder-like Patterns
// const PATTERNS = [
//     [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
//     [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
// ] as const;

// 11-bit streaming constants
const P1 = 0b00001011101; // 0x05D
const P2 = 0b10111010000; // 0x5D0

/**
 * Calculates the N3 penalty for finder-like patterns in the matrix.
 *
 * @param matrix The QR code matrix.
 * @param size The dimension of the matrix.
 * @returns The N3 penalty score.
 */

function N3(matrix: Matrix, size: number): number {
  let score = 0;

  // --- Horizontal ---
  for (let r = 0; r < size; r++) {
    let bits = 0;
    let window = 0; // Track consecutive valid data modules
    const row = r * size;

    for (let c = 0; c < size; c++) {
      const raw = matrix[row + c];

      if (raw === 255) {
        bits = 0; // Wipe history
        window = 0; // Reset lookback window
        continue;
      }

      const cell = raw === 1 ? 1 : 0;
      bits = ((bits << 1) | cell) & 0x7FF;
      window++;

      // Only check if we have an uninterrupted 11-module data run
      if (window >= 11 && (bits === P1 || bits === P2)) {
        score += 40;
      }
    }
  }

  // --- Vertical ---
  for (let c = 0; c < size; c++) {
    let bits = 0;
    let window = 0; // Track consecutive valid data modules

    for (let r = 0; r < size; r++) {
      const raw = matrix[r * size + c];

      if (raw === 255) {
        bits = 0; // Wipe history
        window = 0; // Reset lookback window
        continue;
      }

      const cell = raw === 1 ? 1 : 0;
      bits = ((bits << 1) | cell) & 0x7FF;
      window++;

      // Only check if we have an uninterrupted 11-module data run
      if (window >= 11 && (bits === P1 || bits === P2)) {
        score += 40;
      }
    }
  }

  return score;
}

/**
 * Calculates the N4 penalty based on the dark module ratio in the matrix.
 *
 * @param matrix The QR code matrix.
 * @param size The dimension of the matrix.
 * @returns The N4 penalty score.
 */

function N4(matrix: Matrix, size: number): number {
  let dark = 0;
  const total = size * size;

  // Dark Module Ratio

  for (let i = 0; i < total; i++) {
    if (matrix[i] === 1) dark++;
  }

  const percentage = (dark * 100) / total;
  const deviation = Math.abs(percentage - 50);
  const steps = Math.floor(deviation / 5);

  return steps * 10;
}

export { penalty };
