import { assertEquals, assertThrows } from "@std/assert";
import { numeric } from "../../../src/encoder/encode/numeric.ts";

Deno.test("test out range integers", () => {
  const data = "a";

  assertThrows(() => {
    numeric(data);
  });
});

Deno.test("test 1 digit integers", () => {
  assertEquals(numeric(1), new Uint16Array([1, 4]));
});

Deno.test("test 2 digit integers", () => {
  assertEquals(numeric("12"), new Uint16Array([12, 7]));
});

Deno.test("test 3 digit integers", () => {
  assertEquals(numeric(123), new Uint16Array([123, 10]));
});

Deno.test("test 4 digit integers", () => {
  assertEquals(numeric(1234), new Uint16Array([123, 10, 4, 4]));
});
