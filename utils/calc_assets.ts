import { formatCurrency } from './format.ts';
import { Constants } from '../constants.ts';
import type {
  AccountModelExtended,
  AssetModel,
  QuoteModelExtended,
  AccountQuoteModel,
} from '../typings/cb_contract.ts';
import type { CurrencyOptionsType } from '../typings/types.ts';

/** For a given set of accounts with values, sum their total as number and currency */
const calcTotal = (
  data: AccountQuoteModel[],
  currency: CurrencyOptionsType,
) => {
  const totalBalance = data.reduce((acc, cur) => acc + cur.value, 0);
  return {
    totalBalance,
    totalBalanceFormatted: formatCurrency(totalBalance, currency),
  };
};

//TODO: add a test for this function
/** For a given set of accounts and quotes. Calculate their fiat value */
const calcAssetValue = (
  accounts: AccountModelExtended[],
  quotes: QuoteModelExtended[],
): AccountQuoteModel[] => {
  return accounts.map((a) => {
    const quote = quotes.find((q) => q.crypto === a.currency);
    const value = quote
      ? quote.extended.price * a.extended.balance
      : a.extended.balance;
    return {
      ...a,
      value,
      quote,
    };
  });
};

export interface CalculateAssetsParamsModel {
  accounts: AccountModelExtended[];
  ids: string[];
  quotes: QuoteModelExtended[];
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
  const accountQuotes = calcAssetValue(accounts, quotes);
  const total = calcTotal(accountQuotes, currency);
  return {
    ...total,
    balanceByCoin: [],
    accounts: accountQuotes,
  };
};
