export class Constants {
  public static readonly BaseUrl = "https://api.exchange.coinbase.com";

  public static readonly SandboxUrl =
    "https://api-public.sandbox.exchange.coinbase.com";
}

export class EndpointConstants {
  public static readonly Accounts = "/accounts";

  public static AccountId(id: string) {
    return `${this.Accounts}/${id}`;
  }

  public static readonly Currencies = "/currencies";

  public static CurrencyId(id: string) {
    return `${this.Currencies}/${id}`;
  }

  public static readonly Products = "/products";

  public static ProductId(id: string) {
    return `${this.Products}/${id}`;
  }
}
