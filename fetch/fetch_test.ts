import {
  assertExists,
  assertThrowsAsync,
} from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { fetchData } from "./fetch.ts";

Deno.test("fetchData", async function () {
  assertThrowsAsync(
    () => {
      return fetchData({
        url: "/test",
        options: {
          method: "GET",
        },
      });
    },
    Error,
    "Invalid URL",
  );

  const testData = await fetchData({
    url: "https://swapi.dev/api/people/1",
    options: {
      method: "GET",
    },
  });
  assertExists(testData);
});
