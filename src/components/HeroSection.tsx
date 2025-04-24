const HeroSection = () => {
	return (
		<section
			id="home"
			className="h-screen w-full relative overflow-hidden bg-gradient-to-b from-investment-blue to-blue-900">
			<div className="container mx-auto px-4 h-full flex flex-col justify-center relative">
				<div className="text-center relative z-10">
					<h1 className="text-5xl md:text-5xl lg:text-9xl font-bold mb-6 text-white">
						Investment{' '}
						<span className="text-investment-green">Book</span>{' '}
						Strategies
					</h1>
					<p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
						Explore and compare proven investment methodologies from
						legendary investors
					</p>
				</div>

				{/* Scroll Indicator */}
				<div className="absolute md:bottom-5 bottom-20 animate-bounce w-full flex justify-center text-center">
					<div className="flex flex-col items-center">
						<p className="text-gray-200 text-sm mb-2">
							Scroll down to learn more
						</p>
						<svg
							className="w-6 h-6 text-gray-200 animate-bounce"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 14l-7 7m0 0l-7-7m7 7V3"
							/>
						</svg>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
