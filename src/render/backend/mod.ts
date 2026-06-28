import { svg } from "../svg.ts";
import { png } from "./png.ts";
import type { Matrix } from "../../encoder/types/types.ts";
import type { BackendOptions } from "../types.ts";

/**
 * Renders a QR matrix into backend-compatible formats.
 * Returns a Promise resolving to a raw PNG byte buffer or an SVG vector string.
 */
export async function render(
  matrix: Matrix,
  size: number,
  options: BackendOptions = {},
): Promise<Uint8Array | string> {
  // Guard: Detect if running in a real browser environment
  const isBrowser = typeof globalThis.window !== "undefined" &&
    typeof globalThis.document !== "undefined";

  if (isBrowser) {
    console.warn(
      "[QR Engine Warning]: You are executing the backend renderer inside a browser environment. " +
        "For optimal frontend performance and smaller bundle sizes, import from '@peno/qr/render/frontend' " +
        "to utilize native, synchronous Canvas rendering.",
    );
  }

  const target = options.type ?? "svg";

  switch (target) {
    case "svg":
      // Kept synchronous internally, but safely wrapped in this async pipeline
      return svg(matrix, size, options);
    case "png":
      return await png(matrix, size, options);
    default:
      throw new Error(`Unsupported backend rendering target: "${target}"`);
  }
}
