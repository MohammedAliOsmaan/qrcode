import { lookup } from "../core/kanji/lookup.ts";
import type { Packs } from "../types/types.ts";

/* See "resource/" folder for full shift-jis & jis x 0208 reference. */

/**
 * Encodes a string in kanji mode for QR codes.
 * The kanji encoding uses a specific mapping of characters to values.
 * Each character is encoded into a 13-bit binary string.
 */

function kanji(input: string | number): Packs {
  const str = `${input}`;
  const length = str.length;

  const packs = new Uint16Array(length * 2);
  let offset = 0;

  for (let i = 0; i < length; i++) {
    const codePoint = lookup(str[i]);

    // Safety Catch: Protect against unrecognized code points leaking into the stream
    if (codePoint === null || codePoint === undefined) {
      throw new Error(
        `Invalid Kanji character at index ${i}: Character not found in Shift-JIS table.`,
      );
    }

    let result: number = 0;

    // Condition 1: Range 1 (0x8140 to 0x9FFC)
    if (codePoint >= 0x8140 && codePoint <= 0x9FFC) {
      const adjusted = codePoint - 0x8140;

      const msb = (adjusted >> 8) & 0xFF; // Get the most significant byte
      const lsb = adjusted & 0xFF; // Get the least significant byte

      result = msb * 0xC0 + lsb;

      // Condition 2: Range 2 (0xE040 to 0xEAA4)
    } else if (codePoint >= 0xE040 && codePoint <= 0xEAA4) {
      const adjusted = codePoint - 0xC140;

      const msb = (adjusted >> 8) & 0xFF; // Get the most significant byte
      const lsb = adjusted & 0xFF; // Get the least significant byte

      result = msb * 0xC0 + lsb;
    }

    // Write directly to your unified 16-bit flat array
    packs[offset++] = result; // 13-bit compacted value (fits cleanly in 16-bit space)
    packs[offset++] = 13; // Kanji mode chunks are ALWAYS 13 bits
  }

  return packs;
}

export { kanji };
