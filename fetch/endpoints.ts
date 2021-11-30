import { fetchOptions, noAuthOptions } from "./fetch_options.ts";
import { fetchData } from "./fetch.ts";
import { extendAccount } from "../utils/utils.ts";
import { EndpointConstants } from "../constants.ts";
import type { CBAEndpointsSetup, MethodType } from "../typings/types.ts";
import type { Account, AccountExtended } from "../typings/cb_contract.ts";

interface BuildFetchRequestOptions {
  endpoint: string;
  method?: MethodType;
  body?: string;
}

function buildUrl(baseUrl: string, endpoint: string) {
  return `${baseUrl}${endpoint}`;
}

function buildFetchRequest(
  setup: CBAEndpointsSetup,
  { endpoint, method = "GET", body = "" }: BuildFetchRequestOptions,
) {
  const { url: baseUrl, ...rest } = setup;
  const url = buildUrl(baseUrl, endpoint);

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
  async accounts(): Promise<AccountExtended[]> {
    const { url, requestOptions } = buildFetchRequest(this.setup, {
      endpoint: EndpointConstants.Accounts,
    });
    const { options } = fetchOptions(requestOptions);
    const { data } = await fetchData<Account[]>({
      url,
      options,
    });

    return data.map((i) => extendAccount(i));
  }

  /** Make request to the `/accounts/:id` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getaccount).*/
  async accountsId(id: string): Promise<AccountExtended> {
    const { url, requestOptions } = buildFetchRequest(this.setup, {
      endpoint: `${EndpointConstants.AccountId(id)}`,
    });
    const { options } = fetchOptions(requestOptions);
    const { data } = await fetchData<Account>({
      url,
      options,
    });

    return extendAccount(data);
  }

  /** Make request to the `/currencies` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getcurrencies).*/
  async currencies(): Promise<string[]> {
    const url = buildUrl(this.setup.url, EndpointConstants.Currencies);
    const { data } = await fetchData<string[]>({
      url,
      options: noAuthOptions,
    });

    return data;
  }

  /** Make request to the `/products` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproducts).*/
  async products(): Promise<string[]> {
    const url = buildUrl(this.setup.url, EndpointConstants.Products);
    const { data } = await fetchData<string[]>({
      url,
      options: noAuthOptions,
    });

    return data;
  }
}
