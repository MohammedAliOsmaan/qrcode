// character_count_bits.test.ts
import { assertEquals } from "jsr:@std/assert";
import { characterCount } from "../src/character_count/character_count.ts";
import { Modes } from "../src/utils/constants.ts";

Deno.test("characterCount - versions 1 through 9", () => {
  for (let v = 1; v <= 9; v++) {
    assertEquals(characterCount(v, Modes.Numeric), 10);
    assertEquals(characterCount(v, Modes.Alphanumeric), 9);
    assertEquals(characterCount(v, Modes.Byte), 8);
    assertEquals(characterCount(v, Modes.Kanji), 8);
  }
});

Deno.test("characterCount - versions 10 through 26", () => {
  for (let v = 10; v <= 26; v++) {
    assertEquals(characterCount(v, Modes.Numeric), 12);
    assertEquals(characterCount(v, Modes.Alphanumeric), 11);
    assertEquals(characterCount(v, Modes.Byte), 16);
    assertEquals(characterCount(v, Modes.Kanji), 10);
  }
});

Deno.test("characterCount - versions 27 through 40", () => {
  for (let v = 27; v <= 40; v++) {
    assertEquals(characterCount(v, Modes.Numeric), 14, `failed at version ${v} with Numeric`);
    assertEquals(characterCount(v, Modes.Alphanumeric), 13, `failed at version ${v} with Alphanumeric`);
    assertEquals(characterCount(v, Modes.Byte), 16 , `failed at version ${v} with Byte`);
    assertEquals(characterCount(v, Modes.Kanji), 12 , `failed at version ${v} with Kanji`);
  }
});