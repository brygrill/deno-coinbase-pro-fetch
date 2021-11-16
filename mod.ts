import { fetchOptions } from "./fetch_options.ts";
import Constants from "./constants.ts";
import type { CBAccessSetup, CBFetchOptions, RequestParams } from "./types.ts";

const defaultOptions: CBFetchOptions = {
  sandbox: false,
};
/** Make requests to the Coinbase Pro API. Setup with [APIKey, Passphrase, and Secret](https://docs.cloud.coinbase.com/exchange/docs/authorization-and-authentication). */
export class CBFetch {
  protected readonly setup: CBAccessSetup;
  protected readonly options: CBFetchOptions;
  readonly url: string;

  constructor(setup: CBAccessSetup, options = defaultOptions) {
    this.setup = setup;
    this.options = options;
    this.url = options.sandbox ? Constants.SandboxUrl : Constants.BaseUrl;
  }

  /** Returns `fetch` request `options` and CB API request Headers */
  fetchOptions(requestOptions: RequestParams) {
    return fetchOptions({ ...this.setup, ...requestOptions });
  }
}
