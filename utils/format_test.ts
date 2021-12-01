import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { formatCurrency } from "./format.ts";

Deno.test("formatCurrency", function () {
  const test1 = formatCurrency(100, "USD");
  assertEquals(test1, "$100.00");
});
