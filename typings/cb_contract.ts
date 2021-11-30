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
  name: string;
  "min_size": string;
  status: string;
  message: string;
  "max_precision": string;
  "convertible_to": string[];
  details: {
    type: string;
    symbol: string | null;
    "network_confirmations": number;
    "sort_order": number;
    "crypto_address_link": string;
    "crypto_transaction_link": string;
    "push_payment_methods": string[];
    "group_types": string[];
    "display_name": string | null;
    "processing_time_seconds": string | null;
    "min_withdrawal_amount": number;
    "max_withdrawal_amount": number;
  };
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
