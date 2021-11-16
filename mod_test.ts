import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { CBFetch } from "./mod.ts";

Deno.test("CBFetch", function () {
  const testCBFetch = new CBFetch(
    {
      apiKey: "APIKEY",
      passPhrase: "PASSPHRASE",
      secret: "SECRET",
    },
    { sandbox: true },
  );
  assertExists(testCBFetch.fetchOptions);
  assertEquals(Boolean(testCBFetch.url.includes("sandbox")), true);
});
