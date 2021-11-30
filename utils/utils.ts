import { AccountModel, AccountModelExtended } from "../typings/cb_contract.ts";

export function extendAccount(item: AccountModel): AccountModelExtended {
  return {
    ...item,
    balanceNum: Number(item.balance),
    availableNum: Number(item.available),
    holdNum: Number(item.hold),
  };
}
