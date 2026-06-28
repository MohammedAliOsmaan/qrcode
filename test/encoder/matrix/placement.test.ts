import { assertEquals } from "@std/assert";
import { placement } from "../../../src/encoder/matrix/placement.ts";
import { reserve } from "../../../src/encoder/core/reserve.ts";

function* zigzag(size: number): Generator<[number, number]> {
  let upward = true;

  for (let col = size - 1; col >= 0; col -= 2) {
    if (col === 6) col--;

    const rows = upward
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);

    for (const row of rows) {
      for (let cOffset = 0; cOffset < 2; cOffset++) {
        const c = col - cOffset;
        if (c < 0) continue;
        yield [row, c];
      }
    }

    upward = !upward;
  }
}

Deno.test("zigzag yields expected first and last coordinates for size=21", () => {
  const size = 21;
  const it = zigzag(size);
  const first = it.next().value;
  const second = it.next().value;

  assertEquals(first, [20, 20]);
  assertEquals(second, [20, 19]);

  let last: [number, number] | undefined;
  for (const v of zigzag(size)) last = v;
  assertEquals(last, [20, 0]);
});

Deno.test("placement fills non-reserved modules in zigzag order for version 1", () => {
  const size = 21;
  const matrix = new Uint8Array(size * size).fill(255);

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (reserve(r, c, size)) matrix[r * size + c] = 0;
    }
  }

  const coords: [number, number][] = [];
  for (const [r, c] of zigzag(size)) {
    if (reserve(r, c, size)) continue;
    coords.push([r, c]);
  }

  const totalBits = coords.length;
  const payload = new Uint8Array(Math.ceil(totalBits / 8));
  const expectedBits: number[] = [];

  for (let i = 0; i < totalBits; i++) {
    const bit = i % 2;
    expectedBits.push(bit);
    if (bit === 1) payload[i >> 3] |= 1 << (7 - (i & 7));
  }

  placement(matrix, payload, size);

  for (let i = 0; i < coords.length; i++) {
    const [r, c] = coords[i];
    assertEquals(matrix[r * size + c], expectedBits[i]);
  }
});

Deno.test("placement appends remainder bits for version 2", () => {
  const size = 25;
  const matrix = new Uint8Array(size * size).fill(255);

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (reserve(r, c, size)) matrix[r * size + c] = 0;
    }
  }

  const coords: [number, number][] = [];
  for (const [r, c] of zigzag(size)) {
    if (reserve(r, c, size)) continue;
    coords.push([r, c]);
  }

  const message = new Uint8Array([0xff]);
  placement(matrix, message, size);

  for (let i = 0; i < 8; i++) {
    const [r, c] = coords[i];
    assertEquals(matrix[r * size + c], 1);
  }

  for (let i = 8; i < 15; i++) {
    const [r, c] = coords[i];
    assertEquals(matrix[r * size + c], 0);
  }
});

Deno.test("placement appends ISO remainder bits (0) for versions 2-6", () => {
  for (let v = 2; v <= 6; v++) {
    const size = 17 + 4 * v;
    const matrix = new Uint8Array(size * size).fill(255);
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (reserve(r, c, size)) matrix[r * size + c] = 0;
      }
    }
    const message = new Uint8Array([0xaa]);
    placement(matrix, message, size);
    assertEquals(
      matrix.some((bit) => bit !== 0 && bit !== 1 && bit !== 255),
      false,
    );
  }
});

Deno.test("placement preserves version information region on version 7+ matrices", () => {
  const size = 45;
  const matrix = new Uint8Array(size * size).fill(255);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (reserve(r, c, size)) matrix[r * size + c] = 0;
    }
  }

  const message = new Uint8Array([0xFF]);
  placement(matrix, message, size);

  // A version 7 matrix reserves the top-right and bottom-left version info regions,
  // and size >=45 should also preserve the extra version information protection area.
  assertEquals(matrix[(size - 11) * size + 0], 0);
  assertEquals(matrix[(size - 9) * size + 5], 0);
  assertEquals(matrix[0 * size + (size - 11)], 0);
});
