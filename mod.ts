import { fetchOptions } from "./fetch_options.ts";
import { fetchData } from "./fetch.ts";
import { Endpoints } from "./endpoints.ts";
import { Constants } from "./constants.ts";
import type { CBAccessSetup, CBFetchOptions, RequestParams } from "./types.ts";

export { FetchError } from "./fetch.ts";

const defaultOptions: CBFetchOptions = {
  sandbox: false,
};

/** Make requests to the Coinbase Pro API. Setup with [APIKey, Passphrase, and Secret](https://docs.cloud.coinbase.com/exchange/docs/authorization-and-authentication). */
export class CBFetch {
  protected readonly setup: CBAccessSetup;
  protected readonly options: CBFetchOptions;
  /** The base URL used for API requests */
  readonly url: string;
  /** Requests to pre-configured endpoints. */
  readonly endpoints: Endpoints;

  constructor(setup: CBAccessSetup, options = defaultOptions) {
    const baseURL = options.sandbox ? Constants.SandboxUrl : Constants.BaseUrl;
    this.setup = setup;
    this.options = options;
    this.url = baseURL;
    this.endpoints = new Endpoints({ ...setup, url: baseURL });
  }

  /** Returns `fetch` request `options` and CB API request Headers */
  fetchOptions(requestOptions: RequestParams) {
    return fetchOptions({ ...this.setup, ...requestOptions });
  }

  /** Make an async call to the CB API. Non 200s are caught and returned via FetchError class */
  fetch<T>(requestOptions: RequestParams) {
    const { options } = this.fetchOptions(requestOptions);
    return fetchData<T>({
      url: `${this.url}${requestOptions.requestPath}`,
      options,
    });
  }
}
