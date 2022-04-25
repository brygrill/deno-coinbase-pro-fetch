import { fetchOptions, noAuthOptions } from './fetch_options.ts';
import { fetchData } from './fetch.ts';
import { calcAssets, extendAccount, extendQuote } from '../utils/utils.ts';
import { Constants, EndpointConstants } from '../constants.ts';
import type {
  CBEndpointsSetupModel,
  EndpointResponseType,
  MethodType,
} from '../typings/types.ts';
import type {
  AccountModel,
  AccountModelExtended,
  AssetModel,
  CurrencyModel,
  ProductModel,
  QuoteModel,
  QuoteModelExtended,
  QuotesModel,
} from '../typings/cb_contract.ts';

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
  { endpoint, method = 'GET', body = '' }: BuildFetchRequestOptions,
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
  ): EndpointResponseType<AccountModelExtended[]> {
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
      return { data: extended.filter((i) => i.extended.balance > 0) };
    }

    return { data: extended };
  }

  /** Make request to the `/accounts/:id` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getaccount).*/
  async accountId(id: string): EndpointResponseType<AccountModelExtended> {
    const { url, requestOptions } = buildFetchRequest(this.setup, {
      endpoint: `${EndpointConstants.AccountId(id)}`,
    });
    const { options } = fetchOptions(requestOptions);
    const resp = await fetchData<AccountModel>({
      url,
      options,
    });

    return { data: extendAccount(resp.data) };
  }

  /** Make request to the `/currencies` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getcurrencies).*/
  async currencies(): EndpointResponseType<CurrencyModel[]> {
    const url = buildUrl(this.setup.url, EndpointConstants.Currencies);
    const resp = await fetchData<CurrencyModel[]>({
      url,
      options: noAuthOptions,
    });

    return { data: resp.data };
  }

  /** Make request to the `/currency/:id` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getcurrency).*/
  async currencyId(id: string): EndpointResponseType<CurrencyModel> {
    const url = buildUrl(this.setup.url, EndpointConstants.CurrencyId(id));
    const resp = await fetchData<CurrencyModel>({
      url,
      options: noAuthOptions,
    });

    return { data: resp.data };
  }

  /** Make request to the `/products` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproducts).*/
  async products(): EndpointResponseType<ProductModel[]> {
    const url = buildUrl(this.setup.url, EndpointConstants.Products);
    const resp = await fetchData<ProductModel[]>({
      url,
      options: noAuthOptions,
    });

    return { data: resp.data };
  }

  /** Make request to the `/products/:id` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproduct).*/
  async productId(id: string): EndpointResponseType<ProductModel> {
    const url = buildUrl(this.setup.url, EndpointConstants.ProductId(id));
    const resp = await fetchData<ProductModel>({
      url,
      options: noAuthOptions,
    });

    return { data: resp.data };
  }

  /** Make request to the `/products/:id/ticker` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductticker).*/
  async quote(id: string): EndpointResponseType<QuoteModelExtended> {
    const url = buildUrl(this.setup.url, EndpointConstants.Quote(id));
    const { data } = await fetchData<QuoteModel>({
      url,
      options: noAuthOptions,
    });

    return { data: extendQuote(data, id, this.setup.currency) };
  }

  /** Make batch request to the `/products/:id/ticker` [endpoint](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproductticker).*/
  async quotes(ids: string[]): EndpointResponseType<QuotesModel> {
    const quotes: QuoteModelExtended[] = [];
    const errors: Record<string, Error> = {};
    await Promise.allSettled(ids.map((i) => this.quote(i))).then((results) => {
      results.forEach((r, x) => {
        if (r.status === 'fulfilled') {
          quotes.push(r.value.data);
        } else {
          errors[ids[x]] = r.reason;
        }
      });
    });

    return { data: { quotes, errors } };
  }

  /** Returns `accounts` for a portfolio with a balance and their current value */
  async assets(): EndpointResponseType<AssetModel> {
    const accounts = await this.accounts({ withBalance: true });
    const ids = accounts.data
      .filter((i) => !Constants.FiatCurrency.includes(i.currency))
      .map((a) => `${a.currency}-${this.setup.currency}`);
    const { data: quoteData } = await this.quotes(ids);
    return {
      data: calcAssets({
        accounts: accounts.data,
        quotes: quoteData.quotes,
        ids,
        currency: this.setup.currency,
      }),
    };
  }
}
