// @ts-ignore SVGElement data type

export function svg(matrix: Matrix, size: number, options?: RenderOptions): SVGElement {
	const modules = matrix.length;
	const margin = options?.margin ?? 4;
	const area = modules + margin * 2;

	let scale: number;
	if (options?.scale) scale = options.scale;
	else if (options?.size) scale = Math.floor(options.size / area);
	else if (size) scale = Math.floor(size / area);
	else scale = 4;

	if (scale < 1) scale = 1;

	const canvasSize = area * scale;
	const dark = options?.color?.dark ?? "#000000";
	const light = options?.color?.light ?? "#FFFFFF";

	// Prepare logo geometry (if provided). Width <= 1 is treated as ratio of canvas size.
	const logo = options?.logo;
	let logoSizePx: number | undefined;
	let logoX = 0;
	let logoY = 0;
	let logoR = 0;
	if (logo) {
		const lw = logo.width ?? 0.2;
		logoSizePx = lw <= 1 ? Math.floor(lw * canvasSize) : Math.floor(lw);
		logoX = Math.floor((canvasSize - (logoSizePx || 0)) / 2);
		logoY = logoX;
		if (logo.shape === "circle") logoR = (logoSizePx || 0) / 2;
	}

	// 1. Calculate the 'd' attribute string, optionally excavating modules under logo
	// For performance: merge horizontal runs of dark modules into single rect sub-paths
	const parts: string[] = [];
	const hasExcavation = Boolean(logo && (logo as NonNullable<RenderOptions["logo"]>).excavate && typeof logoSizePx === "number");
	for (let y = 0; y < modules; y++) {
		if (hasExcavation) {
			// When excavation is requested we must test each module against the logo area
			for (let x = 0; x < modules; x++) {
				if (!matrix[y][x]) continue;
				const px = (x + margin) * scale;
				const py = (y + margin) * scale;
				if (logo && logo.excavate && typeof logoSizePx === "number") {
					if (logo.shape === "circle") {
						const cx = px + scale / 2;
						const cy = py + scale / 2;
						const dx = cx - (canvasSize / 2);
						const dy = cy - (canvasSize / 2);
						if (Math.sqrt(dx * dx + dy * dy) < logoR) continue;
					} else {
						if (px + scale > logoX && px < logoX + logoSizePx && py + scale > logoY && py < logoY + logoSizePx) continue;
					}
				}
				parts.push(`M${px} ${py}h${scale}v${scale}h-${scale}z`);
			}
		} else {
			// Fast path: merge contiguous dark modules in the same row
			let x = 0;
			while (x < modules) {
				if (!matrix[y][x]) { x++; continue; }
				const start = x;
				x++;
				while (x < modules && matrix[y][x]) x++;
				const runWidth = (x - start) * scale;
				const px = (start + margin) * scale;
				const py = (y + margin) * scale;
				parts.push(`M${px} ${py}h${runWidth}v${scale}h-${runWidth}z`);
			}
		}
	}
	const dAttributeValue = parts.join("");

	// 2. Create the SVG structure using DOM API
	const ns = "http://www.w3.org/2000/svg";

	// @ts-ignore document
	const svgEl = document.createElementNS(ns, "svg");

	// Set SVG attributes
	svgEl.setAttribute("width", `${canvasSize}`);
	svgEl.setAttribute("height", `${canvasSize}`);
	svgEl.setAttribute("viewBox", `0 0 ${canvasSize} ${canvasSize}`);
	svgEl.setAttribute("shape-rendering", "crispEdges");
	svgEl.setAttribute("xmlns", ns);

	// Create and append the background rectangle

	// @ts-ignore document
	const rect = document.createElementNS(ns, "rect");
	rect.setAttribute("width", "100%");
	rect.setAttribute("height", "100%");
	rect.setAttribute("fill", light);
	svgEl.appendChild(rect);

	// If a logo background is requested or we need a clip path, prepare defs and background shape
	if (logo && typeof logoSizePx === "number") {
		// Optional background shape behind the logo (may be null to preserve transparency)
		if (logo.background !== null && typeof logo.background !== "undefined") {
			if (logo.shape === "circle") {
				// @ts-ignore document
				const bg = document.createElementNS(ns, "circle");
				bg.setAttribute("cx", String(canvasSize / 2));
				bg.setAttribute("cy", String(canvasSize / 2));
				bg.setAttribute("r", String(logoR));
				bg.setAttribute("fill", logo.background);
				svgEl.appendChild(bg);
			} else {

				//@ts-ignore document
				const bg = document.createElementNS(ns, "rect");
				bg.setAttribute("x", String(logoX));
				bg.setAttribute("y", String(logoY));
				bg.setAttribute("width", String(logoSizePx));
				bg.setAttribute("height", String(logoSizePx));
				if (logo.shape === "rounded") {
					const br = String(logo.borderRadius ?? Math.floor(logoSizePx * 0.15));
					bg.setAttribute("rx", br);
					bg.setAttribute("ry", br);
				}
				bg.setAttribute("fill", String(logo.background));
				svgEl.appendChild(bg);
			}

			// Prepare clipPath if needed for rounded/circle masks
			if (logo.shape === "circle" || logo.shape === "rounded") {
				// @ts-ignore document
				const defs = document.createElementNS(ns, "defs");
				// @ts-ignore document
				const clipPath = document.createElementNS(ns, "clipPath");
				const clipId = `qr-logo-clip-${Math.random().toString(36).slice(2)}`;
				clipPath.setAttribute("id", clipId);
				if (logo.shape === "circle") {
					// @ts-ignore document
					const c = document.createElementNS(ns, "circle");
					c.setAttribute("cx", String(canvasSize / 2));
					c.setAttribute("cy", String(canvasSize / 2));
					c.setAttribute("r", String(logoR));
					clipPath.appendChild(c);
				} else {
					// @ts-ignore document
					const r = document.createElementNS(ns, "rect");
					r.setAttribute("x", String(logoX));
					r.setAttribute("y", String(logoY));
					r.setAttribute("width", String(logoSizePx));
					r.setAttribute("height", String(logoSizePx));
					r.setAttribute("rx", String(logo.borderRadius ?? Math.floor(logoSizePx * 0.15)));
					r.setAttribute("ry", String(logo.borderRadius ?? Math.floor(logoSizePx * 0.15)));
					clipPath.appendChild(r);
				}
				defs.appendChild(clipPath);
				svgEl.appendChild(defs);
				// store clipId for use when adding the image element later
				(logo as never as any).__clipId = clipId;
			}
		}
	}

	// Create and append the path element

	// @ts-ignore document
	const path = document.createElementNS(ns, "path");
	path.setAttribute("fill", dark);

	// FILLING THE 'd' ATTRIBUTE HERE
	path.setAttribute("d", dAttributeValue);

	svgEl.appendChild(path);

	// If logo provided, append image on top (clip if needed)
	if (logo && typeof logoSizePx === "number") {
		// @ts-ignore document
		const imgEl = document.createElementNS(ns, "image");
		imgEl.setAttribute("x", String(logoX));
		imgEl.setAttribute("y", String(logoY));
		imgEl.setAttribute("width", String(logoSizePx));
		imgEl.setAttribute("height", String(logoSizePx));
		// support both href attribute and xlink:href for broad compatibility
		if (typeof logo.src === "string") {
			imgEl.setAttribute("href", logo.src);
			imgEl.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", logo.src);
		} else {
			// If caller passed a DOM image/canvas element, serialize to data URL where possible
			try {
				// @ts-ignore canvas element
				if ((logo.src as HTMLCanvasElement).toDataURL) {
					// @ts-ignore canvas element
					imgEl.setAttribute("href", (logo.src as HTMLCanvasElement).toDataURL());
				}
			} catch (e) {
				// ignore and skip setting href if not serializable
			}
		}
		if ((logo as any).__clipId) {
			imgEl.setAttribute("clip-path", `url(#${(logo as any).__clipId})`);
		}
		svgEl.appendChild(imgEl);
	}

	return svgEl;
}

