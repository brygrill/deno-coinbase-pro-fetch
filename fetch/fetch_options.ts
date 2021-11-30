import { decode, hmac } from "../deps.ts";
import type {
  ContentType,
  FetchOptionsParams,
  FetchOptionsResp,
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
}: FetchOptionsParams): FetchOptionsResp {
  const timeStamp = Date.now() / 1000;
  const key = decode(secret);
  const msg = `${timeStamp}${method}${requestPath}${body}`;
  const sign = hmac("sha256", key, msg, "utf8", "base64") as string;

  const headers = {
    ...baseHeaders,
    "cb-access-key": apiKey,
    "cb-access-passphrase": passPhrase,
    "cb-access-sign": sign,
    "cb-access-timestamp": timeStamp,
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
