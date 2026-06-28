import { assertEquals, assertThrows } from "@std/assert";
import { apply, version } from "../../../src/encoder/matrix/version.ts";

// Helper bitmask to strip away any potential structural high-bit sentinel flags
// 0x3FFFF isolates exactly the lower 18 bits of the payload
const versionMask = 0x3FFFF;

Deno.test("version() yields a valid 18-bit payload container inside a flat typed array", () => {
  const versionBits = version(7);

  // Verify your flat memory allocation structure is preserved
  assertEquals(versionBits instanceof Uint32Array, true);
  assertEquals(versionBits.length, 1);

  const purePayload = versionBits[0] & versionMask;
  assertEquals(purePayload >= 0, true);
  assertEquals(purePayload <= versionMask, true);
});

Deno.test("version() throws for out-of-bounds QR versions", () => {
  assertThrows(() => version(0));
  assertThrows(() => version(6)); // Versions 1-6 do not have version info blocks
  assertThrows(() => version(41)); // QR specification maxes out at Version 40
});

Deno.test("version() produces exact ISO/IEC 18004 compliant 18-bit BCH sequences", () => {
  // Golden-master lookup table directly from the global hardware reference specification
  const versions: Record<number, number> = {
    7: 0x07C94,
    8: 0x085BC,
    9: 0x09A99,
    10: 0x0A4D3,
    11: 0x0BBF6,
    12: 0x0C762,
    13: 0x0D847,
    14: 0x0E60D,
    15: 0x0F928,
    16: 0x10B78,
    17: 0x1145D,
    18: 0x12A17,
    19: 0x13532,
    20: 0x149A6,
    21: 0x15683,
    22: 0x168C9,
    23: 0x177EC,
    24: 0x18EC4,
    25: 0x191E1,
    26: 0x1AFAB,
    27: 0x1B08E,
    28: 0x1CC1A,
    29: 0x1D33F,
    30: 0x1ED75,
    31: 0x1F250,
    32: 0x209D5,
    33: 0x216F0,
    34: 0x228BA,
    35: 0x2379F,
    36: 0x24B0B,
    37: 0x2542E,
    38: 0x26A64,
    39: 0x27541,
    40: 0x28C69,
  };

  for (const [v, expected] of Object.entries(versions)) {
    const ver = parseInt(v, 10);
    const verBits = version(ver);

    // Isolate the payload from your active structural flags
    const purePayload = verBits[0] & versionMask;

    assertEquals(
      purePayload,
      expected,
      `ISO Compliance Failure: Version ${ver} expected 0x${
        expected.toString(16)
      }, but got 0x${purePayload.toString(16)}`,
    );
  }
});

Deno.test("apply() accurately maps version bits using internal size-to-version calculation", () => {
  const v = 7;
  const size = 17 + 4 * v; // Formula inversion: size = 45
  const matrix = new Uint8Array(size * size).fill(255);

  // Isolate a clean local reference copy of the bits for test assertion verification
  const versionBits = version(v);

  // Invoke using your exact internal signature
  apply(matrix, size);

  // Verify the twin 3x6 layout blocks bit by bit
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 3; j++) {
      const bitIndex = i * 3 + j;
      const expected = (versionBits[0] >> bitIndex) & 1;

      // Top-Right Layout Block (positioned right next to the Finder pattern layout)
      assertEquals(matrix[i * size + (size - 11 + j)], expected);

      // Bottom-Left Layout Block (positioned right above the Finder pattern layout)
      assertEquals(matrix[(size - 11 + j) * size + i], expected);
    }
  }
});

Deno.test("apply() skips layout writing entirely for matrices under Version 7", () => {
  // Iterating through sizes that compute to Versions 1 through 6
  for (let v = 1; v <= 6; v++) {
    const size = 17 + 4 * v;
    const matrix = new Uint8Array(size * size).fill(255);

    apply(matrix, size);

    // For versions 1-6, the matrix modules must remain completely unmutated (pure background 255)
    assertEquals(matrix.every((cell) => cell === 255), true);
  }
});

Deno.test("apply() executes writing successfully for versions 7 through 9", () => {
  for (let v = 7; v <= 9; v++) {
    const size = 17 + 4 * v;
    const matrix = new Uint8Array(size * size).fill(255);

    apply(matrix, size);

    // Ensures that structural changes were made to the background matrix
    assertEquals(matrix.some((cell) => cell !== 255), true);
  }
});
