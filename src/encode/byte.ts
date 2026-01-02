/**
 * Converts a string into an array of its byte representations.
 * Each character in the string is converted to its binary representation
 * as an 8-bit byte.
 *
 * @param {string} input - The input string to be converted.
 * @returns {string[]} An array of strings, each representing a byte in binary format.
 */
export function byte(input: string): string[] {
    const bytes: string[] = [];

    for (const char of input) {
        const byte = char.charCodeAt(0).toString(2).padStart(8, '0');
        bytes.push(byte);
    }

    return bytes;
}