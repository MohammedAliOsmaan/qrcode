import { assertEquals } from "jsr:@std/assert";
import { analyze } from "../src/analyze/analyze.ts";
import { Modes, range } from "../src/utils/constants.ts";


// Deno.test("analyze() detects numeric mode", () => {
//     const inputs = ["0", "42", "1234567890"];
//     for (const input of inputs) {
//         const result = analyze(input);
//         assertEquals(result.mode, Modes.Numeric, `Failed on numeric input: ${input}`);
//     }
// });

Deno.test("analyze() detects alphanumeric mode", () => {
    const inputs = ["Hello"];
    for (const input of inputs) {
        const result = analyze(input);
        assertEquals(result.mode, Modes.Byte, `Failed on alphanumeric input: ${input}`);
    }
});

// Deno.test("analyze() detects byte mode", () => {
//     const inputs = ["ñ", "ö", "ü", "ß", "æ", "ø", "ÿ", "À", "Ç", "é", "è"]; // non-ASCII chars
//     for (const input of inputs) {
//         const result = analyze(input);
//         assertEquals(result.mode, Modes.Byte, `Failed on byte input: ${input}`);
//     }
// });

// Deno.test("analyze() detects kanji mode", () => {
//     // Example characters that are valid in QR Kanji mode (Shift_JIS encoded)
//     // These characters must exist in the Shift_JIS range 0x8140–0x9FFC, 0xE040–0xEBBF
//     const inputs = ["茗", "漢", "字", "食", "電"];
//     for (const input of inputs) {
//         const result = analyze(input);
//         assertEquals(result.mode, Modes.Kanji, `Failed on kanji input: ${input}`);
//     }
// });

// Deno.test("requires ECI for Greek characters", () => {
//     assertEquals(analyze("ΑΒΓΔΕ").mode, Modes.ECI); // Greek (U+0391–U+03A9)
// });

//  analyze("ΑΒΓΔΕ");