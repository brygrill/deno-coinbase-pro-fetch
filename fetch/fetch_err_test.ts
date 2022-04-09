import { assertEquals } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { FetchError, fetchErrUtil } from "./fetch_err.ts";

const mockError = new Error("mock error");

const mockFetchError = new FetchError({
  status: 500,
  message: "mock API error",
  url: "https://mock.com/api/v1/coinbase/ticker",
});

Deno.test("fetchErrUtil - default", function () {
  const test1 = fetchErrUtil(mockError);
  assertEquals(test1.data, null);
  assertEquals(test1.details.status, 0);
  assertEquals(test1.details.message, "mock error");
});

Deno.test("fetchErrUtil - fetch", function () {
  const test1 = fetchErrUtil(mockFetchError);
  assertEquals(test1.data, null);
  assertEquals(test1.details.status, 500);
  assertEquals(test1.details.message, "mock API error");
  assertEquals(test1.details.url, "https://mock.com/api/v1/coinbase/ticker");
});
