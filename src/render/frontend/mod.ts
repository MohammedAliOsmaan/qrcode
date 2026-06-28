import { svg } from "../svg.ts";
import { canvas } from "./canvas.ts";
import type { Matrix } from "../../encoder/types/types.ts";
import type { FrontendOptions } from "../types.ts";

function render(
  matrix: Matrix,
  size: number,
  options: FrontendOptions = {},
): HTMLCanvasElement | string {
  // Guard: Detect if running on the backend (Node.js/Deno/Bun)
  const isBackend = typeof globalThis.window === "undefined" ||
    typeof globalThis.document === "undefined";

  if (isBackend) {
    throw new Error(
      "[QR Engine Error]: You are attempting to run the frontend renderer in a backend environment. " +
        "Please import from './render/backend' instead to utilize the binary PNG pipeline.",
    );
  }

  const target = options.type ?? "svg";

  switch (target) {
    case "svg":
      return svg(matrix, size, options);
    case "canvas":
      return canvas(matrix, size, options);
    default:
      throw new Error(`Unsupported rendering target type: "${target}"`);
  }
}

export { render };
