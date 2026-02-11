import { Matrix } from "../types/matrix.ts";

export enum ErrorCorrectionBits {
    L = 1, // 01 in binary
    M = 0, // 00 in binary
    Q = 3, // 11 in binary
    H = 2  // 10 in binary
}

/**
 * Generates the 15-bit format information sequence.
 * @param ec The error correction level from your enum.
 * @param maskId The winning mask ID (0-7) from your mask function.
 */
export function format(ec: ErrorCorrectionBits, maskId: number): number {
    // 1. Combine EC bits (2 bits) and Mask ID (3 bits) into a 5-bit data string
    const data = (ec << 3) | maskId;

    // 2. Calculate 10 BCH error correction bits
    // Polynomial used for QR Format: x^10 + x^8 + x^5 + x^4 + x^2 + x + 1 (0x537)
    let rem = data;
    for (let i = 0; i < 10; i++) {
        rem = (rem << 1) ^ ((rem >> 9) * 0x537);
    }

    // 3. Combine data and remainder, then XOR with the standard mask 0x5412
    return ((data << 10) | rem) ^ 0x5412;
}


export function apply(matrix: Matrix, formatBits: number, size: number) {
    // 1. Top-Left Strip
    // Bits 0-5: (8, 0-5) | Bit 6: (8, 7) | Bit 7: (8, 8) | Bit 8: (7, 8) | Bits 9-14: (0-5, 8)
    const topLeftCoords = [
        [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
        [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
    ];

    // 2. Split Strip (Top-Right and Bottom-Left)
    // Horizontal part (Top-Right): Bits 0-7
    // Vertical part (Bottom-Left): Bits 8-14
    for (let i = 0; i < 15; i++) {
        const bit = (formatBits >> (14 - i)) & 1;

        // Place in Top-Left region
        const [r1, c1] = topLeftCoords[i];
        matrix[r1][c1] = bit;

        // Place in Split region
        if (i < 8) {
            // Horizontal Top-Right
            matrix[8][size - 1 - i] = bit;
        } else {
            // Vertical Bottom-Left
            matrix[size - 15 + i][8] = bit;
        }
    }

    // 3. Always-Black "Dark Module"
    // Located at (size-8, 8)
    matrix[size - 8][8] = 1;
}
