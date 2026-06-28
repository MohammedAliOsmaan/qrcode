import { analyze } from "./analyze/analyze.ts";
import { characterCount } from "./character-count/character-count.ts";
import { bitStream } from "./core/bitStream.ts";
import { capacity } from "./core/capacity.ts";
import { encode } from "./encode/encode.ts";
import { codeword } from "./core/codeword.ts";
import { division, generator } from "./ec/rs.ts";
import { block, interleave } from "./core/interleave.ts";
import { matrix } from "./matrix/matrix.ts";
import type { Capacity, Options, QRCode } from "./types/types.ts";

const ecMap = new Map<number, string>([
  [0, "L"],
  [1, "M"],
  [2, "Q"],
  [3, "H"],
]);

/**
 * QR code generator that encodes input data, applies error correction, and builds a matrix.
 */

class Encoder {
  /**
   * Encodes input data into a compliant ISO/IEC 18004 QR Code matrix.
   *
   * This method analyzes the input, automatically determines the optimal encoding mode
   * (Numeric, Alphanumeric, Byte, or Kanji), calculates the required Reed-Solomon error
   * correction codewords, and evaluates all 8 mask patterns (0–7) to select the layout
   * with the lowest penalty score.
   *
   * @param {string | number} input - The raw data string or number to encode.
   * @param {Object} [options] - Configuration options for the encoder.
   *
   * @returns {EncoderResult} The calculated layout matrix and structural metadata.
   *
   * @example
   * // Basic auto-configured generation
   * const result = QR.Encoder.encode("Hello, World!");
   * console.log(`Generated Version ${result.version} using Mask Pattern ${result.mask}`);
   *
   * @example
   * // Forcing high-density error correction for extreme environments
   * const highReliability = QR.Encoder.encode("https://deno.land", { ec: "H" });
   */
  public static encode(input: string | number, options?: Options): QRCode {
    const mode = analyze(input);
    const length = input.toString().length;

    if (length == 0) throw RangeError("Can't build with empty string");

    const { version, ec }: Capacity = capacity(
      length,
      mode,
      options?.version,
      options?.ec,
    );

    const modules = version * 4 + 17;

    const count = characterCount(version, mode, length);
    const data = encode(input, mode);

    const cw = codeword(version, ec);
    const bytes = bitStream(mode, count, data, cw.codewords);

    const blocks: { data: Uint8Array[]; ec?: Uint8Array[] } = {
      data: block(bytes, cw.groups),
    };

    const gen = generator(cw.ecCodewords);

    // Allocate ONE shared scratchpad buffer.
    // A size of 512 bytes safely covers the largest block size combination possible.
    const scratch = new Uint8Array(512);

    const ecBlocks: Uint8Array[] = new Array(blocks.data.length);

    // Use an explicit fast index loop instead of .map()
    for (let b = 0; b < blocks.data.length; b++) {
      // Pass the same rsScratchBuffer down to be recycled
      ecBlocks[b] = division(blocks.data[b], gen, scratch);
    }

    blocks.ec = ecBlocks;

    const interleaved = {
      data: interleave(blocks.data, blocks.data.length),
      ec: interleave(blocks.ec!, blocks.ec!.length),
    };

    const total = (cw.groups[0].blocks + (cw.groups[1]?.blocks || 0)) *
      cw.ecCodewords;

    const message = new Uint8Array(cw.codewords + total);

    message.set(interleaved.data, 0);
    message.set(interleaved.ec, cw.codewords);

    const { grid, mask } = matrix(message, ec, modules, options?.mask);

    return {
      input,
      length,
      mode: mode,
      version: options?.version ?? version,
      ec: options?.ec ?? ecMap.get(ec)!,
      modules,
      mask,
      matrix: grid,
    };
  }
}

export { Encoder };
