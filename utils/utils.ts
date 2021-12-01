import { Constants } from "../constants.ts";
import {
  AccountModel,
  AccountModelExtended,
  QuoteModel,
  QuoteModelExtended,
} from "../typings/cb_contract.ts";
import { formatCurrency } from "./format.ts";

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
  currency = Constants.DefaultCurrency,
): QuoteModelExtended {
  const priceNum = Number(item.price);

  return {
    ...item,
    extended: {
      price: priceNum,
      priceFormatted: formatCurrency(priceNum, currency),
      size: Number(item.size),
      bid: Number(item.bid),
      ask: Number(item.ask),
      volume: Number(item.volume),
    },
  };
}
