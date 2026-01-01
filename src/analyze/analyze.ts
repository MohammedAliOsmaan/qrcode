import { Modes } from '../core/constants.ts';
import { detect } from '../core/detect.ts';

/**
 * This function analyzes the input data and returns an object containing the mode.
 */

function analyze(input: string | number): {
    mode: Modes,
    length: number
} {
    let mode: Modes;
    let length: number;

    //remind me later to change this to switch statement

    if (typeof input === 'number' || /^[0-9]+$/.test(input)) {
        mode = Modes.Numeric;
        length = input.toString().length;
    } else if (/^[0-9A-Z\ \$\%\*\+\-\.\/\:]+$/.test(input)) {
        mode = Modes.Alphanumeric;
        length = input.length;
    } else if (/^[\u0020-\u007E\u00A0-\u00FF]+$/.test(input)) { // Control chars: \u0000–\u001F, \u007F, Printable ASCII: \u0020–\u007E, Extended Latin-1: \u00A0–\u00FF
        mode = Modes.Byte;
        length = input.length;
    } else if (detect(input)) { // Check for Kanji characters using the detect function
        mode = Modes.Kanji;
        length = input.length;
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



export { analyze };