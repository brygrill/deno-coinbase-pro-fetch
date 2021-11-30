/** Types for Coinbase API endpoints */

export interface AccountModel {
  id: string;
  currency: string;
  balance: string;
  available: string;
  hold: string;
  "profile_id": string;
  "trading_enabled": boolean;
}

export interface AccountModelExtended extends AccountModel {
  balanceNum: number;
  availableNum: number;
  holdNum: number;
}

export interface CurrencyModel {
  id: string;
}

export interface ProductModel {
  id: string;
  "base_currency": string;
  "quote_currency": string;
  "base_min_size": string;
  "base_max_size": string;
  "quote_increment": string;
  "base_increment": string;
  "display_name": string;
  "min_market_funds": string;
  "max_market_funds": string;
  "margin_enabled": boolean;
  "fx_stablecoin": boolean;
  "max_slippage_percentage": string;
  "post_only": boolean;
  "limit_only": boolean;
  "cancel_only": boolean;
  "trading_disabled": boolean;
  status: string;
  "status_message": string;
  "auction_mode": false;
}
