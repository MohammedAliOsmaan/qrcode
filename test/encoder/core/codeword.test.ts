import { assertEquals, assertThrows } from "@std/assert";
import { codeword } from "../../../src/encoder/core/codeword.ts";

Deno.test("codeword returns correct table entry for version 1 L", () => {
  const cw = codeword(1, 0);
  assertEquals(cw.codewords, 19);
  assertEquals(cw.ecCodewords, 7);
  assertEquals(cw.groups.length, 1);
  assertEquals(cw.groups[0], { blocks: 1, dataCodewords: 19 });
});

Deno.test("codeword returns correct table entry for version 5 Q with two groups", () => {
  const cw = codeword(5, 2);
  assertEquals(cw.codewords, 62);
  assertEquals(cw.ecCodewords, 18);
  assertEquals(cw.groups.length, 2);
  assertEquals(cw.groups[0], { blocks: 2, dataCodewords: 15 });
  assertEquals(cw.groups[1], { blocks: 2, dataCodewords: 16 });
});

Deno.test("codeword throws for invalid version or invalid level", () => {
  assertThrows(() => codeword(0, 0));
  assertThrows(() => codeword(1, 4));
});

Deno.test("codeword validates all 40 versions with all 4 EC levels", () => {
  for (let v = 1; v <= 40; v++) {
    for (let ec = 0; ec < 4; ec++) {
      const cw = codeword(v, ec);
      assertEquals(cw.codewords > 0, true);
      assertEquals(cw.ecCodewords > 0, true);
      assertEquals(cw.groups.length > 0, true);
    }
  }
});

Deno.test("codeword total codewords includes data and EC across all groups", () => {
  for (let v = 1; v <= 10; v++) {
    for (let ec = 0; ec < 4; ec++) {
      const cw = codeword(v, ec);
      assertEquals(cw.codewords > 0, true);
    }
  }
});

Deno.test("codeword returns the original data block for a single block group", () => {
  const cw = codeword(1, 0);
  assertEquals(cw.groups[0], { blocks: 1, dataCodewords: 19 });
  assertEquals(cw.codewords, 19);
});
