# QR Code Engine

A high-performance, zero-dependency QR code generation library implementing the
ISO/IEC 18004 specification. Built for speed, minimal memory footprint, and
seamless cross-runtime compatibility.

## Installation

### JSR

```bash
deno add jsr:@peno/qr
```

or with npm:

```bash
npx jsr add @peno/qr
```

### From Source

```bash
git clone https://github.com/peno-js/qr.git
cd qr
deno task build
```

## Quick Start

### Browser (Frontend)

```js
import { QR } from "@peno/qr";
import { render } from "@peno/qr/render/frontend";

// Generate QR code matrix
const result = QR.encode("Hello, World!", {
  ec: "M",
  version: 1,
});

// Render as SVG (recommended for web)
const svg = render(result.matrix, result.modules);

document.body.appendChild(svg);

// Or render as Canvas
const canvas = render(result.matrix, result.modules, { type: "canvas" });

document.body.appendChild(canvas);
```

### Backend / Server (Node.js, Deno)

```js
import { QR } from "@peno/qr";
import { render } from "@peno/qr/render/backend";

// Generate QR code matrix
const result = QR.encode("https://example.com", {
  ec: "H",
  version: 2,
});

// Render as PNG bytes (async)
const pngBytes = await render(result.matrix, result.modules, {
  type: "png",
  scale: 8,
});

// Write to file or send as response
```

## API Reference

### QR.encode()

The core encoding function that generates a QR code matrix.

```ts
QR.encode(
  input: string | number,
  options?: Options
): QRCode
```

**Parameters:**

- `input` – Data to encode (string or number)
- `options` – Optional configuration object

**Options:**

```ts
interface Options {
  version?: number; // QR version 1–40 (auto-selected if omitted)
  ec?: "L" | "M" | "Q" | "H"; // Error correction level
  mask?: number; // Mask pattern 0–7 (auto-selected if omitted)
}
```

**Returns:**

```ts
interface QRCode {
  input: string | number;
  length: number;
  mode: "numeric" | "alphanumeric" | "byte" | "kanji";
  version: number;
  ec: "L" | "M" | "Q" | "H";
  modules: number; // Module count (version * 4 + 17)
  matrix: Uint8Array; // The QR code matrix as binary data
}
```

**Example:**

```js
const result = QR.encode("12345", { ec: "M" });
console.log(result.version); // Auto-selected version
console.log(result.modules); // e.g., 21 for version 1
```

### Frontend Rendering

For browser environments, use the frontend renderer for optimal performance:

```ts
import { render } from "@peno/qr/render/frontend";

render(
  matrix: Uint8Array,
  size: number,
  options?: FrontendOptions
): HTMLCanvasElement | string
```

**Options:**

```ts
interface FrontendOptions {
  type?: "svg" | "canvas"; // Default: "svg"
  size?: number;
  scale?: number;
  margin?: number;
  color?: {
    dark?: string; // Module color (default: #000000)
    light?: string; // Background color (default: #ffffff)
  };
  content?: string;
}
```

**Returns:**

- SVG: An SVG string (scalable vector)
- Canvas: An `HTMLCanvasElement` (raster image)

**Example:**

```js
// SVG (recommended for web)
const svg = render(result.matrix, result.modules, {
  type: "svg",
  color: { dark: "#000", light: "#fff" },
});

// Canvas
const canvas = render(result.matrix, result.modules, {
  type: "canvas",
  scale: 2,
});
```

### Backend Rendering

For server/Deno environments, use the backend renderer:

```ts
import { render } from "@peno/qr/render/backend";

render(
  matrix: Uint8Array,
  size: number,
  options?: BackendOptions
): Promise<Uint8Array | string>
```

**Options:**

```ts
interface BackendOptions {
  type?: "svg" | "png"; // Default: "svg"
  size?: number;
  scale?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
  content?: string;
}
```

**Returns:**

- SVG: An SVG string
- PNG: A `Uint8Array` containing PNG binary data

**Example:**

```ts
// PNG output (async)
const pngBuffer = await render(result.matrix, result.modules, {
  type: "png",
  scale: 8,
  color: { dark: "#333", light: "#eee" },
});

// Send as response or write to file
```

## Examples

### Basic QR Code

```js
import { QR } from "@peno/qr";
import { render } from "@peno/qr/render/frontend";

const result = QR.Encoder.encode("Hello, QR!");
const svg = render(result.matrix, result.modules);
document.body.appendChild(svg);
```

### Custom Error Correction

```ts
// Higher error correction for better scannability
const result = QR.Encoder.encode("Contact: john@example.com", {
  ec: "H", // Highest error correction level
});
```

### High-Quality PNG Export

```js
import { QR } from "@peno/qr";
import { render } from "@peno/qr/render/backend";

const result = QR.Encoder.encode("https://example.com", { ec: "H" });
const png = await render(result.matrix, result.modules, {
  type: "png",
  scale: 10, // High resolution
  margin: 2, // Quiet zone
  color: { dark: "#000", light: "#fff" },
});
```

### Custom Colors

```js
const result = QR.Encoder.encode("Styled QR Code");
const svg = render(result.matrix, result.modules, {
  type: "svg",
  color: {
    dark: "#2c3e50",
    light: "#ecf0f1",
  },
});
```

## Development

### Setup

Clone the repository and install dependencies:

```bash
$ git clone https://github.com/mohammed-ali-osman/qr.git
$ cd qr
```

### Build

```bash
deno task build
```

The compiled output will be generated in the `dist/` directory.

### Testing

Run the full test suite:

```bash
deno test
```

## Features

- **Full QR Code Support** – All encoding modes (Numeric, Alphanumeric, Byte,
  Kanji)
- **Advanced Error Correction** – Levels L, M, Q, H with Reed-Solomon encoding
- **Version 1–40** – Automatic or manual version selection
- **Multiple Output Formats** – SVG (vector), Canvas (DOM), PNG (binary)
- **Zero Dependencies** – Pure ts, no external libraries
- **Cross-Runtime** – Works on Deno, Node.js, and modern browsers

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE)
file for details.
