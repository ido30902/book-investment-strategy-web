// Mock stock data for our screeners
export interface Stock {
	symbol: string;
	price: number;
	pe: number;
	marketCap: number;
	name: string;
	description: string;
	logo_url: string;
	sector: string;
	website: string;
	graham_props: {
		graham_score: number;
		current_ratio: number;
		debt_to_equity: number;
		book_value: number;
		graham_rank: number;
		eps: number;
		intrinsic_value: number;
	};
	magic_formula_props: {
		roc: number;
		ey: number;
		magic_formula_rank: number;
	};
}

export const STOCK_SECTORS = [
	'Technology',
	'Healthcare',
	'Financial Services',
	'Consumer Cyclical',
	'Communication Services',
	'Industrials',
	'Consumer Defensive',
	'Energy',
	'Basic Materials',
	'Real Estate',
	'Utilities'
] as const;
