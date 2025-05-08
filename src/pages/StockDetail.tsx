import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStockBySymbol } from '@/lib/api';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
	CircleAlertIcon,
	ExternalLink,
	Newspaper,
	Award,
	Share2,
} from 'lucide-react';
import { Stock } from '@/utils/stockData';
import { BarChart as BarChartIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ValueBarChart from '@/components/ui/ValueBarChart';
import MobileAdPopup from '@/components/ads/MobileAdPopup';
import DesktopSideAds from '@/components/ads/DesktopSideAds';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

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

	const formatPercentage = (value: number) => {
		return `${value.toFixed(2)}%`;
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
			{/*{<DesktopSideAds />}*/}
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
					<main className="flex-1 container mx-auto px-4 py-6">
						{/* Company Header Section - Moved from header to main content */}
						<div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
								<div className="flex items-center space-x-4">
									<div className="h-14 w-14 md:h-16 md:w-16 rounded-full overflow-hidden flex-shrink-0">
										<img
											title={`${stock.name} logo`}
											src={stock.logo_url}
											alt={`${stock.name} logo`}
											className="h-full w-full object-cover"
										/>
									</div>
									<div>
										<h1 className="text-xl md:text-2xl font-bold text-gray-900">
											{stock.name}
										</h1>
										<div className="flex flex-wrap items-center gap-2">
											<h2 className="text-gray-500 font-medium">
												{stock.symbol}
											</h2>
											<span className="text-gray-400 hidden sm:inline">
												•
											</span>
											<span className="text-gray-500">
												{stock.sector}
											</span>
										</div>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="text-right">
										<div className="text-2xl md:text-3xl font-bold text-gray-900">
											${stock.price.toFixed(2)}
										</div>
									</div>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 text-white"
												size="sm">
												<Share2 className="h-4 w-4" />
												<span className="hidden sm:inline">
													Share this stock
												</span>
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-80 p-4 bg-white/80 backdrop-blur-sm">
											<div className="space-y-4">
												<h4 className="font-medium">
													Share this stock with
													friends
												</h4>
												<p className="text-sm text-gray-500">
													{stock.symbol} | $
													{stock.price.toFixed(2)}
												</p>
												<div className="grid grid-cols-3 gap-2">
													<a
														title="Share on X.com"
														href={`https://x.com/intent/tweet?text=Check out ${
															stock.symbol
														} at $${stock.price.toFixed(
															2
														)} on Investment Book Strategy!&url=${encodeURIComponent(
															window.location.href
														)}`}
														target="_blank"
														rel="noopener noreferrer"
														className="flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-md">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															viewBox="0 0 16 16">
															<path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
														</svg>
														<span className="text-xs mt-1">
															X.com
														</span>
													</a>
													<a
														title="Share on Facebook"
														href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
															window.location.href
														)}`}
														target="_blank"
														rel="noopener noreferrer"
														className="flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-md">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															viewBox="0 0 16 16">
															<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
														</svg>
														<span className="text-xs mt-1">
															Facebook
														</span>
													</a>
													<a
														title="Share on WhatsApp"
														href={`https://wa.me/?text=Check out ${
															stock.symbol
														} at $${stock.price.toFixed(
															2
														)} on Investment Book Strategy! ${encodeURIComponent(
															window.location.href
														)}`}
														target="_blank"
														rel="noopener noreferrer"
														className="flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-md">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															viewBox="0 0 16 16">
															<path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
														</svg>
														<span className="text-xs mt-1">
															WhatsApp
														</span>
													</a>
													<a
														title="Share on LinkedIn"
														href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
															window.location.href
														)}`}
														target="_blank"
														rel="noopener noreferrer"
														className="flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-md">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															viewBox="0 0 16 16">
															<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
														</svg>
														<span className="text-xs mt-1">
															LinkedIn
														</span>
													</a>
													<a
														title="Share on Telegram"
														href={`https://t.me/share/url?url=${encodeURIComponent(
															window.location.href
														)}&text=Check out ${
															stock.symbol
														} at $${stock.price.toFixed(
															2
														)} on Investment Book Strategy!`}
														target="_blank"
														rel="noopener noreferrer"
														className="flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-md">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															fill="currentColor"
															viewBox="0 0 16 16">
															<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
														</svg>
														<span className="text-xs mt-1">
															Telegram
														</span>
													</a>
													<a
														title="Share by Email"
														href={`mailto:?subject=Check out ${
															stock.symbol
														} on Investment Book Strategy&body=I found ${
															stock.symbol
														} at $${stock.price.toFixed(
															2
														)} on Investment Book Strategy! ${encodeURIComponent(
															window.location.href
														)}`}
														target="_blank"
														rel="noopener noreferrer"
														className="flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 rounded-md">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="2"
															strokeLinecap="round"
															strokeLinejoin="round"
															className="h-5 w-5 text-gray-700">
															<rect
																width="20"
																height="16"
																x="2"
																y="4"
																rx="2"></rect>
															<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
														</svg>
														<span className="text-xs mt-1">
															Email
														</span>
													</a>
												</div>
												<div className="mt-2 pt-2 border-t border-gray-200">
													<p className="text-sm font-medium">
														Direct Link
													</p>
													<div className="flex mt-1">
														<input
															type="text"
															value={
																window.location
																	.href
															}
															readOnly
															className="flex-1 p-2 text-xs border border-gray-200 rounded-l-md"
														/>
														<button
															onClick={() => {
																navigator.clipboard.writeText(
																	window
																		.location
																		.href
																);
																alert(
																	'Link copied to clipboard!'
																);
															}}
															className="p-2 bg-blue-800 text-white rounded-r-md hover:bg-blue-900">
															Copy
														</button>
													</div>
												</div>
											</div>
										</PopoverContent>
									</Popover>
								</div>
							</div>
						</div>
						{/* TradingView Widget */}
						<div className="mb-6">
							<iframe
								title={`${stock.name} TradingView`}
								src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${stock.symbol}&interval=D&hidesidetoolbar=1&symboledit=0&saveimage=0&toolbarbg=f1f3f6&studies=[]&theme=light&style=1&timezone=exchange&withdateranges=1&showpopupbutton=0&studies_overrides={}&overrides={}&enabled_features=[]&disabled_features=[]&locale=en`}
								style={{ width: '100%', height: '500px' }}
								allowTransparency={false}></iframe>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							{/* Left Column */}
							<div className="lg:col-span-2 space-y-6">
								<Card>
									<CardHeader className="pb-3">
										<CardTitle>Company Overview</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-gray-700">
											{stock.description}
										</p>
										<div className="mt-4 flex flex-wrap gap-4">
											<div className="flex items-center text-sm">
												<ExternalLink className="h-4 w-4 mr-2 text-blue-700" />
												<a
													title={`Company's Website for ${stock.name}`}
													href={stock.website}
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-700 hover:underline break-all">
													Company's Website
												</a>
											</div>
											<div className="flex items-center text-sm">
												<ExternalLink className="h-4 w-4 mr-2 text-blue-700" />
												<a
													title={`Yahoo Finance for ${stock.name}`}
													href={`https://finance.yahoo.com/quote/${stock.symbol}`}
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-700 hover:underline">
													Yahoo Finance
												</a>
											</div>
											<div className="flex items-center text-sm">
												<Newspaper className="h-4 w-4 mr-2 text-blue-700" />
												<a
													title={`Recent News for ${stock.name}`}
													href={`https://www.google.com/search?q=${stock.name}+stock+news&tbm=nws`}
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-700 hover:underline">
													Recent News
												</a>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Right Column */}
							<div className="space-y-6">
								<Card>
									<CardHeader className="pb-3">
										<CardTitle className="flex items-center">
											<BarChartIcon className="h-5 w-5 mr-2 text-gray-500" />
											Market & Financial Data
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
												<span className="text-gray-600">
													Current Price
												</span>
												<span className="font-medium">
													${stock.price.toFixed(2)}
												</span>
											</div>
											<Separator />
											<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
												<span className="text-gray-600">
													Market Cap
												</span>
												<span className="font-medium">
													{formatMarketCap(
														stock.marketCap
													)}
												</span>
											</div>
											<Separator />
											<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
												<span className="text-gray-600">
													PE Ratio
												</span>
												<span className="font-medium">
													{stock.pe.toFixed(2)}
												</span>
											</div>
											<Separator />
											<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
												<span className="text-gray-600">
													EPS
												</span>
												<span className="font-medium">
													$
													{stock.graham_props.eps.toFixed(
														2
													)}
												</span>
											</div>
											<Separator />
											<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
												<span className="text-gray-600">
													Return on Capital
												</span>
												<span className="font-medium">
													{formatPercentage(
														stock
															.magic_formula_props
															.roc
													)}
												</span>
											</div>
											<Separator />
											<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
												<span className="text-gray-600">
													Earning Yield
												</span>
												<span className="font-medium">
													{formatPercentage(
														stock
															.magic_formula_props
															.ey
													)}
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
							<Card className="bg-blue-50 border-blue-100 lg:col-span-3">
								<CardHeader className="pb-3">
									<CardTitle className="flex items-center text-blue-800">
										<Award className="h-5 w-5 mr-2 text-blue-700" />
										Value Comparison
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										<div>
											<span className="text-gray-600 block mb-1 sm:hidden">
												Benjamin Graham Value vs Current
												Price
											</span>
											<div className="h-48 sm:h-64 mt-2 sm:mt-4">
												<ValueBarChart stock={stock} />
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</main>
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
