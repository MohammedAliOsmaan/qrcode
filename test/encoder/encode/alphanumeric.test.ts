import { assertEquals, assertThrows } from "@std/assert";
import { alpha } from "../../../src/encoder/encode/alphanumeric.ts";

Deno.test("test out range characters", () => {
  const data = "a";
  assertThrows(() => {
    alpha(data);
  }, Error);
});

Deno.test("test the 1 digits", () => {
  const data = "A";
  assertEquals(alpha(data), new Uint16Array([10, 6]));
});

Deno.test("test the 2 digits", () => {
  const data = "AB";
  assertEquals(alpha(data), new Uint16Array([461, 11]));
});
