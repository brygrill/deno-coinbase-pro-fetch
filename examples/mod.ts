import { CBFetch, config, FetchError } from './deps.ts';
import { setConfig } from './config.ts';

const env = { sandbox: true };
const accessConfig = setConfig(env);
const cb = new CBFetch(accessConfig, env);

try {
  const accounts = await cb.endpoints.accounts();

  const accountsWithBalance = await cb.endpoints.accounts({withBalance: true});

  const btcAccount = await cb.endpoints.accountId(
    'ca632e25-25f0-4c8f-a535-99f4a7eab324',
  );

  const currencies = await cb.endpoints.currencyId('BTC');

  const product = await cb.endpoints.productId('BTC-USD');

  const quote = await cb.endpoints.quote('BTC-USDC');

  const quotes = await cb.endpoints.quotes(['BTC-USD', 'ETH-USD']);

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
  console.dir({ assets: data.assets });
} catch (error) {
  if (error instanceof FetchError) {
    console.dir({ err: error.toJSON() });
  }
}
