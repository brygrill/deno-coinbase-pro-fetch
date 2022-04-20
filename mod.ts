import { fetchOptions } from "./fetch/fetch_options.ts";
import { fetchData } from "./fetch/fetch.ts";
import { Endpoints } from "./fetch/endpoints.ts";
import { Constants } from "./constants.ts";
import type {
  CBAccessSetupModel,
  CBFetchOptionsModel,
  RequestParamsModel,
} from "./typings/types.ts";
export * from "./fetch/fetch_err.ts";
export * from "./typings/types.ts";

const defaultOptions: CBFetchOptionsModel = {
  sandbox: false,
  currency: Constants.DefaultCurrency,
};

/** Make requests to the Coinbase Pro API. Setup with [APIKey, Passphrase, and Secret](https://docs.cloud.coinbase.com/exchange/docs/authorization-and-authentication). */
export class CBFetch {
  protected readonly setup: CBAccessSetupModel;
  protected readonly options: CBFetchOptionsModel;
  /** The base URL used for API requests */
  readonly url: string;
  /** Requests to pre-configured endpoints. */
  readonly endpoints: Endpoints;

  constructor(setup: CBAccessSetupModel, options = defaultOptions) {
    const baseURL = options.sandbox ? Constants.SandboxUrl : Constants.BaseUrl;
    const currency = options.currency ?? defaultOptions.currency;
    this.setup = setup;
    this.options = options;
    this.url = baseURL;
    this.endpoints = new Endpoints({
      ...setup,
      url: baseURL,
      currency,
    });
  }

  /** Returns `fetch` request `options` and CB API request Headers */
  fetchOptions(requestOptions: RequestParamsModel) {
    return fetchOptions({ ...this.setup, ...requestOptions });
  }

  /** Make an async call to the CB API. Non 200s are caught and returned via FetchError class */
  fetch<T>(requestOptions: RequestParamsModel) {
    const { options } = this.fetchOptions(requestOptions);
    return fetchData<T>({
      url: `${this.url}${requestOptions.requestPath}`,
      options,
    });
  }
}
