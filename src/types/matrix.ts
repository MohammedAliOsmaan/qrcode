
/**
 * A square matrix used for rendering the QR code modules.
 * Elements are 0 (light), 1 (dark) or null (unset).
 */
export type Matrix = Array<Array<number | null>>;

/**
 * Error correction level used across the library.
 */
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
