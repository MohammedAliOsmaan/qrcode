import { assertEquals } from "@std/assert";
import { reserve } from "../../../src/encoder/core/reserve.ts";

Deno.test("reserve() returns true for finder pattern corners", () => {
  const size = 21;
  assertEquals(reserve(0, 0, size), true);
  assertEquals(reserve(0, size - 1, size), true);
  assertEquals(reserve(size - 1, 0, size), true);
});

Deno.test("reserve() returns true for timing patterns", () => {
  const size = 21;
  assertEquals(reserve(6, 10, size), true);
  assertEquals(reserve(10, 6, size), true);
});

Deno.test("reserve() returns true for format information positions", () => {
  const size = 21;
  assertEquals(reserve(8, 0, size), true);
  assertEquals(reserve(8, 5, size), true);
  assertEquals(reserve(5, 8, size), true);
  assertEquals(reserve(8, size - 1, size), true);
  assertEquals(reserve(size - 1, 8, size), true);
});

Deno.test("reserve() returns true for version information regions on version 7", () => {
  const size = 45;
  assertEquals(reserve(size - 11, 0, size), true);
  assertEquals(reserve(0, size - 11, size), true);
});

Deno.test("reserve() returns true for alignment patterns and finder overlaps", () => {
  const size = 25;
  assertEquals(reserve(18, 18, size), true);
  assertEquals(reserve(6, 6, size), true);
});

Deno.test("reserve() returns false for a standard data module", () => {
  const size = 21;
  assertEquals(reserve(10, 10, size), false);
});
Deno.test("reserve() recognizes alignment patterns for versions 2-7", () => {
  for (let v = 2; v <= 7; v++) {
    const size = 17 + 4 * v;
    assertEquals(reserve(size - 8, 8, size), true, `v${v} alignment`);
  }
});

Deno.test("reserve() marks dark module at position (4*v+9, 8)", () => {
  for (let v = 1; v <= 7; v++) {
    const size = 17 + 4 * v;
    const darkRow = 4 * v + 9;
    assertEquals(reserve(darkRow, 8, size), true, `v${v} dark module`);
  }
});

Deno.test("reserve() protects format info bits on both top and right edges", () => {
  const size = 21;
  const topLeft = [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [
    8,
    8,
  ]];
  const topRight = [[8, size - 8], [8, size - 1]];
  const bottomLeft = [[size - 1, 8], [size - 8, 8]];
  for (const [r, c] of [...topLeft, ...topRight, ...bottomLeft]) {
    assertEquals(reserve(r, c, size), true);
  }
});
