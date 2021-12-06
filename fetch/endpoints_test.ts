import { assertExists } from 'https://deno.land/std@0.114.0/testing/asserts.ts';
import { Endpoints } from './endpoints.ts';

Deno.test('Endpoints', function () {
  const testEndpoints = new Endpoints({
    apiKey: 'APIKEY',
    passPhrase: 'PASSPHRASE',
    secret: 'SECRET',
    url: 'test',
  });
  assertExists(testEndpoints.accounts);
  assertExists(testEndpoints.currencies);
  assertExists(testEndpoints.products);
  assertExists(testEndpoints.quote);
});
