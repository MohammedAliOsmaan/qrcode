// character_count_bits.test.ts
import { assertEquals } from "jsr:@std/assert";
import { characterCount } from "../../src/character-count/character-count.ts";
import { Modes } from "../../src/core/constants.ts";

// Helper to check if the string returned is the correct bit length 
// and correctly represents the number
const testLength = 1; // We'll test with a length of 1

Deno.test("characterCount - versions 1 through 9 returns correct bit strings", () => {
  for (let v = 1; v <= 9; v++) {
    assertEquals(characterCount(v, Modes.Numeric, testLength), "0000000001");      // 10 bits
    assertEquals(characterCount(v, Modes.Alphanumeric, testLength), "000000001");   // 9 bits
    assertEquals(characterCount(v, Modes.Byte, testLength), "00000001");            // 8 bits
    assertEquals(characterCount(v, Modes.Kanji, testLength), "00000001");           // 8 bits
  }
});

Deno.test("characterCount - versions 10 through 26 returns correct bit strings", () => {
  for (let v = 10; v <= 26; v++) {
    assertEquals(characterCount(v, Modes.Numeric, testLength), "000000000001");    // 12 bits
    assertEquals(characterCount(v, Modes.Alphanumeric, testLength), "00000000001"); // 11 bits
    assertEquals(characterCount(v, Modes.Byte, testLength), "0000000000000001");    // 16 bits
    assertEquals(characterCount(v, Modes.Kanji, testLength), "0000000001");         // 10 bits
  }
});

Deno.test("characterCount - versions 27 through 40 returns correct bit strings", () => {
  for (let v = 27; v <= 40; v++) {
    assertEquals(characterCount(v, Modes.Numeric, testLength), "00000000000001");   // 14 bits
    assertEquals(characterCount(v, Modes.Alphanumeric, testLength), "0000000000001"); // 13 bits
    assertEquals(characterCount(v, Modes.Byte, testLength), "0000000000000001");    // 16 bits
    assertEquals(characterCount(v, Modes.Kanji, testLength), "000000000001");       // 12 bits
  }
});
