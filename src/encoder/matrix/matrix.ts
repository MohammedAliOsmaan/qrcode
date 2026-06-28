import * as pattern from "./pattern.ts";
import { placement } from "./placement.ts";
import { apply as masker, mask } from "../mask/mask.ts";
import { apply as formatter, format } from "./format.ts";
import { apply as versioner } from "./version.ts";
import type { Matrix } from "../types/types.ts";

/**
 * Generates a QR code matrix and applies the selected mask and format information.
 *
 * @param message The encoded message bytes for the QR code.
 * @param ec The error correction level to use.
 * @param size The dimension of the QR code matrix.
 * @param maskID Optional mask pattern identifier to force.
 * @returns A Uint8Array representing the final QR code matrix.
 */

function matrix(
  message: Matrix,
  ec: number,
  size: number,
  maskID?: number,
): { grid: Uint8Array; mask: number } {
  const grid = new Uint8Array(size * size).fill(255);

  placement(grid, message, size);

  const maskId = maskID ?? mask(grid, size);

  // apply mask
  masker(grid, maskId, size);

  // --- functional patterns ---

  pattern.finder(grid, size);
  pattern.separator(grid, size);
  pattern.timing(grid, size);

  if (size >= 25) {
    pattern.alignment(grid, size);
  }

  pattern.module(grid, size);

  // apply format bits (always)
  formatter(grid, format(ec, maskId), size);

  if (size >= 45) {
    versioner(grid, size);
  }

  return { grid, mask: maskId };
}

export { matrix };
