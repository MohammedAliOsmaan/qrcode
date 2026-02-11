import { Matrix } from "../types/matrix.ts";

export function penalty(matrix: Matrix, size: number): number {
    return (
        N1(matrix, size) +
        N2(matrix, size) +
        N3(matrix, size) +
        N4(matrix, size)
    )
}

function N1(matrix: Matrix, size: number): number {
    let score: number = 0;

    // consecutive colors

    for (let r = 0; r < size; r++) {
        let color = matrix[r][0];
        let streak = 1;

        for (let c = 1; c < size; c++) {
            if (matrix[r][c] === color) {
                streak++;
            } else {
                if (streak >= 5) {
                    score += 3 + (streak - 5);
                }
                color = matrix[r][c];
                streak = 1;
            }
        }

        if (streak >= 5) {
            score += 3 + (streak - 5);
        }
    }

    for (let c = 0; c < size; c++) {
        let color = matrix[0][c];
        let streak = 1;

        for (let r = 1; r < size; r++) {
            if (matrix[r][c] === color) {
                streak++;
            } else {
                if (streak >= 5) {
                    score += 3 + (streak - 5);
                }
                color = matrix[r][c];
                streak = 1;
            }
        }

        // End-of-row check
        if (streak >= 5) {
            score += 3 + (streak - 5);
        }
    }

    return score;
}

function N2(matrix: Matrix, size: number): number {
    let score = 0;

    // 2x2 Block

    for (let r = 0; r < size - 1; r++) {
        for (let c = 0; c < size - 1; c++) {
            if (
                matrix[r][c] === matrix[r][c + 1] &&
                matrix[r][c] === matrix[r + 1][c] &&
                matrix[r][c] === matrix[r + 1][c + 1]
            ) score += 3;
        }
    }

    return score;
}

function N3(matrix: Matrix, size: number): number {
    let score = 0;
    const PATTERNS = [
        [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    ] as const;

    // Finder-like Patterns

    // Horizontal
    for (let r = 0; r < size; r++) {
        for (let c = 0; c <= size - 11; c++) {
            for (const pattern of PATTERNS) {
                let match = true;

                for (let i = 0; i < 11; i++) {
                    if (matrix[r][c + i] !== pattern[i]) {
                        match = false;
                        break;
                    }
                }

                if (match) {
                    score += 40;
                }
            }
        }
    }

    // Vertical
    for (let c = 0; c < size; c++) {
        for (let r = 0; r <= size - 11; r++) {
            for (const pattern of PATTERNS) {
                let match = true;

                for (let i = 0; i < 11; i++) {
                    if (matrix[r + i][c] !== pattern[i]) {
                        match = false;
                        break;
                    }
                }

                if (match) {
                    score += 40;
                }
            }
        }
    }

    return score;
}

function N4(matrix: Matrix, size: number): number {
    let dark = 0;
    const total = size * size;

    // Dark Module Ratio

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (matrix[r][c] === 1) {
                dark++;
            }
        }
    }

    const percentage = (dark * 100) / total;
    const deviation = Math.abs(percentage - 50);
    const steps = Math.floor(deviation / 5);

    return steps * 10;
}
