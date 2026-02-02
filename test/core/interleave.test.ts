import { assertEquals } from "https://deno.land/std@0.200.0/testing/asserts.ts";
import { interleave } from "../../src/core/interleave.ts";

Deno.test("interleave merges blocks column-wise", () => {
  const blocks = [new Uint8Array([1, 2]), new Uint8Array([3])];
  const out = interleave(blocks, 2);
  assertEquals(Array.from(out), [1, 3, 2]);
});