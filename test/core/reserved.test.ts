import { assert } from "https://deno.land/std@0.200.0/testing/asserts.ts";
import { reserved } from "../../src/core/reserve.ts";

Deno.test("reserved marks known fixed regions as true", () => {
  const size = 21;
  // Finder top-left
  assert(reserved(0, 0, size));
  // timing row/column
  assert(reserved(6, 10, size));
  assert(reserved(10, 6, size));
  // top-right format horizontal
  assert(reserved(8, size - 8, size));
  // bottom-left format vertical
  assert(reserved(size - 8, 8, size));
  // center data area should not be reserved
  assert(!reserved(10, 10, size));
});