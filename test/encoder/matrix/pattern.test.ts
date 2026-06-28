import { assertEquals } from "@std/assert";
import {
  alignment,
  finder,
  module,
  separator,
  timing,
} from "../../../src/encoder/matrix/pattern.ts";

Deno.test("finder places 7x7 patterns in three corners", () => {
  const size = 21;
  const matrix = new Uint8Array(size * size).fill(255);

  finder(matrix, size);

  // check top-left center (3,3)
  assertEquals(matrix[3 * size + 3], 1);
  // check top-right center (3, size-7+3)
  assertEquals(matrix[3 * size + size - 7 + 3], 1);
  // check bottom-left center (size-7+3,3)
  assertEquals(matrix[(size - 7 + 3) * size + 3], 1);
});

Deno.test("separator draws white border around finders", () => {
  const size = 21;
  const matrix = new Uint8Array(size * size).fill(255);

  separator(matrix, size);

  // top-left separator right column at (0..6,7)
  assertEquals(matrix[0 * size + 7], 0);
  assertEquals(matrix[6 * size + 7], 0);

  // top-left separator bottom row at (7,0..7)
  assertEquals(matrix[7 * size + 0], 0);
  assertEquals(matrix[7 * size + 7], 0);
});

Deno.test("timing places alternating pattern on row 6 and column 6", () => {
  const size = 21;
  const matrix = new Uint8Array(size * size).fill(255);

  timing(matrix, size);

  // row 6: columns from 8..(size-8-1) -> chunk = size-8
  const chunk = size - 8;
  for (let c = 8; c < chunk; c++) {
    const expected = c % 2 === 0 ? 1 : 0;
    assertEquals(matrix[6 * size + c], expected);
  }

  // column 6: rows from 8..chunk-1
  for (let r = 8; r < chunk; r++) {
    const expected = r % 2 === 0 ? 1 : 0;
    assertEquals(matrix[r * size + 6], expected);
  }
});

Deno.test("alignment places 5x5 patterns for version >=2 and module sets dark module", () => {
  const size = 25; // version 2 -> centers [6,18]
  const matrix = new Uint8Array(size * size).fill(255);

  alignment(matrix, size);

  // pattern around center 18,18 should place a 5x5 block with center 18,18 = 1
  assertEquals(matrix[18 * size + 18], 1);
  // check a corner of the 5x5 around (18,18)
  assertEquals(matrix[16 * size + 16], 1);

  // dark module at (size-8,8)
  module(matrix, size);
  assertEquals(matrix[(size - 8) * size + 8], 1);
});

Deno.test("finder places 7x7 patterns with exact border at all versions", () => {
  for (let v = 1; v <= 10; v++) {
    const size = 17 + 4 * v;
    const matrix = new Uint8Array(size * size).fill(255);
    finder(matrix, size);

    const tl = [0, 0];
    const tr = [0, size - 7];
    const bl = [size - 7, 0];

    for (const [r, c] of [tl, tr, bl]) {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          const expected = (i === 0 || i === 6 || j === 0 || j === 6)
            ? 1
            : (i === 1 || i === 5 || j === 1 || j === 5)
            ? 0
            : 1;
          assertEquals(
            matrix[(r + i) * size + (c + j)],
            expected,
            `finder at (${r},${c}) @ offset (${i},${j})`,
          );
        }
      }
    }
  }
});

Deno.test("timing creates continuous alternating 1-0 pattern for all versions", () => {
  for (let v = 1; v <= 10; v++) {
    const size = 17 + 4 * v;
    const matrix = new Uint8Array(size * size).fill(255);
    timing(matrix, size);

    const chunk = size - 8;
    for (let c = 8; c < chunk; c++) {
      assertEquals(matrix[6 * size + c], c % 2 === 0 ? 1 : 0);
    }
    for (let r = 8; r < chunk; r++) {
      assertEquals(matrix[r * size + 6], r % 2 === 0 ? 1 : 0);
    }
  }
});
