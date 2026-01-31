import { Matrix, reserved } from "./pattern.ts";

export function placement(matrix: Matrix, bits: number[], size: number) {
    const PAD_BYTES = [
        [1, 1, 1, 0, 1, 1, 0, 0], // 0xEC
        [0, 0, 0, 1, 0, 0, 0, 1]  // 0x11
    ];
    let offset = 0;

    for (const [r, c] of zigzag(size)) {
        if (matrix[r][c] === null && !reserved(r, c, size)) {
            matrix[r][c] = bits[offset] ?? 0;
            offset++;
        }
    }

}

export function* zigzag(size: number) {
    let upward = true;

    for (let col = size - 1; col > 0; col -= 2) {

        // Skip timing column
        if (col === 6) col--;

        if (upward) {
            for (let row = size - 1; row >= 0; row--) {
                yield [row, col] as const;
                yield [row, col - 1] as const;
            }
        } else {
            for (let row = 0; row < size; row++) {
                yield [row, col] as const;
                yield [row, col - 1] as const;
            }
        }

        upward = !upward;
    }
}
