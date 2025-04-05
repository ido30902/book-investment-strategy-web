
// Mock stock data for our screeners
export interface Stock {
  symbol: string;
  pe: number;
  marketCap: number;
  name: string;
  description: string;
  logo_url: string;
  sector: string;
  graham_props: {
    graham_score: number;
    current_ratio: number;
    debt_to_equity: number;
    book_value: number;
    graham_rank: number;
  };
  magic_formula_props: {
    roa: number;
    magic_formula_rank: number;
  };
}

