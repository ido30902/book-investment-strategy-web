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
import { ArrowUpDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const StockScreenerSection = ({ stocks }: { stocks: Stock[] }) => {
	const [magicFormulaSortConfig, setMagicFormulaSortConfig] = useState({
		key: '',
		direction: '',
	});
	const [grahamSortConfig, setGrahamSortConfig] = useState({
		key: '',
		direction: '',
	});
	const [magicFormulaFilters, setMagicFormulaFilters] = useState({
		marketCapMin: 50,
		marketCapMax: 1000,
		stockCount: 20,
	});
	const [grahamFilters, setGrahamFilters] = useState({
		marketCapMin: 50,
		marketCapMax: 1000,
		stockCount: 20,
	});

	// Sort function for tables
	const requestSort = (key: string, tabName: string) => {
		if (tabName === 'magic-formula') {
			setMagicFormulaSortConfig((prevConfig) => {
				if (prevConfig.key === key) {
					const direction =
						prevConfig.direction === 'ascending'
							? 'descending'
							: 'ascending';
					return { key, direction };
				}
				return { key, direction: 'ascending' };
			});
		} else {
			setGrahamSortConfig((prevConfig) => {
				if (prevConfig.key === key) {
					const direction =
						prevConfig.direction === 'ascending'
							? 'descending'
							: 'ascending';
					return { key, direction };
				}
				return { key, direction: 'ascending' };
			});
		}
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
		return `${value.toFixed(2)}%`;
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
												<div className="space-y-2">
													<h4 className="font-medium">
														Market Cap Range
														(Billions $)
													</h4>
													<div className="flex items-center space-x-4">
														<Slider
															value={[
																magicFormulaFilters.marketCapMin,
																magicFormulaFilters.marketCapMax,
															]}
															min={1}
															max={2000}
															step={10}
															onValueChange={(
																value
															) =>
																setMagicFormulaFilters(
																	{
																		...magicFormulaFilters,
																		marketCapMin:
																			value[0],
																		marketCapMax:
																			value[1],
																	}
																)
															}
															className="flex-1"
														/>
													</div>
													<div className="flex items-center justify-between mt-2">
														<Input
															type="number"
															value={
																magicFormulaFilters.marketCapMin
															}
															onChange={(e) =>
																setMagicFormulaFilters(
																	{
																		...magicFormulaFilters,
																		marketCapMin:
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
														/>
														<span className="mx-2">
															to
														</span>
														<Input
															type="number"
															value={
																magicFormulaFilters.marketCapMax
															}
															onChange={(e) =>
																setMagicFormulaFilters(
																	{
																		...magicFormulaFilters,
																		marketCapMax:
																			Number(
																				e
																					.target
																					.value
																			),
																	}
																)
															}
															className="w-24"
															max={2000}
														/>
													</div>
												</div>

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
														onClick={() =>
															requestSort(
																'marketCap',
																'magic-formula'
															)
														}>
														<div className="flex justify-center items-center">
															Market Cap
															<ArrowUpDown className="ml-2 h-4 w-4" />
														</div>
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() =>
															requestSort(
																'returnOnCapital',
																'magic-formula'
															)
														}>
														<div className="flex justify-center items-center">
															ROA
															<ArrowUpDown className="ml-2 h-4 w-4" />
														</div>
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() =>
															requestSort(
																'returnOnCapital',
																'magic-formula'
															)
														}>
														<div className="flex justify-center items-center">
															PE
															<ArrowUpDown className="ml-2 h-4 w-4" />
														</div>
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{stocks.map((stock) => (
													<TableRow
														key={
															stock
																.magic_formula_props
																.magic_formula_rank
														}>
														<TableCell className="font-medium text-center">
															<div className="flex items-center justify-center gap-2">
																<div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
																	<img
																		src={
																			stock.logo_url
																		}
																	/>
																</div>
																{stock.symbol}
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
																const value =
																	stock.marketCap;
																if (
																	value >=
																	1000000000000
																) {
																	return `${(
																		value /
																		1000000000000
																	).toFixed(
																		1
																	)}T$`;
																} else if (
																	value >=
																	1000000000
																) {
																	return `${(
																		value /
																		1000000000
																	).toFixed(
																		1
																	)}B$`;
																} else {
																	return `${(
																		value /
																		1000000
																	).toFixed(
																		1
																	)}M$`;
																}
															})()}
														</TableCell>
														<TableCell className="text-center">
															{formatPercentage(
																stock
																	.magic_formula_props
																	.roa
															)}
														</TableCell>
														<TableCell className="text-center">
															{stock.pe.toFixed(
																2
															)}
														</TableCell>
													</TableRow>
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
												<div className="space-y-2">
													<h4 className="font-medium">
														Market Cap Range
														(Billions $)
													</h4>
													<div className="flex items-center space-x-4">
														<Slider
															value={[
																grahamFilters.marketCapMin,
																grahamFilters.marketCapMax,
															]}
															min={1}
															max={2000}
															step={10}
															onValueChange={(
																value
															) =>
																setGrahamFilters(
																	{
																		...grahamFilters,
																		marketCapMin:
																			value[0],
																		marketCapMax:
																			value[1],
																	}
																)
															}
															className="flex-1"
														/>
													</div>
													<div className="flex items-center justify-between mt-2">
														<Input
															type="number"
															value={
																grahamFilters.marketCapMin
															}
															onChange={(e) =>
																setGrahamFilters(
																	{
																		...grahamFilters,
																		marketCapMin:
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
														/>
														<span className="mx-2">
															to
														</span>
														<Input
															type="number"
															value={
																grahamFilters.marketCapMax
															}
															onChange={(e) =>
																setGrahamFilters(
																	{
																		...grahamFilters,
																		marketCapMax:
																			Number(
																				e
																					.target
																					.value
																			),
																	}
																)
															}
															className="w-24"
															max={2000}
														/>
													</div>
												</div>

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
														onClick={() =>
															requestSort(
																'price',
																'graham'
															)
														}>
														<div className="flex justify-center items-center">
															Price
															<ArrowUpDown className="ml-2 h-4 w-4" />
														</div>
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() =>
															requestSort(
																'peRatio',
																'graham'
															)
														}>
														<div className="flex justify-center items-center">
															P/E
															<ArrowUpDown className="ml-2 h-4 w-4" />
														</div>
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() =>
															requestSort(
																'pbRatio',
																'graham'
															)
														}>
														<div className="flex justify-center items-center">
															P/B
															<ArrowUpDown className="ml-2 h-4 w-4" />
														</div>
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() =>
															requestSort(
																'currentRatio',
																'graham'
															)
														}>
														<div className="flex justify-center items-center">
															Current Ratio
															<ArrowUpDown className="ml-2 h-4 w-4" />
														</div>
													</TableHead>
													<TableHead
														className="text-center cursor-pointer"
														onClick={() =>
															requestSort(
																'debtToEquity',
																'graham'
															)
														}>
														<div className="flex justify-center items-center">
															Debt/Equity
															<ArrowUpDown className="ml-2 h-4 w-4" />
														</div>
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{stocks.map((stock) => (
													<TableRow
														key={
															stock.graham_props
																.graham_rank
														}>
														<TableCell className="font-medium text-center">
															<div className="flex items-center justify-center gap-2">
																<div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
																	<img
																		src={
																			stock.logo_url
																		}
																	/>
																</div>
																{stock.symbol}
															</div>
														</TableCell>
														<TableCell className="text-center">
															{stock.name}
														</TableCell>
														<TableCell className="text-center">
															{stock.sector}
														</TableCell>
														<TableCell className="text-center">
															{stock.pe.toFixed(
																2
															)}
														</TableCell>
														<TableCell className="text-center">
															{stock.graham_props.book_value.toFixed(
																2
															)}
														</TableCell>
														<TableCell className="text-center">
															{stock.graham_props.current_ratio.toFixed(
																2
															)}
														</TableCell>
														<TableCell className="text-center">
															{stock.graham_props.debt_to_equity.toFixed(
																2
															)}
														</TableCell>
													</TableRow>
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
