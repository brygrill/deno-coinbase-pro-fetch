import { fetchOptions } from "./fetch_options.ts";
import type { CBAccessSetup, RequestParams } from "./types.ts";

/** Make requests to the Coinbase Pro API. Setup with [APIKey, Passphrase, and Secret](https://docs.cloud.coinbase.com/exchange/docs/authorization-and-authentication). */
export class CBFetch {
  protected setup: CBAccessSetup;

  constructor(setup: CBAccessSetup) {
    this.setup = setup;
  }

  /** Returns `fetch` request `options` and CB API request Headers */
  options(requestOptions: RequestParams) {
    return fetchOptions({ ...this.setup, ...requestOptions });
  }
}
