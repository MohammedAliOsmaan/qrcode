import { numeric } from "./numeric.ts";
import { alpha } from "./alphanumeric.ts";
import { byte } from "./byte.ts";
import { kanji } from "./kanji.ts";
import { Modes } from "../core/constants.ts";
import type { Packs } from "../types/types.ts";

/**
 * Encodes the input string or number into QR code data packs for the specified mode.
 *
 * @param input The value to encode.
 * @param mode The QR code encoding mode.
 * @returns An array of encoded data packs ready for bit stream assembly.
 */

function encode(input: string | number, mode: Modes): Packs {
  switch (mode) {
    case Modes.Numeric:
      return numeric(input);
    case Modes.Alphanumeric:
      return alpha(input);
    case Modes.Byte:
      return byte(input);
    case Modes.Kanji:
      return kanji(input);
    default:
      throw new Error(`Unsupported encoding mode: ${mode}`);
  }
}

export { encode };
