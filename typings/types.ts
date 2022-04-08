export interface CBAccessSetupModel {
  apiKey: string;
  passPhrase: string;
  secret: string;
}

export type MethodType = 'GET' | 'POST';

export interface RequestParamsModel {
  method: MethodType;
  requestPath: string;
  body: string;
}

export type FetchOptionsParamsType = CBAccessSetupModel & RequestParamsModel;

export type ContentType = 'application/json';

export type CurrencyOptionsType = 'USD' | 'EUR' | 'GBP';

export type CBAccessHeadersRespModel = {
  Accept: ContentType;
  'Content-Type': ContentType;
  'cb-access-key': string; // the API key
  'cb-access-passphrase': string; // phasephrase when API registered
  'cb-access-sign': string; // hmac sign
  'cb-access-timestamp': number; // timestamp
};

export type FetchOptionsRespModel = {
  headers: CBAccessHeadersRespModel;
  options: RequestInit;
};

export interface CBFetchOptionsModel {
  sandbox?: boolean;
  currency?: CurrencyOptionsType;
}

export interface FetchParamsModel {
  url: string;
  options: RequestInit;
}

export interface FetchRespModel<T> {
  data: T;
  status: number;
  type: ResponseType;
}

export interface InitFetchErrorModel {
  status: number;
  message: string;
  url: string;
}

export interface CBEndpointsSetupModel extends CBAccessSetupModel {
  url: string;
  currency?: CurrencyOptionsType;
}

export interface EndpointResponseModel<TData> {
  data: TData;
}

export type EndpointResponseType<TData> = Promise<EndpointResponseModel<TData>>;
