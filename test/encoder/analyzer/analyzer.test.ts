import { assertEquals, assertThrows } from "@std/assert";
import { analyze } from "../../../src/encoder/analyze/analyze.ts";
import { Modes } from "../../../src/encoder/core/constants.ts";

Deno.test("analyze() detects numeric mode", () => {
  const inputs = ["0", "42", "1234567890"];
  for (const input of inputs) {
    assertEquals(analyze(input), Modes.Numeric);
  }
});

Deno.test("analyze() detects alphanumeric mode for uppercase input", () => {
  const inputs = ["HELLO WORLD", "ABC123$%*+-./:"];
  for (const input of inputs) {
    assertEquals(analyze(input), Modes.Alphanumeric);
  }
});

Deno.test("analyze() detects byte mode for lowercase and ISO-8859-1 input", () => {
  const inputs = ["Hello", "ñ", "ö", "ß", "Æ", "ç"];
  for (const input of inputs) {
    assertEquals(analyze(input), Modes.Byte, `Failed on byte input: ${input}`);
  }
});

Deno.test("Shift-JIS encoding for Kanji character", () => {
  assertEquals(analyze("漢"), Modes.Kanji);
});

Deno.test("Throw error for unsuppored characters", () => {
  assertThrows(() => analyze("😁"));
});

Deno.test("analyze() byte mode: Latin-1 (ISO-8859-1) characters", () => {
  assertEquals(analyze("café"), Modes.Byte);
  assertEquals(analyze("Ñoño"), Modes.Byte);
  assertEquals(analyze("résumé"), Modes.Byte);
  assertEquals(analyze("Hello, world!"), Modes.Byte);
});
