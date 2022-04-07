import { config, CBAccessSetupModel } from './deps.ts';
const {
  APIKEY,
  PASSPHRASE,
  SECRET,
  SANDBOX_APIKEY,
  SANDBOX_PASSPHRASE,
  SANDBOX_SECRET,
} = config({ safe: true });

interface ConfigModel {
  sandbox?: boolean;
}

/** return elements for CB access based on sandbox arg */
export const getAccessConfig = (options?: ConfigModel): CBAccessSetupModel => {
  const sb = options?.sandbox ?? false;
  return {
    apiKey: sb ? SANDBOX_APIKEY : APIKEY,
    passPhrase: sb ? SANDBOX_PASSPHRASE : PASSPHRASE,
    secret: sb ? SANDBOX_SECRET : SECRET,
  };
};
