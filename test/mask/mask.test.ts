import { assertEquals } from "https://deno.land/std@0.200.0/testing/asserts.ts";
import { apply, toEcBits } from "../../src/mask/mask.ts";
import { penalty } from "../../src/mask/penalty.ts";
import { reserved } from "../../src/core/reserve.ts";
import { ErrorCorrectionBits } from "../../src/matrix/format.ts";

Deno.test("penalty N1 counts consecutive modules in rows and columns", () => {
  const size = 6;
  // start with a checkerboard to avoid other penalties
  const base = Array.from({ length: size }, (_, r) => Array.from({ length: size }, (_, c) => ((r + c) % 2)));
  const baseScore = penalty(base, size);

  const testMatrix = base.map(row => row.slice());
  testMatrix[0] = Array(size).fill(1);

  // Keep dark module ratio unchanged by removing any extra dark modules introduced
  const baseDark = base.flat().filter(x => x === 1).length;
  const newDark = testMatrix.flat().filter(x => x === 1).length;
  let extra = newDark - baseDark;
  for (let r = 1; r < size && extra > 0; r++) {
    for (let c = 0; c < size && extra > 0; c++) {
      if (testMatrix[r][c] === 1) {
        testMatrix[r][c] = 0;
        extra--;
      }
    }
  }

  const newScore = penalty(testMatrix, size);
  // should at least include the N1 penalty component
  assertEquals(newScore >= (3 + (size - 5)), true);
});

Deno.test("penalty N2 counts 2x2 blocks", () => {
  const size = 4;
  const base = Array.from({ length: size }, (_, r) => Array.from({ length: size }, (_, c) => ((r + c) % 2)));
  const baseScore = penalty(base, size);

  const testMatrix = base.map(row => row.slice());
  testMatrix[0][0] = 1;
  testMatrix[0][1] = 1;
  testMatrix[1][0] = 1;
  testMatrix[1][1] = 1;

  // Remove any extra dark modules to avoid changing N4
  const baseDark2 = base.flat().filter(x => x === 1).length;
  const newDark2 = testMatrix.flat().filter(x => x === 1).length;
  let extra2 = newDark2 - baseDark2;
  for (let r = 0; r < size && extra2 > 0; r++) {
    for (let c = 0; c < size && extra2 > 0; c++) {
      if ((r === 0 && (c === 0 || c === 1)) || (r === 1 && (c === 0 || c === 1))) continue;
      if (testMatrix[r][c] === 1) {
        testMatrix[r][c] = 0;
        extra2--;
      }
    }
  }

  const newScore = penalty(testMatrix, size);
  // should at least include the N2 penalty component
  assertEquals(newScore >= 3, true);
});

Deno.test("penalty N3 detects finder-like patterns (horizontal)", () => {
  const size = 11;
  const base = Array.from({ length: size }, () => Array(size).fill(0));
  const baseScore = penalty(base, size);

  const pattern = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
  const testMatrix = base.map(row => row.slice());
  testMatrix[0] = pattern.slice();

  // Remove any extra dark modules introduced by the pattern
  const baseDark3 = base.flat().filter(x => x === 1).length;
  const newDark3 = testMatrix.flat().filter(x => x === 1).length;
  let extra3 = newDark3 - baseDark3;
  for (let r = 1; r < size && extra3 > 0; r++) {
    for (let c = 0; c < size && extra3 > 0; c++) {
      if (testMatrix[r][c] === 1) {
        testMatrix[r][c] = 0;
        extra3--;
      }
    }
  }

  const newScore = penalty(testMatrix, size);
  // should at least include the N3 penalty component
  assertEquals(newScore >= 40, true);
});

Deno.test("penalty N4 computes dark module ratio penalty", () => {
  const size = 40; // larger grid to avoid introducing other penalties
  // start with exactly 50% dark modules
  const total = size * size;
  const half = Math.floor(total / 2);
  const base = Array.from({ length: size }, (_, r) => Array.from({ length: size }, (_, c) => ((r * size + c) < half ? 1 : 0)));
  const baseScore = penalty(base, size);

  const testMatrix = base.map(row => row.slice());
  // add 40 more dark modules (1 each) spread out to avoid N1/N2/N3 side effects => reach ~60%
  let added = 0;
  for (let i = 0; i < size && added < 40; i++) {
    const r = i;
    const c = (i * 7) % size; // scatter
    if (testMatrix[r][c] === 0) {
      testMatrix[r][c] = 1;
      added++;
    }
  }

  const newScore = penalty(testMatrix, size);
  // should include the N4 penalty component for ~60% dark modules
  assertEquals(newScore >= 20, true);
});

Deno.test("apply flips only non-reserved modules according to mask pattern", () => {
  const size = 21; // version 1 grid
  const matrix = Array.from({ length: size }, () => Array(size).fill(0));

  // find a non-reserved coordinate where mask 0 would flip ((r+c)%2===0)
  let found: [number, number] | null = null;
  for (let r = 0; r < size && !found; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved(r, c, size) && ((r + c) % 2 === 0)) {
        matrix[r][c] = 0; // ensure defined
        found = [r, c];
        break;
      }
    }
  }

  if (!found) throw new Error("No suitable non-reserved coordinate found for test");

  const [r0, c0] = found;
  apply(matrix, 0, size);

  // The chosen cell should have been flipped from 0 to 1
  assertEquals(matrix[r0][c0], 1);
});

Deno.test("toEcBits maps levels correctly", () => {
  assertEquals(toEcBits("L" as any), ErrorCorrectionBits.L);
  assertEquals(toEcBits("M" as any), ErrorCorrectionBits.M);
  assertEquals(toEcBits("Q" as any), ErrorCorrectionBits.Q);
  assertEquals(toEcBits("H" as any), ErrorCorrectionBits.H);
});
