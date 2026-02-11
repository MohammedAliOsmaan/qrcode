import { Modes } from '../core/constants.ts';

/**
 * This function analyzes the input data and returns an object containing the mode.
 */

export function analyze(input: string | number): {
    mode: Modes,
    length: number
} {
    let mode: Modes;
    let length: number;

    //remind me later to change this to switch statement

    if (/^[0-9]+$/.test(input as string)) {
        mode = Modes.Numeric;
        length = input.toString().length;
    } else if (/^[0-9A-Z\ \$\%\*\+\-\.\/\:]+$/.test(input as string)) {
        mode = Modes.Alphanumeric;
        length = (input as string).length;
    } else if (/^[\u0020-\u007E\u00A0-\u00FF]+$/.test(input as string)) { // Control chars: \u0000–\u001F, \u007F, Printable ASCII: \u0020–\u007E, Extended Latin-1: \u00A0–\u00FF
        mode = Modes.Byte;
        length = (input as string).length;
    } else if (/^[\u3040-\u30FF\u4E00-\u9FAF\u3400-\u4DBF]+$/.test(input as string)) {

        mode = Modes.Kanji;                 // This regex covers:
        length = (input as string).length;  // \u3040-\u309F: Hiragana
                                            // \u30A0-\u30FF: Katakana
                                            // \u4E00-\u9FAF & \u3400-\u4DBF: Common and Extension A Kanji
    }
    /*
     // comming soon
     else if ([...input].some(char => char.charCodeAt(0) > 0xFF)) {
        mode = Modes.ECI;
        length = input.toString().length;
    }*/
    else {
        throw new Error('Unsupported input format');
    }
    return { mode, length };
}
