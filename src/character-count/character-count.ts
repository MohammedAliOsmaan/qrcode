import { Modes } from "../core/constants.ts";

/**
 * This function calculates the character count for a given version and mode.
*/

export function characterCount(version: number, mode: Modes, length: number): string {
    if (version >= 1 && version <= 9) {
        switch (mode) {
            case Modes.Numeric:
                return (length).toString(2).padStart(10, '0');
            case Modes.Alphanumeric:
                return (length).toString(2).padStart(9, '0');
            case Modes.Byte:
                return (length).toString(2).padStart(8, '0');
            case Modes.Kanji:
                return (length).toString(2).padStart(8, '0');
        }
    } else if (version >= 10 && version <= 26) {
        switch (mode) {
            case Modes.Numeric:
                return (length).toString(2).padStart(12, '0');
            case Modes.Alphanumeric:
                return (length).toString(2).padStart(11, '0');
            case Modes.Byte:
                return (length).toString(2).padStart(16, '0');
            case Modes.Kanji:
                return (length).toString(2).padStart(10, '0');
        }
    } else if (version >= 27 && version <= 40) {
        switch (mode) {
            case Modes.Numeric:
                return (length).toString(2).padStart(14, '0');
            case Modes.Alphanumeric:
                return (length).toString(2).padStart(13, '0');
            case Modes.Byte:
                return (length).toString(2).padStart(16, '0');
            case Modes.Kanji:
                return (length).toString(2).padStart(12, '0');
        }
    } else {
        throw new Error("Invalid version number. Version must be between 1 and 40.");
    }
}
