import { assertThrowsAsync } from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { fetchData } from "./fetch.ts";

// TODO: mock call to api and response
Deno.test("fetchData", function () {
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
});
