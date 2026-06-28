import type { FrontendOptions } from "../types.ts";

/**
 * Create an HTML canvas element containing the rendered QR code.
 */

function canvas(
  matrix: Uint8Array,
  modules: number,
  options: FrontendOptions = {},
): HTMLCanvasElement {
  const margin = options.margin ?? 4;
  const total = modules + margin * 2;

  let scale = options.scale ??
    (options.size ? Math.floor(options.size / total) : Math.floor(600 / total));
  if (scale < 1) scale = 1;

  const canvasSize = total * scale;
  const dark = options.color?.dark ?? "#000000";
  const light = options.color?.light ?? "#FFFFFF";

  const cvs = document.createElement("canvas");
  cvs.width = canvasSize;
  cvs.height = canvasSize;

  const ctx = cvs.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available");

  // Paint background white space canvas wrapper
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Paint dark functional modules
  ctx.fillStyle = dark;
  for (let y = 0; y < modules; y++) {
    for (let x = 0; x < modules; x++) {
      // Fast linear row-major tracking matching matrix core buffers
      if (matrix[y * modules + x] === 1) {
        ctx.fillRect(
          (x + margin) * scale,
          (y + margin) * scale,
          scale,
          scale,
        );
      }
    }
  }

  return cvs;
}

export { canvas };
