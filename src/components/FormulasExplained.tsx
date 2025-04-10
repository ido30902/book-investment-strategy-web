const FormulasExplained = () => {
	return (
		<section id="formulas" className="py-20 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl md:text-4xl font-bold text-investment-blue mb-12 text-center">
					Formulas Explained
				</h2>
				<div className="space-y-16">
					{/* Graham Formula */}
					<div className="flex flex-col md:flex-row items-center gap-16">
						<div className="w-full md:w-3/5">
							<h3 className="text-2xl font-semibold mb-10">
								Benjamin Graham's Formula
							</h3>
							<div className="text-2xl md:text-4xl italic font-math text-center mb-8">
								V = (EPS × (8.5 + 2g) × 4.4)
								<hr className="w-5/6 mx-auto border-2 border-black my-4 md:w-1/2" />
								Y
							</div>
							<div className="space-y-6">
								<div className="text-m md:text-2xl-skew-x-6 text-gray-700">
									Where: V = expected value from growth
									formulas over next 7-10 years, EPS =
									trailing 12-month earnings per share, 8.5 =
									P/E base for a no-growth company, g =
									expected 7-10 year growth rate of EPS, 4.4 =
									average yield of AAA corporate bonds in
									1962, Y = current yield on AAA corporate
									bonds
								</div>
								<div className="text-m md:text-2xl-skew-x-6 text-gray-700">
									This formula provides a fundamental approach
									to valuing stocks by considering current
									earnings, future growth potential, and
									prevailing interest rates. The inclusion of
									bond yields helps adjust the valuation based
									on the current economic environment,
									offering a more comprehensive margin of
									safety in investments.
								</div>
							</div>
						</div>
						<div className="hidden md:block w-2/5">
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Benjamin_Graham_%281894-1976%29_portrait_on_23_March_1950.jpg"
								alt="Benjamin Graham"
								className="w-64 h-64 rounded-full object-cover mx-auto"
							/>
						</div>
					</div>

					{/* Magic Formula */}
					<div className="flex flex-col md:flex-row items-center gap-16">
						<div className="hidden md:block w-2/5">
							<img
								src="https://www.valueresearchonline.com/content-assets/images/35739_joel-greenblatt__w660__.jpg"
								alt="Joel Greenblatt"
								className="w-64 h-64 rounded-full object-cover mx-auto"
							/>
						</div>
						<div className="w-full md:w-3/5">
							<h3 className="text-2xl font-semibold mb-10">
								Joel Greenblatt's Magic Formula
							</h3>
							<div className="text-xl md:text-4xl italic font-math text-center mb-8">
								Magic Formula Score = Earnings Yield + Return on
								Capital
							</div>
							<div className="space-y-6">
								<div className="text-m md:text-2xl -skew-x-6 text-gray-700">
									Where: Earnings Yield = EBIT / Enterprise
									Value, Return on Capital = EBIT / (Net
									Working Capital + Net Fixed Assets)
								</div>
								<div className="text-m md:text-2xl-skew-x-6 text-gray-700">
									The Magic Formula combines two key metrics
									to identify companies that are both
									profitable and undervalued. It ranks stocks
									based on their earnings yield and return on
									capital to find the best investment
									opportunities.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FormulasExplained;
