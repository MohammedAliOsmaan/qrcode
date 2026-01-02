/**
 * This module encodes numeric input into binary strings.
 * It takes a string or number input, validates it, and returns an array of binary strings
*/
export function numeric(input: string | number): string[] {
    if (typeof input === 'number' || /^[0-9]+$/.test(input)) {
        const groups = input.toString().match(/\d{1,3}/g) || [];

        const bits = groups.map(group => {
            // Convert each group of digits to binary, ensuring correct paddings
            if (group.length === 3) {
                return parseInt(group, 10).toString(2).padStart(10, '0');
            } else if (group.length === 2) {
                return parseInt(group, 10).toString(2).padStart(7, '0');
            } else {
                return parseInt(group, 10).toString(2).padStart(4, '0');
            }
        });
        
        return bits;
    } else {
        throw new Error('Input must be a number or numeric string');
    }
}