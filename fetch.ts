import type { FetchParams, FetchResp, InitFetchError } from "./types.ts";

export class FetchError extends Error {
  status: number;
  url: string;

  constructor(init: InitFetchError) {
    super(init.message);
    this.status = init.status;
    this.url = init.url;
  }

  toString() {
    return `Status: ${this.status}, Message: ${this.message}`;
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
      url: this.url,
    };
  }
}

/** Make an async call to the CB API. Non 200s are caught and returned via FetchError class */
export async function fetchData<T>({
  url,
  options,
}: FetchParams): Promise<FetchResp<T>> {
  const response = await fetch(url, options);
  const jsonData = await response.json();

  if (response.status !== 200) {
    throw new FetchError({
      status: response.status,
      message: jsonData?.message || "Error fetching data", // an object with the key message is standard response
      url,
    });
  }

  return {
    status: response.status,
    type: response.type,
    data: jsonData as T,
  };
}
