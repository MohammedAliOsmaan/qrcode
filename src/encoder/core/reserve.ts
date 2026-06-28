import { alignments } from "./constants.ts";

/**
 * This function checks if a given module position (row and column) in the QR code is reserved for specific patterns or information. It considers the positions of finder patterns, timing patterns, alignment patterns, dark module, and format information areas based on the QR code version and size. The function returns true if the position is reserved for any of these elements, ensuring that data is not placed in these reserved areas during the encoding process.
 */

function reserve(r: number, c: number, size: number): boolean {
  let isReserved = false;

  // finder
  if (r < 9 && c < 9) isReserved = true;
  if (r < 9 && c >= size - 8) isReserved = true;
  if (r >= size - 8 && c < 9) isReserved = true;

  // timing
  if (r === 6 || c === 6) isReserved = true;

  const version = (size - 17) / 4;
  const centers = alignments[version];

  if (centers?.length) {
    for (const rCenter of centers) {
      for (const cCenter of centers) {
        const overlapsFinder = (rCenter < 10 && cCenter < 10) ||
          (rCenter < 10 && cCenter > size - 11) ||
          (rCenter > size - 11 && cCenter < 10);

        if (overlapsFinder) continue;

        if (
          Math.abs(r - rCenter) <= 2 &&
          Math.abs(c - cCenter) <= 2
        ) {
          isReserved = true;
        }
      }
    }
  }

  // dark module
  if (r === 4 * version + 9 && c === 8) isReserved = true;

  // format info
  if (r === 8 && c <= 8 && c !== 6) isReserved = true;
  if (c === 8 && r <= 8 && r !== 6) isReserved = true;
  if (r === 8 && c >= size - 8) isReserved = true;
  if (c === 8 && r >= size - 8) isReserved = true;

  if (version >= 7) {
    if (r >= size - 11 && r <= size - 9 && c <= 5) isReserved = true;
    if (c >= size - 11 && c <= size - 9 && r <= 5) isReserved = true;
  }

  return isReserved;
}

export { reserve };
