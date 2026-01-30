export type Matrix = Array<Array<(number | null)>>

const ALIGNMENT_ANCHORS: { [version: number]: number[] } = {
    1: [],
    2: [6, 18],
    3: [6, 22],
    4: [6, 26],
    5: [6, 30],
    6: [6, 34],
    7: [6, 22, 38],
    8: [6, 24, 42],
    9: [6, 26, 46],
    10: [6, 28, 50],
    11: [6, 30, 54],
    12: [6, 32, 58],
    13: [6, 34, 62],
    14: [6, 26, 46, 66],
    15: [6, 26, 48, 70],
    16: [6, 26, 50, 74],
    17: [6, 30, 54, 78],
    18: [6, 30, 56, 82],
    19: [6, 30, 58, 86],
    20: [6, 34, 62, 90],
    21: [6, 28, 50, 72, 94],
    22: [6, 26, 50, 74, 98],
    23: [6, 30, 54, 78, 102],
    24: [6, 28, 54, 80, 106],
    25: [6, 32, 58, 84, 110],
    26: [6, 30, 58, 86, 114],
    27: [6, 34, 62, 90, 118],
    28: [6, 26, 50, 74, 98, 122],
    29: [6, 30, 54, 78, 102, 126],
    30: [6, 26, 52, 78, 104, 130],
    31: [6, 30, 56, 82, 108, 134],
    32: [6, 34, 60, 86, 112, 138],
    33: [6, 30, 58, 86, 114, 142],
    34: [6, 34, 62, 90, 118, 146],
    35: [6, 30, 54, 78, 102, 126, 150],
    36: [6, 24, 50, 76, 102, 128, 154],
    37: [6, 28, 54, 80, 106, 132, 158],
    38: [6, 32, 58, 84, 110, 136, 162],
    39: [6, 26, 54, 82, 110, 138, 166],
    40: [6, 30, 58, 86, 114, 142, 170]
};

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
    matrix[size - 8][9] = 1; // Same as (4 * version + 9)
}
