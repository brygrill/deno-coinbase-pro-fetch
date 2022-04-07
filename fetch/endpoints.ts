import { fetchOptions, noAuthOptions } from "./fetch_options.ts";
import { fetchData } from "./fetch.ts";
import { extendAccount, extendQuote } from "../utils/utils.ts";
import { Constants, EndpointConstants } from "../constants.ts";
import type { CBEndpointsSetupModel, MethodType } from "../typings/types.ts";
import type {
  AccountModel,
  AccountModelExtended,
  CurrencyModel,
  ProductModel,
  QuoteModel,
  QuoteModelExtended,
} from "../typings/cb_contract.ts";

interface BuildFetchRequestOptions {
  endpoint: string;
  method?: MethodType;
  body?: string;
}

function buildUrl(baseUrl: string, endpoint: string) {
  return `${baseUrl}${endpoint}`;
}

function buildFetchRequest(
  setup: CBEndpointsSetupModel,
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
  protected readonly setup: CBEndpointsSetupModel;

  constructor(setup: CBEndpointsSetupModel) {
    this.setup = setup;
  }

  /** Make request to the `/accounts` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getaccounts).
   * Pass `true` for `withBalance` option to return accounts with balance greater than 0.
   */
  async accounts(
    { withBalance } = { withBalance: false },
  ): Promise<AccountModelExtended[]> {
    const { url, requestOptions } = buildFetchRequest(this.setup, {
      endpoint: EndpointConstants.Accounts,
    });
    const { options } = fetchOptions(requestOptions);
    const { data } = await fetchData<AccountModel[]>({
      url,
      options,
    });

    const extended = data.map((i) => extendAccount(i));

    if (withBalance) {
      return extended.filter((i) => i.extended.balance > 0);
    }

    return extended;
  }

  /** Make request to the `/accounts/:id` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getaccount).*/
  async accountId(id: string): Promise<AccountModelExtended> {
    const { url, requestOptions } = buildFetchRequest(this.setup, {
      endpoint: `${EndpointConstants.AccountId(id)}`,
    });
    const { options } = fetchOptions(requestOptions);
    const { data } = await fetchData<AccountModel>({
      url,
      options,
    });

    return extendAccount(data);
  }

  /** Make request to the `/currencies` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getcurrencies).*/
  async currencies(): Promise<CurrencyModel[]> {
    const url = buildUrl(this.setup.url, EndpointConstants.Currencies);
    const { data } = await fetchData<CurrencyModel[]>({
      url,
      options: noAuthOptions,
    });

    return data;
  }

  /** Make request to the `/currency/:id` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getcurrency).*/
  async currencyId(id: string): Promise<CurrencyModel> {
    const url = buildUrl(this.setup.url, EndpointConstants.CurrencyId(id));
    const { data } = await fetchData<CurrencyModel>({
      url,
      options: noAuthOptions,
    });

    return data;
  }

  /** Make request to the `/products` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproducts).*/
  async products(): Promise<ProductModel[]> {
    const url = buildUrl(this.setup.url, EndpointConstants.Products);
    const { data } = await fetchData<ProductModel[]>({
      url,
      options: noAuthOptions,
    });

    return data;
  }

  /** Make request to the `/products/:id` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproduct).*/
  async productId(id: string): Promise<ProductModel> {
    const url = buildUrl(this.setup.url, EndpointConstants.ProductId(id));
    const { data } = await fetchData<ProductModel>({
      url,
      options: noAuthOptions,
    });

    return data;
  }

  /** Make request to the `/products/:id/ticker` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductticker).*/
  async quote(id: string): Promise<QuoteModelExtended> {
    const url = buildUrl(this.setup.url, EndpointConstants.Quote(id));
    const { data } = await fetchData<QuoteModel>({
      url,
      options: noAuthOptions,
    });

    return extendQuote(data, id, this.setup.currency);
  }

  /** Make batch request to the `/products/:id/ticker` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductticker).*/
  quotes(ids: string[]): Promise<QuoteModelExtended[]> {
    return Promise.all(ids.map((i) => this.quote(i)));
  }

  async assets(): Promise<any> {
    const accounts = await this.accounts({ withBalance: true });
    const ids = accounts.filter((i) =>
      !Constants.FiatCurrency.includes(i.currency)
    ).map((a) => `${a.currency}-${this.setup.currency}`);
    return { accounts, ids };
  }
}
