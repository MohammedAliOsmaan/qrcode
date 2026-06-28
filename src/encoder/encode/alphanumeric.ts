import { alpha as alphanumeric } from "../core/constants.ts";
import type { Packs } from "../types/types.ts";

/**
 * Encodes a string in alphanumeric mode for QR codes.
 * The alphanumeric encoding uses a specific mapping of characters to values.
 * Each pair of characters is encoded into an 11-bit binary string.
 */

// Changed return type from Pack[] to Uint16Array
function alpha(input: string | number): Packs {
  const str = `${input}`;
  const length = str.length;

  // 1. Calculate the exact number of tokens using your remainder intuition
  let tokens = Math.floor(length / 2);
  if (length % 2 !== 0) {
    tokens++;
  }

  // 2. Allocate the exact flat memory footprint (2 slots per token: Value & Bits)
  const packs = new Uint16Array(tokens * 2);
  let offset = 0;

  // 3. Single-pass parsing loop jumping by pairs (+= 2)
  for (let i = 0; i < length; i += 2) {
    // 1. First character is guaranteed to exist
    const codepoint1 = str.charCodeAt(i);
    const v1 = alphanumeric[codepoint1]; // Look up directly using the index number!

    if (v1 === 255) {
      throw new Error(`Invalid alphanumeric character at index ${i}`);
    }

    // 2. Check if the second character exists before calculating its charCode
    if (i + 1 < length) {
      const codepoint2 = str.charCodeAt(i + 1);
      const v2 = alphanumeric[codepoint2];

      if (v2 === 255) {
        throw new Error(`Invalid alphanumeric character at index ${i + 1}`);
      }

      // Pack the 11-bit pair
      packs[offset++] = v1 * 45 + v2;
      packs[offset++] = 11;
    } else {
      // Trailing single character packs into 6 bits
      packs[offset++] = v1;
      packs[offset++] = 6;
    }
  }

  return packs;
}

export { alpha };
