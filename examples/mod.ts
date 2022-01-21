import { CBFetch, config, FetchError } from "./deps.ts";
const { APIKEY, PASSPHRASE, SECRET } = config({ safe: true });

const cb = new CBFetch(
  {
    apiKey: APIKEY,
    passPhrase: PASSPHRASE,
    secret: SECRET,
  },
);

try {
  const accounts = await cb.endpoints.accounts();
  const withBalance = accounts.filter((i) => Number(i.balance) > 0);

  const btcAccount = await cb.endpoints.accountId(
    "ca632e25-25f0-4c8f-a535-99f4a7eab324",
  );

  const currencies = await cb.endpoints.currencyId("BTC");

  const product = await cb.endpoints.productId("BTC-USD");

  const quote = await cb.endpoints.quote("BTC-USDC");

  const quotes = await cb.endpoints.quotes(["BTC-USD", "ETH-USD"]);

  const assets = await cb.endpoints.assets();

  // console.log(withBalance);
  // console.log(btcAccount);
  // console.log(currencies.details.symbol);
  // console.log(product.id);
  // console.log(quote);
  // console.log(quotes);
  console.log(assets);
} catch (error) {
  if (error instanceof FetchError) {
    console.log(error.toJSON());
  }
}
