import { Modes, ErrorCorrectionLevel, quality } from './constants.ts';

/**
 * QR Code capacity table for different versions and error correction levels.
 * This table defines the maximum number of characters that can be encoded
 * in a QR Code of a specific version and error correction level.
 */

export const capacities: {
  readonly [version: number]: { [ec in ErrorCorrectionLevel]: { [mode in Modes]: number } };
} = {
  1: {
    L: { [Modes.Numeric]: 41, [Modes.Alphanumeric]: 25, [Modes.Byte]: 17, [Modes.Kanji]: 10 },
    M: { [Modes.Numeric]: 34, [Modes.Alphanumeric]: 20, [Modes.Byte]: 14, [Modes.Kanji]: 8 },
    Q: { [Modes.Numeric]: 27, [Modes.Alphanumeric]: 16, [Modes.Byte]: 11, [Modes.Kanji]: 7 },
    H: { [Modes.Numeric]: 17, [Modes.Alphanumeric]: 10, [Modes.Byte]: 7, [Modes.Kanji]: 4 },
  },
  2: {
    L: { [Modes.Numeric]: 77, [Modes.Alphanumeric]: 47, [Modes.Byte]: 32, [Modes.Kanji]: 20 },
    M: { [Modes.Numeric]: 63, [Modes.Alphanumeric]: 38, [Modes.Byte]: 26, [Modes.Kanji]: 16 },
    Q: { [Modes.Numeric]: 48, [Modes.Alphanumeric]: 29, [Modes.Byte]: 20, [Modes.Kanji]: 12 },
    H: { [Modes.Numeric]: 34, [Modes.Alphanumeric]: 20, [Modes.Byte]: 14, [Modes.Kanji]: 8 },
  },
  3: {
    L: { [Modes.Numeric]: 127, [Modes.Alphanumeric]: 77, [Modes.Byte]: 53, [Modes.Kanji]: 32 },
    M: { [Modes.Numeric]: 101, [Modes.Alphanumeric]: 61, [Modes.Byte]: 42, [Modes.Kanji]: 26 },
    Q: { [Modes.Numeric]: 77, [Modes.Alphanumeric]: 47, [Modes.Byte]: 32, [Modes.Kanji]: 20 },
    H: { [Modes.Numeric]: 58, [Modes.Alphanumeric]: 35, [Modes.Byte]: 24, [Modes.Kanji]: 15 },
  },
  4: {
    L: { [Modes.Numeric]: 187, [Modes.Alphanumeric]: 114, [Modes.Byte]: 78, [Modes.Kanji]: 48 },
    M: { [Modes.Numeric]: 149, [Modes.Alphanumeric]: 90, [Modes.Byte]: 62, [Modes.Kanji]: 38 },
    Q: { [Modes.Numeric]: 111, [Modes.Alphanumeric]: 67, [Modes.Byte]: 46, [Modes.Kanji]: 28 },
    H: { [Modes.Numeric]: 82, [Modes.Alphanumeric]: 50, [Modes.Byte]: 34, [Modes.Kanji]: 21 },
  },
  5: {
    L: { [Modes.Numeric]: 255, [Modes.Alphanumeric]: 154, [Modes.Byte]: 106, [Modes.Kanji]: 65 },
    M: { [Modes.Numeric]: 202, [Modes.Alphanumeric]: 122, [Modes.Byte]: 84, [Modes.Kanji]: 52 },
    Q: { [Modes.Numeric]: 144, [Modes.Alphanumeric]: 87, [Modes.Byte]: 60, [Modes.Kanji]: 37 },
    H: { [Modes.Numeric]: 106, [Modes.Alphanumeric]: 64, [Modes.Byte]: 44, [Modes.Kanji]: 27 },
  },
  6: {
    L: { [Modes.Numeric]: 322, [Modes.Alphanumeric]: 195, [Modes.Byte]: 134, [Modes.Kanji]: 82 },
    M: { [Modes.Numeric]: 255, [Modes.Alphanumeric]: 154, [Modes.Byte]: 106, [Modes.Kanji]: 65 },
    Q: { [Modes.Numeric]: 178, [Modes.Alphanumeric]: 108, [Modes.Byte]: 74, [Modes.Kanji]: 45 },
    H: { [Modes.Numeric]: 139, [Modes.Alphanumeric]: 84, [Modes.Byte]: 58, [Modes.Kanji]: 36 },
  },
  7: {
    L: { [Modes.Numeric]: 370, [Modes.Alphanumeric]: 224, [Modes.Byte]: 154, [Modes.Kanji]: 95 },
    M: { [Modes.Numeric]: 293, [Modes.Alphanumeric]: 178, [Modes.Byte]: 122, [Modes.Kanji]: 75 },
    Q: { [Modes.Numeric]: 207, [Modes.Alphanumeric]: 125, [Modes.Byte]: 86, [Modes.Kanji]: 53 },
    H: { [Modes.Numeric]: 154, [Modes.Alphanumeric]: 93, [Modes.Byte]: 64, [Modes.Kanji]: 39 },
  },
  8: {
    L: { [Modes.Numeric]: 461, [Modes.Alphanumeric]: 279, [Modes.Byte]: 192, [Modes.Kanji]: 118 },
    M: { [Modes.Numeric]: 365, [Modes.Alphanumeric]: 221, [Modes.Byte]: 152, [Modes.Kanji]: 93 },
    Q: { [Modes.Numeric]: 259, [Modes.Alphanumeric]: 157, [Modes.Byte]: 108, [Modes.Kanji]: 66 },
    H: { [Modes.Numeric]: 202, [Modes.Alphanumeric]: 122, [Modes.Byte]: 84, [Modes.Kanji]: 52 },
  },
  9: {
    L: { [Modes.Numeric]: 552, [Modes.Alphanumeric]: 335, [Modes.Byte]: 230, [Modes.Kanji]: 141 },
    M: { [Modes.Numeric]: 432, [Modes.Alphanumeric]: 262, [Modes.Byte]: 180, [Modes.Kanji]: 111 },
    Q: { [Modes.Numeric]: 312, [Modes.Alphanumeric]: 189, [Modes.Byte]: 130, [Modes.Kanji]: 80 },
    H: { [Modes.Numeric]: 235, [Modes.Alphanumeric]: 143, [Modes.Byte]: 98, [Modes.Kanji]: 60 },
  },
  10: {
    L: { [Modes.Numeric]: 652, [Modes.Alphanumeric]: 395, [Modes.Byte]: 271, [Modes.Kanji]: 167 },
    M: { [Modes.Numeric]: 513, [Modes.Alphanumeric]: 311, [Modes.Byte]: 213, [Modes.Kanji]: 131 },
    Q: { [Modes.Numeric]: 364, [Modes.Alphanumeric]: 221, [Modes.Byte]: 151, [Modes.Kanji]: 93 },
    H: { [Modes.Numeric]: 288, [Modes.Alphanumeric]: 174, [Modes.Byte]: 119, [Modes.Kanji]: 74 },
  },
  11: {
    L: { [Modes.Numeric]: 772, [Modes.Alphanumeric]: 468, [Modes.Byte]: 321, [Modes.Kanji]: 198 },
    M: { [Modes.Numeric]: 604, [Modes.Alphanumeric]: 366, [Modes.Byte]: 251, [Modes.Kanji]: 155 },
    Q: { [Modes.Numeric]: 427, [Modes.Alphanumeric]: 259, [Modes.Byte]: 177, [Modes.Kanji]: 109 },
    H: { [Modes.Numeric]: 331, [Modes.Alphanumeric]: 200, [Modes.Byte]: 137, [Modes.Kanji]: 85 },
  },
  12: {
    L: { [Modes.Numeric]: 883, [Modes.Alphanumeric]: 535, [Modes.Byte]: 367, [Modes.Kanji]: 226 },
    M: { [Modes.Numeric]: 691, [Modes.Alphanumeric]: 419, [Modes.Byte]: 287, [Modes.Kanji]: 177 },
    Q: { [Modes.Numeric]: 489, [Modes.Alphanumeric]: 296, [Modes.Byte]: 203, [Modes.Kanji]: 125 },
    H: { [Modes.Numeric]: 374, [Modes.Alphanumeric]: 227, [Modes.Byte]: 155, [Modes.Kanji]: 96 },
  },
  13: {
    L: { [Modes.Numeric]: 1022, [Modes.Alphanumeric]: 619, [Modes.Byte]: 425, [Modes.Kanji]: 262 },
    M: { [Modes.Numeric]: 796, [Modes.Alphanumeric]: 483, [Modes.Byte]: 331, [Modes.Kanji]: 204 },
    Q: { [Modes.Numeric]: 580, [Modes.Alphanumeric]: 352, [Modes.Byte]: 241, [Modes.Kanji]: 149 },
    H: { [Modes.Numeric]: 427, [Modes.Alphanumeric]: 259, [Modes.Byte]: 177, [Modes.Kanji]: 109 },
  },
  14: {
    L: { [Modes.Numeric]: 1101, [Modes.Alphanumeric]: 667, [Modes.Byte]: 458, [Modes.Kanji]: 282 },
    M: { [Modes.Numeric]: 871, [Modes.Alphanumeric]: 528, [Modes.Byte]: 362, [Modes.Kanji]: 223 },
    Q: { [Modes.Numeric]: 621, [Modes.Alphanumeric]: 376, [Modes.Byte]: 258, [Modes.Kanji]: 159 },
    H: { [Modes.Numeric]: 468, [Modes.Alphanumeric]: 283, [Modes.Byte]: 194, [Modes.Kanji]: 120 },
  },
  15: {
    L: { [Modes.Numeric]: 1250, [Modes.Alphanumeric]: 758, [Modes.Byte]: 520, [Modes.Kanji]: 320 },
    M: { [Modes.Numeric]: 991, [Modes.Alphanumeric]: 600, [Modes.Byte]: 412, [Modes.Kanji]: 254 },
    Q: { [Modes.Numeric]: 703, [Modes.Alphanumeric]: 426, [Modes.Byte]: 292, [Modes.Kanji]: 180 },
    H: { [Modes.Numeric]: 530, [Modes.Alphanumeric]: 321, [Modes.Byte]: 220, [Modes.Kanji]: 136 },
  },
  16: {
    L: { [Modes.Numeric]: 1408, [Modes.Alphanumeric]: 854, [Modes.Byte]: 586, [Modes.Kanji]: 361 },
    M: { [Modes.Numeric]: 1082, [Modes.Alphanumeric]: 656, [Modes.Byte]: 450, [Modes.Kanji]: 277 },
    Q: { [Modes.Numeric]: 775, [Modes.Alphanumeric]: 470, [Modes.Byte]: 322, [Modes.Kanji]: 198 },
    H: { [Modes.Numeric]: 602, [Modes.Alphanumeric]: 365, [Modes.Byte]: 250, [Modes.Kanji]: 154 },
  },
  17: {
    L: { [Modes.Numeric]: 1548, [Modes.Alphanumeric]: 938, [Modes.Byte]: 644, [Modes.Kanji]: 397 },
    M: { [Modes.Numeric]: 1212, [Modes.Alphanumeric]: 734, [Modes.Byte]: 504, [Modes.Kanji]: 310 },
    Q: { [Modes.Numeric]: 876, [Modes.Alphanumeric]: 531, [Modes.Byte]: 364, [Modes.Kanji]: 224 },
    H: { [Modes.Numeric]: 674, [Modes.Alphanumeric]: 408, [Modes.Byte]: 280, [Modes.Kanji]: 173 },
  },
  18: {
    L: { [Modes.Numeric]: 1725, [Modes.Alphanumeric]: 1046, [Modes.Byte]: 718, [Modes.Kanji]: 442 },
    M: { [Modes.Numeric]: 1346, [Modes.Alphanumeric]: 816, [Modes.Byte]: 560, [Modes.Kanji]: 345 },
    Q: { [Modes.Numeric]: 948, [Modes.Alphanumeric]: 574, [Modes.Byte]: 394, [Modes.Kanji]: 243 },
    H: { [Modes.Numeric]: 746, [Modes.Alphanumeric]: 452, [Modes.Byte]: 310, [Modes.Kanji]: 191 },
  },
  19: {
    L: { [Modes.Numeric]: 1903, [Modes.Alphanumeric]: 1153, [Modes.Byte]: 792, [Modes.Kanji]: 488 },
    M: { [Modes.Numeric]: 1500, [Modes.Alphanumeric]: 909, [Modes.Byte]: 624, [Modes.Kanji]: 384 },
    Q: { [Modes.Numeric]: 1063, [Modes.Alphanumeric]: 644, [Modes.Byte]: 442, [Modes.Kanji]: 272 },
    H: { [Modes.Numeric]: 813, [Modes.Alphanumeric]: 493, [Modes.Byte]: 338, [Modes.Kanji]: 208 },
  },
  20: {
    L: { [Modes.Numeric]: 2061, [Modes.Alphanumeric]: 1249, [Modes.Byte]: 858, [Modes.Kanji]: 528 },
    M: { [Modes.Numeric]: 1600, [Modes.Alphanumeric]: 970, [Modes.Byte]: 666, [Modes.Kanji]: 410 },
    Q: { [Modes.Numeric]: 1159, [Modes.Alphanumeric]: 702, [Modes.Byte]: 482, [Modes.Kanji]: 297 },
    H: { [Modes.Numeric]: 919, [Modes.Alphanumeric]: 557, [Modes.Byte]: 382, [Modes.Kanji]: 235 },
  },
  21: {
    L: { [Modes.Numeric]: 2232, [Modes.Alphanumeric]: 1352, [Modes.Byte]: 929, [Modes.Kanji]: 572 },
    M: { [Modes.Numeric]: 1708, [Modes.Alphanumeric]: 1035, [Modes.Byte]: 711, [Modes.Kanji]: 438 },
    Q: { [Modes.Numeric]: 1224, [Modes.Alphanumeric]: 742, [Modes.Byte]: 509, [Modes.Kanji]: 314 },
    H: { [Modes.Numeric]: 969, [Modes.Alphanumeric]: 587, [Modes.Byte]: 403, [Modes.Kanji]: 248 },
  },
  22: {
    L: { [Modes.Numeric]: 2409, [Modes.Alphanumeric]: 1460, [Modes.Byte]: 1003, [Modes.Kanji]: 618 },
    M: { [Modes.Numeric]: 1872, [Modes.Alphanumeric]: 1134, [Modes.Byte]: 779, [Modes.Kanji]: 480 },
    Q: { [Modes.Numeric]: 1358, [Modes.Alphanumeric]: 823, [Modes.Byte]: 565, [Modes.Kanji]: 348 },
    H: { [Modes.Numeric]: 1056, [Modes.Alphanumeric]: 640, [Modes.Byte]: 439, [Modes.Kanji]: 270 },
  },
  23: {
    L: { [Modes.Numeric]: 2620, [Modes.Alphanumeric]: 1588, [Modes.Byte]: 1091, [Modes.Kanji]: 672 },
    M: { [Modes.Numeric]: 2059, [Modes.Alphanumeric]: 1248, [Modes.Byte]: 857, [Modes.Kanji]: 528 },
    Q: { [Modes.Numeric]: 1468, [Modes.Alphanumeric]: 890, [Modes.Byte]: 611, [Modes.Kanji]: 376 },
    H: { [Modes.Numeric]: 1108, [Modes.Alphanumeric]: 672, [Modes.Byte]: 461, [Modes.Kanji]: 284 },
  },
  24: {
    L: { [Modes.Numeric]: 2812, [Modes.Alphanumeric]: 1704, [Modes.Byte]: 1171, [Modes.Kanji]: 721 },
    M: { [Modes.Numeric]: 2188, [Modes.Alphanumeric]: 1326, [Modes.Byte]: 911, [Modes.Kanji]: 561 },
    Q: { [Modes.Numeric]: 1588, [Modes.Alphanumeric]: 963, [Modes.Byte]: 661, [Modes.Kanji]: 407 },
    H: { [Modes.Numeric]: 1228, [Modes.Alphanumeric]: 744, [Modes.Byte]: 511, [Modes.Kanji]: 315 },
  },
  25: {
    L: { [Modes.Numeric]: 3057, [Modes.Alphanumeric]: 1853, [Modes.Byte]: 1273, [Modes.Kanji]: 784 },
    M: { [Modes.Numeric]: 2395, [Modes.Alphanumeric]: 1451, [Modes.Byte]: 997, [Modes.Kanji]: 614 },
    Q: { [Modes.Numeric]: 1718, [Modes.Alphanumeric]: 1041, [Modes.Byte]: 715, [Modes.Kanji]: 440 },
    H: { [Modes.Numeric]: 1286, [Modes.Alphanumeric]: 779, [Modes.Byte]: 535, [Modes.Kanji]: 330 },
  },
  26: {
    L: { [Modes.Numeric]: 3283, [Modes.Alphanumeric]: 1990, [Modes.Byte]: 1367, [Modes.Kanji]: 842 },
    M: { [Modes.Numeric]: 2544, [Modes.Alphanumeric]: 1542, [Modes.Byte]: 1059, [Modes.Kanji]: 652 },
    Q: { [Modes.Numeric]: 1804, [Modes.Alphanumeric]: 1094, [Modes.Byte]: 751, [Modes.Kanji]: 462 },
    H: { [Modes.Numeric]: 1425, [Modes.Alphanumeric]: 864, [Modes.Byte]: 593, [Modes.Kanji]: 365 },
  },
  27: {
    L: { [Modes.Numeric]: 3517, [Modes.Alphanumeric]: 2132, [Modes.Byte]: 1465, [Modes.Kanji]: 902 },
    M: { [Modes.Numeric]: 2701, [Modes.Alphanumeric]: 1637, [Modes.Byte]: 1125, [Modes.Kanji]: 692 },
    Q: { [Modes.Numeric]: 1933, [Modes.Alphanumeric]: 1172, [Modes.Byte]: 805, [Modes.Kanji]: 496 },
    H: { [Modes.Numeric]: 1501, [Modes.Alphanumeric]: 910, [Modes.Byte]: 625, [Modes.Kanji]: 385 },
  },
  28: {
    L: { [Modes.Numeric]: 3669, [Modes.Alphanumeric]: 2223, [Modes.Byte]: 1528, [Modes.Kanji]: 940 },
    M: { [Modes.Numeric]: 2857, [Modes.Alphanumeric]: 1732, [Modes.Byte]: 1190, [Modes.Kanji]: 732 },
    Q: { [Modes.Numeric]: 2085, [Modes.Alphanumeric]: 1263, [Modes.Byte]: 868, [Modes.Kanji]: 534 },
    H: { [Modes.Numeric]: 1581, [Modes.Alphanumeric]: 958, [Modes.Byte]: 658, [Modes.Kanji]: 405 },
  },
  29: {
    L: { [Modes.Numeric]: 3909, [Modes.Alphanumeric]: 2369, [Modes.Byte]: 1628, [Modes.Kanji]: 1002 },
    M: { [Modes.Numeric]: 3035, [Modes.Alphanumeric]: 1839, [Modes.Byte]: 1264, [Modes.Kanji]: 778 },
    Q: { [Modes.Numeric]: 2181, [Modes.Alphanumeric]: 1322, [Modes.Byte]: 908, [Modes.Kanji]: 559 },
    H: { [Modes.Numeric]: 1677, [Modes.Alphanumeric]: 1016, [Modes.Byte]: 698, [Modes.Kanji]: 430 },
  },
  30: {
    L: { [Modes.Numeric]: 4158, [Modes.Alphanumeric]: 2520, [Modes.Byte]: 1732, [Modes.Kanji]: 1066 },
    M: { [Modes.Numeric]: 3289, [Modes.Alphanumeric]: 1994, [Modes.Byte]: 1370, [Modes.Kanji]: 843 },
    Q: { [Modes.Numeric]: 2358, [Modes.Alphanumeric]: 1429, [Modes.Byte]: 982, [Modes.Kanji]: 604 },
    H: { [Modes.Numeric]: 1782, [Modes.Alphanumeric]: 1080, [Modes.Byte]: 742, [Modes.Kanji]: 457 },
  },
  31: {
    L: { [Modes.Numeric]: 4417, [Modes.Alphanumeric]: 2677, [Modes.Byte]: 1840, [Modes.Kanji]: 1132 },
    M: { [Modes.Numeric]: 3486, [Modes.Alphanumeric]: 2113, [Modes.Byte]: 1452, [Modes.Kanji]: 894 },
    Q: { [Modes.Numeric]: 2473, [Modes.Alphanumeric]: 1499, [Modes.Byte]: 1030, [Modes.Kanji]: 634 },
    H: { [Modes.Numeric]: 1897, [Modes.Alphanumeric]: 1150, [Modes.Byte]: 790, [Modes.Kanji]: 486 },
  },
  32: {
    L: { [Modes.Numeric]: 4686, [Modes.Alphanumeric]: 2840, [Modes.Byte]: 1952, [Modes.Kanji]: 1201 },
    M: { [Modes.Numeric]: 3693, [Modes.Alphanumeric]: 2238, [Modes.Byte]: 1538, [Modes.Kanji]: 947 },
    Q: { [Modes.Numeric]: 2670, [Modes.Alphanumeric]: 1618, [Modes.Byte]: 1112, [Modes.Kanji]: 684 },
    H: { [Modes.Numeric]: 2022, [Modes.Alphanumeric]: 1226, [Modes.Byte]: 842, [Modes.Kanji]: 518 },
  },
  33: {
    L: { [Modes.Numeric]: 4965, [Modes.Alphanumeric]: 3009, [Modes.Byte]: 2068, [Modes.Kanji]: 1273 },
    M: { [Modes.Numeric]: 3909, [Modes.Alphanumeric]: 2369, [Modes.Byte]: 1628, [Modes.Kanji]: 1002 },
    Q: { [Modes.Numeric]: 2805, [Modes.Alphanumeric]: 1700, [Modes.Byte]: 1168, [Modes.Kanji]: 719 },
    H: { [Modes.Numeric]: 2157, [Modes.Alphanumeric]: 1307, [Modes.Byte]: 898, [Modes.Kanji]: 553 },
  },
  34: {
    L: { [Modes.Numeric]: 5253, [Modes.Alphanumeric]: 3183, [Modes.Byte]: 2188, [Modes.Kanji]: 1347 },
    M: { [Modes.Numeric]: 4134, [Modes.Alphanumeric]: 2506, [Modes.Byte]: 1722, [Modes.Kanji]: 1060 },
    Q: { [Modes.Numeric]: 2949, [Modes.Alphanumeric]: 1787, [Modes.Byte]: 1228, [Modes.Kanji]: 756 },
    H: { [Modes.Numeric]: 2301, [Modes.Alphanumeric]: 1394, [Modes.Byte]: 958, [Modes.Kanji]: 590 },
  },
  35: {
    L: { [Modes.Numeric]: 5529, [Modes.Alphanumeric]: 3351, [Modes.Byte]: 2303, [Modes.Kanji]: 1417 },
    M: { [Modes.Numeric]: 4343, [Modes.Alphanumeric]: 2632, [Modes.Byte]: 1809, [Modes.Kanji]: 1113 },
    Q: { [Modes.Numeric]: 3081, [Modes.Alphanumeric]: 1867, [Modes.Byte]: 1283, [Modes.Kanji]: 790 },
    H: { [Modes.Numeric]: 2361, [Modes.Alphanumeric]: 1431, [Modes.Byte]: 983, [Modes.Kanji]: 605 },
  },
  36: {
    L: { [Modes.Numeric]: 5836, [Modes.Alphanumeric]: 3537, [Modes.Byte]: 2431, [Modes.Kanji]: 1496 },
    M: { [Modes.Numeric]: 4588, [Modes.Alphanumeric]: 2780, [Modes.Byte]: 1911, [Modes.Kanji]: 1176 },
    Q: { [Modes.Numeric]: 3244, [Modes.Alphanumeric]: 1966, [Modes.Byte]: 1351, [Modes.Kanji]: 832 },
    H: { [Modes.Numeric]: 2524, [Modes.Alphanumeric]: 1530, [Modes.Byte]: 1051, [Modes.Kanji]: 647 },
  },
  37: {
    L: { [Modes.Numeric]: 6153, [Modes.Alphanumeric]: 3729, [Modes.Byte]: 2563, [Modes.Kanji]: 1577 },
    M: { [Modes.Numeric]: 4775, [Modes.Alphanumeric]: 2894, [Modes.Byte]: 1989, [Modes.Kanji]: 1224 },
    Q: { [Modes.Numeric]: 3417, [Modes.Alphanumeric]: 2071, [Modes.Byte]: 1423, [Modes.Kanji]: 876 },
    H: { [Modes.Numeric]: 2625, [Modes.Alphanumeric]: 1591, [Modes.Byte]: 1093, [Modes.Kanji]: 673 },
  },
  38: {
    L: { [Modes.Numeric]: 6479, [Modes.Alphanumeric]: 3927, [Modes.Byte]: 2699, [Modes.Kanji]: 1661 },
    M: { [Modes.Numeric]: 5039, [Modes.Alphanumeric]: 3054, [Modes.Byte]: 2099, [Modes.Kanji]: 1292 },
    Q: { [Modes.Numeric]: 3599, [Modes.Alphanumeric]: 2181, [Modes.Byte]: 1499, [Modes.Kanji]: 923 },
    H: { [Modes.Numeric]: 2735, [Modes.Alphanumeric]: 1658, [Modes.Byte]: 1139, [Modes.Kanji]: 701 },
  },
  39: {
    L: { [Modes.Numeric]: 6743, [Modes.Alphanumeric]: 4087, [Modes.Byte]: 2809, [Modes.Kanji]: 1729 },
    M: { [Modes.Numeric]: 5313, [Modes.Alphanumeric]: 3220, [Modes.Byte]: 2213, [Modes.Kanji]: 1362 },
    Q: { [Modes.Numeric]: 3791, [Modes.Alphanumeric]: 2298, [Modes.Byte]: 1579, [Modes.Kanji]: 972 },
    H: { [Modes.Numeric]: 2927, [Modes.Alphanumeric]: 1774, [Modes.Byte]: 1219, [Modes.Kanji]: 750 },
  },
  40: {
    L: { [Modes.Numeric]: 7089, [Modes.Alphanumeric]: 4296, [Modes.Byte]: 2953, [Modes.Kanji]: 1817 },
    M: { [Modes.Numeric]: 5596, [Modes.Alphanumeric]: 3391, [Modes.Byte]: 2331, [Modes.Kanji]: 1435 },
    Q: { [Modes.Numeric]: 3993, [Modes.Alphanumeric]: 2420, [Modes.Byte]: 1663, [Modes.Kanji]: 1024 },
    H: { [Modes.Numeric]: 3057, [Modes.Alphanumeric]: 1852, [Modes.Byte]: 1273, [Modes.Kanji]: 784 },
  },
};

