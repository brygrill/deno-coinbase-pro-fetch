import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { extendAccount, extendQuote } from "./utils.ts";

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
  assertEquals(test1.extended.balance, 1000.987260000000);
  assertEquals(test1.extended.hold, 0.0000000000000000);
});

Deno.test("extendQuote", function () {
  const test1 = extendQuote({
    trade_id: 12786182,
    price: "57169.09",
    size: "0.024864",
    time: "2021-12-01T22:06:25.613989Z",
    bid: "57157.84",
    ask: "57169.09",
    volume: "451.62277118",
  });
  assertEquals(test1.extended.price, 57169.09);
  assertEquals(test1.extended.priceFormatted, "$57,169.09");
});
