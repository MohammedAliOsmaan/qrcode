import { ErrorCorrectionTable } from "./codeword.ts";
import { ErrorCorrectionLevel } from "./constants.ts";

type Groups = ErrorCorrectionTable[number][ErrorCorrectionLevel]["groups"];
export type Blocks = Uint8Array;

export function block(data: Uint8Array, groups: Groups): Blocks[] {
    const blocks: Uint8Array[] = [];
    let offset = 0;

    for (const group of groups) {
        for (let i = 0; i < group.blocks; i++) {
            blocks.push(data.slice(offset, offset + group.dataCodewords));
            offset += group.dataCodewords;
        }
    }

    return blocks;
}

export function interleave(blocks: Blocks[], length: number): Uint8Array {
    const result: number[] = [];

    for (let i = 0; i < length; i++) {
        for (const block of blocks) {
            if (i < block.length) {
                result.push(block[i]);
            }
        }
    }

    return new Uint8Array(result);
}
