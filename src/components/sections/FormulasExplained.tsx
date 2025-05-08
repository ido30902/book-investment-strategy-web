const FormulasExplained = () => {
	return (
		<section id="formulas" className="py-20 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-12 text-center">
					Formulas Explained
				</h2>
				<div className="space-y-16">
					{/* Graham Formula */}
					<h3 className="text-2xl font-semibold mb-10 text-center italic">
						Benjamin Graham's Formula
					</h3>
					<div className="flex flex-col md:flex-row items-center gap-16">
						<div className="w-full md:w-3/5">
							<div className="flex flex-row items-center gap-4">
								<div className="text-2xl md:text-4xl italic font-math text-center mb-8">
									V =
								</div>
								<div className="text-2xl md:text-4xl italic font-math text-center mb-8">
									(EPS × (8.5 + 2g) × 4.4)
									<hr className="w-5/6 mx-auto border-2 border-black my-4 md:w-8/9" />
									Y
								</div>
							</div>
							<div className="space-y-6">
								<div className="space-y-6">
									<div className="text-m md:text-2xl-skew-x-6 text-gray-700">
										<h4 className="font-semibold mb-2">
											Formula Components:
										</h4>
										<ul className="list-disc pl-6 space-y-2">
											<li>
												V = Expected value from growth
												formulas over next 7-10 years
											</li>
											<li>
												EPS = Trailing 12-month earnings
												per share
											</li>
											<li>
												8.5 = P/E base for a no-growth
												company
											</li>
											<li>
												g = Expected 7-10 year growth
												rate of EPS (We use 7% growth
												rate)
											</li>
											<li>
												4.4 = Average yield of AAA
												corporate bonds in 1962
											</li>
											<li>
												Y = Current yield on AAA
												corporate bonds
											</li>
										</ul>
									</div>
									<div className="text-m md:text-2xl-skew-x-6 text-gray-700">
										<h4 className="font-semibold mb-2">
											Formula Purpose:
										</h4>
										<p>
											This formula provides a fundamental
											approach to valuing stocks by
											considering:
										</p>
										<ul className="list-disc pl-6 space-y-2">
											<li>Current earnings</li>
											<li>Future growth potential</li>
											<li>Prevailing interest rates</li>
										</ul>
										<p className="mt-2">
											The inclusion of bond yields helps
											adjust the valuation based on the
											current economic environment,
											offering a more comprehensive margin
											of safety in investments.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="hidden md:block w-2/5">
							<img
								title="Benjamin Graham"
								src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Benjamin_Graham_%281894-1976%29_portrait_on_23_March_1950.jpg"
								alt="Benjamin Graham"
								className="w-64 h-64 rounded-full object-cover mx-auto"
							/>
							<div className="text-center mt-4">
								<p className="text-sm text-gray-600">
									Benjamin Graham (1894-1976)
								</p>
								<p className="text-sm text-gray-600">
									Father of Value Investing
								</p>
								<p className="text-sm text-gray-600">
									Author of "The Intelligent Investor"
								</p>
							</div>
						</div>
					</div>

					{/* Magic Formula */}
					<h3 className="text-2xl font-semibold mb-10 text-center italic">
						Joel Greenblatt's Magic Formula
					</h3>
					<div className="flex flex-col md:flex-row items-center gap-16">
						<div className="hidden md:block w-2/5">
							<img
								title="Joel Greenblatt"
								src="https://www.valueresearchonline.com/content-assets/images/35739_joel-greenblatt__w660__.jpg"
								alt="Joel Greenblatt"
								className="w-64 h-64 rounded-full object-cover mx-auto"
							/>
							<div className="text-center mt-4">
								<p className="text-sm text-gray-600">
									Joel Greenblatt
								</p>
								<p className="text-sm text-gray-600">
									Founder of Magic Formula Investing
								</p>
								<p className="text-sm text-gray-600">
									Author of "The Little Book That Beats the
									Market"
								</p>
							</div>
						</div>
						<div className="w-full md:w-3/5">
							<div className="text-xl md:text-4xl italic font-math text-center mb-8">
								S = Earnings Yield + Return on Capital
							</div>
							<div className="space-y-6">
								<div className="text-m md:text-2xl-skew-x-6 text-gray-700">
									<h4 className="font-semibold mb-2">
										Formula Components:
									</h4>
									<ul className="list-disc pl-4 space-y-2">
										<li>S = Magic Formula Score</li>
										<li>
											Earnings Yield = EPS / Stock Price
										</li>
										<li>
											Return on Capital = EBIT / (Net
											Working Capital + Net Fixed Assets)
										</li>
									</ul>
								</div>
								<div className="text-m md:text-2xl-skew-x-6 text-gray-700">
									<h4 className="font-semibold mb-2">
										How It Works:
									</h4>
									<p>
										The Magic Formula combines two key
										metrics to identify companies that are
										both profitable and undervalued. It
										ranks stocks based on their earnings
										yield and return on capital to find the
										best investment opportunities.
									</p>
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
