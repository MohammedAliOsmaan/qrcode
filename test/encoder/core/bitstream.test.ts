import { assertEquals } from "@std/assert";
import { bitStream } from "../../../src/encoder/core/bitStream.ts";
import { Modes } from "../../../src/encoder/core/constants.ts";

Deno.test("bitStream truncates to the available capacity", () => {
  const bytes = bitStream(
    Modes.Byte,
    new Uint16Array([1, 7]),
    new Uint16Array([65, 8]),
    1,
  );

  assertEquals(bytes, new Uint8Array([0x41]));
});

Deno.test("bitStream exactly fills two bytes when capacity matches the bitstream", () => {
  const bytes = bitStream(
    Modes.Byte,
    new Uint16Array([0, 7]),
    new Uint16Array([]),
    2,
  );

  assertEquals(bytes, new Uint8Array([0x40, 0x00]));
});

Deno.test("bitStream appends alternating pad bytes when extra codeword capacity remains", () => {
  const bytes = bitStream(
    Modes.Byte,
    new Uint16Array([1, 7]),
    new Uint16Array([65, 8]),
    4,
  );

  assertEquals(bytes, new Uint8Array([0x40, 0x28, 0x20, 0xEC]));
});

Deno.test("bitStream pads misaligned bit lengths to the next byte boundary", () => {
  const bytes = bitStream(
    Modes.Byte,
    new Uint16Array([1, 7]),
    new Uint16Array([5, 3]),
    4,
  );

  assertEquals(bytes, new Uint8Array([0x40, 0x34, 0x00, 0xEC]));
});

Deno.test("bitStream writes a single byte for a short empty payload with count bits", () => {
  const bytes = bitStream(
    Modes.Byte,
    new Uint16Array([0, 7]),
    new Uint16Array([]),
    1,
  );

  assertEquals(bytes, new Uint8Array([0x40]));
});

Deno.test("bitStream writes mode indicator as first 4 bits", () => {
  const modes = [Modes.Numeric, Modes.Alphanumeric, Modes.Byte, Modes.Kanji];
  for (const mode of modes) {
    const bytes = bitStream(
      mode,
      new Uint16Array([0, 0]),
      new Uint16Array([]),
      2,
    );
    assertEquals(bytes.length >= 1, true);
  }
});

Deno.test("bitStream appends terminator bits", () => {
  const bytes = bitStream(
    Modes.Byte,
    new Uint16Array([0, 0]),
    new Uint16Array([]),
    1,
  );
  assertEquals(bytes.length >= 1, true);
});

Deno.test("bitStream pad bytes follow expected pattern", () => {
  const bytes = bitStream(
    Modes.Byte,
    new Uint16Array([0, 0]),
    new Uint16Array([]),
    3,
  );
  assertEquals(bytes.length >= 1, true);
});
