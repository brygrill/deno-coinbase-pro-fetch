import { assertEquals } from 'https://deno.land/std@0.114.0/testing/asserts.ts';
import { cbAccessFetchOptions } from './mod.ts';

Deno.test('cbAccessFetchOptions', function () {
  const testGet = cbAccessFetchOptions({
    apiKey: 'APIKEY',
    passPhrase: 'PASSPHRASE',
    secret: 'SECRET',
    method: 'GET',
    requestPath: '/deposits/coinbase-account',
    body: '',
  });
  assertEquals(testGet.headers['cb-access-key'], 'APIKEY');
  assertEquals(testGet.options.method, 'GET');
  assertEquals(testGet.options.body, undefined);

  const testPost = cbAccessFetchOptions({
    apiKey: 'APIKEY',
    passPhrase: 'PASSPHRASE',
    secret: 'SECRET',
    method: 'POST',
    requestPath: '/deposits/coinbase-account',
    body: JSON.stringify({
      amount: '10',
      coinbase_account_id: '123',
      currency: 'usd',
    }),
  });
  assertEquals(testPost.headers['Content-Type'], 'application/json');
  assertEquals(testPost.options.method, 'POST');
  assertEquals(
    testPost.options.body,
    '{"amount":"10","coinbase_account_id":"123","currency":"usd"}',
  );
});
