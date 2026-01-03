import { numeric } from "./numeric.ts";
import { alpha } from "./alphanumeric.ts";
import { byte } from "./byte.ts";
import { kanji } from "./kanji.ts";
import { Modes } from "../core/constants.ts";

/**
 * Encodes a string in the specified mode for QR codes.
 * The encoding modes include Numeric, Alphanumeric, Byte, and Kanji.
 *
 * @param input - The input string to encode.
 * @param mode - The encoding mode to use.
 * @returns An array of binary strings representing the encoded input.
 * @throws Error if an unsupported encoding mode is specified.
 */

export function encode(input: string, mode: Modes): string[] {
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