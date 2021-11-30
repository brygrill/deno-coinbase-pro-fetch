/** Types for Coinbase API endpoints */

export interface Account {
  id: string;
  currency: string;
  balance: string;
  available: string;
  hold: string;
  "profile_id": string;
  "trading_enabled": boolean;
}

export interface AccountExtended extends Account {
  balanceNum: number;
  availableNum: number;
  holdNum: number;
}
