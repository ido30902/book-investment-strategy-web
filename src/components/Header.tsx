import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navLinks = [
		{ name: 'Home', href: '/#home' },
		{ name: 'Books', href: '/#books' },
		{ name: 'Comparison', href: '/#comparison' },
		{ name: 'Screener', href: '/#screener' },
	];

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-white/90 backdrop-blur-md shadow-sm'
					: 'bg-transparent'
			}`}>
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<a href="#home" className="flex items-center md:flex-none">
						<div className="text-investment-blue font-bold text-2xl md:text-left text-center w-full md:w-auto">
							Investment <span className="">Book</span> Strategies
						</div>
					</a>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex space-x-8">
						{navLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								className="text-investment-blue hover:text-investment-blue transition-colors font-medium">
								{link.name}
							</a>
						))}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
