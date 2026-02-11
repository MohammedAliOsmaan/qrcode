import { ALIGNMENT_ANCHORS } from "./constants.ts";

export function reserved(r: number, c: number, size: number): boolean {

    // 1. Finder Patterns (7x7) + Separators (1px white border)
    // These take up an 8x8 area in the corners of the grid
    if (r < 9 && c < 9) return true;            // Top-left
    if (r < 9 && c >= size - 8) return true;    // Top-right
    if (r >= size - 8 && c < 9) return true;    // Bottom-left

    // 2. Timing Patterns (The pink lines in your image)
    // These run along the 6th row and 6th column
    if (r === 6 || c === 6) return true;

    const version: number = (size - 17) / 4;
    const centers = ALIGNMENT_ANCHORS[version]; // Assume this is available globally or passed in
    if (centers && centers.length > 0) {
        for (const rCenter of centers) {
            for (const cCenter of centers) {
                // Check for finder overlaps like you do in your drawing function
                if (rCenter < 10 && cCenter < 10 || rCenter < 10 && cCenter > size - 11 || rCenter > size - 11 && cCenter < 10) continue;

                // If we are near a center point (within the 5x5 square boundaries)
                if (Math.abs(r - rCenter) <= 2 && Math.abs(c - cCenter) <= 2) {
                    return true; // This module is reserved
                }
            }
        }
    }

    // dark module
    if (r === 4 * version + 9 && c === 8) return true;

    // information

    // 1. Format info around top-left
    if (r === 8 && c <= 8 && c !== 6) return true;
    if (c === 8 && r <= 8 && r !== 6) return true;

    // 2. Format info top-right (horizontal strip)
    if (r === 8 && c >= size - 8) return true;

    // 3. Format info bottom-left (vertical strip, FIXED)
    if (c === 8 && r >= size - 8) return true;

    if (version >= 7) {
        // bottom-left (6×3)
        if (r >= size - 11 && r <= size - 9 && c <= 5) return true;

        // top-right (3×6)
        if (c >= size - 11 && c <= size - 9 && r <= 5) return true;
    }

    return false;
}