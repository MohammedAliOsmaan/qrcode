import { reserve } from "../core/reserve.ts";
import { remainderBits } from "../core/constants.ts";
import type { Matrix } from "../types/types.ts";

function placement(matrix: Matrix, message: Uint8Array, size: number): void {
  const version: number = (size - 17) / 4;
  const numRemainderBits = remainderBits[version] || 0; // Get remainder bits count for this version

  let offset = 0;
  // CRITICAL FIX: The total bit budget includes the encoded stream PLUS remainder bits
  const totalDataBits = message.length * 8;
  const totalExpectedBits = totalDataBits + numRemainderBits;

  let upward = true;

  // CRITICAL FIX: Change loop boundary to col >= 0 to ensure the leftmost columns are processed
  for (let col = size - 1; col >= 0; col -= 2) {
    if (col === 6) {
      col--;
    }

    const rows = [upward ? size - 1 : 0, upward ? -1 : size];
    const step = upward ? -1 : 1;

    for (let row = rows[0]; row !== rows[1]; row += step) {
      for (let cOffset = 0; cOffset < 2; cOffset++) {
        const c = col - cOffset;

        const i = row * size + c;

        // 1. Static structural protection checks
        if (row <= 8 && c <= 8) continue;
        if (row <= 8 && c >= size - 8) continue;
        if (c === 8 && row >= size - 8) continue;
        if (row === 6 || c === 6) continue;

        if (size >= 45) {
          if (row >= size - 11 && row <= size - 9 && c <= 5) continue;
          if (c >= size - 11 && c <= size - 9 && row <= 5) continue;
        }

        if (reserve(row, c, size)) {
          continue;
        }

        // 2. Drop the bits into the matrix slots
        if (offset < totalDataBits) {
          // Standard message data bit extraction
          const byteIdx = offset >> 3;
          const bitOffset = 7 - (offset & 7);
          matrix[i] = (message[byteIdx] >> bitOffset) & 1;
          offset++;
        } else if (offset < totalExpectedBits) {
          // CRITICAL FIX: Explicitly append the standard 0 remainder bits
          matrix[i] = 0;
          offset++;
        } else {
          // Safety padding if empty data modules remain due to matrix geometric anomalies
          matrix[i] = 0;
        }
      }
    }
    upward = !upward;
  }
}

export { placement };
