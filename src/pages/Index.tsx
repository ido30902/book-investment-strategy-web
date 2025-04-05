import HeroSection from '@/components/HeroSection';
import Header from '@/components/Header';
import BooksSection from '@/components/BooksSection';
import ComparisonSection from '@/components/ComparisonSection';
import StockScreenerSection from '@/components/StockScreenerSection';
import Footer from '@/components/Footer';
import MobileAdPopup from '@/components/ads/MobileAdPopup';
import DesktopSideAds from '@/components/ads/DesktopSideAds';
import { useEffect, useState } from 'react';
import { getStocks, getTopMagicFormulaStocks } from '@/lib/api';

const Index = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [stocks, setStocks] = useState([]);

	useEffect(() => {
		const fetchStocks = async () => {
			try {
				const response = await getTopMagicFormulaStocks(50);
				setStocks(response.data);
			} catch (error) {
				console.error('Error fetching stocks:', error);
			}
		};

		fetchStocks();
	}, []);

	console.log(stocks);

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
			<Header />
			<main className="flex-grow relative">
				{isMobile ? <MobileAdPopup /> : <DesktopSideAds />}
				<HeroSection />
				<BooksSection />
				<ComparisonSection />
				<StockScreenerSection stocks={stocks} />
			</main>
			<Footer />
		</div>
	);
};

export default Index;
