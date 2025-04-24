import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStockBySymbol } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CircleAlertIcon } from 'lucide-react';
import { Stock } from '@/utils/stockData';

const StockDetail = () => {
	const { symbol } = useParams<{ symbol: string }>();
	const [stock, setStock] = useState<Stock | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const fetchStockDetails = async () => {
			if (!symbol) return;

			try {
				setLoading(true);
				setError(null);
				const response = await getStockBySymbol(symbol);
				setStock(response.data);
				document.title = `${symbol} - Investment Book Strategy`;
			} catch (err) {
				setError(
					'Failed to load stock details. Please try again later.'
				);
				console.error('Error fetching stock details:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchStockDetails();
	}, [symbol]);

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(value);
	};

	const formatMarketCap = (value: number) => {
		if (value >= 1_000_000_000_000) {
			return `${formatCurrency(value / 1_000_000_000_000)}T`;
		} else if (value >= 1_000_000_000) {
			return `${formatCurrency(value / 1_000_000_000)}B`;
		} else if (value >= 1_000_000) {
			return `${formatCurrency(value / 1_000_000)}M`;
		} else {
			return formatCurrency(value);
		}
	};

	const getOrdinalSuffix = (n: number): string => {
		const j = n % 10;
		const k = n % 100;
		if (j === 1 && k !== 11) {
			return 'st';
		}
		if (j === 2 && k !== 12) {
			return 'nd';
		}
		if (j === 3 && k !== 13) {
			return 'rd';
		}
		return 'th';
	};

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		// Check on initial render
		checkIfMobile();

		// Add event listener for window resize
		window.addEventListener('resize', checkIfMobile);

		// Clean up
		return () => window.removeEventListener('resize', checkIfMobile);
	}, []);

	return (
		<div className="min-h-screen flex flex-col">
			{!isMobile && <Header />}
			<main className="flex-grow container mx-auto px-4 py-8 md:mt-16">
				{loading ? (
					<div className="space-y-4">
						<Skeleton className="h-12 w-full max-w-sm" />
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Skeleton className="h-64 w-full" />
							<Skeleton className="h-64 w-full" />
						</div>
					</div>
				) : error ? (
					<Alert variant="destructive" className="my-8">
						<CircleAlertIcon className="h-4 w-4" />
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				) : stock ? (
					<div className="space-y-8">
						{/* Company Identification Section */}
						<div className="flex items-center justify-between w-full">
							<div className="flex items-center">
								{stock.logo_url && (
									<div className="w-16 h-16 md:w-28 md:h-28 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 shadow-sm">
										<img
											src={stock.logo_url}
											alt={`${stock.symbol} logo`}
											className="w-full h-full object-contain"
										/>
									</div>
								)}
								<div className="flex flex-col ml-6 md:ml-12">
									<h1 className="text-3xl md:text-5xl font-bold tracking-tight">
										{stock.symbol}
									</h1>
									<p className="text-lg md:text-xl text-muted-foreground truncate max-w-[200px] md:max-w-md">
										{stock.name}
									</p>
								</div>
							</div>
							<div className="text-right">
								<span className="text-2xl md:text-4xl font-bold text-black">
									{formatCurrency(stock.price)}
								</span>
							</div>
						</div>

						{/* Price Information Section */}
						<div className="flex items-center gap-4 md:gap-8 py-4 border-b overflow-x-auto">
							<div className="flex flex-wrap gap-4 md:gap-6">
								<span className="text-sm md:text-base text-muted-foreground whitespace-nowrap">
									P/E: {stock.pe.toFixed(2)}
								</span>
								<span className="text-sm md:text-base text-muted-foreground whitespace-nowrap">
									Market Cap:{' '}
									{formatMarketCap(stock.marketCap)}
								</span>
								<span className="text-sm md:text-base text-muted-foreground whitespace-nowrap">
									Sector: {stock.sector}
								</span>
							</div>
						</div>

						{/* Strategy Rankings Section */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Card>
								<CardHeader>
									<CardTitle>Graham Score</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{stock.graham_props.graham_rank}
										{getOrdinalSuffix(
											stock.graham_props.graham_rank
										)}
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Magic Formula</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{
											stock.magic_formula_props
												.magic_formula_rank
										}
										{getOrdinalSuffix(
											stock.magic_formula_props
												.magic_formula_rank
										)}
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Company Information Section */}
						<div className="space-y-4">
							<div className="prose max-w-none">
								<p className="text-muted-foreground">
									{stock.description ||
										'No company description available.'}
								</p>
							</div>
							<div className="flex gap-4">
								<a
									href={`https://finance.yahoo.com/quote/${stock.symbol}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:underline">
									View on Yahoo Finance
								</a>
								{stock.website && (
									<a
										href={stock.website}
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:underline">
										Company Website
									</a>
								)}
							</div>
						</div>
					</div>
				) : (
					<Alert className="my-8">
						<CircleAlertIcon className="h-4 w-4" />
						<AlertDescription>
							Stock data not available.
						</AlertDescription>
					</Alert>
				)}
			</main>
			<Footer />
		</div>
	);
};

export default StockDetail;
