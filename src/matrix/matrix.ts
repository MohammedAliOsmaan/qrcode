import * as pattern from "./pattern.ts";
import { placement } from "./placement.ts"
import { mask, apply as masker, toEcBits } from "../mask/mask.ts";
import { format, apply as formatter } from "./format.ts"
import { ErrorCorrectionLevel } from "../core/constants.ts";
import { apply as versioning } from "./version.ts";

export function matrix(message: Uint8Array, ec: ErrorCorrectionLevel, size: number): Matrix {

    const matrix: Matrix = Array.from({ length: size }, () => Array(size).fill(null));
    const bits = Array.from(message).flatMap(byte => byte.toString(2).padStart(8, '0')
        .split('').map(Number));

    pattern.finder(matrix, size);
    pattern.separator(matrix, size);
    pattern.timing(matrix, size);
    pattern.alignment(matrix, size);
    pattern.module(matrix, size);

    placement(matrix, bits, size);

    const maskId = mask(matrix, size, ec);

    // apply mask
    masker(matrix, maskId, size);

    // apply format bits (always)
    formatter(matrix, format(toEcBits(ec), maskId), size);

    // apply version information for versions >= 7
    const version = (size - 17) / 4;
    if (version >= 7) {
        versioning(matrix, size, version);
    }

    return matrix;
}