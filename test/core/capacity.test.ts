import { assertEquals } from "jsr:@std/assert/equals";
import { capacities, capacity } from "../../src/core/capacity.ts";
import { Modes, quality } from "../../src/core/constants.ts";

// Helper for assertion
function assertCapacity(
  result: ReturnType<typeof capacity>,
  version: number,
  ec: string,
  mode: Modes,
  expected: number
) {
  assertEquals(result.version, version);
  assertEquals(result.ec, ec);
  assertEquals(result.mode, mode);
  assertEquals(result.capacity, expected);
}


Deno.test("capacity() exact capacity should succeed", () => {
  for (let version = 1; version <= 3; version++) {
    for (const ec of quality) {
      for (const mode of [1, 2, 4, 8]) {
        const maxLen = capacities[version][ec][mode as Modes]; // use string key
        const result = capacity(maxLen, mode, version, ec);
        assertCapacity(result, version, ec, mode, maxLen);
      }
    }
  }
});