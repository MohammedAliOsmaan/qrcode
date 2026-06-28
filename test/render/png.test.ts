import { render } from "../../src/render/backend/mod.ts";
import { assertEquals, assertNotEquals, assertRejects } from "@std/assert";

Deno.test("Backend PNG Renderer - Validates ISO/IEC Structural Chunks", async () => {
  const fakeMatrix = new Uint8Array([1, 0, 0, 1]);
  const modules = 2;

  // 1. Execute the byte-packing encoder
  const pngBytes = await render(fakeMatrix, modules, {
    type: "png",
    scale: 4,
  }) as Uint8Array;

  // 2. Assert Official 8-byte PNG Magic Header Signature
  assertEquals(pngBytes[0], 0x89);
  assertEquals(pngBytes[1], 0x50); // P
  assertEquals(pngBytes[2], 0x4E); // N
  assertEquals(pngBytes[3], 0x47); // G
  assertEquals(pngBytes[4], 0x0D); // \r
  assertEquals(pngBytes[5], 0x0A); // \n
  assertEquals(pngBytes[6], 0x1A); // EOF
  assertEquals(pngBytes[7], 0x0A); // \n

  // 3. Assert Structural Chunk Locations (Checking for ASCII chunk type keywords)
  // Converting byte ranges to strings to verify chunk boundaries are exact
  const chunkDecoder = new TextDecoder();

  const firstChunkType = chunkDecoder.decode(pngBytes.subarray(12, 16));
  assertEquals(
    firstChunkType,
    "IHDR",
    "PNG must start with an IHDR chunk header.",
  );

  // 4. Verify that data exists in the stream
  assertNotEquals(pngBytes.length, 0);
});

Deno.test("Backend PNG Renderer - Passing wrong value", async () => {
  const fakeMatrix = new Uint8Array([1, 0, 0, 1]);
  const modules = 2;

  await assertRejects(
    async () => {
      await render(fakeMatrix, modules, {
        type: "png",
        scale: 4,
        color: { light: "#00" },
      });
    },
    Error,
    "Invalid hex color length. Expected exactly 6 characters (RRGGBB) or 8 characters (RRGGBBAA).",
  );
});
