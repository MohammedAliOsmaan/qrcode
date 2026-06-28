import type { BackendOptions, FrontendOptions } from "./types.ts";

/**
 * Create a svg element in string format containing the rendered QR code.
 */

function svg(
  matrix: Uint8Array,
  modules: number,
  options: FrontendOptions | BackendOptions = {},
): string {
  const margin = options.margin ?? 4;
  const area = modules + margin * 2;

  const size = options.size ?? area * (options.scale ?? 4);
  const color = options.color ?? {
    dark: "#000000",
    light: "#ffffff",
  };

  const parts: string[] = [];
  let i = 0;

  while (i < matrix.length) {
    // Check if the current module is light/empty
    if (!matrix[i]) {
      i++;
      continue;
    }

    // Determine 2D coordinates from 1D flat pointer
    const x = i % modules;
    const y = Math.floor(i / modules);

    // Run-length scan: compress consecutive dark modules horizontally
    let run = 1;
    while (x + run < modules && matrix[i + run] === 1) {
      run++;
    }

    const px = x + margin;
    const py = y + margin;

    // Draw compressed horizontal strip (using fractional view-box scale coordinates)
    parts.push(`M${px},${py}h${run}v1h-${run}z`);

    i += run;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${area} ${area}" shape-rendering="crispEdges" role="img"><title id="qr-title">QR Code</title><rect width="100%" height="100%" fill="${color.light}"/><path fill="${color.dark}" d="${
    parts.join("")
  }"/></svg>`;
}

export { svg };
