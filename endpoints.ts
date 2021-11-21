import { fetchOptions } from "./fetch_options.ts";
import { fetchData } from "./fetch.ts";
import { EndpointConstants } from "./constants.ts";
import type {
  CBAEndpointsSetup,
  EndpointParamOptions,
  MethodType,
} from "./types.ts";
import type { Account } from "./contract.ts";

interface BuildFetchRequestOptions {
  endpoint: string;
  method?: MethodType;
  body?: string;
}

function buildFetchRequest(
  setup: CBAEndpointsSetup,
  { endpoint, method = "GET", body = "" }: BuildFetchRequestOptions,
) {
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

/** Make request to the `/accounts` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getaccounts).
 *
 * @param `id`: will send request to `/accounts/{account_id}`
 */
export async function fetchAccounts(
  setup: CBAEndpointsSetup,
  params?: EndpointParamOptions,
): Promise<Account | Account[]> {
  const { url, requestOptions } = buildFetchRequest(setup, {
    endpoint: params?.id
      ? `${EndpointConstants.AccountId(params?.id)}`
      : EndpointConstants.Accounts,
  });
  const { options } = fetchOptions(requestOptions);
  const { data } = await fetchData<Account | Account[]>({
    url,
    options,
  });

  return data;
}