export interface Capacity {
  readonly version: number,
  readonly ec: ErrorCorrectionLevel,
  readonly mode: Modes,
  readonly capacity: number
}

export function capacity(length: number, mode: Modes, version?: number, ec?: ErrorCorrectionLevel): Capacity {
  if (length < 0) throw new RangeError("Length cannot be negative.");

  if (version && ec) {
    const limit = capacities[version]?.[ec]?.[mode];

    if (limit === undefined || length > limit) {
      throw new Error(
        `Data too long for version ${version} and error correction level ${ec}. Maximum character is ${limit}.`
      );
    }
    return { version, ec, mode, capacity: limit };
  }

  if (version) {
    for (const ecLevel of quality) { // L, M, Q, H
      const limit = capacities[version]?.[ecLevel]?.[mode];

      if (limit !== undefined && limit >= length) {
        return { version, ec: ecLevel, mode, capacity: limit };
      }
    }
    throw new Error(`Data too long for version ${version}.`);
  }

  for (let v = 1; v <= 40; v++) {
    for (const ecLevel of quality) { // L, M, Q, H
      const limit = capacities[v]?.[ecLevel]?.[mode];
      
      if (limit !== undefined && limit >= length) {
        return { version: v, ec: ecLevel, mode, capacity: limit };
      }
    }
  }

  throw new Error(
    `Data too long for any QR version. Maximum character is ${Math.max(
      ...Object.values(capacities)
        .flatMap(v => Object.values(v))
        .flatMap(ec => Object.values(ec))
    )}.`
  );
}
