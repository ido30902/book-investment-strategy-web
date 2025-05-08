import { Separator } from '@radix-ui/react-separator';
import { Button } from '@/components/ui/button';

// Amazon icon component created as SVG
const AmazonIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="#FF9900"
		viewBox="0 0 16 16">
		<path d="M10.813 11.968c.157.083.36.074.5-.05l.005.005a90 90 0 0 1 1.623-1.405c.173-.143.143-.372.006-.563l-.125-.17c-.345-.465-.673-.906-.673-1.791v-3.3l.001-.335c.008-1.265.014-2.421-.933-3.305C10.404.274 9.06 0 8.03 0 6.017 0 3.77.75 3.296 3.24c-.047.264.143.404.316.443l2.054.22c.19-.009.33-.196.366-.387.176-.857.896-1.271 1.703-1.271.435 0 .929.16 1.188.55.264.39.26.91.257 1.376v.432q-.3.033-.621.065c-1.113.114-2.397.246-3.36.67C3.873 5.91 2.94 7.08 2.94 8.798c0 2.2 1.387 3.298 3.168 3.298 1.506 0 2.328-.354 3.489-1.54l.167.246c.274.405.456.675 1.047 1.166ZM6.03 8.431C6.03 6.627 7.647 6.3 9.177 6.3v.57c.001.776.002 1.434-.396 2.133-.336.595-.87.961-1.465.961-.812 0-1.286-.619-1.286-1.533M.435 12.174c2.629 1.603 6.698 4.084 13.183.997.28-.116.475.078.199.431C13.538 13.96 11.312 16 7.57 16 3.832 16 .968 13.446.094 12.386c-.24-.275.036-.4.199-.299z" />
		<path d="M13.828 11.943c.567-.07 1.468-.027 1.645.204.135.176-.004.966-.233 1.533-.23.563-.572.961-.762 1.115s-.333.094-.23-.137c.105-.23.684-1.663.455-1.963-.213-.278-1.177-.177-1.625-.13l-.09.009q-.142.013-.233.024c-.193.021-.245.027-.274-.032-.074-.209.779-.556 1.347-.623" />
	</svg>
);

const BooksSection = () => {
	const books = [
		{
			id: 1,
			title: 'The Intelligent Investor',
			author: 'Benjamin Graham',
			cover: 'https://m.media-amazon.com/images/I/91+t0Di07FL._SL1500_.jpg',
			authorDescription:
				"Benjamin Graham (1894-1976), known as the 'father of value investing,' was an influential economist and professional investor. Warren Buffett, who was Graham's student, described him as the person who most influenced his investment approach.",
			bookDescription:
				"First published in 1949, 'The Intelligent Investor' remains the stock market bible for investors of all generations. Its timeless principles of value investing introduce readers to a practical approach that shields them from substantial error while teaching long-term strategy. The book emphasizes the importance of analyzing a company's fundamentals rather than following market trends, introducing concepts like 'margin of safety' and the distinction between investing and speculating.",
			keyFeatures: [
				'Value investing principles',
				'Defensive vs. enterprising strategies',
				'Margin of safety concept',
				'Fundamental analysis techniques',
			],
			amazonLink: 'https://amzn.to/3Sfm7mz',
			position: 'left',
		},
		{
			id: 2,
			title: 'The Little Book That Beats the Market',
			author: 'Joel Greenblatt',
			cover: 'https://m.media-amazon.com/images/I/51w-dw-0+ZS._SY445_SX342_.jpg',
			authorDescription:
				'Joel Greenblatt is a managing partner at Gotham Capital, an investment firm he founded, and a professor at Columbia Business School. He is renowned for achieving returns of 40% annualized over a twenty-year period from 1985 to 2005.',
			bookDescription:
				"Published in 2005, 'The Little Book That Beats the Market' presents Greenblatt's 'magic formula investing' in accessible terms for average investors. This straightforward approach combines two fundamental principles: buying good companies at bargain prices. Using clear examples and minimal jargon, Greenblatt demonstrates how his formula consistently outperforms market averages over the long term.",
			keyFeatures: [
				'Magic Formula Investing',
				'Return on capital focus',
				'Earnings yield analysis',
				'Systematic approach to stock selection',
			],
			amazonLink: 'https://amzn.to/4iK1Gcs',
			position: 'right',
		},
	];

	return (
		<div
			id="books"
			className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-slate-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
				<div className="space-y-3 mb-16">
					<h2 className="text-4xl md:text-6xl font-bold text-center text-blue-900">
						Get The Investment Books	
					</h2>
					<div className="w-20 h-1 mx-auto bg-emerald-500"></div>
					<p className="text-xl text-center text-blue-800 mt-6 max-w-3xl mx-auto">
						Timeless wisdom from the masters of value investing that
						can transform your approach to the markets.
					</p>
				</div>

				<div className="space-y-32">
					{books.map((book, index) => (
						<div key={book.id} className="w-full">
							<div
								className={`flex flex-col ${
									book.position === 'left'
										? 'md:flex-row'
										: 'md:flex-row-reverse'
								} gap-8 md:gap-16 items-center`}>
								<div className="w-full md:w-2/5 flex justify-center">
									<div className="relative group perspective-1000">
										<div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-emerald-500 rounded-lg transform rotate-3 scale-105 opacity-30 blur-sm group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300"></div>
										<img
											title={`Cover of ${book.title}`}
											src={book.cover}
											alt={`Cover of ${book.title}`}
											className="relative w-64 md:w-80 object-cover rounded-lg shadow-2xl transform group-hover:-rotate-3 transition-transform duration-300"
										/>
									</div>
								</div>

								<div className="w-full md:w-3/5">
									<div className="space-y-2">
										<h2 className="text-3xl md:text-4xl font-bold text-blue-900">
											{book.title}
										</h2>
										<p className="text-xl md:text-2xl text-emerald-600">
											by {book.author}
										</p>
									</div>

									<Separator className="my-6 bg-emerald-200" />

									<div>
										<h3 className="text-lg font-semibold text-blue-800 mb-2">
											About the Author
										</h3>
										<p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
											{book.authorDescription}
										</p>

										<h3 className="text-lg font-semibold text-blue-800 mb-2 mt-6">
											About the Book
										</h3>
										<p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
											{book.bookDescription}
										</p>

										<h3 className="text-lg font-semibold text-blue-800 mb-2 mt-6">
											Key Concepts
										</h3>
										<ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-700">
											{book.keyFeatures.map(
												(feature, i) => (
													<li
														key={i}
														className="flex items-center">
														<div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
														<span>{feature}</span>
													</li>
												)
											)}
										</ul>
									</div>

									<div className="mt-8">
										<Button
											size="lg"
											className="w-full md:w-auto px-8 py-6 text-lg bg-blue-800 hover:bg-blue-900 group text-white"
											asChild>
											<a
												title={`View ${book.title} on Amazon`}
												href={book.amazonLink}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center gap-2">
												<AmazonIcon />
												<span className="relative">
													View on{' '}
													<span className="text-[#FF9900]">
														Amazon
													</span>
													<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
												</span>
											</a>
										</Button>
									</div>
								</div>
							</div>

							{index < books.length - 1 && (
								<div className="pt-16 md:pt-24">
									<div className="flex items-center justify-center gap-4">
										<div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-200"></div>
										<div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
										<div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-200"></div>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BooksSection;
