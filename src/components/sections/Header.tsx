import { useState, useEffect } from 'react';

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
		{ name: 'Screener', href: '/#screener', title: 'Screener' },
		{ name: 'Comparison', href: '/#comparison', title: 'Comparison' },
		{ name: 'Books', href: '/#books', title: 'Books' },
	];

	//{ name: 'Blogs', href: '/blogs' },

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				window.location.pathname === '/' 
					? isScrolled 
						? 'bg-white/90 backdrop-blur-md shadow-sm text-transparent' 
						: 'hidden'
					: 'bg-white/90 backdrop-blur-md shadow-sm text-transparent'
			}`}>
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<a
						title="home"
						href="/"
						className="flex items-center md:flex-none">
						<div className="text-blue-800 font-bold text-2xl md:text-left text-center w-full md:w-auto">
							Investment{' '}
							<span className="text-emerald-500">Book</span>{' '}
							Strategies
						</div>
					</a>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex space-x-8">
						{navLinks.map((link) => (
							<a
								title={link.title}
								key={link.name}
								href={link.href}
								className="text-blue-800 hover:text-blue-800	 transition-colors font-medium">
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
