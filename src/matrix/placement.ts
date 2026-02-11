import { reserved } from "../core/reserve.ts";

export function placement(matrix: Matrix, bits: number[], size: number) {
    let offset = 0;

    for (const [r, c] of zigzag(size)) {
        if (matrix[r][c] === null && !reserved(r, c, size)) {

            // If message bits are exhausted we still need to fill the remaining
            // data modules with 0 (light modules) instead of leaving them
            // undefined/null which results in missing modules in the output.
            matrix[r][c] = bits[offset];
            offset++;
        }
    }

}

export function* zigzag(size: number) {
    let upward = true;

    for (let col = size - 1; col > 0; col -= 2) {

        // Skip the vertical timing pattern column
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

    // If `size` is odd, there is a remaining single column at index 0 that
    // isn't covered by the column-pairs loop above. Yield it in the
    // current vertical direction so that the placement covers every module.
    // if (size % 2 === 1) {
    //     if (upward) {
    //         for (let row = size - 1; row >= 0; row--) {
    //             yield [row, 0] as const;
    //         }
    //     } else {
    //         for (let row = 0; row < size; row++) {
    //             yield [row, 0] as const;
    //         }
    //     }
    // }
}
