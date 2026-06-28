import type { Packs } from "../types/types.ts";

/**
 * Converts a string into an array of its byte representations.
 * Each character in the string is converted to its binary representation
 * as an 8-bit byte.
 */

function byte(input: string | number): Packs {
  const str = `${input}`;
  const packs = new Uint16Array(str.length * 2);
  let offset = 0;

  for (let i = 0; i < str.length; i++) {
    // Get the numeric code (0-255)
    const value = str.charCodeAt(i);

    // Safety check: QR Byte mode is typically 8-bit (ISO-8859-1)
    if (value > 255) {
      throw new Error(
        `Character at index ${i} is out of 8-bit range. Use UTF-8 encoding or stick to Latin-1.`,
      );
    }

    packs[offset++] = value;
    packs[offset++] = 8;
  }

  return packs;
}

export { byte };
