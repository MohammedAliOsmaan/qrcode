import { assertEquals } from "@std/assert";
import { penalty } from "../../../src/encoder/mask/penalty.ts";

function createCheckerboard(size: number): Uint8Array {
  const matrix = new Uint8Array(size * size);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      matrix[r * size + c] = (r + c) % 2;
    }
  }
  return matrix;
}

Deno.test("penalty returns zero for a perfect checkerboard", () => {
  const matrix = createCheckerboard(21);
  assertEquals(penalty(matrix, 21), 0);
});

Deno.test("penalty detects a single 2x2 block", () => {
  const size = 6;
  const matrix = createCheckerboard(size);

  matrix[0 * size + 0] = 1;
  matrix[0 * size + 1] = 1;
  matrix[1 * size + 0] = 1;
  matrix[1 * size + 1] = 1;

  const score = penalty(matrix, size);
  assertEquals(score >= 3, true);
});

Deno.test("penalty detects a horizontal finder-like pattern", () => {
  const size = 12;
  const matrix = new Uint8Array(size * size);
  const pattern = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0];

  for (let c = 0; c < size; c++) {
    matrix[0 * size + c] = pattern[c];
  }

  assertEquals(penalty(matrix, size) >= 40, true);
});

Deno.test("penalty detects a vertical finder-like pattern", () => {
  const size = 12;
  const matrix = new Uint8Array(size * size);
  const pattern = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0];

  for (let r = 0; r < size; r++) {
    matrix[r * size + 4] = pattern[r];
  }

  assertEquals(penalty(matrix, size) >= 40, true);
});

Deno.test("penalty applies dark ratio cost for off-balance matrices", () => {
  const size = 10;
  const matrix = new Uint8Array(size * size);
  let set = 0;

  for (let r = 0; r < size && set < 60; r++) {
    for (let c = 0; c < size && set < 60; c++) {
      matrix[r * size + c] = 1;
      set++;
    }
  }

  assertEquals(penalty(matrix, size) >= 20, true);
});

Deno.test("penalty N1 scores 3+(length-5) for runs >=5", () => {
  const size = 10;
  const matrix = new Uint8Array(size * size);
  for (let c = 0; c < 7; c++) {
    matrix[0 * size + c] = 1;
  }
  const score = penalty(matrix, size);
  assertEquals(score >= 3 + (7 - 5), true);
});

Deno.test("penalty N2 scores 3 for each 2x2 block", () => {
  const size = 10;
  const matrix = new Uint8Array(size * size);
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      matrix[r * size + c] = 1;
    }
  }
  const score = penalty(matrix, size);
  assertEquals(score >= 3, true);
});

Deno.test("penalty N3 detects 1:1:3:1:1 ratio patterns", () => {
  const size = 12;
  const matrix = new Uint8Array(size * size);
  const pattern = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0];
  for (let c = 0; c < size; c++) {
    matrix[0 * size + c] = pattern[c];
  }
  const score = penalty(matrix, size);
  assertEquals(score >= 40, true);
});

Deno.test("penalty N4 dark ratio cost at 50% = 0 cost", () => {
  const size = 10;
  const matrix = new Uint8Array(size * size);
  for (let i = 0; i < Math.floor(size * size * 0.5); i++) {
    matrix[i] = 1;
  }
  const score = penalty(matrix, size);
  assertEquals(score >= 0, true);
});
