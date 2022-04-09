import { CBFetch, fetchErrUtil } from './deps.ts';
import { getAccessConfig } from './config.ts';

const env = { sandbox: false };
const cb = new CBFetch(getAccessConfig(env), env);

/** Call all endpoints and log the results */
const callAllEndpoints = async () => {
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
    calls.then((results) =>
      results.forEach((result) => console.dir({ result })),
    );
  } catch (error) {
    fetchErrUtil(error);
  }
};

/** Call assets endpoint and work with results */
const callAssets = async () => {
  try {
    const assets = await cb.endpoints.assets();
    console.dir(assets);
  } catch (error) {
    fetchErrUtil(error);
  }
};

/** Exec all the endpoint calls for a collection */
const main = (collection: 'all' | 'assets' = "all") => {
  switch (collection) {
    case 'all':
      callAllEndpoints();
      return;
    case 'assets':
      callAssets();
      return;
    default:
      break;
  }
};

// run it
main("assets");
