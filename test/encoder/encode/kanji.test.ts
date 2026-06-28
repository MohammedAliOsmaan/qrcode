import { assertEquals, assertThrows } from "@std/assert";
import { kanji } from "../../../src/encoder/encode/kanji.ts";

Deno.test("kanji encodes characters in first range", () => {
  // U+3000 maps to 0x8140 per constants; should produce one 13-bit value
  const bits = kanji("\u3000");
  assertEquals(bits.length, 2);
  assertEquals(bits[1], 13);
});

Deno.test("kanji encodes characters in second range", () => {
  // U+6F02 maps to 0xE04C per lookup; should produce one 13-bit value
  const bits = kanji("\u8317");
  assertEquals(bits.length, 2);
  assertEquals(bits[0], 0b1101010101010);
});

Deno.test("kanji throws for unsupported characters", () => {
  assertThrows(() => kanji(0), Error);
});
