import { CBFetch, FetchError } from './deps.ts';
import { getAccessConfig } from './config.ts';

const env = { sandbox: true };
const cb = new CBFetch(getAccessConfig(env), env);

try {
  const accounts = await cb.endpoints.accounts();

  const accountsWithBalance = await cb.endpoints.accounts({withBalance: true});

  const btcAccount = await cb.endpoints.accountId(
    accounts.find((a) => a.currency === 'BTC')?.id ?? '',
  );

  const currencies = await cb.endpoints.currencyId('BTC');

  const product = await cb.endpoints.productId('BTC-USD');

  const quote = await cb.endpoints.quote('BTC-USD'); //BTC-USDC will break this

  const quotes = await cb.endpoints.quotes(['BTC-USD', 'LINK-USD']); //ETH-USD will break this

  const assets = await cb.endpoints.assets();

  const data = {
    accounts,
    accountsWithBalance,
    btcAccount,
    currencies,
    product,
    quote,
    quotes,
    assets,
  };
  console.dir({ data });
} catch (error) {
  if (error instanceof FetchError) {
    console.dir({ err: error.toJSON() });
  }
}
