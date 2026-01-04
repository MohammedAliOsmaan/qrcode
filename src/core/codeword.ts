import { ErrorCorrectionLevel } from "./constants.ts";

/**
 * QR Code Error Correction Table
 * Defines codewords, error correction codewords, groups and blocks structure
 * for each QR version and error correction level.
*/

export const EC: {[version: number]: {[ec in ErrorCorrectionLevel]: {codewords: number, ecCodewords: number, groups: { blocks: number, dataCodewords: number }[]} }} = {
  1: {
    L: { codewords: 19, ecCodewords: 7, groups: [{ blocks: 1, dataCodewords: 19 }] },
    M: { codewords: 16, ecCodewords: 10, groups: [{ blocks: 1, dataCodewords: 16 }] },
    Q: { codewords: 13, ecCodewords: 13, groups: [{ blocks: 1, dataCodewords: 13 }] },
    H: { codewords: 9, ecCodewords: 17, groups: [{ blocks: 1, dataCodewords: 9 }] }
  },
  2: {
    L: { codewords: 34, ecCodewords: 10, groups: [{ blocks: 1, dataCodewords: 34 }] },
    M: { codewords: 28, ecCodewords: 16, groups: [{ blocks: 1, dataCodewords: 28 }] },
    Q: { codewords: 22, ecCodewords: 22, groups: [{ blocks: 1, dataCodewords: 22 }] },
    H: { codewords: 16, ecCodewords: 28, groups: [{ blocks: 1, dataCodewords: 16 }] }
  },
  3: {
    L: { codewords: 55, ecCodewords: 15, groups: [{ blocks: 1, dataCodewords: 55 }] },
    M: { codewords: 44, ecCodewords: 26, groups: [{ blocks: 1, dataCodewords: 44 }] },
    Q: { codewords: 34, ecCodewords: 18, groups: [{ blocks: 2, dataCodewords: 17 }] },
    H: { codewords: 26, ecCodewords: 22, groups: [{ blocks: 2, dataCodewords: 13 }] }
  },
  4: {
    L: { codewords: 80, ecCodewords: 20, groups: [{ blocks: 1, dataCodewords: 80 }] },
    M: { codewords: 64, ecCodewords: 18, groups: [{ blocks: 2, dataCodewords: 32 }] },
    Q: { codewords: 48, ecCodewords: 26, groups: [{ blocks: 2, dataCodewords: 24 }] },
    H: { codewords: 36, ecCodewords: 16, groups: [{ blocks: 4, dataCodewords: 9 }] }
  },
  5: {
    L: { codewords: 108, ecCodewords: 26, groups: [{ blocks: 1, dataCodewords: 108 }] },
    M: { codewords: 86, ecCodewords: 24, groups: [{ blocks: 2, dataCodewords: 43 }] },
    Q: { codewords: 62, ecCodewords: 18, groups: [{ blocks: 2, dataCodewords: 15 }, { blocks: 2, dataCodewords: 16 }] },
    H: { codewords: 46, ecCodewords: 22, groups: [{ blocks: 2, dataCodewords: 11 }, { blocks: 2, dataCodewords: 12 }] }
  },
  6: {
    L: { codewords: 136, ecCodewords: 18, groups: [{ blocks: 2, dataCodewords: 68 }] },
    M: { codewords: 108, ecCodewords: 16, groups: [{ blocks: 4, dataCodewords: 27 }] },
    Q: { codewords: 76, ecCodewords: 24, groups: [{ blocks: 4, dataCodewords: 19 }] },
    H: { codewords: 60, ecCodewords: 28, groups: [{ blocks: 4, dataCodewords: 15 }] }
  },
  7: {
    L: { codewords: 156, ecCodewords: 20, groups: [{ blocks: 2, dataCodewords: 78 }] },
    M: { codewords: 124, ecCodewords: 18, groups: [{ blocks: 4, dataCodewords: 31 }] },
    Q: { codewords: 88, ecCodewords: 18, groups: [{ blocks: 2, dataCodewords: 14 }, { blocks: 4, dataCodewords: 15 }] },
    H: { codewords: 66, ecCodewords: 26, groups: [{ blocks: 4, dataCodewords: 13 }, { blocks: 1, dataCodewords: 14 }] }
  },
  8: {
    L: { codewords: 194, ecCodewords: 24, groups: [{ blocks: 2, dataCodewords: 97 }] },
    M: { codewords: 154, ecCodewords: 22, groups: [{ blocks: 2, dataCodewords: 38 }, { blocks: 2, dataCodewords: 39 }] },
    Q: { codewords: 110, ecCodewords: 22, groups: [{ blocks: 4, dataCodewords: 18 }, { blocks: 2, dataCodewords: 19 }] },
    H: { codewords: 86, ecCodewords: 26, groups: [{ blocks: 4, dataCodewords: 14 }, { blocks: 2, dataCodewords: 15 }] }
  },
  9: {
    L: { codewords: 232, ecCodewords: 30, groups: [{ blocks: 2, dataCodewords: 116 }] },
    M: { codewords: 182, ecCodewords: 22, groups: [{ blocks: 3, dataCodewords: 36 }, { blocks: 2, dataCodewords: 37 }] },
    Q: { codewords: 132, ecCodewords: 20, groups: [{ blocks: 4, dataCodewords: 16 }, { blocks: 4, dataCodewords: 17 }] },
    H: { codewords: 100, ecCodewords: 24, groups: [{ blocks: 4, dataCodewords: 12 }, { blocks: 4, dataCodewords: 13 }] }
  },
  10: {
    L: { codewords: 274, ecCodewords: 18, groups: [{ blocks: 2, dataCodewords: 68 }, { blocks: 2, dataCodewords: 69 }] },
    M: { codewords: 216, ecCodewords: 26, groups: [{ blocks: 4, dataCodewords: 43 }, { blocks: 1, dataCodewords: 44 }] },
    Q: { codewords: 154, ecCodewords: 24, groups: [{ blocks: 6, dataCodewords: 19 }, { blocks: 2, dataCodewords: 20 }] },
    H: { codewords: 122, ecCodewords: 28, groups: [{ blocks: 6, dataCodewords: 15 }, { blocks: 2, dataCodewords: 16 }] }
  },
  // Versions 11-20
  11: {
    L: { codewords: 324, ecCodewords: 20, groups: [{ blocks: 4, dataCodewords: 81 }] },
    M: { codewords: 254, ecCodewords: 30, groups: [{ blocks: 1, dataCodewords: 50 }, { blocks: 4, dataCodewords: 51 }] },
    Q: { codewords: 180, ecCodewords: 28, groups: [{ blocks: 4, dataCodewords: 22 }, { blocks: 4, dataCodewords: 23 }] },
    H: { codewords: 140, ecCodewords: 24, groups: [{ blocks: 3, dataCodewords: 12 }, { blocks: 8, dataCodewords: 13 }] }
  },
  12: {
    L: { codewords: 370, ecCodewords: 24, groups: [{ blocks: 2, dataCodewords: 92 }, { blocks: 2, dataCodewords: 93 }] },
    M: { codewords: 290, ecCodewords: 22, groups: [{ blocks: 6, dataCodewords: 36 }, { blocks: 2, dataCodewords: 37 }] },
    Q: { codewords: 206, ecCodewords: 26, groups: [{ blocks: 4, dataCodewords: 20 }, { blocks: 6, dataCodewords: 21 }] },
    H: { codewords: 158, ecCodewords: 28, groups: [{ blocks: 7, dataCodewords: 14 }, { blocks: 4, dataCodewords: 15 }] }
  },
  13: {
    L: { codewords: 428, ecCodewords: 26, groups: [{ blocks: 4, dataCodewords: 107 }] },
    M: { codewords: 334, ecCodewords: 22, groups: [{ blocks: 8, dataCodewords: 37 }, { blocks: 1, dataCodewords: 38 }] },
    Q: { codewords: 244, ecCodewords: 24, groups: [{ blocks: 8, dataCodewords: 20 }, { blocks: 4, dataCodewords: 21 }] },
    H: { codewords: 180, ecCodewords: 22, groups: [{ blocks: 12, dataCodewords: 11 }, { blocks: 4, dataCodewords: 12 }] }
  },
  14: {
    L: { codewords: 461, ecCodewords: 30, groups: [{ blocks: 3, dataCodewords: 115 }, { blocks: 1, dataCodewords: 116 }] },
    M: { codewords: 365, ecCodewords: 24, groups: [{ blocks: 4, dataCodewords: 40 }, { blocks: 5, dataCodewords: 41 }] },
    Q: { codewords: 261, ecCodewords: 20, groups: [{ blocks: 11, dataCodewords: 16 }, { blocks: 5, dataCodewords: 17 }] },
    H: { codewords: 197, ecCodewords: 24, groups: [{ blocks: 11, dataCodewords: 12 }, { blocks: 5, dataCodewords: 13 }] }
  },
  15: {
    L: { codewords: 523, ecCodewords: 22, groups: [{ blocks: 5, dataCodewords: 87 }, { blocks: 1, dataCodewords: 88 }] },
    M: { codewords: 415, ecCodewords: 24, groups: [{ blocks: 5, dataCodewords: 41 }, { blocks: 5, dataCodewords: 42 }] },
    Q: { codewords: 295, ecCodewords: 30, groups: [{ blocks: 5, dataCodewords: 24 }, { blocks: 7, dataCodewords: 25 }] },
    H: { codewords: 223, ecCodewords: 24, groups: [{ blocks: 11, dataCodewords: 12 }, { blocks: 7, dataCodewords: 13 }] }
  },
  16: {
    L: { codewords: 589, ecCodewords: 24, groups: [{ blocks: 5, dataCodewords: 98 }, { blocks: 1, dataCodewords: 99 }] },
    M: { codewords: 453, ecCodewords: 28, groups: [{ blocks: 7, dataCodewords: 45 }, { blocks: 3, dataCodewords: 46 }] },
    Q: { codewords: 325, ecCodewords: 24, groups: [{ blocks: 15, dataCodewords: 19 }, { blocks: 2, dataCodewords: 20 }] },
    H: { codewords: 253, ecCodewords: 30, groups: [{ blocks: 3, dataCodewords: 15 }, { blocks: 13, dataCodewords: 16 }] }
  },
  17: {
    L: { codewords: 647, ecCodewords: 28, groups: [{ blocks: 1, dataCodewords: 107 }, { blocks: 5, dataCodewords: 108 }] },
    M: { codewords: 507, ecCodewords: 28, groups: [{ blocks: 10, dataCodewords: 46 }, { blocks: 1, dataCodewords: 47 }] },
    Q: { codewords: 367, ecCodewords: 28, groups: [{ blocks: 1, dataCodewords: 22 }, { blocks: 15, dataCodewords: 23 }] },
    H: { codewords: 283, ecCodewords: 28, groups: [{ blocks: 2, dataCodewords: 14 }, { blocks: 17, dataCodewords: 15 }] }
  },
  18: {
    L: { codewords: 721, ecCodewords: 30, groups: [{ blocks: 5, dataCodewords: 120 }, { blocks: 1, dataCodewords: 121 }] },
    M: { codewords: 563, ecCodewords: 26, groups: [{ blocks: 9, dataCodewords: 43 }, { blocks: 4, dataCodewords: 44 }] },
    Q: { codewords: 397, ecCodewords: 28, groups: [{ blocks: 17, dataCodewords: 22 }, { blocks: 1, dataCodewords: 23 }] },
    H: { codewords: 313, ecCodewords: 28, groups: [{ blocks: 2, dataCodewords: 14 }, { blocks: 19, dataCodewords: 15 }] }
  },
  19: {
    L: { codewords: 795, ecCodewords: 28, groups: [{ blocks: 3, dataCodewords: 113 }, { blocks: 4, dataCodewords: 114 }] },
    M: { codewords: 627, ecCodewords: 26, groups: [{ blocks: 3, dataCodewords: 44 }, { blocks: 11, dataCodewords: 45 }] },
    Q: { codewords: 445, ecCodewords: 26, groups: [{ blocks: 17, dataCodewords: 21 }, { blocks: 4, dataCodewords: 22 }] },
    H: { codewords: 341, ecCodewords: 26, groups: [{ blocks: 9, dataCodewords: 13 }, { blocks: 16, dataCodewords: 14 }] }
  },
  20: {
    L: { codewords: 861, ecCodewords: 28, groups: [{ blocks: 3, dataCodewords: 107 }, { blocks: 5, dataCodewords: 108 }] },
    M: { codewords: 669, ecCodewords: 26, groups: [{ blocks: 3, dataCodewords: 41 }, { blocks: 13, dataCodewords: 42 }] },
    Q: { codewords: 485, ecCodewords: 30, groups: [{ blocks: 15, dataCodewords: 24 }, { blocks: 5, dataCodewords: 25 }] },
    H: { codewords: 385, ecCodewords: 28, groups: [{ blocks: 15, dataCodewords: 15 }, { blocks: 10, dataCodewords: 16 }] }
  },
  // Versions 21-30
  21: {
    L: { codewords: 932, ecCodewords: 28, groups: [{ blocks: 4, dataCodewords: 116 }, { blocks: 4, dataCodewords: 117 }] },
    M: { codewords: 714, ecCodewords: 26, groups: [{ blocks: 17, dataCodewords: 42 }] },
    Q: { codewords: 512, ecCodewords: 28, groups: [{ blocks: 17, dataCodewords: 22 }, { blocks: 6, dataCodewords: 23 }] },
    H: { codewords: 406, ecCodewords: 30, groups: [{ blocks: 19, dataCodewords: 16 }, { blocks: 6, dataCodewords: 17 }] }
  },
  22: {
    L: { codewords: 1006, ecCodewords: 28, groups: [{ blocks: 2, dataCodewords: 111 }, { blocks: 7, dataCodewords: 112 }] },
    M: { codewords: 782, ecCodewords: 28, groups: [{ blocks: 17, dataCodewords: 46 }] },
    Q: { codewords: 568, ecCodewords: 30, groups: [{ blocks: 7, dataCodewords: 24 }, { blocks: 16, dataCodewords: 25 }] },
    H: { codewords: 442, ecCodewords: 24, groups: [{ blocks: 34, dataCodewords: 13 }] }
  },
  23: {
    L: { codewords: 1094, ecCodewords: 30, groups: [{ blocks: 4, dataCodewords: 121 }, { blocks: 5, dataCodewords: 122 }] },
    M: { codewords: 860, ecCodewords: 28, groups: [{ blocks: 4, dataCodewords: 47 }, { blocks: 14, dataCodewords: 48 }] },
    Q: { codewords: 614, ecCodewords: 30, groups: [{ blocks: 11, dataCodewords: 24 }, { blocks: 14, dataCodewords: 25 }] },
    H: { codewords: 464, ecCodewords: 30, groups: [{ blocks: 16, dataCodewords: 15 }, { blocks: 14, dataCodewords: 16 }] }
  },
  24: {
    L: { codewords: 1174, ecCodewords: 30, groups: [{ blocks: 6, dataCodewords: 117 }, { blocks: 4, dataCodewords: 118 }] },
    M: { codewords: 914, ecCodewords: 28, groups: [{ blocks: 6, dataCodewords: 45 }, { blocks: 14, dataCodewords: 46 }] },
    Q: { codewords: 664, ecCodewords: 30, groups: [{ blocks: 11, dataCodewords: 24 }, { blocks: 16, dataCodewords: 25 }] },
    H: { codewords: 514, ecCodewords: 30, groups: [{ blocks: 30, dataCodewords: 16 }, { blocks: 2, dataCodewords: 17 }] }
  },
  25: {
    L: { codewords: 1276, ecCodewords: 26, groups: [{ blocks: 8, dataCodewords: 106 }, { blocks: 4, dataCodewords: 107 }] },
    M: { codewords: 1000, ecCodewords: 28, groups: [{ blocks: 8, dataCodewords: 47 }, { blocks: 13, dataCodewords: 48 }] },
    Q: { codewords: 718, ecCodewords: 30, groups: [{ blocks: 7, dataCodewords: 24 }, { blocks: 22, dataCodewords: 25 }] },
    H: { codewords: 538, ecCodewords: 30, groups: [{ blocks: 22, dataCodewords: 15 }, { blocks: 13, dataCodewords: 16 }] }
  },
  26: {
    L: { codewords: 1370, ecCodewords: 28, groups: [{ blocks: 10, dataCodewords: 114 }, { blocks: 2, dataCodewords: 115 }] },
    M: { codewords: 1062, ecCodewords: 28, groups: [{ blocks: 19, dataCodewords: 46 }, { blocks: 4, dataCodewords: 47 }] },
    Q: { codewords: 754, ecCodewords: 28, groups: [{ blocks: 28, dataCodewords: 22 }, { blocks: 6, dataCodewords: 23 }] },
    H: { codewords: 596, ecCodewords: 30, groups: [{ blocks: 33, dataCodewords: 16 }, { blocks: 4, dataCodewords: 17 }] }
  },
  27: {
    L: { codewords: 1468, ecCodewords: 30, groups: [{ blocks: 8, dataCodewords: 122 }, { blocks: 4, dataCodewords: 123 }] },
    M: { codewords: 1128, ecCodewords: 28, groups: [{ blocks: 22, dataCodewords: 45 }, { blocks: 3, dataCodewords: 46 }] },
    Q: { codewords: 808, ecCodewords: 30, groups: [{ blocks: 8, dataCodewords: 23 }, { blocks: 26, dataCodewords: 24 }] },
    H: { codewords: 628, ecCodewords: 30, groups: [{ blocks: 12, dataCodewords: 15 }, { blocks: 28, dataCodewords: 16 }] }
  },
  28: {
    L: { codewords: 1531, ecCodewords: 30, groups: [{ blocks: 3, dataCodewords: 117 }, { blocks: 10, dataCodewords: 118 }] },
    M: { codewords: 1193, ecCodewords: 28, groups: [{ blocks: 3, dataCodewords: 45 }, { blocks: 23, dataCodewords: 46 }] },
    Q: { codewords: 871, ecCodewords: 30, groups: [{ blocks: 4, dataCodewords: 24 }, { blocks: 31, dataCodewords: 25 }] },
    H: { codewords: 661, ecCodewords: 30, groups: [{ blocks: 11, dataCodewords: 15 }, { blocks: 31, dataCodewords: 16 }] }
  },
  29: {
    L: { codewords: 1631, ecCodewords: 30, groups: [{ blocks: 7, dataCodewords: 116 }, { blocks: 7, dataCodewords: 117 }] },
    M: { codewords: 1267, ecCodewords: 28, groups: [{ blocks: 21, dataCodewords: 45 }, { blocks: 7, dataCodewords: 46 }] },
    Q: { codewords: 911, ecCodewords: 30, groups: [{ blocks: 1, dataCodewords: 23 }, { blocks: 37, dataCodewords: 24 }] },
    H: { codewords: 701, ecCodewords: 30, groups: [{ blocks: 19, dataCodewords: 15 }, { blocks: 26, dataCodewords: 16 }] }
  },
  30: {
    L: { codewords: 1735, ecCodewords: 30, groups: [{ blocks: 5, dataCodewords: 115 }, { blocks: 10, dataCodewords: 116 }] },
    M: { codewords: 1373, ecCodewords: 28, groups: [{ blocks: 19, dataCodewords: 47 }, { blocks: 10, dataCodewords: 48 }] },
    Q: { codewords: 985, ecCodewords: 30, groups: [{ blocks: 15, dataCodewords: 24 }, { blocks: 25, dataCodewords: 25 }] },
    H: { codewords: 745, ecCodewords: 30, groups: [{ blocks: 23, dataCodewords: 15 }, { blocks: 25, dataCodewords: 16 }] }
  },
  // Versions 31-40
  31: {
    L: { codewords: 1843, ecCodewords: 30, groups: [{ blocks: 13, dataCodewords: 115 }, { blocks: 3, dataCodewords: 116 }] },
    M: { codewords: 1455, ecCodewords: 28, groups: [{ blocks: 2, dataCodewords: 46 }, { blocks: 29, dataCodewords: 47 }] },
    Q: { codewords: 1033, ecCodewords: 30, groups: [{ blocks: 42, dataCodewords: 24 }, { blocks: 1, dataCodewords: 25 }] },
    H: { codewords: 793, ecCodewords: 30, groups: [{ blocks: 23, dataCodewords: 15 }, { blocks: 28, dataCodewords: 16 }] }
  },
  32: {
    L: { codewords: 1955, ecCodewords: 30, groups: [{ blocks: 17, dataCodewords: 115 }] },
    M: { codewords: 1541, ecCodewords: 28, groups: [{ blocks: 10, dataCodewords: 46 }, { blocks: 23, dataCodewords: 47 }] },
    Q: { codewords: 1115, ecCodewords: 30, groups: [{ blocks: 10, dataCodewords: 24 }, { blocks: 35, dataCodewords: 25 }] },
    H: { codewords: 845, ecCodewords: 30, groups: [{ blocks: 19, dataCodewords: 15 }, { blocks: 35, dataCodewords: 16 }] }
  },
  33: {
    L: { codewords: 2071, ecCodewords: 30, groups: [{ blocks: 17, dataCodewords: 115 }, { blocks: 1, dataCodewords: 116 }] },
    M: { codewords: 1631, ecCodewords: 28, groups: [{ blocks: 14, dataCodewords: 46 }, { blocks: 21, dataCodewords: 47 }] },
    Q: { codewords: 1171, ecCodewords: 30, groups: [{ blocks: 29, dataCodewords: 24 }, { blocks: 19, dataCodewords: 25 }] },
    H: { codewords: 901, ecCodewords: 30, groups: [{ blocks: 11, dataCodewords: 15 }, { blocks: 46, dataCodewords: 16 }] }
  },
  34: {
    L: { codewords: 2191, ecCodewords: 30, groups: [{ blocks: 13, dataCodewords: 115 }, { blocks: 6, dataCodewords: 116 }] },
    M: { codewords: 1725, ecCodewords: 28, groups: [{ blocks: 14, dataCodewords: 46 }, { blocks: 23, dataCodewords: 47 }] },
    Q: { codewords: 1231, ecCodewords: 30, groups: [{ blocks: 44, dataCodewords: 24 }, { blocks: 7, dataCodewords: 25 }] },
    H: { codewords: 961, ecCodewords: 30, groups: [{ blocks: 59, dataCodewords: 16 }, { blocks: 1, dataCodewords: 17 }] }
  },
  35: {
    L: { codewords: 2306, ecCodewords: 30, groups: [{ blocks: 12, dataCodewords: 121 }, { blocks: 7, dataCodewords: 122 }] },
    M: { codewords: 1812, ecCodewords: 28, groups: [{ blocks: 12, dataCodewords: 47 }, { blocks: 26, dataCodewords: 48 }] },
    Q: { codewords: 1286, ecCodewords: 30, groups: [{ blocks: 39, dataCodewords: 24 }, { blocks: 14, dataCodewords: 25 }] },
    H: { codewords: 986, ecCodewords: 30, groups: [{ blocks: 22, dataCodewords: 15 }, { blocks: 41, dataCodewords: 16 }] }
  },
  36: {
    L: { codewords: 2434, ecCodewords: 30, groups: [{ blocks: 6, dataCodewords: 121 }, { blocks: 14, dataCodewords: 122 }] },
    M: { codewords: 1914, ecCodewords: 28, groups: [{ blocks: 6, dataCodewords: 47 }, { blocks: 34, dataCodewords: 48 }] },
    Q: { codewords: 1354, ecCodewords: 30, groups: [{ blocks: 46, dataCodewords: 24 }, { blocks: 10, dataCodewords: 25 }] },
    H: { codewords: 1054, ecCodewords: 30, groups: [{ blocks: 2, dataCodewords: 15 }, { blocks: 64, dataCodewords: 16 }] }
  },
  37: {
    L: { codewords: 2566, ecCodewords: 30, groups: [{ blocks: 17, dataCodewords: 122 }, { blocks: 4, dataCodewords: 123 }] },
    M: { codewords: 1992, ecCodewords: 28, groups: [{ blocks: 29, dataCodewords: 46 }, { blocks: 14, dataCodewords: 47 }] },
    Q: { codewords: 1426, ecCodewords: 30, groups: [{ blocks: 49, dataCodewords: 24 }, { blocks: 10, dataCodewords: 25 }] },
    H: { codewords: 1096, ecCodewords: 30, groups: [{ blocks: 24, dataCodewords: 15 }, { blocks: 46, dataCodewords: 16 }] }
  },
  38: {
    L: { codewords: 2702, ecCodewords: 30, groups: [{ blocks: 4, dataCodewords: 122 }, { blocks: 18, dataCodewords: 123 }] },
    M: { codewords: 2102, ecCodewords: 28, groups: [{ blocks: 13, dataCodewords: 46 }, { blocks: 32, dataCodewords: 47 }] },
    Q: { codewords: 1502, ecCodewords: 30, groups: [{ blocks: 48, dataCodewords: 24 }, { blocks: 14, dataCodewords: 25 }] },
    H: { codewords: 1142, ecCodewords: 30, groups: [{ blocks: 42, dataCodewords: 15 }, { blocks: 32, dataCodewords: 16 }] }
  },
  39: {
    L: { codewords: 2812, ecCodewords: 30, groups: [{ blocks: 20, dataCodewords: 117 }, { blocks: 4, dataCodewords: 118 }] },
    M: { codewords: 2216, ecCodewords: 28, groups: [{ blocks: 40, dataCodewords: 47 }, { blocks: 7, dataCodewords: 48 }] },
    Q: { codewords: 1582, ecCodewords: 30, groups: [{ blocks: 43, dataCodewords: 24 }, { blocks: 22, dataCodewords: 25 }] },
    H: { codewords: 1222, ecCodewords: 30, groups: [{ blocks: 10, dataCodewords: 15 }, { blocks: 67, dataCodewords: 16 }] }
  },
  40: {
    L: { codewords: 2956, ecCodewords: 30, groups: [{ blocks: 19, dataCodewords: 118 }, { blocks: 6, dataCodewords: 119 }] },
    M: { codewords: 2334, ecCodewords: 28, groups: [{ blocks: 18, dataCodewords: 47 }, { blocks: 31, dataCodewords: 48 }] },
    Q: { codewords: 1666, ecCodewords: 30, groups: [{ blocks: 34, dataCodewords: 24 }, { blocks: 34, dataCodewords: 25 }] },
    H: { codewords: 1276, ecCodewords: 30, groups: [{ blocks: 20, dataCodewords: 15 }, { blocks: 61, dataCodewords: 16 }] }
  }
};


export function codewords(version: number, level: ErrorCorrectionLevel): { codewords: number; ecCodewords: number; groups: { blocks: number; dataCodewords: number }[] } {
  if (!EC[version] || !EC[version][level]) {
    throw new Error(`Invalid version ${version} or error correction level ${level}`);
  }
  return EC[version][level];
}