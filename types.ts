import { Account } from "./contract.ts";
export interface CBAccessSetup {
  apiKey: string;
  passPhrase: string;
  secret: string;
}

export type MethodType = "GET" | "POST";
export interface RequestParams {
  method: MethodType;
  requestPath: string;
  body: string;
}

export type FetchOptionsParams = CBAccessSetup & RequestParams;

export type ContentType = "application/json";

export type CBAccessHeadersResp = {
  Accept: ContentType;
  "Content-Type": ContentType;
  "cb-access-key": string; // the API key
  "cb-access-passphrase": string; // phasephrase when API registered
  "cb-access-sign": string; // hmac sign
  "cb-access-timestamp": number; // timestamp
};

export type FetchOptionsResp = {
  headers: CBAccessHeadersResp;
  options: RequestInit;
};

export interface CBFetchOptions {
  sandbox?: boolean;
}

export interface FetchParams {
  url: string;
  options: RequestInit;
}

export interface FetchResp<T> {
  data: T;
  status: number;
  type: ResponseType;
}

export interface InitFetchError {
  status: number;
  message: string;
  url: string;
}

export interface CBAEndpointsSetup extends CBAccessSetup {
  url: string;
}
