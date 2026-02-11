import { Codeword } from "./codeword.ts";
import { Modes } from "./constants.ts";

export function bitStream(mode: Modes, count: string, bits: string[], codeword: Codeword["codewords"]): string[] {
    const bytes: string[] = [];
    const PAD_BYTES = ['11101100', '00010001'];

    const capacityBits = codeword * 8;

    let container = "";
    container += mode.toString(2).padStart(4, '0');
    container += count;
    container += bits.join('');

    // Terminator: up to 4 zero bits but don't exceed capacity
    const terminatorSize = Math.min(4, Math.max(0, capacityBits - container.length));
    container += '0'.repeat(terminatorSize);

    // Pad to next byte boundary (but not beyond capacity)
    if (container.length % 8 !== 0) {
        const padToByte = 8 - (container.length % 8);
        const padBits = Math.min(padToByte, capacityBits - container.length);
        container += '0'.repeat(padBits);
    }

    // If exceeded capacity (shouldn't normally happen), truncate
    if (container.length > capacityBits) {
        container = container.slice(0, capacityBits);
    }

    // Add pad bytes until full
    const remainingBytes = (capacityBits - container.length) / 8;
    for (let i = 0; i < remainingBytes; i++) {
        container += PAD_BYTES[i % 2];
    }

    for (let i = 0; i < capacityBits; i += 8) {
        bytes.push(container.slice(i, i + 8));
    }

    return bytes;
};