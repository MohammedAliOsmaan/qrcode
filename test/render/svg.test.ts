import { svg } from "../../src/render/svg.ts";
import { assertEquals, assertStringIncludes } from "@std/assert";

Deno.test("Backend SVG Renderer - Basic SVG Generation", () => {
  const fakeMatrix = new Uint8Array([1, 0, 0, 1]);
  const modules = 2;

  const result = svg(fakeMatrix, modules, { type: "svg", scale: 4, margin: 2 });

  // Assert SVG is a string
  assertEquals(typeof result, "string");

  // Assert basic SVG structure
  assertStringIncludes(result, '<svg xmlns="http://www.w3.org/2000/svg"');
  assertStringIncludes(result, "</svg>");
  assertStringIncludes(result, '<title id="qr-title">QR Code</title>');
});

Deno.test("Backend SVG Renderer - Custom Colors", () => {
  const matrix = new Uint8Array([1, 1, 1, 1]);
  const result = svg(matrix, 2, {
    color: { dark: "#FF0000", light: "#00FF00" },
    margin: 0,
    scale: 2,
  });

  assertStringIncludes(result, 'fill="#00FF00"');
  assertStringIncludes(result, 'fill="#FF0000"');
});

Deno.test("Backend SVG Renderer - Default Colors", () => {
  const matrix = new Uint8Array([1, 0]);
  const result = svg(matrix, 1);

  assertStringIncludes(result, 'fill="#000000"');
  assertStringIncludes(result, 'fill="#ffffff"');
});

Deno.test("Backend SVG Renderer - With Custom Size", () => {
  const matrix = new Uint8Array([1, 0, 0, 1]);
  const result = svg(matrix, 2, { size: 100, margin: 2 });

  // Size should be used as total pixel size
  assertStringIncludes(result, 'width="100"');
  assertStringIncludes(result, 'height="100"');
});

Deno.test("Backend SVG Renderer - Run-length Encoding", () => {
  // Test that consecutive dark modules are compressed into a single path
  const matrix = new Uint8Array([1, 1, 0, 0]);
  const result = svg(matrix, 2, { margin: 0, scale: 1 });

  // First row has two consecutive 1s followed by two 0s
  assertStringIncludes(result, "h2"); // h2 means horizontal line of length 2
});

Deno.test("Backend SVG Renderer - Empty Matrix Handling", () => {
  const matrix = new Uint8Array([0, 0, 0, 0]);
  const result = svg(matrix, 2, { margin: 1, scale: 2 });

  // Should produce valid SVG even with no dark modules
  assertEquals(typeof result, "string");
  assertStringIncludes(result, "<svg");
});

Deno.test("Backend SVG Renderer - Default Margin and Scale", () => {
  const matrix = new Uint8Array([1]);
  const result = svg(matrix, 1);

  // Default margin is 4, default scale is 4
  // 1 module + (4 * 2) margin = 9 modules
  // 9 * 4 scale = 36 px
  assertStringIncludes(result, 'width="36"');
  assertStringIncludes(result, 'height="36"');
});
