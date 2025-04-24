const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-investment-blue-dark text-white py-8">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<div className="font-bold text-xl mb-2">
							Investment Book Strategies
						</div>
						<p className="text-gray-300 text-sm">
							Comparing proven investment methodologies
						</p>
					</div>

					<div className="text-center md:text-right text-sm">
						<p className="mb-2">
							&copy; {currentYear} WebHoldings. All rights
							reserved.
						</p>
						<p className="text-gray-300">
							This website is for educational purposes only. Not
							financial advice.
						</p>
					</div>
				</div>

				<div className="mt-8 pt-4 border-t border-gray-700 text-xs text-gray-400 text-center">
					<p>
						Book information and images are property of their
						respective owners. Market data is simulated and for
						illustrative purposes only.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
