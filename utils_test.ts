import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { extendAccount } from "./utils.ts";

Deno.test("extendAccount", function () {
  const test1 = extendAccount({
    id: "ca632e25-25f0-4c8f-a535-99f4a7eab324",
    currency: "BTC",
    balance: "1000.987260000000",
    hold: "0.0000000000000000",
    available: "0.00260865",
    profile_id: "ab66cb65-6c9a-4f77-9b8c-917e1535f20d",
    trading_enabled: true,
  });
  assertEquals(test1.trading_enabled, true);
  assertEquals(test1.balanceNum, 1000.987260000000);
  assertEquals(test1.holdNum, 0.0000000000000000);
});
