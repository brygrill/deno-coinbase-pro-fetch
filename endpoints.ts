import { fetchOptions } from "./fetch_options.ts";
import { fetchData } from "./fetch.ts";
import { EndpointConstants } from "./constants.ts";
import type { CBAEndpointsSetup, MethodType } from "./types.ts";
import type { Account } from "./contract.ts";

function buildFetchRequest(
  setup: CBAEndpointsSetup,
  endpoint: string,
  method: MethodType = "GET",
  body = "",
) {
  console.warn(endpoint)
  const { url: baseUrl, ...rest } = setup;
  const url = `${baseUrl}${endpoint}`;
  const requestOptions = {
    ...rest,
    method,
    requestPath: `${endpoint}`,
    body,
  };
  return { url, requestOptions };
}

export async function fetchAccounts<T>(
  setup: CBAEndpointsSetup,
): Promise<Account[]> {
  console.log(EndpointConstants)
  const { url, requestOptions } = buildFetchRequest(
    setup,
    EndpointConstants.Accounts,
  );
  const { options } = fetchOptions(requestOptions);
  const { data } = await fetchData<Account[]>({
    url,
    options,
  });

  return data;
}
