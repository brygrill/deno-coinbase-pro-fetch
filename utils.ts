import { Account, AccountExtended } from "./contract.ts";

export function extendAccount(item: Account): AccountExtended {
  return {
    ...item,
    balanceNum: Number(item.balance),
    availableNum: Number(item.available),
    holdNum: Number(item.hold),
  };
}
