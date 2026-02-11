import { assertEquals } from "jsr:@std/assert@1.0.18";
import { encode } from "../../src/encode/encode.ts";
import { Modes } from "../../src/core/constants.ts";

// Helper to compare binary strings
function assertBinary(actual: string, expected: string, message?: string) {
  assertEquals(actual, expected, `Expected ${expected} but got ${actual} correct value. ${message || ""}`);
}

// ---- Numeric Mode Tests ----
Deno.test("Numeric Mode - Basic Encoding", () => {
  assertBinary(
    encode("12345678", Modes.Numeric).join(""),
    "000111101101110010001001110" // 123=0001111011, 456=0011101000, 78=1001110
  );
});

Deno.test("Numeric Mode - Leading Zeros", () => {
  assertBinary(
    encode("001234", Modes.Numeric).join(""),
    "00000000010011101010" // 001=0000000001, 234=0011101000
  );
});

// ---- Alphanumeric Mode Tests ----
Deno.test("Alphanumeric Mode - Basic Encoding", () => {
  assertBinary(
    encode("AB12", Modes.Alphanumeric).join(""),
    "0011100110100000101111" // AB=0111001101 (461), 12=001011011 (91)
  );
});

Deno.test("Alphanumeric Mode - Special Chars", () => {
  assertBinary(
    encode("A*B", Modes.Alphanumeric).join(""),
    "00111101001001011" // A*=01110011111 (463), B=100010 (34)
  );
});

// ---- Byte Mode Tests ----
Deno.test("Byte Mode - ASCII Encoding", () => {
  assertBinary(
    encode("QR", Modes.Byte).join(""),
    "0101000101010010" // Q=01010001, R=01010010
  );
});

Deno.test("Byte Mode - Extended ASCII", () => {
  assertBinary(
    encode("é", Modes.Byte).join(""),
    "11101001" // UTF-8 encoding of 'é'
  );
});

// ---- Kanji Mode Tests ----
Deno.test("Kanji Mode - Basic Encoding", () => {
  // Test with Shift JIS encoded Kanji character "茗" (0x935F)
  assertBinary(
    encode("茗", Modes.Kanji).join(""), 
    "1101010101010" // 0x935F → 0x0CDF → 110011011111
  );
});

// Deno.test("Kanji Mode - Invalid Input", () => {
//   assertEquals(
//     () => encode("A", Modes.Kanji),
//     throws(/Invalid Kanji character/),
//     "Should reject non-Kanji chars"
//   );
// });

// ---- Integration Test ----
Deno.test("Mode Detection Integration", () => {
  // Numeric
  assertBinary(encode("123", Modes.Numeric)[0], "0001111011");
  // Alphanumeric
  assertBinary(encode("AB", Modes.Alphanumeric)[0], "00111001101");
  // Byte
  assertBinary(encode("Q", Modes.Byte)[0], "01010001");
});