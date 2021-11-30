import { Constants } from "../constants.ts";
import {
  AccountModel,
  AccountModelExtended,
  QuoteModel,
  QuoteModelExtended,
} from "../typings/cb_contract.ts";

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
  currency = "USD",
): QuoteModelExtended {
  // validate currency arg
  const valid = Constants.ValidFiat.includes(currency);
  return {
    ...item,
    extended: { // TODO: breakout formatter
      price: Number(item.price),
      priceFormatted: valid
        ? new Intl.NumberFormat("en", {
          style: "currency",
          currency,
        }).format(Number(item.price))
        : "-",
      size: Number(item.size),
      bid: Number(item.bid),
      ask: Number(item.ask),
      volume: Number(item.volume),
    },
  };
}
