import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { accessHeaders } from "./access_headers.ts";

const timeStamp = Date.now() / 1000;
const msg = `${timeStamp}GET/apibody`;
const mockParams = {
  apiKey: "12345",
  passPhrase: "secret",
  secret: "supersecret",
  timeStamp,
  msg,
};

Deno.test("accessHeaders", function () {
  const test1 = accessHeaders(mockParams);
  assertExists(test1["cb-access-key"]);
  assertExists(test1["cb-access-passphrase"]);
  assertExists(test1["cb-access-sign"]);
  assertExists(test1["cb-access-timestamp"]);
  assertEquals(test1["cb-access-key"], "12345");
});
