import { assertEquals } from "@std/assert";
import { division, generator, multiply } from "../../../src/encoder/ec/rs.ts";

Deno.test("GF Multiply - edge cases and math", () => {
  // 1. Coverage for: if (a === 0 || b === 0) return 0;
  assertEquals(multiply(0, 5), 0, "Multiply by 0 (left)");
  assertEquals(multiply(5, 0), 0, "Multiply by 0 (right)");

  // 2. Coverage for normal multiplication and exponent wrap (% 255)
  // log[1] = 0, log[2] = 1. 0+1 = 1. exp[1] = 2.
  assertEquals(multiply(1, 2), 2);

  // High value test: 255 * 2
  // log[255]=175, log[2]=1. 176 % 255 = 176. exp[176] = 227.
  assertEquals(multiply(255, 2), 227);
});

Deno.test("Generator Polynomial - creation", () => {
  // Input 0: returns [1]
  assertEquals(generator(0), new Uint8Array([1]));

  // Input 1: (x + α^0) -> (x + 1) -> [1, 1]
  assertEquals(generator(1), new Uint8Array([1, 1]));

  // Input 2: (x + 1)(x + 2) = x^2 + 3x + 2 -> [1, 3, 2]
  // (Note: in GF(256), 1^2 = 3 because 1+2=3)
  assertEquals(generator(2), new Uint8Array([1, 3, 2]));
});

Deno.test("Division (Reed-Solomon Remainder)", () => {
  const msg = new Uint8Array([12, 34, 56]);
  const gen = generator(2); // [1, 3, 2]
  const scratch = new Uint8Array(512);

  // 1. Coverage for: if (factor === 0) continue;
  const msgWithZero = new Uint8Array([0, 34, 56]);
  const resultWithZero = division(msgWithZero, gen, scratch);
  assertEquals(resultWithZero instanceof Uint8Array, true);

  // 2. Standard division
  const remainder = division(msg, gen, scratch);
  // Remainder length should be gen.length - 1
  assertEquals(remainder.length, 2);
});

Deno.test("Full Loop Coverage (Branch & Line)", () => {
  // Test a larger generator to ensure internal loops (i, j) run fully
  const gen = generator(10);
  const scratch = new Uint8Array(512);

  assertEquals(gen.length, 11);

  const msg = new Uint8Array(20).fill(1);
  const rem = division(msg, gen, scratch);
  assertEquals(rem.length, 10);
});
