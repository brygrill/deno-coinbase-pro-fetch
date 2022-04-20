import { FetchError } from "./fetch_err.ts";
import type { FetchParamsModel, FetchRespModel } from "../typings/types.ts";

/** Make an async call to the CB API. Non 200s are caught and returned via FetchError class */
export async function fetchData<T>({
  url,
  options,
}: FetchParamsModel): Promise<FetchRespModel<T>> {
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
