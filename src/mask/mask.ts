import { reserved } from "../core/reserve.ts";
import { format, apply as formatter, ErrorCorrectionBits } from "../matrix/format.ts";
import { penalty } from "./penalty.ts";
import type { ErrorCorrectionLevel } from "../core/constants.ts";

type Masks = (r: number, c: number) => boolean

export const masks: Masks[] = [
    (r, c) => (r + c) % 2 === 0,
    (r, _c) => r % 2 === 0,
    (_r, c) => c % 3 === 0,
    (r, c) => (r + c) % 3 === 0,
    (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
    (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
    (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
    (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0
];

export const toEcBits = (level: ErrorCorrectionLevel): ErrorCorrectionBits => {
    switch (level) {
        case "L": return ErrorCorrectionBits.L;
        case "M": return ErrorCorrectionBits.M;
        case "Q": return ErrorCorrectionBits.Q;
        case "H": return ErrorCorrectionBits.H;
        default: return ErrorCorrectionBits.L;
    }
};

export function mask(matrix: Matrix, size: number, ec: ErrorCorrectionLevel = "L"): number {
    let score = Infinity;
    let maskId = 0;

    // Map string ErrorCorrectionLevel to format bits enum


    // Use entry index to track which mask (0-7) is being tested
    masks.forEach((maskFn, index) => {
        const clone = matrix.map(row => [...row]);

        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (reserved(r, c, size)) continue;

                if (maskFn(r, c)) { // Call the pattern function

                    if (clone[r][c] == null) continue;
                    (clone[r][c] as number) ^= 1;

                }
            }
        }

        formatter(clone, format(toEcBits(ec), index), size);

        const p = penalty(clone, size);
        if (p < score) {
            score = p;
            maskId = index;
        }
    });

    return maskId;
}

export function apply(matrix: Matrix, mask: number, size: number) {

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {

            if (reserved(r, c, size)) continue;
            if (matrix[r][c] == null) continue;

            if (masks[mask](r, c)) {
                (matrix[r][c] as number) ^= 1;
            }
        }
    }

}