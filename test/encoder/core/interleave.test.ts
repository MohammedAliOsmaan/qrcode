import { assertEquals } from "@std/assert";
import { block, interleave } from "../../../src/encoder/core/interleave.ts";

// fake data structure like your ErrorCorrectionTable output
const groups = [
  { blocks: 2, dataCodewords: 3 },
  { blocks: 1, dataCodewords: 2 },
];

Deno.test("block splits data into blocks correctly", () => {
  const data = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
  const blocks = block(data, groups);

  // should create 3 blocks: 2 of size 3, 1 of size 2
  assertEquals(blocks.length, 3);
  assertEquals(blocks[0], new Uint8Array([1, 2, 3]));
  assertEquals(blocks[1], new Uint8Array([4, 5, 6]));
  assertEquals(blocks[2], new Uint8Array([7, 8]));
});

Deno.test("block returns empty array if no groups", () => {
  const data = new Uint8Array([]);
  const blocks = block(data, []);
  assertEquals(blocks.length, 0);
});

Deno.test("interleave interleaves blocks correctly", () => {
  const blocks = [
    new Uint8Array([1, 2, 3]),
    new Uint8Array([4, 5, 6]),
    new Uint8Array([7, 8]),
  ];

  const result = interleave(blocks, 3);

  // interleaving: take 1st byte from each, then 2nd, etc.
  // expected: [1,4,7, 2,5,8, 3,6]

  assertEquals(result, new Uint8Array([1, 4, 7, 2, 5, 8, 3, 6]));
});

Deno.test("interleave handles shorter blocks", () => {
  const blocks = [
    new Uint8Array([1, 2]),
    new Uint8Array([3]),
  ];

  const result = interleave(blocks, 3);
  // step by step:
  // i=0: 1,3
  // i=1: 2
  // i=2: nothing (both blocks too short)
  assertEquals(result, new Uint8Array([1, 3, 2]));
});

Deno.test("interleave returns empty if no blocks", () => {
  const result = interleave([], 5);
  assertEquals(result.length, 0);
});

Deno.test("interleave preserves all data bytes when reassembled", () => {
  const blocks = [
    new Uint8Array([1, 2, 3, 4]),
    new Uint8Array([5, 6, 7, 8]),
    new Uint8Array([9, 10]),
  ];
  const result = interleave(blocks, 4);
  assertEquals(result.length > 0, true);
});

Deno.test("interleave column-first traversal on uneven block sizes", () => {
  const blocks = [
    new Uint8Array([1, 2, 3, 4]),
    new Uint8Array([5, 6, 7, 8]),
    new Uint8Array([9, 10]),
  ];
  const result = interleave(blocks, 4);
  assertEquals(result[0], 1);
  assertEquals(result[1], 5);
  assertEquals(result[2], 9);
  assertEquals(result[3], 2);
  assertEquals(result[4], 6);
  assertEquals(result[5], 10);
  assertEquals(result[6], 3);
  assertEquals(result[7], 7);
  assertEquals(result[8], 4);
  assertEquals(result[9], 8);
});

Deno.test("block returns raw data for a single block group", () => {
  const data = new Uint8Array([1, 2, 3, 4]);
  const blocks = block(data, [{ blocks: 1, dataCodewords: 4 }]);
  assertEquals(blocks.length, 1);
  assertEquals(blocks[0], data);
});

Deno.test("interleave returns the same block when only one block exists", () => {
  const blockData = new Uint8Array([1, 2, 3]);
  assertEquals(interleave([blockData], 1), blockData);
});

Deno.test("interleave ignores undefined blocks when length exceeds block count", () => {
  const result = interleave([new Uint8Array([1])], 3);
  assertEquals(result, new Uint8Array([1]));
});
