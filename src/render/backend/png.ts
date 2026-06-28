import type { BackendOptions } from "../types.ts";

type RGBA = [number, number, number, number];

// Precomputed 256-cell lookup table for processing full bytes in a single cycle
const CRC_TABLE = new Uint32Array(256);

// Automatically initialize the scratchpad when the engine module loads
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    if (c & 1) {
      c = 0xEDB88320 ^ (c >>> 1);
    } else {
      c >>>= 1;
    }
  }
  CRC_TABLE[i] = c;
}

/**
 * High-performance, loop-free CRC-32 checksum runner utilizing our precomputed scratchpad.
 */
function crc32(data: Uint8Array): number {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ data[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

/**
 * Standardizes incoming hex values to a strict 4-octet byte configuration array.
 * Explicitly guards against invalid lengths or malformed string arrays.
 */
function color(hex: string): RGBA {
  const extract = hex.replace("#", "");

  if (extract.length !== 6 && extract.length !== 8) {
    throw new Error(
      "Invalid hex color length. Expected exactly 6 characters (RRGGBB) or 8 characters (RRGGBBAA).",
    );
  }

  const int = parseInt(extract, 16);

  // Standard 3-channel RGB format: Default alpha channel to maximum opacity (255)
  if (extract.length === 6) {
    return [
      (int >> 16) & 0xff, // Red octet
      (int >> 8) & 0xff, // Green octet
      int & 0xff, // Blue octet
      255, // Alpha (Opaque)
    ];
  }

  // 4-channel RGBA format: Shift right across all segments to isolate Alpha
  return [
    (int >> 24) & 0xff, // Red octet
    (int >> 16) & 0xff, // Green octet
    (int >> 8) & 0xff, // Blue octet
    int & 0xff, // Alpha octet
  ];
}

async function deflate(data: Uint8Array): Promise<Uint8Array> {
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  });

  const compressedStream = stream.pipeThrough(
    new CompressionStream("deflate"),
  );

  const buffer = await new Response(compressedStream).arrayBuffer();
  return new Uint8Array(buffer);
}

/**
 * Automatically wraps low-level payloads inside formal W3C chunk envelopes using DataView.
 * Structure: [4-byte Length] [4-byte Type Identifier] [Data Payload] [4-byte CRC]
 */

function makeChunk(type: string, data: Uint8Array): Uint8Array {
  const out = new Uint8Array(12 + data.length);
  const view = new DataView(out.buffer);

  // 1. Write the payload data bounds length (Big Endian)
  view.setUint32(0, data.length, false);

  // 2. Transcribe ASCII Identification properties
  out[4] = type.charCodeAt(0);
  out[5] = type.charCodeAt(1);
  out[6] = type.charCodeAt(2);
  out[7] = type.charCodeAt(3);

  // 3. Mount raw data payload
  out.set(data, 8);

  // 4. Compute full checksum slice using zero-allocation subarray slicing
  const crcTarget = out.subarray(4, 8 + data.length);
  const crc = crc32(crcTarget);

  // 5. Append calculated checksum at the absolute tail boundary
  view.setUint32(8 + data.length, crc, false);

  return out;
}

/**
 * Stateless pipeline transforming raw QR matrices, indexed binary PNG streams.
 */

async function png(
  matrix: Uint8Array,
  size: number,
  BackendOptions: BackendOptions = {},
): Promise<Uint8Array> {
  // Standardize matrix canvas scales safely
  const scale = Math.max(4, BackendOptions.scale ?? 10);
  const margin = BackendOptions.margin ?? 4;

  const modulesWithMargin = size + (margin * 2);
  const width = modulesWithMargin * scale;
  const height = width;

  // Fixed global magic signature identifier sequence
  const signature = Uint8Array.of(
    0x89,
    0x50,
    0x4E,
    0x47,
    0x0D,
    0x0A,
    0x1A,
    0x0A,
  );

  // Build the Image Header Metadata Chunk (IHDR)
  const ihdrData = new Uint8Array(13);
  const ihdr = new DataView(ihdrData.buffer);
  ihdr.setUint32(0, width, false); // Width Pixels
  ihdr.setUint32(4, height, false); // Height Pixels
  ihdr.setUint8(8, 8); // 8 bits per palette pixel index reference
  ihdr.setUint8(9, 3); // Color Type 3 (High Efficiency Indexed Palette)
  ihdr.setUint8(10, 0); // Deflate compression standard
  ihdr.setUint8(11, 0); // Adaptive row filter method 0
  ihdr.setUint8(12, 0); // Interlace method 0 (Disabled)

  // Build the Color Palette (PLTE) & Alpha Maps (tRNS)
  const [rLight, gLight, bLight, aLight] = color(
    BackendOptions.color?.light ?? "#ffffff",
  );
  const [rDark, gDark, bDark, aDark] = color(
    BackendOptions.color?.dark ?? "#000000",
  );

  const plteData = new Uint8Array([
    rLight,
    gLight,
    bLight,
    rDark,
    gDark,
    bDark,
  ]);
  const trnsData = new Uint8Array([aLight, aDark]);

  // Pre-allocate the complete uncompressed scanline surface buffer space
  const scanlines = new Uint8Array(height * (width + 1));

  // Clear and stamp row boundaries safely with modern native PNG Filter Type 0
  for (let y = 0; y < height; y++) {
    scanlines[y * (width + 1)] = 0;
  }

  // Process matrix coordinates across scaled canvas dimensional indexes
  for (let moduleY = 0; moduleY < size; moduleY++) {
    const actualY = moduleY + margin;

    for (let moduleX = 0; moduleX < size; moduleX++) {
      const actualX = moduleX + margin;

      // Extract the true boolean bitstate (1 = Module, 0 = Empty)
      const module = matrix[moduleY * size + moduleX];
      const colorIndex = module ? 1 : 0; // Index 1 is foreground color; Index 0 is background

      // Spread data values down to match chosen output scaling thresholds
      for (let dy = 0; dy < scale; dy++) {
        const pixelY = actualY * scale + dy;
        const rowPixelOffset = pixelY * (width + 1) + 1; // +1 steps clean over the filter byte

        for (let dx = 0; dx < scale; dx++) {
          const pixelX = actualX * scale + dx;
          scanlines[rowPixelOffset + pixelX] = colorIndex;
        }
      }
    }
  }

  // Compress the finished matrix bitmap using core web stream handlers
  const compressed = await deflate(scanlines);

  // Encapsulate structured data sequences safely into discrete chunk objects
  const ihdrChunk = makeChunk("IHDR", ihdrData);
  const plteChunk = makeChunk("PLTE", plteData);
  const trnsChunk = makeChunk("tRNS", trnsData);
  const idatChunk = makeChunk("IDAT", compressed);
  const iendChunk = makeChunk("IEND", new Uint8Array());

  // Calculate dynamic memory footprint and pack structural components sequentially
  const finalPng = new Uint8Array(
    signature.length +
      ihdrChunk.length +
      plteChunk.length +
      trnsChunk.length +
      idatChunk.length +
      iendChunk.length,
  );

  let offset = 0;
  finalPng.set(signature, offset);
  offset += signature.length;
  finalPng.set(ihdrChunk, offset);
  offset += ihdrChunk.length;
  finalPng.set(plteChunk, offset);
  offset += plteChunk.length;
  finalPng.set(trnsChunk, offset);
  offset += trnsChunk.length;
  finalPng.set(idatChunk, offset);
  offset += idatChunk.length;
  finalPng.set(iendChunk, offset);

  return finalPng;
}

export { png };
