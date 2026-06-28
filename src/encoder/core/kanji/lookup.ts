import { SHIFT_JIS } from "./table.ts";

function lookup(char: string): number | null {
  for (let i = 0; i < SHIFT_JIS.length; i++) {
    const row = SHIFT_JIS[i];

    // Find if the character exists in this 16-character window
    const index = row.chars.indexOf(char);

    if (index !== -1) {
      // Pristine, flat math with zero offsets or branch conditions!
      return row.base + index;
    }
  }

  return null; // Character not found
}

export { lookup };
