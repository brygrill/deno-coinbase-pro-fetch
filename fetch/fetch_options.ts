import { accessHeaders } from "./access_headers.ts";
import type {
  ContentType,
  FetchOptionsParamsType,
  FetchOptionsRespModel,
} from "../typings/types.ts";

export const baseHeaders = {
  Accept: "application/json" as ContentType,
  "Content-Type": "application/json" as ContentType,
};

export const noAuthOptions: RequestInit = {
  headers: baseHeaders,
  method: "GET",
};

/** Create `fetch` request `options` */
export function fetchOptions({
  apiKey,
  passPhrase,
  secret,
  method,
  requestPath,
  body,
}: FetchOptionsParamsType): FetchOptionsRespModel {
  const timeStamp = Date.now() / 1000;
  const msg = `${timeStamp}${method}${requestPath}${body}`;

  const cbAccess = accessHeaders({
    apiKey,
    passPhrase,
    secret,
    timeStamp,
    msg,
  });

  const headers = {
    ...baseHeaders,
    ...cbAccess,
  };

  const options = {
    method,
    headers,
    ...(method === "POST" && { body }),
  } as unknown as RequestInit;

  return {
    headers,
    options,
  };
}
