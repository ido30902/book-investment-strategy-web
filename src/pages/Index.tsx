import HeroSection from '@/components/sections/HeroSection';
import Header from '@/components/sections/Header';
import BooksSection from '@/components/sections/BooksSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import StockScreenerSection from '@/components/sections/StockScreenerSection';
import Footer from '@/components/sections/Footer';
import MobileAdPopup from '@/components/ads/MobileAdPopup';
import DesktopSideAds from '@/components/ads/DesktopSideAds';
import NewsletterCard from '@/components/popovers/NewsletterCard';
import CookieConsent from '@/components/popovers/CookieConsent';
import { useEffect, useState } from 'react';
import { getStocks } from '@/lib/api';
import FormulasExplained from '@/components/sections/FormulasExplained';
import Loading from '@/components/sections/Loading';

const Index = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [stocks, setStocks] = useState([]);
	const [showNewsletter, setShowNewsletter] = useState(false);

	useEffect(() => {
		const fetchStocks = async () => {
			try {
				const response = await getStocks();
				setStocks(response.data);
			} catch (error) {
				console.error('Error fetching stocks:', error);
			}
		};

		fetchStocks();
	}, []);

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

	useEffect(() => {
		// Show newsletter popup after a delay, but only if not previously closed in this session
		const hasClosedNewsletter = sessionStorage.getItem('newsletterClosed');

		if (!hasClosedNewsletter) {
			const timer = setTimeout(() => {
				setShowNewsletter(true);
			}, 6000); // 6 seconds delay

			return () => clearTimeout(timer);
		}
	}, []);

	const closeNewsletter = () => {
		setShowNewsletter(false);
		// Store in session storage that user has closed the newsletter
		sessionStorage.setItem('newsletterClosed', 'true');
	};

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-grow relative">
				{/*{isMobile ? <MobileAdPopup /> : <DesktopSideAds />}*/}
				{/*{showNewsletter && <NewsletterCard onClose={closeNewsletter} />}*/}
				<HeroSection />
				{stocks.length > 0 ? (
					<StockScreenerSection stocks={stocks} />
				) : (
					<Loading />
				)}
				<ComparisonSection />
				<FormulasExplained />
				<BooksSection />
			</main>
			<Footer />
			<CookieConsent />
		</div>
	);
};

export default Index;
