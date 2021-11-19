import { fetchOptions } from "./fetch_options.ts";
import { fetchData } from "./fetch.ts";
import type { CBAEndpointsSetup, MethodType } from "./types.ts";
import type { Account } from "./contract.ts";

function buildFetchRequest(setup: CBAEndpointsSetup) {
  const { url: baseUrl, ...rest } = setup;
  const url = `${baseUrl}${"/accounts"}`;
  const requestOptions = {
    ...rest,
    method: "GET" as MethodType,
    requestPath: "/accounts",
    body: "",
  };
  return { url, requestOptions };
}

export async function fetchAccounts<T>(
  setup: CBAEndpointsSetup,
): Promise<Account[]> {
  const { url, requestOptions } = buildFetchRequest(setup);
  const { options } = fetchOptions(requestOptions);
  const { data } = await fetchData<Account[]>({
    url,
    options,
  });

  return data;
}
