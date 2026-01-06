import { assertEquals, assertThrows } from "jsr:@std/assert";
import { capacity, capacities } from "../src/utils/capacity.ts";
import { Modes, ErrorCorrectionLevel} from "../src/utils/constants.ts";

// Test helper for cleaner assertions
function assertCapacity(
  length: number,
  mode: Modes,
  expected: number,
  version?: number,
  ec?: ErrorCorrectionLevel,
  message?: string
) {
  const actual = capacity(length, mode, version, ec);
  assertEquals(actual, expected, message || `Expected capacity ${expected} but got ${actual}`);
}

// ---- Tests with version and EC level specified ----
Deno.test("capacity() with version and EC level - within limits", () => {
  // Numeric mode tests
  assertCapacity(20, Modes.Numeric, 41, 1, "L");
  assertCapacity(30, Modes.Numeric, 34, 1, "M");
  
  // Alphanumeric mode tests
  assertCapacity(15, Modes.Alphanumeric, 25, 1, "L");
  assertCapacity(10, Modes.Alphanumeric, 20, 1, "M");
  
  // Byte mode tests
  assertCapacity(10, Modes.Byte, 17, 1, "L");
  assertCapacity(7, Modes.Byte, 14, 1, "M");
  
  // Kanji mode tests
  assertCapacity(5, Modes.Kanji, 10, 1, "L");
  assertCapacity(4, Modes.Kanji, 8, 1, "M");
});

Deno.test("capacity() with version and EC level - exceeds limits", () => {
  assertThrows(
    () => capacity(50, Modes.Numeric, 1, "L"),
    Error,
    "Data too long for version 1 and error correction level L"
  );
  
  assertThrows(
    () => capacity(30, Modes.Alphanumeric, 1, "M"),
    Error,
    "Data too long for version 1 and error correction level M"
  );
});

// ---- Tests with only version specified ----
Deno.test("capacity() with version only - finds minimum suitable EC level", () => {
  // Should return L level capacity (first suitable)
  assertCapacity(20, Modes.Numeric, 41, 1);
  assertCapacity(15, Modes.Alphanumeric, 25, 1);
  
  // Should return M level capacity when L is too small
  assertCapacity(35, Modes.Numeric, 34, 1);
});

// ---- Tests with no version or EC specified ----
Deno.test("capacity() with no version - finds minimum suitable version", () => {
  // Should return version 1 capacity when possible
  assertCapacity(10, Modes.Kanji, 10);
  
  // For larger data, should find appropriate version
  // (Assuming you have higher versions in your capacities dataset)
  // assertCapacity(100, Modes.Numeric, [expected capacity from higher version]);
});

Deno.test("capacity() with no version - exceeds all capacities", () => {
  // Create a mock of the maximum capacity
  const maxCapacity = Math.max(
    ...Object.values(capacities)
      .flatMap(v => Object.values(v)
      .flatMap(ec => Object.values(ec)))
  );
  
  assertThrows(
    () => capacity(maxCapacity + 10, Modes.Numeric),
    Error,
    `Data too long for any version and error correction level`
  );
});

// ---- Edge Cases ----
Deno.test("capacity() with exact capacity match", () => {
  assertCapacity(41, Modes.Numeric, 41, 1, "L");
  assertCapacity(25, Modes.Alphanumeric, 25, 1, "L");
});

Deno.test("capacity() with zero length", () => {
  assertCapacity(0, Modes.Numeric, 41, 1, "L");
  assertCapacity(0, Modes.Byte, 17, 1, "L");
});

// ---- Integration Style Tests ----
// Deno.test("capacity() returns consistent values with dataset", () => {
//   // Test that the function returns the exact values from the dataset
//   const version = 1;
//   for (const ecLevel of Object.keys(capacities[version]) as "]") {
//     for (const mode of Object.keys(capacities[version][ecLevel]) as Modes[]) {
//       const expected = capacities[version][ecLevel][mode];
//       assertCapacity(
//         expected - 1, // test with value just below capacity
//         mode,
//         expected,
//         version,
//         ecLevel,
//         `Mode: ${mode}, EC: ${ecLevel}`
//       );
//     }
//   }
// });