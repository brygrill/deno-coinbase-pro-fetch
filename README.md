## Coinbase Pro Fetch

A deno module to format `fetch` requests to the
[Coinbase Pro API](https://docs.cloud.coinbase.com/exchange/docs/welcome).

### Usage

Make an account and
[generate an API key](https://docs.cloud.coinbase.com/exchange/docs/authorization-and-authentication).

You will need:

- API key
- Secret
- Passphrase

#### Add those values to a `.env`

```env
APIKEY=""
PASSPHRASE=""
SECRET=""
```

Use the [dotenv](https://deno.land/x/dotenv/mod.ts) module to import:

```typescript
const {
  APIKEY,
  PASSPHRASE,
  SECRET,
} = config({ safe: true });
```

#### Init `CBFetch`

```typescript
const cb = new CBFetch(
  {
    apiKey: APIKEY,
    passPhrase: PASSPHRASE,
    secret: SECRET,
  },
  { sandbox: true }, // optionally set to use sandbox
);
```

#### Make a call

```typescript
// get all accounts
const accounts = await cb.endpoints.accounts();
```

See `examples` folder for more details.
