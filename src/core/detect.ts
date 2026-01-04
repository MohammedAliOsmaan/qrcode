import { range } from "./constants.ts";

export function detect(input: string): boolean {
    for (const char of input) {
        const codePoint = char.charCodeAt(0);
        console.log(`Character: ${char}, binary: 0b${(codePoint).toString(2)}`);
        if (!range[codePoint]) {
            return false;
        }
    }

    return true;
}