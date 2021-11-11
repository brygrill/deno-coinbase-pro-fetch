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

export type CBAccessHeaders = {
  Accept: 'application/json';
  'cb-access-key': string; // the API key
  'cb-access-passphrase': string; // phasephrase when API registered
  'cb-access-sign': string; // hmac sign
  'cb-access-timestamp': string; // timestamp
};

export function cbAccessSign({
  apiKey,
  passPhrase,
  secret,
  method,
  requestPath,
  body,
}: CBAccessSignParams): CBAccessHeaders {
  const timeStamp = Date.now() / 1000;
  const key = decode(secret);
  const msg = `${timeStamp}${method}${requestPath}${body}`;
  const sign = hmac('sha256', key, msg, 'utf8', 'base64') as string;

  return {
    Accept: 'application/json',
    'cb-access-key': apiKey,
    'cb-access-passphrase': passPhrase,
    'cb-access-sign': sign,
    'cb-access-timestamp': timeStamp as unknown as string, // TODO: fix this
  };
}

const headers = cbAccessSign({
  apiKey: APIKEY,
  passPhrase: PASSPHRASE,
  secret: SECRET,
  method: 'GET',
  requestPath: '/accounts',
  body: JSON.stringify({}),
});

// console.log(headers);
const options = {
  method: 'GET',
  headers,
};

console.log(options);

// TODO: this will not be here
const jsonResponse = await fetch(
  'https://api.exchange.coinbase.com/accounts',
  options,
);
const jsonData = await jsonResponse.json();
console.log(jsonData);
