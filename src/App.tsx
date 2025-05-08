import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import StockDetail from './pages/StockDetail';
import Blogs from './pages/Blogs';
import InvestingBooksForBeginners from './pages/blogs/investing-books-beginners';
import BestInvestingBooksToRead from './pages/blogs/best-investing-books-to-read';
import InvestingStrategyBeginnersGuide from './pages/blogs/investing-strategy-beginners-guide';
import WarrenBuffettRecommendedBooks from './pages/blogs/warren-buffett-recommended-books';
import ValueInvestingEssentialBooks from './pages/blogs/value-investing-essential-books';
import PrivacyPolicy from './pages/privacy-policy';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="/stock/:symbol" element={<StockDetail />} />
					<Route path="/privacy-policy" element={<PrivacyPolicy />} />
					{/*<Route path="/blogs" element={<Blogs />} />*/}

					{/* Blogs 
					<Route
						path="/blogs/investing-books-for-beginners"
						element={<InvestingBooksForBeginners />}
					/>
					<Route
						path="/blogs/best-investing-books-to-read"
						element={<BestInvestingBooksToRead />}
					/>
					<Route
						path="/blogs/investing-strategy-beginners-guide"
						element={<InvestingStrategyBeginnersGuide />}
					/>
					<Route
						path="/blogs/warren-buffett-recommended-books"
						element={<WarrenBuffettRecommendedBooks />}
					/>
					<Route
						path="/blogs/value-investing-essential-books"
						element={<ValueInvestingEssentialBooks />}
					/>
					*/}
					{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
