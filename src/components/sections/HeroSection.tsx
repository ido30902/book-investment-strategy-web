const HeroSection = () => {
	return (
		<section
			id="home"
			className="h-screen w-full relative overflow-hidden bg-gradient-to-br from-indigo-900 to-blue-800">
			<div className="absolute inset-0 opacity-20">
				<div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald-500 filter blur-3xl"></div>
				<div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-600 filter blur-3xl"></div>
			</div>
			<div className="container mx-auto px-4 h-full flex flex-col justify-center relative">
				<div className="text-center relative z-10">
					<h1 className="text-5xl md:text-5xl lg:text-9xl font-bold mb-6 text-white">
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
							Investment
						</span>{' '}
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
							Book
						</span>{' '}
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
							Strategies
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
						Explore and compare proven investment methodologies from
						legendary investors
					</p>
				</div>

				<div className="w-20 h-1 mx-auto bg-emerald-500 mb-8 animate-pulse"></div>
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
					What is the website for?
				</h2>
				<p className="text-lg text-white text-center mb-6  mx-auto">
					Investment Book Strategies from the best investors of all
					time. Compare methods and find the best one for you. Based
					on the books 'The Intelligent Investor', by Benjamin Graham,
					and 'The little book that beats the market', by Joel
					Greenblatt.
				</p>
			</div>
		</section>
	);
};

export default HeroSection;
