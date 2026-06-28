import { assertEquals } from "@std/assert";
import * as pattern from "../../../src/encoder/matrix/pattern.ts";
import { placement } from "../../../src/encoder/matrix/placement.ts";
import { apply as applyVersion } from "../../../src/encoder/matrix/version.ts";
import { reserve } from "../../../src/encoder/core/reserve.ts";

Deno.test("finder places finder patterns in three corners", () => {
  const size = 21;
  const matrix = new Uint8Array(size * size).fill(255);

  pattern.finder(matrix, size);

  // top-left
  assertEquals(matrix[0 * size + 0], 1);
  assertEquals(matrix[6 * size + 6], 1);

  // top-right
  assertEquals(matrix[0 * size + size - 7], 1);
  assertEquals(matrix[6 * size + size - 1], 1);

  // bottom-left
  assertEquals(matrix[(size - 7) * size + 0], 1);
  assertEquals(matrix[(size - 1) * size + 6], 1);
});

Deno.test("separator places zeros around finders", () => {
  const size = 21;
  const matrix = new Uint8Array(size * size).fill(255);

  pattern.separator(matrix, size);

  // top-left column separator at column 7 rows 0..6
  for (let r = 0; r < 7; r++) assertEquals(matrix[r * size + 7], 0);

  // top-left row separator at row 7 cols 0..7
  for (let c = 0; c < 8; c++) assertEquals(matrix[7 * size + c], 0);

  // top-right column separator at column size-8 rows 0..6
  for (let r = 0; r < 7; r++) assertEquals(matrix[r * size + size - 8], 0);
});

Deno.test("timing creates alternating patterns", () => {
  const size = 21;
  const matrix = new Uint8Array(size * size).fill(255);

  pattern.timing(matrix, size);

  const chunk = size - 8;

  // horizontal: row 6, columns 8..chunk-1
  for (let c = 8; c < chunk; c++) {
    const expected = (c % 2 === 0) ? 1 : 0;
    assertEquals(matrix[6 * size + c], expected);
  }

  // vertical: column 6, rows 8..chunk-1
  for (let r = 8; r < chunk; r++) {
    const expected = (r % 2 === 0) ? 1 : 0;
    assertEquals(matrix[r * size + 6], expected);
  }
});

Deno.test("alignment places 5x5 pattern at expected anchors for version 2", () => {
  const size = 25; // version 2
  const matrix = new Uint8Array(size * size).fill(255);

  pattern.alignment(matrix, size);

  // For version 2, the only non-overlapping center is at (18,18) — pattern occupies 16..20
  const anchorRow = 18 - 2;
  const anchorCol = 18 - 2;

  // Check corners of the 5x5 alignment pattern
  assertEquals(matrix[anchorRow * size + anchorCol], 1);
  assertEquals(matrix[anchorRow * size + anchorCol + 4], 1);
  assertEquals(matrix[(anchorRow + 4) * size + anchorCol], 1);
  assertEquals(matrix[(anchorRow + 4) * size + anchorCol + 4], 1);
  // center should be 1 (pattern has a center module)
  assertEquals(matrix[(anchorRow + 2) * size + anchorCol + 2], 1);
});

Deno.test("module sets dark module at correct position", () => {
  const size = 21;
  const matrix = new Uint8Array(size * size).fill(255);

  pattern.module(matrix, size);

  assertEquals(matrix[(size - 8) * size + 8], 1);
});

Deno.test("placement fills only non-reserved modules and consumes bits", () => {
  const size = 21;
  const matrix = new Uint8Array(size * size).fill(255);

  // apply fixed patterns so some slots are reserved/non-null
  pattern.finder(matrix, size);
  pattern.separator(matrix, size);
  pattern.timing(matrix, size);
  pattern.alignment(matrix, size);
  pattern.module(matrix, size);

  const bits = new Uint8Array(10).fill(1);

  // collect available coordinates (null and not reserved)
  const coords: [number, number][] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r * size + c] === 255 && !reserve(r, c, size)) {
        coords.push([r, c]);
      }
    }
  }

  placement(matrix, bits, size);

  // After placement, some data modules should be filled
  let filled = 0;
  for (const [r, c] of coords) {
    if (matrix[r * size + c] !== 255) filled++;
  }
  assertEquals(filled > 0, true);
});

Deno.test("version.apply writes version bits for version 7 and leaves older versions unchanged", () => {
  const size6 = 17 + 4 * 6; // version 6
  const m6 = new Uint8Array(size6 * size6).fill(255);
  applyVersion(m6, size6);
  assertEquals(m6.every((v) => v === 255), true);

  const size7 = 17 + 4 * 7; // version 7
  const m7 = new Uint8Array(size7 * size7).fill(255);
  applyVersion(m7, size7);

  const versionBits = 0x07c94;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      const bitIndex = i * 3 + j;
      const expected = (versionBits >> bitIndex) & 1;
      assertEquals(m7[i * size7 + (size7 - 11 + j)], expected);
      assertEquals(m7[(size7 - 11 + j) * size7 + i], expected);
    }
  }
});
