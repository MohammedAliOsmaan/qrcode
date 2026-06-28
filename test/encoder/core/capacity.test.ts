import { assert, assertEquals, assertThrows } from "@std/assert";
import { capacity } from "../../../src/encoder/core/capacity.ts";
import { capacities, Modes } from "../../../src/encoder/core/constants.ts";
import type { ErrorCorrectionLevel } from "../../../src/encoder/types/types.ts";

Deno.test("capacity throws on negative length", () => {
  assertThrows(() => capacity(-1, Modes.Byte), RangeError);
});

Deno.test("capacity throws on invalid mode", () => {
  assertThrows(() => capacity(10, 99 as Modes), Error);
});

Deno.test("capacity throws on invalid error correction level", () => {
  assertThrows(
    () => capacity(10, Modes.Byte, undefined, "X" as ErrorCorrectionLevel),
    Error,
  );
});

Deno.test("capacity throws if version is invalid", () => {
  assertThrows(() => capacity(10, Modes.Byte, 999, "L"), Error);
});

Deno.test("capacity returns correct version and EC when version+EC provided", () => {
  const result = capacity(10, Modes.Byte, 1, "L");
  assertEquals(result, {
    version: 1,
    ec: 0,
    mode: Modes.Byte,
    capacity: capacities[2],
  });
});

Deno.test("capacity throws if length exceeds specified version+EC", () => {
  const limit = capacities[2];
  assertThrows(() => capacity(limit + 1, Modes.Byte, 1, "L"), Error);
});

Deno.test("capacity selects the first valid EC for a fixed version", () => {
  const result = capacity(10, Modes.Byte, 1);

  assertEquals(result, {
    version: 1,
    ec: 2,
    mode: Modes.Byte,
    capacity: capacities[2 * 4 + 2],
  });
});

Deno.test("capacity throws when fixed version cannot fit the length", () => {
  const maxV1 = Math.max(
    ...[0, 4, 8, 12].map((offset) => capacities[offset + 2]),
  );
  assertThrows(() => capacity(maxV1 + 1, Modes.Byte, 1), Error);
});

Deno.test("capacity selects the first valid version for a fixed EC level", () => {
  const result = capacity(12, Modes.Byte, undefined, "Q");
  assertEquals(result, {
    version: 2,
    ec: 2,
    mode: Modes.Byte,
    capacity: capacities[1 * 16 + 2 * 4 + 2],
  });
});

Deno.test("capacity throws when EC-only selection cannot fit the data", () => {
  const maxQ = Math.max(
    ...Array.from(capacities).filter((_, index) => index % 4 === 2),
  );
  assertThrows(() => capacity(maxQ + 1, Modes.Byte, undefined, "Q"), Error);
});

Deno.test("capacity auto-selects smallest version and EC", () => {
  const result = capacity(10, Modes.Byte);
  assertEquals(result.version, 1);
  assert(result.capacity >= 10);
});

Deno.test("capacity throws if the data is too large for all versions", () => {
  const maxGlobal = Math.max(...Array.from(capacities));
  assertThrows(() => capacity(maxGlobal + 1, Modes.Byte), Error);
});

Deno.test("capacity throws on non-integer version", () => {
  assertThrows(() => capacity(10, Modes.Byte, 1.5, "L"), Error);
});

Deno.test("capacity throws on version below range", () => {
  assertThrows(() => capacity(10, Modes.Byte, 0, "L"), Error);
});

Deno.test("capacity throws on version above range", () => {
  assertThrows(() => capacity(10, Modes.Byte, 41, "L"), Error);
});

Deno.test("capacity validates all 40 QR versions", () => {
  for (let v = 1; v <= 40; v++) {
    const result = capacity(1, Modes.Byte, v, "L");
    assertEquals(result.version, v);
    assert(result.capacity > 0);
  }
});

Deno.test("capacity respects EC level differences (L > M > Q > H)", () => {
  const v1L = capacity(5, Modes.Byte, 1, "L").capacity;
  const v1M = capacity(5, Modes.Byte, 1, "M").capacity;
  const v1Q = capacity(5, Modes.Byte, 1, "Q").capacity;
  const v1H = capacity(5, Modes.Byte, 1, "H").capacity;
  assertEquals(v1L > v1M, true);
  assertEquals(v1M > v1Q, true);
  assertEquals(v1Q > v1H, true);
});

Deno.test("capacity supports non-Byte modes and EC-only selection", () => {
  const result = capacity(12, Modes.Alphanumeric, undefined, "H");
  assertEquals(result.ec, 3);
  assertEquals(result.mode, Modes.Alphanumeric);
  assert(result.capacity >= 12);
});

Deno.test("capacity selects the first valid version for Kanji mode with EC Q", () => {
  const result = capacity(20, Modes.Kanji, undefined, "Q");
  assertEquals(result.ec, 2);
  assertEquals(result.mode, Modes.Kanji);
  assert(result.version >= 1 && result.version <= 40);
});

Deno.test("capacity fixed version with exact limit returns without error", () => {
  const limit = capacities[1 * 16 + 3 * 4 + 2];
  const result = capacity(limit, Modes.Byte, 2, "H");
  assertEquals(result.capacity, limit);
  assertEquals(result.version, 2);
  assertEquals(result.ec, 3);
});
