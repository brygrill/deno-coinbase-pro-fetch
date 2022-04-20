import { decode, hmac } from "../deps.ts";
import type {
  CBAccessHeaderModel,
  CBAccessSetupModel,
} from "../typings/types.ts";

export interface AccessHeaderParams extends CBAccessSetupModel {
  msg: string;
  timeStamp: number;
}

/** Build Coinbase Pro request access headers */
export const accessHeaders = ({
  apiKey,
  passPhrase,
  secret,
  msg,
  timeStamp,
}: AccessHeaderParams): CBAccessHeaderModel => {
  const key = decode(secret);
  const sign = hmac("sha256", key, msg, "utf8", "base64") as string;
  return {
    "cb-access-key": apiKey,
    "cb-access-passphrase": passPhrase,
    "cb-access-sign": sign,
    "cb-access-timestamp": timeStamp,
  };
};
