import { Matrix } from "../types/matrix.ts";

import { ALIGNMENT_ANCHORS } from "../core/constants.ts";

export function finder(matrix: Matrix, size: number): void {
    const anchors: number[][] = [[0, 0], [0, size - 7], [size - 7, 0]];

    const pattern: number[][] = [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1]
    ]

    for (const [row, column] of anchors) { // O(n^3)
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
                matrix[row + r][column + c] = pattern[r][c];
            }
        }
    }
}

export function separator(matrix: Matrix, size: number) {
    const anchors: number[][] = [[0, 0], [0, size - 8], [size - 8, 0]];

    for (const [row, column] of anchors) {
        if (row === 0 && column === 0) {
            // top left column
            for (let r = 0; r < 7; r++) {
                matrix[row + r][column + 7] = 0
            }
            // top left row
            for (let c = 0; c < 8; c++) {
                matrix[row + 7][column + c] = 0
            }

        } else if (row == 0 && column == size - 8) {
            // top right column
            for (let r = 0; r < 7; r++) {
                matrix[row + r][column] = 0
            }
            // top right row
            for (let c = 0; c < 8; c++) {
                matrix[row + 7][column + c] = 0
            }

        } else if (row == size - 8 && column == 0) {
            // bottom left column
            for (let r = 0; r < 8; r++) {
                matrix[row + r][column + 7] = 0
            }
            // bottom left row
            for (let c = 0; c < 8; c++) {
                matrix[row][column + c] = 0
            }
        }
    }
}

export function timing(matrix: Matrix, size: number) {
    const anchors: number[][] = [[6, 8], [8, 6]] // horizontal, vertical

    for (const [row, column] of anchors) {
        const chunk = size - 8;
        if (row == 6 && column == 8) {
            for (let c = column; c < chunk; c++) {
                if (c % 2 == 0) {
                    matrix[row][c] = 1;
                } else {
                    matrix[row][c] = 0;
                }
            }
        } else if (row == 8 && column == 6) {
            for (let r = row; r < chunk; r++) {
                if (r % 2 == 0) {
                    matrix[r][column] = 1;
                } else {
                    matrix[r][column] = 0;
                }
            }

        }

    }
}


export function alignment(matrix: Matrix, size: number) {
    const version: number = (size - 17) / 4;
    const centers = ALIGNMENT_ANCHORS[version];
    const coordinates = []; // coordinates that doesn't overlap with finder pattern

    const pattern = [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1]
    ]

    if (!centers || centers.length === 0) return; // version 1

    for (let r = 0; r < centers.length; r++) {
        for (let c = 0; c < centers.length; c++) {
            if (centers[r] < 10 && centers[c] < 10 || centers[r] < 10 && centers[c] > size - 11 || centers[r] > size - 11 && centers[c] < 10) continue;

            coordinates.push([centers[r], centers[c]]);
        }
    }

    for (const [row, column] of coordinates) {
        const anchor = [row - 2, column - 2];
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                matrix[anchor[0] + r][anchor[1] + c] = pattern[r][c];
            }
        }
    }

}

export function module(matrix: Matrix, size: number) {
    matrix[size - 8][8] = 1; // Same as (4 * version + 9) — dark module at (size-8,8)
}