export function png(matrix: Matrix, size: number, options?: RenderOptions) {
	const c = canvas(matrix, size, options);
	// Node-canvas: has toBuffer, browser: has toDataURL
	if (typeof c.toBuffer === "function") {
		// Node canvas
		return c.toBuffer("image/png");
	}

	// Browser canvas
	if (typeof c.toDataURL === "function") {
		return c.toDataURL("image/png");
	}

	throw new Error("Unable to produce PNG: no supported canvas implementation found.");
}

export function jpg(matrix: Matrix, size: number, options?: RenderOptions) {
	const c = canvas(matrix, size, options);
	if (typeof c.toBuffer === "function") {
		return c.toBuffer("image/jpeg");
	}
	if (typeof c.toDataURL === "function") {
		return c.toDataURL("image/jpeg", 0.92);
	}
	throw new Error("Unable to produce JPG: no supported canvas implementation found.");
}

export function canvas(
  matrix: Matrix,
  size: number,
  options: RenderOptions = {}
) {
  const modules = matrix.length;
  const margin = options.margin ?? 4;
  const total = modules + margin * 2;

  let scale =
    options.scale ??
    (options.size
      ? Math.floor(options.size / total)
      : Math.floor(size / total));

  if (scale < 1) scale = 1;

  const canvasSize = total * scale;

  const dark = options.color?.dark ?? "#000000";
  const light = options.color?.light ?? "#FFFFFF";

  const isBrowser =
    typeof window !== "undefined" &&
	// @ts-ignore document
    typeof document !== "undefined";

  let cvs;

  if (isBrowser) {
	// @ts-ignore document
    cvs = document.createElement("canvas");
  } else {
    // Node environment
    const { createCanvas } = require("canvas");
    cvs = createCanvas(canvasSize, canvasSize);
  }

  cvs.width = canvasSize;
  cvs.height = canvasSize;

  const ctx = cvs.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not available");

  // Background
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw modules
  ctx.fillStyle = dark;
  for (let y = 0; y < modules; y++) {
    for (let x = 0; x < modules; x++) {
      if (matrix[y][x]) {
        ctx.fillRect(
          (x + margin) * scale,
          (y + margin) * scale,
          scale,
          scale
        );
      }
    }
  }

  // Logo
  const logo = options.logo;
  if (logo) {
    const lw = logo.width ?? 0.2;
    const logoSizePx =
      lw <= 1 ? Math.floor(lw * canvasSize) : Math.floor(lw);

    const lx = Math.floor((canvasSize - logoSizePx) / 2);
    const ly = lx;

    let img;

    if (typeof logo.src === "string") {
      if (isBrowser) {
		// @ts-ignore image class
        const tmp = new Image();
        tmp.src = logo.src;
        if (tmp.complete) img = tmp;
      }
    } else {
      img = logo.src;
    }

    if (img) {
      // Excavation
      if (logo.excavate) {
        ctx.save();
        ctx.fillStyle = logo.background ?? light;

        if (logo.shape === "circle") {
          ctx.beginPath();
          ctx.arc(
            canvasSize / 2,
            canvasSize / 2,
            logoSizePx / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        } else if (logo.shape === "rounded") {
          const r =
            (typeof logo.borderRadius === "number"
              ? logo.borderRadius
              : Math.floor(logoSizePx * 0.15));

          ctx.beginPath();
          ctx.moveTo(lx + r, ly);
          ctx.arcTo(lx + logoSizePx, ly, lx + logoSizePx, ly + logoSizePx, r);
          ctx.arcTo(lx + logoSizePx, ly + logoSizePx, lx, ly + logoSizePx, r);
          ctx.arcTo(lx, ly + logoSizePx, lx, ly, r);
          ctx.arcTo(lx, ly, lx + logoSizePx, ly, r);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(lx, ly, logoSizePx, logoSizePx);
        }

        ctx.restore();
      }

      // Clipping
      if (logo.shape === "circle" || logo.shape === "rounded") {
        ctx.save();
        ctx.beginPath();

        if (logo.shape === "circle") {
          ctx.arc(
            canvasSize / 2,
            canvasSize / 2,
            logoSizePx / 2,
            0,
            Math.PI * 2
          );
        } else {
          const r =
            (typeof logo.borderRadius === "number"
              ? logo.borderRadius
              : Math.floor(logoSizePx * 0.15));

          ctx.moveTo(lx + r, ly);
          ctx.arcTo(lx + logoSizePx, ly, lx + logoSizePx, ly + logoSizePx, r);
          ctx.arcTo(lx + logoSizePx, ly + logoSizePx, lx, ly + logoSizePx, r);
          ctx.arcTo(lx, ly + logoSizePx, lx, ly, r);
          ctx.arcTo(lx, ly, lx + logoSizePx, ly, r);
        }

        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, lx, ly, logoSizePx, logoSizePx);
        ctx.restore();
      } else {
        ctx.drawImage(img, lx, ly, logoSizePx, logoSizePx);
      }
    }
  }

  return cvs;
}
