import { fetchOptions } from "./fetch_options.ts";
import { fetchData } from "./fetch.ts";
import { EndpointConstants } from "./constants.ts";
import type { CBAEndpointsSetup, MethodType } from "./types.ts";
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

export class Endpoints {
  protected readonly setup: CBAEndpointsSetup;

  constructor(setup: CBAEndpointsSetup) {
    this.setup = setup;
  }

  /** Make request to the `/accounts` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getaccounts).*/
  async accounts(): Promise<Account[]> {
    const { url, requestOptions } = buildFetchRequest(this.setup, {
      endpoint: EndpointConstants.Accounts,
    });
    const { options } = fetchOptions(requestOptions);
    const { data } = await fetchData<Account[]>({
      url,
      options,
    });

    return data;
  }

  /** Make request to the `/accounts/:id` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getaccount).*/
  async accountsId(id: string): Promise<Account> {
    const { url, requestOptions } = buildFetchRequest(this.setup, {
      endpoint: `${EndpointConstants.AccountId(id)}`,
    });
    const { options } = fetchOptions(requestOptions);
    const { data } = await fetchData<Account>({
      url,
      options,
    });

    return data;
  }
}
