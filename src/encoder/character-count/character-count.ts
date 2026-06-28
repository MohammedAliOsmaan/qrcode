import type { Modes } from "../core/constants.ts";
import type { Packs } from "../types/types.ts";

// A static map for O(1) size lookups
// Structure: [Numeric, Alphanumeric, Byte, Kanji]
const SIZES: number[][] = [
  [10, 9, 8, 8], // Versions 1-9
  [12, 11, 16, 10], // Versions 10-26
  [14, 13, 16, 12], // Versions 27-40
];

/**
 * Computes the character count indicator for the QR code version and mode.
 *
 * @param version The QR code version.
 * @param mode The encoding mode.
 * @param length The input length.
 * @returns A tuple of [character count, bit length].
 */

function characterCount(version: number, mode: Modes, length: number): Packs {
  // Determine the version range index
  const range = version > 0
    ? version < 10 ? 0 : version < 27 ? 1 : version < 41 ? 2 : undefined
    : undefined;
  const m = mode == 1
    ? 0
    : mode == 2
    ? 1
    : mode == 4
    ? 2
    : mode == 8
    ? 3
    : undefined;

  if (range == undefined) {
    throw new Error(
      "Invalid version number. Version must be between 1 and 40.",
    );
  }

  if (m == undefined) {
    throw new Error("Unsupported mode");
  }

  const size = SIZES[range][m];

  const pack = new Uint16Array(2);
  pack[0] = length;
  pack[1] = size;

  return pack;
}

export { characterCount };
