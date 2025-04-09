import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Stock } from '@/utils/stockData';
import { ArrowUpDown, ChevronDown, ChevronUp, ArrowUp, ArrowDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type SortDirection = 'ascending' | 'descending' | 'default';
type SortConfig = {
	key: string;
	direction: SortDirection;
};

// New market cap slider constants and utilities
const MARKET_CAP_MIN = 0.05; // $50M
const MARKET_CAP_MAX = 5000; // $5T

const formatMarketCap = (value: number): string => {
	if (value >= 1000) {
		return `$${(value / 1000).toFixed(1)}T`;
	} else if (value >= 1) {
		return `$${value.toFixed(1)}B`;
	} else {
		return `$${(value * 1000).toFixed(0)}M`;
	}
};

const logToLinear = (value: number): number => {
	return Math.pow(10, value);
};

const linearToLog = (value: number): number => {
	return Math.log10(value);
};

const MarketCapSlider = ({ 
	value, 
	onChange, 
	className 
}: { 
	value: [number, number]; 
	onChange: (value: [number, number]) => void;
	className?: string;
}) => {
	const [minValue, maxValue] = value;
	
	const handleChange = (newValue: number[]) => {
		onChange([logToLinear(newValue[0]), logToLinear(newValue[1])]);
	};

	return (
		<div className={`space-y-4 ${className}`}>
			<div className="flex justify-between items-center">
				<span className="text-sm font-medium">Market Cap Range</span>
				<div className="flex items-center gap-2">
					<span className="text-sm">{formatMarketCap(minValue)}</span>
					<span className="text-sm">to</span>
					<span className="text-sm">{formatMarketCap(maxValue)}</span>
				</div>
			</div>
			<div className="relative">
				<Slider
					value={[linearToLog(minValue), linearToLog(maxValue)]}
					min={linearToLog(MARKET_CAP_MIN)}
					max={linearToLog(MARKET_CAP_MAX)}
					step={0.1}
					onValueChange={handleChange}
					className="w-full"
				/>
			</div>
		</div>
	);
};

const StockScreenerSection = ({ stocks }: { stocks: Stock[] }) => {
	const [magicFormulaSortConfig, setMagicFormulaSortConfig] = useState<SortConfig>({
		key: 'magic_formula_rank',
		direction: 'ascending',
	});
	const [grahamSortConfig, setGrahamSortConfig] = useState<SortConfig>({
		key: 'magic_formula_rank',
		direction: 'ascending',
	});
	const [magicFormulaFilters, setMagicFormulaFilters] = useState({
		marketCapMin: MARKET_CAP_MIN,
		marketCapMax: MARKET_CAP_MAX,
		stockCount: 20,
	});
	const [grahamFilters, setGrahamFilters] = useState({
		marketCapMin: MARKET_CAP_MIN,
		marketCapMax: MARKET_CAP_MAX,
		stockCount: 20,
	});
	const [expandedMagicFormulaRows, setExpandedMagicFormulaRows] = useState<Set<string>>(new Set());
	const [expandedGrahamRows, setExpandedGrahamRows] = useState<Set<string>>(new Set());

	const getNextSortDirection = (currentDirection: SortDirection): SortDirection => {
		switch (currentDirection) {
			case 'default':
				return 'descending';
			case 'descending':
				return 'ascending';
			case 'ascending':
				return 'default';
		}
	};

	const requestSort = (key: string, tabName: string) => {
		if (tabName === 'magic-formula') {
			setMagicFormulaSortConfig(prevConfig => ({
				key,
				direction: prevConfig.key === key ? getNextSortDirection(prevConfig.direction) : 'descending'
			}));
		} else {
			setGrahamSortConfig(prevConfig => ({
				key,
				direction: prevConfig.key === key ? getNextSortDirection(prevConfig.direction) : 'descending'
			}));
		}
	};

	const getSortIcon = (key: string, config: SortConfig) => {
		if (config.key !== key) return <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />;
		switch (config.direction) {
			case 'ascending':
				return <ArrowUp className="ml-2 h-4 w-4" />;
			case 'descending':
				return <ArrowDown className="ml-2 h-4 w-4" />;
			default:
				return <ArrowUpDown className="ml-2 h-4 w-4" />;
		}
	};

	const sortStocks = (stocks: Stock[], config: SortConfig) => {
		if (config.direction === 'default') {
			return [...stocks].sort((a, b) => a.magic_formula_props.magic_formula_rank - b.magic_formula_props.magic_formula_rank);
		}

		const sorted = [...stocks].sort((a, b) => {
			let aValue: any;
			let bValue: any;

			switch (config.key) {
				case 'marketCap':
					aValue = a.marketCap;
					bValue = b.marketCap;
					break;
				case 'returnOnCapital':
					aValue = a.magic_formula_props.roa;
					bValue = b.magic_formula_props.roa;
					break;
				case 'pe':
					aValue = a.pe;
					bValue = b.pe;
					break;
				case 'book_value':
					aValue = a.graham_props.book_value;
					bValue = b.graham_props.book_value;
					break;
				case 'current_ratio':
					aValue = a.graham_props.current_ratio;
					bValue = b.graham_props.current_ratio;
					break;
				case 'debt_to_equity':
					aValue = a.graham_props.debt_to_equity;
					bValue = b.graham_props.debt_to_equity;
					break;
				case 'magic_formula_rank':
					aValue = a.magic_formula_props.magic_formula_rank;
					bValue = b.magic_formula_props.magic_formula_rank;
					break;
				default:
					return 0;
			}

			if (aValue < bValue) return config.direction === 'ascending' ? -1 : 1;
			if (aValue > bValue) return config.direction === 'ascending' ? 1 : -1;
			return 0;
		});

		return sorted;
	};

	// Helper to format currency
	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 2,
		}).format(value);
	};

	// Helper to format percentage
	const formatPercentage = (value: number) => {
		value *= 100;
		return `${value.toFixed(2)}%`;
	};

	const toggleRow = (symbol: string, tabName: string) => {
		if (tabName === 'magic-formula') {
			setExpandedMagicFormulaRows(prev => {
				const newSet = new Set(prev);
				if (newSet.has(symbol)) {
					newSet.delete(symbol);
				} else {
					newSet.add(symbol);
				}
				return newSet;
			});
		} else {
			setExpandedGrahamRows(prev => {
				const newSet = new Set(prev);
				if (newSet.has(symbol)) {
					newSet.delete(symbol);
				} else {
					newSet.add(symbol);
				}
				return newSet;
			});
		}
	};

	// Filter stocks based on market cap and limit count
	const getFilteredStocks = (tabName: string) => {
		const filters = tabName === 'magic-formula' ? magicFormulaFilters : grahamFilters;
		const sortConfig = tabName === 'magic-formula' ? magicFormulaSortConfig : grahamSortConfig;
		
		// Convert market cap filters to actual values (they're in billions)
		const minMarketCap = filters.marketCapMin * 1000000000;
		const maxMarketCap = filters.marketCapMax * 1000000000;

		return sortStocks(
			stocks
				.filter(stock => stock.marketCap >= minMarketCap && stock.marketCap <= maxMarketCap)
				.slice(0, filters.stockCount),
			sortConfig
		);
	};

	return (
		<section id="screener" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl md:text-4xl font-bold text-investment-blue mb-12 text-center">
					Investment Strategy Stock Screeners
				</h2>

				<Tabs defaultValue="magic-formula" className="w-full">
					<TabsList className="grid w-full grid-cols-2 mb-8">
						<TabsTrigger value="magic-formula">
							Magic Formula
						</TabsTrigger>
						<TabsTrigger value="graham">
							Graham Strategy
						</TabsTrigger>
					</TabsList>

					{/* Magic Formula Tab */}
					<TabsContent value="magic-formula">
						<Card>
							<CardHeader>
								<div className="flex flex-col md:flex-row md:items-center justify-between">
									<div>
										<CardTitle className="text-2xl">
											Magic Formula Stock Screener
										</CardTitle>
										<CardDescription className="mt-2">
											Based on Joel Greenblatt's
											investment strategy focusing on
											return on capital and earnings
											yield.
										</CardDescription>
									</div>
									<Dialog>
										<DialogTrigger asChild>
											<Button
												variant="outline"
												className="mt-4 md:mt-0">
												Adjust Filters
											</Button>
										</DialogTrigger>
										<DialogContent className="sm:max-w-[425px]">
											<DialogHeader>
												<DialogTitle>
													Adjust Screener Filters
												</DialogTitle>
											</DialogHeader>
											<div className="space-y-6 py-4">
												<MarketCapSlider
													value={[magicFormulaFilters.marketCapMin, magicFormulaFilters.marketCapMax]}
													onChange={(value) => setMagicFormulaFilters(prev => ({
														...prev,
														marketCapMin: value[0],
														marketCapMax: value[1],
													}))}
												/>
												<div className="space-y-2">
													<h4 className="font-medium">
														Number of Stocks to
														Display
													</h4>
													<div className="flex items-center space-x-4">
														<Slider
															value={[
																magicFormulaFilters.stockCount,
															]}
															min={5}
															max={50}
															step={1}
															onValueChange={(
																value
															) =>
																setMagicFormulaFilters(
																	{
																		...magicFormulaFilters,
																		stockCount:
																			value[0],
																	}
																)
															}
															className="flex-1"
														/>
														<Input
															type="number"
															value={
																magicFormulaFilters.stockCount
															}
															onChange={(e) =>
																setMagicFormulaFilters(
																	{
																		...magicFormulaFilters,
																		stockCount:
																			Number(
																				e
																					.target
																					.value
																			),
																	}
																)
															}
															className="w-24"
															min={1}
															max={50}
														/>
													</div>
												</div>
											</div>
										</DialogContent>
									</Dialog>
								</div>
							</CardHeader>
							<CardContent>
								<div className="rounded-md border">
									<ScrollArea className="h-[30rem] w-full">
										<Table>
											<TableHeader className="sticky top-0 bg-background">
												<TableRow>
													<TableHead className="w-20 text-center">
														Ticker
													</TableHead>
													<TableHead className="text-center">
														Company
													</TableHead>
													<TableHead className="text-center">
														Sector
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() => requestSort('marketCap', 'magic-formula')}
													>
														<div className="flex justify-center items-center">
															Market Cap
															{getSortIcon('marketCap', magicFormulaSortConfig)}
														</div>
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() => requestSort('returnOnCapital', 'magic-formula')}
													>
														<div className="flex justify-center items-center">
															ROA
															{getSortIcon('returnOnCapital', magicFormulaSortConfig)}
														</div>
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() => requestSort('pe', 'magic-formula')}
													>
														<div className="flex justify-center items-center">
															P/E
															{getSortIcon('pe', magicFormulaSortConfig)}
														</div>
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{getFilteredStocks('magic-formula').map((stock) => (
													<>
														<TableRow
															key={stock.magic_formula_props.magic_formula_rank}
															className="cursor-pointer hover:bg-gray-50"
															onClick={() => toggleRow(stock.symbol, 'magic-formula')}
														>
															<TableCell className="font-medium text-center">
																<div className="flex items-center justify-center gap-2">
																	<div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
																		<img src={stock.logo_url} />
																	</div>
																	{stock.symbol}
																	{expandedMagicFormulaRows.has(stock.symbol) ? (
																		<ChevronUp className="h-4 w-4" />
																	) : (
																		<ChevronDown className="h-4 w-4" />
																	)}
																</div>
															</TableCell>
															<TableCell className="text-center">
																{stock.name}
															</TableCell>
															<TableCell className="text-center">
																{stock.sector}
															</TableCell>
															<TableCell className="text-center">
																{(() => {
																	const value = stock.marketCap;
																	if (value >= 1000000000000) {
																		return `${(value / 1000000000000).toFixed(1)}T$`;
																	} else if (value >= 1000000000) {
																		return `${(value / 1000000000).toFixed(1)}B$`;
																	} else {
																		return `${(value / 1000000).toFixed(1)}M$`;
																	}
																})()}
															</TableCell>
															<TableCell className="text-center">
																{formatPercentage(stock.magic_formula_props.roa)}
															</TableCell>
															<TableCell className="text-center">
																{stock.pe.toFixed(2)}
															</TableCell>
														</TableRow>
														{expandedMagicFormulaRows.has(stock.symbol) && (
															<TableRow className="bg-gray-50">
																<TableCell colSpan={6} className="p-4">
																	<p className="text-sm text-gray-600">{stock.description}</p>
																</TableCell>
															</TableRow>
														)}
													</>
												))}
											</TableBody>
										</Table>
									</ScrollArea>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Graham Strategy Tab */}
					<TabsContent value="graham">
						<Card>
							<CardHeader>
								<div className="flex flex-col md:flex-row md:items-center justify-between">
									<div>
										<CardTitle className="text-2xl">
											Graham Strategy Stock Screener
										</CardTitle>
										<CardDescription className="mt-2">
											Based on Benjamin Graham's value
											investing principles focusing on
											financially sound companies at
											bargain prices.
										</CardDescription>
									</div>
									<Dialog>
										<DialogTrigger asChild>
											<Button
												variant="outline"
												className="mt-4 md:mt-0">
												Adjust Filters
											</Button>
										</DialogTrigger>
										<DialogContent className="sm:max-w-[425px]">
											<DialogHeader>
												<DialogTitle>
													Adjust Screener Filters
												</DialogTitle>
											</DialogHeader>
											<div className="space-y-6 py-4">
												<MarketCapSlider
													value={[grahamFilters.marketCapMin, grahamFilters.marketCapMax]}
													onChange={(value) => setGrahamFilters(prev => ({
														...prev,
														marketCapMin: value[0],
														marketCapMax: value[1],
													}))}
												/>
												<div className="space-y-2">
													<h4 className="font-medium">
														Number of Stocks to
														Display
													</h4>
													<div className="flex items-center space-x-4">
														<Slider
															value={[
																grahamFilters.stockCount,
															]}
															min={5}
															max={35}
															step={1}
															onValueChange={(
																value
															) =>
																setGrahamFilters(
																	{
																		...grahamFilters,
																		stockCount:
																			value[0],
																	}
																)
															}
															className="flex-1"
														/>
														<Input
															type="number"
															value={
																grahamFilters.stockCount
															}
															onChange={(e) =>
																setGrahamFilters(
																	{
																		...grahamFilters,
																		stockCount:
																			Number(
																				e
																					.target
																					.value
																			),
																	}
																)
															}
															className="w-24"
															min={1}
															max={35}
														/>
													</div>
												</div>
											</div>
										</DialogContent>
									</Dialog>
								</div>
							</CardHeader>
							<CardContent>
								<div className="rounded-md border">
									<ScrollArea className="h-[30rem] w-full">
										<Table>
											<TableHeader className="sticky top-0 bg-background">
												<TableRow>
													<TableHead className="w-20 text-center">
														Ticker
													</TableHead>
													<TableHead className="text-center">
														Company
													</TableHead>
													<TableHead className="text-center">
														Sector
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() => requestSort('pe', 'graham')}
													>
														<div className="flex justify-center items-center">
															P/E
															{getSortIcon('pe', grahamSortConfig)}
														</div>
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() => requestSort('book_value', 'graham')}
													>
														<div className="flex justify-center items-center">
															P/B
															{getSortIcon('book_value', grahamSortConfig)}
														</div>
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() => requestSort('current_ratio', 'graham')}
													>
														<div className="flex justify-center items-center">
															Current Ratio
															{getSortIcon('current_ratio', grahamSortConfig)}
														</div>
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() => requestSort('debt_to_equity', 'graham')}
													>
														<div className="flex justify-center items-center">
															Debt/Equity
															{getSortIcon('debt_to_equity', grahamSortConfig)}
														</div>
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{getFilteredStocks('graham').map((stock) => (
													<>
														<TableRow
															key={stock.graham_props.graham_rank}
															className="cursor-pointer hover:bg-gray-50"
															onClick={() => toggleRow(stock.symbol, 'graham')}
														>
															<TableCell className="font-medium text-center">
																<div className="flex items-center justify-center gap-2">
																	<div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
																		<img src={stock.logo_url} />
																	</div>
																	{stock.symbol}
																	{expandedGrahamRows.has(stock.symbol) ? (
																		<ChevronUp className="h-4 w-4" />
																	) : (
																		<ChevronDown className="h-4 w-4" />
																	)}
																</div>
															</TableCell>
															<TableCell className="text-center">
																{stock.name}
															</TableCell>
															<TableCell className="text-center">
																{stock.sector}
															</TableCell>
															<TableCell className="text-center">
																{stock.pe.toFixed(2)}
															</TableCell>
															<TableCell className="text-center">
																{stock.graham_props.book_value.toFixed(2)}
															</TableCell>
															<TableCell className="text-center">
																{stock.graham_props.current_ratio.toFixed(2)}
															</TableCell>
															<TableCell className="text-center">
																{stock.graham_props.debt_to_equity.toFixed(2)}
															</TableCell>
														</TableRow>
														{expandedGrahamRows.has(stock.symbol) && (
															<TableRow className="bg-gray-50">
																<TableCell colSpan={7} className="p-4">
																	<p className="text-sm text-gray-600">{stock.description}</p>
																</TableCell>
															</TableRow>
														)}
													</>
												))}
											</TableBody>
										</Table>
									</ScrollArea>
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
};

export default StockScreenerSection;
