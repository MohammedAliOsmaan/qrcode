import { penalty } from "./penalty.ts";
import * as pattern from "../matrix/pattern.ts";
import type { Matrix } from "../types/types.ts";

/**
 * Selects the optimal mask pattern for a QR code matrix using explicit inline math evaluations.
 * Leverages the 255-state canvas to completely bypass geometric lookup boundaries.
 *
 * @param matrix The current QR code matrix containing placed data and 255 reserved slots.
 * @param size The dimension of the matrix.
 * @returns The selected mask pattern identifier (0-7).
 */

function mask(matrix: Matrix, size: number): number {
  let score = Infinity;
  let maskId = 0;

  const battlefield = new Uint8Array(matrix.length);

  // Test all 8 masks (0-7)
  for (let i = 0; i < 8; i++) {
    battlefield.set(matrix);

    // Blistering fast raw pointer looping
    for (let r = 0; r < size; r++) {
      const row = r * size;
      for (let c = 0; c < size; c++) {
        const index = row + c;

        // THE ULTIMATE SHIELD: 255 means format, version, finders, alignments, timing, or dark module.
        // Skip them instantly without a single calculation!
        if (matrix[index] === 255) continue;

        let invert = false;

        // Inline math matching rules bypass functional closure pipelines
        switch (i) {
          case 0:
            invert = ((r + c) & 1) === 0;
            break;
          case 1:
            invert = (r & 1) === 0;
            break;
          case 2:
            invert = c % 3 === 0;
            break;
          case 3:
            invert = (r + c) % 3 === 0;
            break;
          case 4:
            invert = (((r >> 1) + ((c / 3) | 0)) & 1) === 0;
            break;
          case 5:
            invert = ((r * c) % 2) + ((r * c) % 3) === 0;
            break;
          case 6:
            invert = ((((r * c) % 2) + ((r * c) % 3)) & 1) === 0;
            break;
          case 7:
            invert = ((((r + c) & 1) + ((r * c) % 3)) & 1) === 0;
            break;
        }

        if (invert) {
          battlefield[index] ^= 1;
        }
      }
    }

    // STAMP THE VISUAL PICTURE: Before running the penalty checks, fill all remaining 255 holes
    // with their final structural modules so the evaluation sees a complete compliant grid!
    pattern.finder(battlefield, size);
    pattern.separator(battlefield, size);
    pattern.timing(battlefield, size);
    pattern.alignment(battlefield, size);
    pattern.module(battlefield, size);

    // Score the complete temporary grid image
    const p = penalty(battlefield, size);
    if (p < score) {
      score = p;
      maskId = i;
    }
  }

  return maskId;
}

/**
 * Applies a given mask pattern to the final target QR code matrix.
 *
 * @param matrix The target QR code matrix.
 * @param maskId The chosen mask pattern identifier.
 * @param size The dimension of the matrix.
 */

function apply(matrix: Matrix, maskId: number, size: number): void {
  for (let r = 0; r < size; r++) {
    const row = r * size;
    for (let c = 0; c < size; c++) {
      const index = row + c;

      // Simple 255 check preserves our data boundaries completely
      if (matrix[index] === 255) continue;

      let invert = false;
      switch (maskId) {
        case 0:
          invert = ((r + c) & 1) === 0;
          break;
        case 1:
          invert = (r & 1) === 0;
          break;
        case 2:
          invert = c % 3 === 0;
          break;
        case 3:
          invert = (r + c) % 3 === 0;
          break;
        case 4:
          invert = (((r >> 1) + ((c / 3) | 0)) & 1) === 0;
          break;
        case 5:
          invert = ((r * c) % 2) + ((r * c) % 3) === 0;
          break;
        case 6:
          invert = ((((r * c) % 2) + ((r * c) % 3)) & 1) === 0;
          break;
        case 7:
          invert = ((((r + c) & 1) + ((r * c) % 3)) & 1) === 0;
          break;
      }

      if (invert) {
        matrix[index] ^= 1;
      }
    }
  }
}

export { apply, mask };
