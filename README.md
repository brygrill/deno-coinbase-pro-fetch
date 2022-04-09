# Coinbase Pro Fetch

A deno module to format `fetch` requests to the
[Coinbase Pro API](https://docs.cloud.coinbase.com/exchange/docs/welcome).

## Usage

Make an account and
[generate an API key](https://docs.cloud.coinbase.com/exchange/docs/authorization-and-authentication).

You will need:

- API key
- Secret
- Passphrase

Add those values to a `.env`

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

#### Init CBFetch

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

## Endpoints

| Name           | Usage                                        | Coinbase Endpoint                    |
| -------------- | -------------------------------------------- | ------------------------------------ |
| Accounts       | `cb.endpoints.accounts()`                    | `/accounts`                          |
| Account by ID  | `cb.endpoints.accountId("12345")`            | `/accounts/:id`                      |
| Currencies     | `cb.endpoints.currency()`                    | `/currencies`                        |
| Currency by ID | `cb.endpoints.currencyId("BTC")`             | `/currency/:id`                      |
| Products       | `cb.endpoints.products`                      | `/products`                          |
| Products by ID | `cb.endpoints.productId("BTC-USD")`          | `/products/:id`                      |
| Quote          | `cb.endpoints.quote("BTC-USD")`              | `/products/:id/ticker`               |
| Quotes         | `cb.endpoints.quote(["BTC-USD", "ETH-USD"])` | `/products/:id/ticker`               |
| Assets         | `cb.endpoints.assets()`                      | `/accounts` + `/products/:id/ticker` |

## Useful Links

- https://docs.cloud.coinbase.com/exchange/docs
- https://pro.coinbase.com/trade/BTC-USD
- https://public.sandbox.exchange.coinbase.com/trade/BTC-USD
