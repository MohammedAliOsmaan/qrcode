import { assertEquals, assertThrows } from "@std/assert";
import { encode } from "../../../src/encoder/encode/encode.ts";
import { Modes } from "../../../src/encoder/core/constants.ts";

Deno.test("encode() throws for invalid numeric input", () => {
  assertThrows(() => encode("a", Modes.Numeric), Error);
});

Deno.test("encode() numeric mode packs digits with correct bit lengths", () => {
  assertEquals(encode("1", Modes.Numeric), new Uint16Array([1, 4]));
  assertEquals(encode("12", Modes.Numeric), new Uint16Array([12, 7]));
  assertEquals(encode("123", Modes.Numeric), new Uint16Array([123, 10]));
  assertEquals(encode("1234", Modes.Numeric), new Uint16Array([123, 10, 4, 4]));
});

Deno.test("encode() alphanumeric mode produces 11-bit pairs for even lengths", () => {
  assertEquals(encode("AB", Modes.Alphanumeric), new Uint16Array([461, 11]));
});

Deno.test("encode() alphanumeric mode handles a trailing odd character", () => {
  assertEquals(encode("A", Modes.Alphanumeric), new Uint16Array([10, 6]));
  assertEquals(
    encode("ABC", Modes.Alphanumeric),
    new Uint16Array([461, 11, 12, 6]),
  );
});

Deno.test("encode() rejects invalid alphanumeric characters", () => {
  assertThrows(() => encode("a", Modes.Alphanumeric), Error);
});

Deno.test("encode() byte mode emits 8-bit values for ASCII text", () => {
  assertEquals(encode("Hi", Modes.Byte), new Uint16Array([72, 8, 105, 8]));
});

Deno.test("encode() rejects byte characters outside Latin-1", () => {
  assertThrows(() => encode("😀", Modes.Byte), Error);
});

Deno.test("encode() kanji mode emits 13-bit packs for valid characters", () => {
  const packed = encode("\u3000", Modes.Kanji);
  assertEquals(packed.length, 2);
  assertEquals(packed[1], 13);
});

Deno.test("encode() rejects unsupported modes", () => {
  assertThrows(() => encode("123", 999 as Modes), Error);
});

Deno.test("encode() numeric mode: all digits 0-9 process correctly", () => {
  for (let i = 0; i <= 9; i++) {
    const result = encode(String(i), Modes.Numeric);
    assertEquals(result.length >= 2, true);
    assertEquals(result[1] >= 4, true);
  }
});

Deno.test("encode() alphanumeric: exact charset validation", () => {
  assertEquals(encode("HELLO WORLD", Modes.Alphanumeric).length >= 2, true);
  assertEquals(encode("$%*+-./:123", Modes.Alphanumeric).length >= 2, true);
  assertThrows(() => encode("hello", Modes.Alphanumeric));
  assertThrows(() => encode("Test@123", Modes.Alphanumeric));
});

Deno.test("encode() byte mode: Latin-1 range (0x00-0xFF) support", () => {
  assertEquals(encode("café", Modes.Byte).length >= 2, true);
  assertEquals(encode("Ñoño", Modes.Byte).length >= 2, true);
});

Deno.test("encode() always returns Uint16Array format [value, bitLength, ...]", () => {
  const result = encode("123", Modes.Numeric);
  assertEquals(result instanceof Uint16Array, true);
  for (let i = 0; i < result.length; i++) {
    assertEquals(typeof result[i], "number");
  }
});
