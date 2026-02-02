import { assertEquals } from "https://deno.land/std@0.200.0/testing/asserts.ts";
import { bitStream } from "../../src/core/bitStream.ts";
import { Modes } from "../../src/core/constants.ts";

Deno.test("bitStream fills to codeword length with pad bytes", () => {
    // small capacity to force at least one pad byte
    const codewords = 4; // 4 bytes = 32 bits
    const bytes = bitStream(Modes.Byte, "00000001", ["01000001"], codewords);

    assertEquals(bytes.length, codewords);
    // last byte should always be the first pad byte 0xEC
    assertEquals(bytes[bytes.length - 1], "11101100");
});

Deno.test("bitStream truncates if data exceeds capacity", () => {
    const codewords = 1; // 8 bits
    // supply lots of bits so it's larger than capacity
    const bits = Array(100).fill("1");
    const bytes = bitStream(Modes.Byte, "00000001", bits, codewords);

    assertEquals(bytes.length, 1);
});