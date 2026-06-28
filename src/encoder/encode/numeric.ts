import type { Packs } from "../types/types.ts";

/**
 * This module encodes numeric input into binary strings.
 * It takes a string or number input, validates it, and returns an array of binary strings
 */

function numeric(input: string | number): Packs {
  const str = `${input}`;

  if (!/^[0-9]+$/.test(str)) {
    throw new Error("Input must be a number or numeric string");
  }

  const length = str.length;

  // 1. Always get the number of full 3-digit triplets
  let tokens = Math.floor(length / 3);

  // 2. If there are leftover digits (either 1 or 2), they form exactly 1 extra token
  if (length % 3 !== 0) {
    tokens++;
  }

  const packs = new Uint16Array(tokens * 2);
  let offset = 0;

  for (let i = 0; i < length; i += 3) {
    // Slice the string on the fly without making full intermediate arrays
    const group = str.slice(i, i + 3);
    const value = parseInt(group, 10);

    // Fast bit-size evaluation based on remaining string chunk
    const size = group.length === 3 ? 10 : group.length === 2 ? 7 : 4;

    // Pack sequentially: [Value, Bits, Value, Bits...]
    packs[offset++] = value;
    packs[offset++] = size;
  }

  return packs;
}

export { numeric };
