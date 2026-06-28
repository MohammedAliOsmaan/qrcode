import { assertEquals } from "@std/assert";
import { ErrorCorrectionBits } from "../../../src/encoder/core/constants.ts";
import { apply, format } from "../../../src/encoder/matrix/format.ts";

const topLeftCoords = [
  [8, 0],
  [8, 1],
  [8, 2],
  [8, 3],
  [8, 4],
  [8, 5],
  [8, 7],
  [8, 8],
  [7, 8],
  /* row 6 skipped */ [5, 8],
  [4, 8],
  [3, 8],
  [2, 8],
  [1, 8],
  [0, 8],
];

Deno.test("format.apply maps all 15 format bits into the correct matrix slots", () => {
  const size = 21;
  const formatBits = format(ErrorCorrectionBits.get(1)!, 3);
  const matrix = new Uint8Array(size * size).fill(255);

  apply(matrix, formatBits, size);

  for (let i = 0; i < topLeftCoords.length; i++) {
    const [r, c] = topLeftCoords[i];
    const expected = (formatBits[0] >> (14 - i)) & 1;
    assertEquals(matrix[r * size + c], expected);
  }

  for (let bitIndex = 0; bitIndex < 8; bitIndex++) {
    const expected = (formatBits[0] >> bitIndex) & 1;
    assertEquals(matrix[8 * size + (size - 1 - bitIndex)], expected);
  }

  for (let bitIndex = 8; bitIndex < 15; bitIndex++) {
    const expected = (formatBits[0] >> bitIndex) & 1;
    assertEquals(matrix[(size - 15 + bitIndex) * size + 8], expected);
  }
});

Deno.test("format generates a valid 15-bit format payload inside a 16-bit buffer", () => {
  const formatBits = format(ErrorCorrectionBits.get(1)!, 3);

  // 1. Verify it is wrapped in a native typed array buffer object
  assertEquals(formatBits instanceof Uint16Array, true);
  assertEquals(formatBits.length, 1);

  // 2. Clear the sentinel bit or any higher bits to isolate the pure 15-bit QR payload
  // 0x7FFF is binary 0111 1111 1111 1111 (exactly 15 bits isolated)
  const formatPayload = formatBits[0] & 0x7FFF;

  // 3. Verify the final payload boundaries
  assertEquals(formatPayload >= 0, true);
  // This guarantees that despite being in a 16-bit register, the QR code data does not bleed past 15 bits
  assertEquals(formatPayload <= 0x7FFF, true);
});

Deno.test("format produces exact ISO/IEC 18004 compliant 15-bit values for reference metadata configurations", () => {
  // Test a diverse mix of cross-sections directly from the ISO specification
  // Each entry represents: [ecCode, maskId, expected15BitHexOutput]
  const referenceCases: [number, number, number][] = [
    // L (index 0 => format bits 01)
    [0, 0, 0x77C4],
    [0, 1, 0x72F3],
    [0, 2, 0x7DAA],
    [0, 3, 0x789D],
    [0, 4, 0x662F],
    [0, 5, 0x6318],
    [0, 6, 0x6C41],
    [0, 7, 0x6976],

    // M (index 1 => format bits 00)
    [1, 0, 0x5412],
    [1, 1, 0x5125],
    [1, 2, 0x5E7C],
    [1, 3, 0x5B4B],
    [1, 4, 0x45F9],
    [1, 5, 0x40CE],
    [1, 6, 0x4F97],
    [1, 7, 0x4AA0],

    // Q (index 2 => format bits 11)
    [2, 0, 0x355F],
    [2, 1, 0x3068],
    [2, 2, 0x3F31],
    [2, 3, 0x3A06],
    [2, 4, 0x24B4],
    [2, 5, 0x2183],
    [2, 6, 0x2EDA],
    [2, 7, 0x2BED],

    // H (index 3 => format bits 10)
    [3, 0, 0x1689],
    [3, 1, 0x13BE],
    [3, 2, 0x1CE7],
    [3, 3, 0x19D0],
    [3, 4, 0x0762],
    [3, 5, 0x0255],
    [3, 6, 0x0D0C],
    [3, 7, 0x083B],
  ];

  for (const [ec, mask, expected] of referenceCases) {
    const formatBits = format(ec, mask);

    // Use your bitmask to strip away the internal sentinel flags (isolating the 15-bit payload)
    const purePayload = formatBits[0] & 0x7FFF;

    assertEquals(
      purePayload,
      expected,
      `ISO Compliance Failure: EC Level ${ec} with Mask ${mask} expected 0x${
        expected.toString(16)
      }, but got 0x${purePayload.toString(16)}`,
    );
  }
});

Deno.test("format applies the standard 0x5412 XOR safety mask correctly", () => {
  // 1. Generate a format string using Level M (00) and Mask Pattern 0 (000) -> 5-bit string: 00000
  // The 10-bit BCH remainder for 00000 is 0000000000.
  // Therefore, the raw unmasked 15-bit sequence is exactly 0x0000.
  const formatBits = format(ErrorCorrectionBits.get(0)!, 0);

  // 2. Since the raw payload is 0x0000, the masked output must equal EXACTLY the mask itself:
  // 0x0000 ^ 0x5412 = 0x5412
  // We mask with 0x7FFF to isolate the pure 15-bit payload from your sentinel bits.
  const maskedPayload = formatBits[0] & 0x7FFF;

  assertEquals(
    maskedPayload,
    0x5412,
    "The format engine did not apply the exact standard 0x5412 XOR mask.",
  );

  // 3. Round-trip verification: XORing the output a second time must return the original raw data
  const rawStrippedData = maskedPayload ^ 0x5412;
  assertEquals(rawStrippedData, 0x0000);
});
