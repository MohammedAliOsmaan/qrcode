import { assertEquals, assertThrows } from "https://deno.land/std@0.200.0/testing/asserts.ts";
import * as pattern from "../../src/matrix/pattern.ts";
import { placement, zigzag } from "../../src/matrix/placement.ts";
import { apply as applyVersion } from "../../src/matrix/version.ts";
import { reserved } from "../../src/core/reserve.ts";

Deno.test("finder places finder patterns in three corners", () => {
  const size = 21;
  const matrix = Array.from({ length: size }, () => Array(size).fill(null));

  pattern.finder(matrix, size);

  // top-left
  assertEquals(matrix[0][0], 1);
  assertEquals(matrix[6][6], 1);

  // top-right
  assertEquals(matrix[0][size - 7], 1);
  assertEquals(matrix[6][size - 1], 1);

  // bottom-left
  assertEquals(matrix[size - 7][0], 1);
  assertEquals(matrix[size - 1][6], 1);
});

Deno.test("separator places zeros around finders", () => {
  const size = 21;
  const matrix = Array.from({ length: size }, () => Array(size).fill(null));

  pattern.separator(matrix, size);

  // top-left column separator at column 7 rows 0..6
  for (let r = 0; r < 7; r++) assertEquals(matrix[r][7], 0);

  // top-left row separator at row 7 cols 0..7
  for (let c = 0; c < 8; c++) assertEquals(matrix[7][c], 0);

  // top-right column separator at column size-8 rows 0..6
  for (let r = 0; r < 7; r++) assertEquals(matrix[r][size - 8], 0);
});

Deno.test("timing creates alternating patterns", () => {
  const size = 21;
  const matrix = Array.from({ length: size }, () => Array(size).fill(null));

  pattern.timing(matrix, size);

  const chunk = size - 8;

  // horizontal: row 6, columns 8..chunk-1
  for (let c = 8; c < chunk; c++) {
    const expected = (c % 2 === 0) ? 1 : 0;
    assertEquals(matrix[6][c], expected);
  }

  // vertical: column 6, rows 8..chunk-1
  for (let r = 8; r < chunk; r++) {
    const expected = (r % 2 === 0) ? 1 : 0;
    assertEquals(matrix[r][6], expected);
  }
});

Deno.test("alignment places 5x5 pattern at expected anchors for version 2", () => {
  const size = 25; // version 2
  const matrix = Array.from({ length: size }, () => Array(size).fill(null));

  pattern.alignment(matrix, size);

  // For version 2, the only non-overlapping center is at (18,18) — pattern occupies 16..20
  const anchorRow = 18 - 2;
  const anchorCol = 18 - 2;

  // Check corners of the 5x5 alignment pattern
  assertEquals(matrix[anchorRow][anchorCol], 1);
  assertEquals(matrix[anchorRow][anchorCol + 4], 1);
  assertEquals(matrix[anchorRow + 4][anchorCol], 1);
  assertEquals(matrix[anchorRow + 4][anchorCol + 4], 1);
  // center should be 1 (pattern has a center module)
  assertEquals(matrix[anchorRow + 2][anchorCol + 2], 1);
});

Deno.test("module sets dark module at correct position", () => {
  const size = 21;
  const matrix = Array.from({ length: size }, () => Array(size).fill(null));

  pattern.module(matrix, size);

  assertEquals(matrix[size - 8][8], 1);
});

Deno.test("zigzag generator yields expected first coordinates", () => {
  const size = 21;
  const it = zigzag(size);

  const first = it.next().value;
  const second = it.next().value;
  const third = it.next().value;
  const fourth = it.next().value;

  assertEquals(first, [20, 20]);
  assertEquals(second, [20, 19]);
  assertEquals(third, [19, 20]);
  assertEquals(fourth, [19, 19]);
});

Deno.test("placement fills only non-reserved modules and consumes bits", () => {
  const size = 21;
  const matrix = Array.from({ length: size }, () => Array(size).fill(null));

  // apply fixed patterns so some slots are reserved/non-null
  pattern.finder(matrix, size);
  pattern.separator(matrix, size);
  pattern.timing(matrix, size);
  pattern.alignment(matrix, size);
  pattern.module(matrix, size);

  const bits = new Array(100).fill(1); // plenty of bits

  // collect available coordinates (null and not reserved)
  const coords: [number, number][] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c] === null && !reserved(r, c, size)) coords.push([r, c]);
    }
  }
  const availableBefore = coords.length;

  placement(matrix, bits, size);

  // After placement, all data modules should be filled (either with bit value or 0)
  let availableAfter = 0;
  for (let [r, c] of coords) {
    if (matrix[r][c] === null && !reserved(r, c, size)) availableAfter++;
  }
  assertEquals(availableAfter, 0);

  // Count how many of the previously-null coords were set to 1 — this should equal
  // the number of bits placed (min(bits.length, availableBefore))
  const ones = coords.filter(([r, c]) => matrix[r][c] === 1).length;
  assertEquals(ones, Math.min(bits.length, availableBefore));
});

Deno.test("version.apply places symmetric bits for version >=7 and throws for <7", () => {
  // Throws for versions < 7
  const size6 = 17 + 4 * 6; // version 6
  const m6 = Array.from({ length: size6 }, () => Array(size6).fill(null));
  assertThrows(() => applyVersion(m6, size6, 6));

  // For version 7, bits should be placed symmetrically
  const size7 = 17 + 4 * 7; // version 7
  const m7 = Array.from({ length: size7 }, () => Array(size7).fill(null));
  applyVersion(m7, size7, 7);

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      const a = m7[i][size7 - 11 + j];
      const b = m7[size7 - 11 + j][i];
      assertEquals(a, b);
      // ensure placed bit is binary
      assertEquals([0, 1].includes(a), true);
    }
  }
});