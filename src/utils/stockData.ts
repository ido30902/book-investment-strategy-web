
// Mock stock data for our screeners
export interface Stock {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  price: number;
  marketCap: number;
  peRatio: number;
  pbRatio: number;
  dividendYield: number;
  returnOnCapital: number;
  earningsYield: number;
  currentRatio: number;
  debtToEquity: number;
  net_current_asset_value: number;
}

export const generateStocks = (): Stock[] => {
  const sectors = [
    "Technology", "Healthcare", "Financials", "Consumer Discretionary", 
    "Industrials", "Communication Services", "Consumer Staples", 
    "Energy", "Utilities", "Real Estate", "Materials"
  ];
  
  const companies = [
    { ticker: "AAPL", name: "Apple Inc." },
    { ticker: "MSFT", name: "Microsoft Corporation" },
    { ticker: "AMZN", name: "Amazon.com Inc." },
    { ticker: "GOOGL", name: "Alphabet Inc." },
    { ticker: "META", name: "Meta Platforms Inc." },
    { ticker: "TSLA", name: "Tesla Inc." },
    { ticker: "BRK.B", name: "Berkshire Hathaway Inc." },
    { ticker: "JNJ", name: "Johnson & Johnson" },
    { ticker: "V", name: "Visa Inc." },
    { ticker: "PG", name: "Procter & Gamble Co." },
    { ticker: "JPM", name: "JPMorgan Chase & Co." },
    { ticker: "UNH", name: "UnitedHealth Group Inc." },
    { ticker: "HD", name: "Home Depot Inc." },
    { ticker: "MA", name: "Mastercard Inc." },
    { ticker: "NVDA", name: "NVIDIA Corporation" },
    { ticker: "DIS", name: "Walt Disney Co." },
    { ticker: "BAC", name: "Bank of America Corp." },
    { ticker: "ADBE", name: "Adobe Inc." },
    { ticker: "PFE", name: "Pfizer Inc." },
    { ticker: "NFLX", name: "Netflix Inc." },
    { ticker: "CMCSA", name: "Comcast Corporation" },
    { ticker: "CRM", name: "Salesforce.com Inc." },
    { ticker: "CSCO", name: "Cisco Systems Inc." },
    { ticker: "PEP", name: "PepsiCo Inc." },
    { ticker: "ABT", name: "Abbott Laboratories" },
    { ticker: "KO", name: "Coca-Cola Co." },
    { ticker: "TMO", name: "Thermo Fisher Scientific Inc." },
    { ticker: "ACN", name: "Accenture Plc" },
    { ticker: "COST", name: "Costco Wholesale Corp." },
    { ticker: "AVGO", name: "Broadcom Inc." },
    { ticker: "MRK", name: "Merck & Co. Inc." },
    { ticker: "WMT", name: "Walmart Inc." },
    { ticker: "VZ", name: "Verizon Communications Inc." },
    { ticker: "CVX", name: "Chevron Corporation" },
    { ticker: "XOM", name: "Exxon Mobil Corporation" },
  ];

  const stocks: Stock[] = [];

  // Generate random data for each company
  companies.forEach((company, index) => {
    const price = Number((Math.random() * 1000 + 20).toFixed(2));
    const marketCap = Number((Math.random() * 2000 + 1).toFixed(2)); // In billions
    const peRatio = Number((Math.random() * 50 + 5).toFixed(2));
    const pbRatio = Number((Math.random() * 15 + 0.5).toFixed(2));
    const dividendYield = Number((Math.random() * 5).toFixed(2));
    const returnOnCapital = Number((Math.random() * 40 + 5).toFixed(2));
    const earningsYield = Number((100 / peRatio).toFixed(2));
    const currentRatio = Number((Math.random() * 5 + 0.5).toFixed(2));
    const debtToEquity = Number((Math.random() * 2).toFixed(2));
    const net_current_asset_value = Number((Math.random() * 1000 - 200).toFixed(2));
    
    stocks.push({
      id: `stock-${index}`,
      ticker: company.ticker,
      name: company.name,
      sector: sectors[Math.floor(Math.random() * sectors.length)],
      price,
      marketCap,
      peRatio,
      pbRatio,
      dividendYield,
      returnOnCapital,
      earningsYield,
      currentRatio,
      debtToEquity,
      net_current_asset_value,
    });
  });

  return stocks;
};

export const allStocks = generateStocks();
