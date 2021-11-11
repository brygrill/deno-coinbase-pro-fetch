import { config, hmac, decode } from './deps.ts';

// TODO: this will not be here
const { APIKEY, PASSPHRASE, SECRET } = config({ safe: true });

export interface CBAccessSignParams {
  apiKey: string;
  passPhrase: string;
  secret: string;
  method: 'GET' | 'POST';
  requestPath: string;
  body: string;
}

export type ContentType = 'application/json';

export type CBAccessHeadersResp = {
  Accept: ContentType;
  'Content-Type': ContentType,
  'cb-access-key': string; // the API key
  'cb-access-passphrase': string; // phasephrase when API registered
  'cb-access-sign': string; // hmac sign
  'cb-access-timestamp': number; // timestamp
};

export type CbAccessFetchOptionsResp = {
  headers: CBAccessHeadersResp;
  options: RequestInit;
};

export function cbAccessFetchOptions({
  apiKey,
  passPhrase,
  secret,
  method,
  requestPath,
  body,
}: CBAccessSignParams): CbAccessFetchOptionsResp {
  const timeStamp = Date.now() / 1000;
  const key = decode(secret);
  const msg = `${timeStamp}${method}${requestPath}${body}`;
  const sign = hmac('sha256', key, msg, 'utf8', 'base64') as string;

  const headers = {
    Accept: 'application/json' as ContentType,
    'Content-Type': 'application/json' as ContentType,
    'cb-access-key': apiKey,
    'cb-access-passphrase': passPhrase,
    'cb-access-sign': sign,
    'cb-access-timestamp': timeStamp,
  };

  const options = {
    method,
    headers,
  } as unknown as RequestInit;

  return {
    headers,
    options,
  };
}

const { options } = cbAccessFetchOptions({
  apiKey: APIKEY,
  passPhrase: PASSPHRASE,
  secret: SECRET,
  method: 'GET',
  requestPath: '/accounts',
  body: '',
});

console.log(options);

// TODO: this will not be here
const jsonResponse = await fetch(
  'https://api.exchange.coinbase.com/accounts',
  options,
);
const jsonData = await jsonResponse.json();
console.log(jsonData);
