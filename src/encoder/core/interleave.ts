import {} from "./codeword.ts";
import type { Blocks, Groups } from "../types/types.ts";

/**
 * Splits raw data bytes into blocks based on the QR version and error correction group structure.
 *
 * @param data The raw data bytes.
 * @param groups The block group definitions for the QR code version.
 * @returns An array of data blocks.
 */

function block(data: Uint8Array, groups: Groups): Blocks[] {
  if (groups.length == 1 && groups[0].blocks == 1) return [data];

  const blocks: Uint8Array[] = [];
  let offset = 0;

  for (const group of groups) {
    for (let i = 0; i < group.blocks; i++) {
      blocks.push(data.subarray(offset, offset + group.dataCodewords));
      offset += group.dataCodewords;
    }
  }

  return blocks;
}

/**
 * Interleaves data blocks into a single byte sequence.
 *
 * @param blocks The data blocks to interleave.
 * @param length The target length of the interleaved sequence.
 * @returns A Uint8Array containing the interleaved bytes.
 */

function interleave(blocks: Blocks[], length: number): Uint8Array {
  if (blocks.length == 1) return blocks[0];

  // total bytes
  let total = 0;
  for (let b = 0; b < blocks.length; b++) {
    total += blocks[b].length;
  }

  // 2. Allocate the single fixed container using the true byte size
  const result = new Uint8Array(total);
  let pointer = 0;

  // Find the length of the longest block to bound our iteration loop safely
  let max = 0; // max block length
  for (let b = 0; b < blocks.length; b++) {
    if (blocks[b].length > max) {
      max = blocks[b].length;
    }
  }

  // 2. Interleave row-by-row (i is the byte index inside each individual block)
  for (let i = 0; i < max; i++) {
    for (let b = 0; b < length; b++) {
      const current = blocks[b]; // current block

      if (current && i < current.length) {
        result[pointer++] = current[i];
      }
    }
  }

  return result;
}

export { block, interleave };
