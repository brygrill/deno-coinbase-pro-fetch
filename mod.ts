import { fetchOptions } from "./fetch_options.ts";
import { fetchData } from "./fetch.ts";
import { fetchAccounts } from "./endpoints.ts";
import Constants from "./constants.ts";
import type {
  APIContractModel,
  CBAccessSetup,
  CBFetchOptions,
  EndpointName,
  RequestParams,
} from "./types.ts";

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

  constructor(setup: CBAccessSetup, options = defaultOptions) {
    this.setup = setup;
    this.options = options;
    this.url = options.sandbox ? Constants.SandboxUrl : Constants.BaseUrl;
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

  /** Make a request to preconfigured endpoints. Non 200s are caught and returned via FetchError class */
  endpts<T extends EndpointName>(endpoint: T): APIContractModel<T> {
    switch (endpoint) {
      case "accounts":
        return fetchAccounts({
          ...this.setup,
          url: this.url,
        }) as APIContractModel<T>;
      case "orders":
        return 123 as APIContractModel<T>;
      case "reports":
        return [1, 2, 3] as APIContractModel<T>;
      default:
        return null as APIContractModel<T>;
    }
  }
}
