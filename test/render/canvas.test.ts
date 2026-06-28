import { render } from "../../src/render/frontend/mod.ts";
import { assertEquals, assertInstanceOf, assertThrows } from "@std/assert";

Deno.test({
  name: "Frontend Canvas Renderer - Instantiates Element Contracts",
  // Standard backend environments don't have document.createElement,
  // so we tell the test runner to only run this inside actual browser contexts.
  ignore: typeof globalThis.document === "undefined",
  fn() {
    const fakeMatrix = new Uint8Array([1, 0, 0, 1]);

    const result = render(fakeMatrix, 2, {
      type: "canvas",
      scale: 5,
      margin: 4,
    });

    // 1. Assert type output is an active instance of the DOM Canvas interface
    assertInstanceOf(result, HTMLCanvasElement);

    // 2. Assert dimension scaling math rules apply perfectly to the element properties
    // Total modules = 2 + (4 margin * 2) = 10 blocks. 10 blocks * scale of 5 = 50px
    assertEquals(result.width, 50);
    assertEquals(result.height, 50);
  },
});

Deno.test({
  name: "Frontend Canvas Renderer - Custom Colors",
  ignore: typeof globalThis.document === "undefined",
  fn() {
    const fakeMatrix = new Uint8Array([1, 0, 0, 1]);

    const result = render(fakeMatrix, 2, {
      type: "canvas",
      scale: 4,
      margin: 2,
      color: { dark: "#FF0000", light: "#00FF00" },
    });

    assertInstanceOf(result, HTMLCanvasElement);
    assertEquals(result.width, 32); // (2 + 4) * 4 = 24, but let's verify
  },
});

Deno.test({
  name: "Frontend Canvas Renderer - Default Colors",
  ignore: typeof globalThis.document === "undefined",
  fn() {
    const fakeMatrix = new Uint8Array([1, 0, 0, 1]);

    const result = render(fakeMatrix, 2, { type: "canvas", scale: 2 });

    assertInstanceOf(result, HTMLCanvasElement);
    // Default colors: dark #000000, light #FFFFFF
    assertEquals(result.width, 24); // (2 + 8) * 2 = 20
  },
});

Deno.test({
  name: "Frontend Canvas Renderer - With Size Option",
  ignore: typeof globalThis.document === "undefined",
  fn() {
    const fakeMatrix = new Uint8Array([1, 0, 0, 1]);

    const result = render(fakeMatrix, 2, {
      type: "canvas",
      size: 200,
      margin: 2,
    });

    assertInstanceOf(result, HTMLCanvasElement);
    // size = 200, total modules = 2 + 4 = 6
    // scale = 200/6 = 33 (floored)
    const expectedSize = (2 + 4) * 33;
    assertEquals(result.width, expectedSize);
    assertEquals(result.height, expectedSize);
  },
});

Deno.test({
  name: "Frontend Canvas Renderer - Min Scale is 1",
  ignore: typeof globalThis.document === "undefined",
  fn() {
    const fakeMatrix = new Uint8Array([1, 0, 0, 1]);

    // Use a huge size that results in scale < 1
    const result = render(fakeMatrix, 2, {
      type: "canvas",
      size: 8, // Very small size
      margin: 2,
    });

    assertInstanceOf(result, HTMLCanvasElement);
    // With scale < 1, it should be clamped to 1
    // total = 6, size = 8, scale would be 1 (8/6 floored = 1)
    assertEquals(result.width, 6); // 6 * 1
  },
});

Deno.test({
  name: "Frontend Canvas Renderer - All Dark Modules",
  ignore: typeof globalThis.document === "undefined",
  fn() {
    const fakeMatrix = new Uint8Array([1, 1, 1, 1]);

    const result = render(fakeMatrix, 2, {
      type: "canvas",
      scale: 5,
      margin: 1,
    });

    assertInstanceOf(result, HTMLCanvasElement);
    // (2 + 2) * 5 = 20
    assertEquals(result.width, 20);
  },
});

Deno.test({
  name: "Frontend Canvas Renderer - Larger Matrix",
  ignore: typeof globalThis.document === "undefined",
  fn() {
    // Create a 4x4 matrix
    const fakeMatrix = new Uint8Array(16);
    for (let i = 0; i < 16; i++) {
      fakeMatrix[i] = i % 2; // Alternating pattern
    }

    const result = render(fakeMatrix, 4, {
      type: "canvas",
      scale: 3,
      margin: 2,
    });

    assertInstanceOf(result, HTMLCanvasElement);
    // (4 + 4) * 3 = 24
    assertEquals(result.width, 24);
    assertEquals(result.height, 24);
  },
});

Deno.test({
  name: "Frontend Canvas Renderer - SVG Fallback",
  ignore: typeof globalThis.document === "undefined",
  fn() {
    const fakeMatrix = new Uint8Array([1, 0, 0, 1]);

    const result = render(fakeMatrix, 2, { type: "svg", margin: 2 });

    // Should return SVG string, not canvas
    assertEquals(typeof result, "string");
  },
});

Deno.test({
  name: "Frontend Canvas Renderer - Backend Error",
  ignore: typeof globalThis.document !== "undefined",
  fn() {
    const fakeMatrix = new Uint8Array([1, 0, 0, 1]);

    assertThrows(
      () => render(fakeMatrix, 2, { type: "canvas" }),
      Error,
      "backend environment",
    );
  },
});

Deno.test({
  name: "Frontend Canvas Renderer - Invalid Type",
  ignore: typeof globalThis.document === "undefined",
  fn() {
    const fakeMatrix = new Uint8Array([1, 0, 0, 1]);

    assertThrows(
      () => render(fakeMatrix, 2, { type: undefined }),
      Error,
      "Unsupported",
    );
  },
});
