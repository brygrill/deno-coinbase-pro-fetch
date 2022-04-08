import { CBFetch, fetchErrUtil } from './deps.ts';
import { getAccessConfig } from './config.ts';

const env = { sandbox: false };
const cb = new CBFetch(getAccessConfig(env), env);

try {
  // collection of endpoints to call
  const promises = [
    cb.endpoints.accounts({ withBalance: true }),
    cb.endpoints.currencyId('BTC'),
    cb.endpoints.productId('BTC-USD'),
    cb.endpoints.quotes(['BTC-USD', 'LINK-USD']),
    cb.endpoints.assets(),
  ];

  const calls = Promise.allSettled(promises);

  // get all accounts
  const accounts = await cb.endpoints.accounts();

  // get an account by unique id
  const btcAccount = await cb.endpoints.accountId(
    accounts.data.find((a) => a.currency === 'BTC')?.id ?? '',
  );

  // get a quote and catch errors
  const quote = await cb.endpoints.quote('BTC-USD').catch(fetchErrUtil);

  // log results
  console.dir({
    accounts,
    btcAccount,
    quote,
  });

  // log settled results
  calls.then((results) => results.forEach((result) => console.dir({ result })));
} catch (error) {
  fetchErrUtil(error);
}
