// character_count_bits.test.ts
import { assertEquals, assertThrows } from "@std/assert";
import { characterCount } from "../../../src/encoder/character-count/character-count.ts";
import { Modes } from "../../../src/encoder/core/constants.ts";

Deno.test("characterCount - valid cases", () => {
  const cases = [
    // Versions 1–9
    { version: 1, mode: Modes.Numeric, length: 5, pad: 10 },
    { version: 1, mode: Modes.Alphanumeric, length: 5, pad: 9 },
    { version: 1, mode: Modes.Byte, length: 5, pad: 8 },
    { version: 1, mode: Modes.Kanji, length: 5, pad: 8 },
    { version: 9, mode: Modes.Numeric, length: 5, pad: 10 },

    // Versions 10–26
    { version: 10, mode: Modes.Numeric, length: 12, pad: 12 },
    { version: 10, mode: Modes.Alphanumeric, length: 12, pad: 11 },
    { version: 10, mode: Modes.Byte, length: 12, pad: 16 },
    { version: 10, mode: Modes.Kanji, length: 12, pad: 10 },
    { version: 26, mode: Modes.Numeric, length: 12, pad: 12 },

    // Versions 27–40
    { version: 27, mode: Modes.Numeric, length: 25, pad: 14 },
    { version: 27, mode: Modes.Alphanumeric, length: 25, pad: 13 },
    { version: 27, mode: Modes.Byte, length: 25, pad: 16 },
    { version: 27, mode: Modes.Kanji, length: 25, pad: 12 },
    { version: 40, mode: Modes.Numeric, length: 25, pad: 14 },
  ];

  for (const { version, mode, length, pad } of cases) {
    const result = characterCount(version, mode as Modes, length);
    assertEquals(result[0], length);
    assertEquals(result[1], pad);
  }
});

Deno.test("characterCount - invalid versions and mode", () => {
  assertThrows(
    () => characterCount(0, Modes.Numeric, 5),
    Error,
    "Invalid version number",
  );

  assertThrows(
    () => characterCount(41, Modes.Numeric, 5),
    Error,
    "Invalid version number",
  );

  assertThrows(
    () => characterCount(1, 0 as Modes, 5),
    Error,
    "Unsupported mode",
  );

  assertThrows(
    () => characterCount(1, 10 as Modes, 5),
    Error,
    "Unsupported mode",
  );
});

Deno.test("characterCount respects ISO version ranges (1-9, 10-26, 27-40)", () => {
  const v1_9 = characterCount(5, Modes.Numeric, 42);
  assertEquals(v1_9[1], 10);
  const v10_26 = characterCount(15, Modes.Numeric, 42);
  assertEquals(v10_26[1], 12);
  const v27_40 = characterCount(35, Modes.Numeric, 42);
  assertEquals(v27_40[1], 14);
});

Deno.test("characterCount bit lengths decrease Numeric >= Alphanumeric >= Byte >= Kanji", () => {
  const numeric = characterCount(1, Modes.Numeric, 42)[1];
  const alpha = characterCount(1, Modes.Alphanumeric, 42)[1];
  const byte = characterCount(1, Modes.Byte, 42)[1];
  const kanji = characterCount(1, Modes.Kanji, 42)[1];
  assertEquals(numeric >= alpha, true);
  assertEquals(alpha >= byte, true);
  assertEquals(byte >= kanji, true);
});
