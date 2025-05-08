import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Stock } from '@/utils/stockData';
import { MagicFormulaTable } from '../tables/MagicFormulaTable';
import { GrahamTable } from '../tables/GrahamTable';
import { getLastUpdated } from '@/lib/api';
import { formatDate } from '@/lib/tableUtils';

const StockScreenerSection = ({ stocks }: { stocks: Stock[] }) => {
	const [lastUpdated, setLastUpdated] = useState<string>('');

	useEffect(() => {
		const fetchLastUpdated = async () => {
			try {
				const lastUpdatedData = await getLastUpdated();
				setLastUpdated(formatDate(lastUpdatedData.data.last_updated));
			} catch (error) {
				console.error('Error fetching last updated:', error);
			}
		};
		fetchLastUpdated();
	}, []);

	return (
		<section id="screener" className="py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">
					Investment Strategy Stock Screeners
				</h2>

				<div className="shadow-xl bg-white/80 backdrop-blur-sm rounded-lg p-6 border-none">
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
							<Card className="border-0 shadow-none bg-transparent">
								<CardHeader>
									<div className="flex flex-col md:flex-row md:items-center justify-between">
										<div>
											<CardTitle className="text-2xl md:text-3xl md:text-left text-center">
												Magic Formula Stock Screener
											</CardTitle>
											<CardDescription className="mt-2 text-center md:text-left">
												Based on Joel Greenblatt's
												investment strategy focusing on
												return on capital and earnings
												yield.
											</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<MagicFormulaTable stocks={stocks} />
								</CardContent>
							</Card>
						</TabsContent>

						{/* Graham Strategy Tab */}
						<TabsContent value="graham">
							<Card className="border-0 shadow-none bg-transparent">
								<CardHeader>
									<div className="flex flex-col md:flex-row md:items-center justify-between">
										<div>
											<CardTitle className="text-2xl md:text-3xl md:text-left text-center">
												Graham Strategy Stock Screener
											</CardTitle>
											<CardDescription className="mt-2 text-center md:text-left">
												Based on Benjamin Graham's value
												investing principles focusing on
												financially sound companies at
												bargain prices.
											</CardDescription>
										</div>
									</div>
								</CardHeader>
								<CardContent>
									<GrahamTable stocks={stocks} />
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
					<div className="mt-8 text-sm text-gray-500 italic text-center md:text-left">
						*Data updates once a week | **Data is provided by Yahoo
						Finance | ***Last updated: {lastUpdated}
					</div>
				</div>
			</div>
		</section>
	);
};

export default StockScreenerSection;
