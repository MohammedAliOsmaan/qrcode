import { assertEquals, assertThrows } from "@std/assert";
import { byte } from "../../../src/encoder/encode/byte.ts";

Deno.test("byte encodes ASCII characters", () => {
  // 'A' = 65 in ASCII
  assertEquals(byte("A"), new Uint16Array([65, 8]));
});

Deno.test("byte encodes multiple characters", () => {
  // "AB" = 65, 66
  assertEquals(byte("AB"), new Uint16Array([65, 8, 66, 8]));
});

Deno.test("byte throws on out of range characters", () => {
  // Emoji is out of 8-bit range
  assertThrows(() => byte("😀"), Error);
});
