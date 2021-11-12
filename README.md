# deno-cb-pro-auth-headers

A deno module to format `fetch` requests to the
[Coinbase Pro API](https://docs.cloud.coinbase.com/exchange/docs/welcome).

## Usage

Make an account and
[generate an API key](https://docs.cloud.coinbase.com/exchange/docs/authorization-and-authentication).

You will need:

- API key
- Secret
- Passphrase

Import the function
```typescript
export { cbAccessFetchOptions } from 'https://raw.githubusercontent.com/brygrill/deno-cb-pro-auth-headers/main/mod.ts'
```

Pass in the args for a `GET` request:
```typescript
const { options, headers } = cbAccessFetchOptions({
  apiKey: APIKEY,
  passPhrase: PASSPHRASE,
  secret: SECRET,
  method: 'GET',
  requestPath: '/accounts',
  body: '',
});
```

or a `POST`:
```typescript
const { options, headers } = cbAccessFetchOptions({
  apiKey: APIKEY,
  passPhrase: PASSPHRASE,
  secret: SECRET,
  method: 'POST',
  requestPath: '/deposits/coinbase-account',
  body: JSON.stringify({amount: '10', coinbase_account_id: '123', currency: 'usd'}),
});
```

`headers` will be the required headers described [https://docs.cloud.coinbase.com/exchange/docs/authorization-and-authentication#creating-a-request](here).
```typescript
console.log(headers)

...
  Accept: "application/json",
  "Content-Type": "application/json",
  "cb-access-key": "abc...",
  "cb-access-passphrase": "def....",
  "cb-access-sign": "hig...",
  "cb-access-timestamp": 1636685279.643
...
```

`options` will be `RequestInit` object for a `fetch` request
```typescript
console.log(options)
// GET request
{
  method: "GET",
  headers: ...see above
}

// POST request
// TODO
```



