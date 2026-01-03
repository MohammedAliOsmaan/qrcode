import { range } from "../core/constants.ts";

// See resource/table.txt for full shift-jis & jis x 0208 table.

// This is used for detecting kanji ranges.
const ranges = [
	[0x8140, 0x9ffc],
	[0xe040, 0xebbf],
]

/**
 * Encodes a string in kanji mode for QR codes.
 * The kanji encoding uses a specific mapping of characters to values.
 * Each character is encoded into a 13-bit binary string.
 *
 * @param input - The input string to encode.
 * @returns An array of binary strings representing the encoded input.
 */
export function kanji(input: string){
	const bits: string[] = [];

	for (const char of input) {
		let codePoint = range[char.charCodeAt(0)];
		
		// Check if the character is in the kanji range s from 0x8140 to 0x9ffc
		if (codePoint >= ranges[0][0] && codePoint <= ranges[0][1]) {
			let result: number = 0;

			codePoint -= ranges[0][0]; // subtract 0x8140

			const msb = (codePoint >> 8) & 0xFF; // Get the most significant byte
			const lsb = codePoint & 0xFF; // Get the least significant byte

			result = msb * 0xC0 + lsb;
			
			bits.push(result.toString(2).padStart(13, '0'));

		}else if (codePoint >= ranges[1][0] && codePoint <= ranges[1][1]) {
			let result: number = 0;

			codePoint -= 0xc140; // subtract 0xc140

			const msb = (codePoint >> 8) & 0xFF; // Get the most significant byte
			const lsb = codePoint & 0xFF; // Get the least significant byte

			result = msb * 0xC0 + lsb;
			
			bits.push(result.toString(2).padStart(13, '0'));
		}
	}

	return bits;
}