import { EC } from "./constants.ts";
import type { Codeword } from "../types/types.ts";

/**
 * Get codeword information for a specific QR version and error correction level.
 */

function codeword(version: number, level: number): Codeword {
  const offset = ((version - 1) * 4 + level) * 6;

  if (version < 1 || version > 40) {
    throw new RangeError(
      `QR version must be between 1 and 40. Received: ${version}`,
    );
  }

  if (level < 0 || level > 3) {
    throw new RangeError("Level must be between 0 and 3");
  }

  const data = {
    codewords: EC[offset],
    ecCodewords: EC[offset + 1],
    groups: [
      { blocks: EC[offset + 2], dataCodewords: EC[offset + 3] },
      ...(EC[offset + 4] > 0
        ? [{ blocks: EC[offset + 4], dataCodewords: EC[offset + 5] }]
        : []),
    ],
  };

  return data;
}

export { codeword };
