import { Codeword } from "./codeword.ts";
import { Modes } from "./constants.ts";

export function bitStream(mode: Modes, count: string, bits: string[], codeword: Codeword["codewords"]): string[] {
    const bytes: string[] = [];
    const paddingBits = ['11101100', '00010001'];

    let container = "";
    container += mode.toString(2).padStart(4, '0');
    container += count;
    container += bits.join('');
    container += '0000'; // terminator

    if (container.length % 8 !== 0) {
        container += '0'.repeat(8 - (container.length % 8));
    }

    const remaining = codeword - container.length / 8;

    for (let i = 0; i < remaining; i++) {
        container += paddingBits[i % 2];
    }

    for (let i = 0; i < container.length; i += 8) {
        bytes.push(container.slice(i, i + 8));
    }

    return bytes;
};