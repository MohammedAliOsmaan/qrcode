import { alpha as alphanumeric } from "../utils/constants.ts";

/**
 * Encodes a string in alphanumeric mode for QR codes.
 * The alphanumeric encoding uses a specific mapping of characters to values.
 * Each pair of characters is encoded into an 11-bit binary string.
 *
 * @param input - The input string to encode.
 * @returns An array of binary strings representing the encoded input.
 * @throws Error if an invalid character is encountered.
 */

export function alpha(input: string): string[] {
    const corresponding: number[] = input.split("").map((char) => {
        if (!(char in alphanumeric)) {
            throw new Error(`Invalid alphanumeric character: ${char}`);
        }
        return alphanumeric[char]
    });

    const groups: number[][] = [];
    for (let i = 0; i < corresponding.length; i += 2) {
        const group = corresponding.slice(i, i + 2);
        groups.push(group);
    }

    const bits: string[] = groups.map((pairs) => {
        if (pairs.length === 2) {
            // 2-character pairs
            return (pairs[0] * 45 + pairs[1]).toString(2).padStart(11, '0');
        } else if (pairs.length === 1) {
            // 1-character pair
            return pairs[0].toString(2).padStart(6, '0');
        } else {
            throw new Error("Empty pairs encountered");
        }
    })

    return bits;
}