export interface CBAccessSetup {
  apiKey: string;
  passPhrase: string;
  secret: string;
}
export interface RequestParams {
  method: "GET" | "POST";
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
