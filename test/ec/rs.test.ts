import { assert } from "jsr:@std/assert/assert";
import { assertEquals } from "jsr:@std/assert/equals";
import { generator, division } from "../../src/ec/rs.ts";

Deno.test("generator produces degree+1 polynomial and division remainder zero after appending", () => {
  const degree = 7;
  const gen = generator(degree);
  assertEquals(gen.length, degree + 1);
  assertEquals(gen[0], 1);

  const msg = new Uint8Array([32, 91, 11, 120]);
  const rem = division(msg, gen);
  assertEquals(rem.length, gen.length - 1);

  const full = new Uint8Array([...msg, ...rem]);
  const rem2 = division(full, gen);
  assert(rem2.every(x => x === 0));
});