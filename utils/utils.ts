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

export function extendQuote(item: QuoteModel): QuoteModelExtended {
  return {
    ...item,
    extended: {
      price: Number(item.price),
      size: Number(item.size),
      bid: Number(item.bid),
      ask: Number(item.ask),
      volume: Number(item.volume),
    },
  };
}
