import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { CBFetch } from "./mod.ts";

Deno.test("CBFetch", function () {
  const testCBFetch = new CBFetch({
    apiKey: "APIKEY",
    passPhrase: "PASSPHRASE",
    secret: "SECRET",
  });
  assertEquals(Boolean(testCBFetch.options), true);
});
