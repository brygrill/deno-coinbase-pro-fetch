import type { FetchParams } from "./types.ts";

// TODO check status and throw if not 200, return axios type response
export async function fetchData<T>({ url, options }: FetchParams): Promise<T> {
  const response = await fetch(
    url,
    options,
  );
  const jsonData = await response.json();
  return jsonData as T;
}
