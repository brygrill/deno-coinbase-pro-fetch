import { formatCurrency } from "./format.ts";
import { Constants } from "../constants.ts";
import type {
  AccountModel,
  AccountModelExtended,
  AssetModel,
  QuoteModel,
  QuoteModelExtended,
  QuotesModel,
} from "../typings/cb_contract.ts";
import type { CurrencyOptionsType } from "../typings/types.ts";

export function extendAccount(item: AccountModel): AccountModelExtended {
  return {
    ...item,
    extended: {
      balance: Number(item.balance),
      available: Number(item.available),
      hold: Number(item.hold),
    },
  };
}

export function extendQuote(
  item: QuoteModel,
  id: string,
  currency = Constants.DefaultCurrency,
): QuoteModelExtended {
  const priceNum = Number(item.price);

  return {
    ...item,
    pair: id,
    crypto: id.split("-")[0] || null, // id should be formatted like BTC-USD
    priceFormatted: formatCurrency(priceNum, currency),
    extended: {
      price: priceNum,
      size: Number(item.size),
      bid: Number(item.bid),
      ask: Number(item.ask),
      volume: Number(item.volume),
    },
  };
}

export interface CalculateAssetsParamsModel {
  accounts: AccountModelExtended[];
  ids: string[];
  quotes: QuotesModel[];
  currency?: CurrencyOptionsType;
}

/** Calculate and format asset values for a given portfolio  */
export const calcAssets = ({
  accounts,
  ids,
  quotes,
  currency = Constants.DefaultCurrency,
}: CalculateAssetsParamsModel): AssetModel => {
  console.dir({ accounts, ids, quotes });
  return {
    totalBalance: 0,
    totalBalanceFormatted: formatCurrency(0, currency),
    balanceByCoin: [],
    accounts,
  };
};
