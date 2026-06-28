import { Modes } from "../core/constants.ts";
import { lookup } from "../core/kanji/lookup.ts";

/**
 * Determines the QR code encoding mode for the provided input.
 *
 * @param input The value to analyze.
 * @returns The detected QR code mode.
 */

function analyze(input: string | number): Modes {
  input = input.toString();

  // 1. Numeric check
  if (/^[0-9]+$/.test(input as string)) {
    return Modes.Numeric;
  }

  // 2. Alphanumeric check
  if (/^[0-9A-Z $%*+\-./:]+$/.test(input)) {
    return Modes.Alphanumeric;
  }

  // 3. Byte check (Latin-1 / ISO-8859-1)
  if (/^[\u0020-\u007E\u00A0-\u00FF]+$/.test(input)) {
    return Modes.Byte;
  }

  // 4. Kanji check using the range registry

  let isKanji = false;
  for (let i = 0; i < input.length; i++) {
    if (lookup(input[i]) !== null) {
      isKanji = true;
      break; // Immediately exit early on the first non-kanji match!
    }
  }

  if (isKanji) {
    return Modes.Kanji;
  }

  throw new Error("Unsupported input format");
}

export { analyze };
