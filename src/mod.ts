/**
 * @module QR
 * QR Code encoding engine implementing the ISO/IEC 18004 pipeline and generating specification-compliant module matrices.
 */

import { Encoder } from "./encoder/mod.ts";

/**
 * The primary entry point for the specification-compliant QR Code engine.
 * Contains underlying algorithms for matrix sizing, error correction masking, and data bitstream layouts.
 */
const QR = {
  /**
   * The core QR code compilation system. Handles low-level encoding,
   * polynomial arithmetic, and mask evaluations to generate module matrices.
   */
  encode: Encoder.encode,
};

export { QR };
