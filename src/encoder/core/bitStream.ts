import type { Modes } from "./constants.ts";

/**
 * Constructs the QR code bit stream from mode, character count, data packs, and available codewords.
 *
 * @param mode The encoding mode used for the segment.
 * @param count A tuple containing the character count and its bit length.
 * @param data Encoded data packs for the segment.
 * @param codeword The number of codewords available for this version and error correction level.
 * @returns A Uint8Array containing the formatted bit stream, including terminator and padding.
 */

function bitStream(
  mode: Modes,
  count: Uint16Array,
  data: Uint16Array,
  codewords: number,
): Uint8Array {
  const bytes = new Uint8Array(codewords);
  const max = codewords * 8; // max capacity
  const PAD_BYTES = [236, 17]; // 0xEC, 0x11

  let offset = 0;

  // The 32-bit CPU-register workspace window
  let register = 0;
  let bits = 0; // bits in the register
  let total = 0; // total written

  // High-performance inline function to push full blocks of bits into the register at once
  const write = (value: number, size: number) => {
    // Prevent writing past the physical QR code data capacity bounds
    if (total >= max) return;
    if (total + size > max) {
      size = max - total; // Truncate if overflowing total bounds
    }

    // Push the entire value into the register in a single machine operation
    register = (register << size) | (value & ((1 << size) - 1));
    bits += size;
    total += size;

    // Extract full 8-bit bytes while the register contains them
    while (bits >= 8) {
      bits -= 8;
      const byte = (register >> bits) & 0xFF;
      bytes[offset++] = byte;
    }
  };

  // 1. Write Mode Indicator (4 bits)
  write(mode, 4);

  // 2. Write Character Count Indicator (Reads from unified 2-slot Uint16Array)
  write(count[0], count[1]);

  // 3. Write Data Bits (Reads from unified flat Uint16Array)
  const dataLen = data.length;
  for (let i = 0; i < dataLen; i += 2) {
    write(data[i], data[i + 1]);
  }

  // 4. Terminator (Up to 4 zero bits)
  const terminatorSize = Math.min(4, max - total);
  if (terminatorSize > 0) {
    write(0, terminatorSize);
  }

  // 5. Pad to next Byte Boundary
  if (bits > 0) {
    const paddingNeeded = 8 - bits;
    // Shift left to pad trailing zeros to the right edge of the byte block
    register <<= paddingNeeded;
    bytes[offset++] = register & 0xFF;
    total += paddingNeeded;

    // Reset our working register states
    bits = 0;
    register = 0;
  }

  // 6. Fill remaining capacity with alternating PAD_BYTES
  let toggle = 0;
  while (offset < codewords) {
    bytes[offset++] = PAD_BYTES[toggle % 2];
    toggle++;
  }

  return bytes;
}

export { bitStream };
