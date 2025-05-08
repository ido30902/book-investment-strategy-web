import { Helmet } from 'react-helmet';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

const BestInvestingBooksToRead = () => {
	return (
		<>
			<Helmet>
				<title>
					Must-Read Investment Books for Every Serious Investor |
					Investment Book Strategies
				</title>
				<meta
					name="description"
					content="Discover essential investment literature that has shaped financial markets and investment strategies. A curated list of must-read investing books for serious investors."
				/>
				<meta
					name="keywords"
					content="best investing books, investment literature, must-read finance books, stock market books, investment strategy books"
				/>
				<link
					rel="canonical"
					href="https://investmentbookstrategy.com/blogs/best-investing-books-to-read"
				/>
				<script type="application/ld+json">
					{JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline:
							'Must-Read Investment Books for Every Serious Investor',
						description:
							'Discover essential investment literature that has shaped financial markets and investment strategies. A curated list of must-read investing books for serious investors.',
						image: 'https://investmentbookstrategy.com/images/blog/must-read-investing-books.jpg',
						author: {
							'@type': 'Organization',
							name: 'Investment Book Strategies',
						},
						publisher: {
							'@type': 'Organization',
							name: 'Investment Book Strategies',
							logo: {
								'@type': 'ImageObject',
								url: 'https://investmentbookstrategy.com/logo.png',
							},
						},
						datePublished: '2023-06-15',
						dateModified: '2023-06-15',
					})}
				</script>
			</Helmet>

			<Header />

			<main className="container mx-auto px-4 py-16 mt-16">
				<article className="max-w-4xl mx-auto">
					{/* Hero Section */}
					<div className="mb-12">
						<h1 className="text-4xl font-bold text-investment-blue mb-4">
							Must-Read Investment Books for Every Serious
							Investor
						</h1>
						<div className="flex items-center text-sm text-gray-500 mb-6">
							<time dateTime="2023-06-15">June 15, 2023</time>
							<span className="mx-2">•</span>
							<span>15 min read</span>
							<span className="mx-2">•</span>
							<span className="text-investment-blue bg-blue-50 px-2 py-1 rounded-full">
								Essential Reading
							</span>
						</div>
						<div className="aspect-w-16 aspect-h-9 mb-8">
							<img
								src="/images/blog/must-read-investing-books.jpg"
								alt="Classic investment literature collection arranged on a wooden desk"
								className="rounded-lg object-cover w-full h-full"
							/>
						</div>
					</div>

					{/* Table of Contents */}
					<div className="bg-gray-50 p-6 rounded-lg mb-10">
						<h2 className="text-xl font-bold mb-4">
							Table of Contents
						</h2>
						<nav>
							<ol className="list-decimal list-inside space-y-2">
								<li>
									<a
										href="#introduction"
										className="text-investment-blue hover:underline">
										Introduction to Advanced Investment
										Literature
									</a>
								</li>
								<li>
									<a
										href="#essential-books"
										className="text-investment-blue hover:underline">
										Essential Investment Books
									</a>
								</li>
								<li>
									<a
										href="#book-categories"
										className="text-investment-blue hover:underline">
										Books Categorized by Investment
										Philosophy
									</a>
								</li>
								<li>
									<a
										href="#classic-vs-contemporary"
										className="text-investment-blue hover:underline">
										Classic vs. Contemporary Perspectives
									</a>
								</li>
								<li>
									<a
										href="#practical-application"
										className="text-investment-blue hover:underline">
										How to Apply the Knowledge
									</a>
								</li>
								<li>
									<a
										href="#conclusion"
										className="text-investment-blue hover:underline">
										Conclusion
									</a>
								</li>
							</ol>
						</nav>
					</div>

					{/* Blog Content */}
					<div className="prose prose-lg max-w-none">
						<section id="introduction">
							<h2>
								Introduction to Advanced Investment Literature
							</h2>
							<p>
								For investors looking to deepen their
								understanding of markets, strategies, and
								financial theory, the right books serve as
								invaluable mentors. Unlike beginner texts that
								focus on fundamentals, advanced investment
								literature explores nuanced concepts, historical
								market behavior, and sophisticated strategies
								developed by the world's most successful
								investors.
							</p>
							<p>
								Whether you're an experienced investor refining
								your approach or an ambitious intermediate
								seeking to elevate your strategy, this curated
								collection of essential investment books offers
								profound insights that have stood the test of
								time. These works represent the collective
								wisdom of pioneers who have shaped modern
								investment thinking—lessons distilled from
								decades of market participation, academic
								research, and practical application.
							</p>
							<p>
								While some of these books present complex ideas,
								their enduring value lies in the timeless
								principles they illuminate—principles that
								remain relevant despite evolving market
								conditions and economic environments. As you
								explore these works, you'll develop not just
								technical knowledge but a philosophical
								framework for approaching investment decisions
								with clarity and confidence.
							</p>
						</section>

						<section id="essential-books">
							<h2>Essential Investment Books</h2>

							<div className="my-8 p-6 bg-blue-50 rounded-lg">
								<h3>
									1. "The Intelligent Investor" by Benjamin
									Graham
								</h3>
								<p>
									Often called the "bible of value investing,"
									Graham's masterpiece provides a
									comprehensive framework for investing with a
									margin of safety. Warren Buffett credits
									this book as the foundation of his
									investment philosophy.
								</p>
								<blockquote className="italic border-l-4 border-investment-blue pl-4 my-4">
									"The investor's chief problem—and even his
									worst enemy—is likely to be himself." —
									Benjamin Graham
								</blockquote>
								<p>
									<strong>Key concepts:</strong> Value
									investing, margin of safety, Mr. Market
									analogy, difference between investing and
									speculation, and defensive vs. enterprising
									investor strategies.
								</p>
							</div>

							<div className="my-8 p-6 bg-blue-50 rounded-lg">
								<h3>
									2. "Security Analysis" by Benjamin Graham
									and David Dodd
								</h3>
								<p>
									The more technical companion to "The
									Intelligent Investor," this comprehensive
									work delves deeper into the analytical
									methods for evaluating securities. It
									remains the foundational text for
									fundamental analysis.
								</p>
								<p>
									<strong>Key concepts:</strong> Intrinsic
									value, earnings power, balance sheet
									analysis, and the concept of lasting
									investments vs. speculative opportunities.
								</p>
							</div>

							<div className="my-8 p-6 bg-blue-50 rounded-lg">
								<h3>
									3. "Common Stocks and Uncommon Profits" by
									Philip Fisher
								</h3>
								<p>
									While Graham focused on quantitative
									analysis, Fisher emphasized qualitative
									factors and growth potential. His
									"scuttlebutt" method of research and focus
									on high-quality growth companies influenced
									Warren Buffett's evolution as an investor.
								</p>
								<blockquote className="italic border-l-4 border-investment-blue pl-4 my-4">
									"I don't want a lot of good investments; I
									want a few outstanding ones." — Philip
									Fisher
								</blockquote>
								<p>
									<strong>Key concepts:</strong> The 15 points
									to look for in a common stock, scuttlebutt
									method, and the importance of management
									quality.
								</p>
							</div>

							<div className="my-8 p-6 bg-blue-50 rounded-lg">
								<h3>4. "Margin of Safety" by Seth Klarman</h3>
								<p>
									This rare and highly sought-after book
									(often selling for thousands of dollars)
									outlines Klarman's risk-averse value
									investing approach. It focuses on avoiding
									permanent capital loss rather than
									maximizing gains.
								</p>
								<p>
									<strong>Key concepts:</strong> Absolute
									performance vs. relative performance,
									finding value in overlooked securities, and
									the importance of patience in investing.
								</p>
							</div>

							<div className="my-8 p-6 bg-blue-50 rounded-lg">
								<h3>
									5. "Fooled by Randomness" by Nassim Nicholas
									Taleb
								</h3>
								<p>
									This thought-provoking book explores the
									role of chance in markets and life. Taleb
									challenges conventional thinking about skill
									versus luck and highlights cognitive biases
									that affect investment decisions.
								</p>
								<blockquote className="italic border-l-4 border-investment-blue pl-4 my-4">
									"Probability is not a mere computation of
									odds on the dice or more complicated
									variants; it is the acceptance of the lack
									of certainty in our knowledge and the
									development of methods for dealing with our
									ignorance." — Nassim Nicholas Taleb
								</blockquote>
								<p>
									<strong>Key concepts:</strong> Survivorship
									bias, skewed distributions, and the fallacy
									of drawing conclusions from past
									performance.
								</p>
							</div>

							<div className="my-8 p-6 bg-blue-50 rounded-lg">
								<h3>
									6. "Competitive Strategy" by Michael Porter
								</h3>
								<p>
									Though not strictly an investment book,
									Porter's classic on competitive advantage
									provides essential frameworks for evaluating
									businesses—a critical skill for any stock
									picker or business analyst.
								</p>
								<p>
									<strong>Key concepts:</strong> The five
									forces affecting industry competition, three
									generic strategies for achieving competitive
									advantage, and value chain analysis.
								</p>
							</div>

							<div className="my-8 p-6 bg-blue-50 rounded-lg">
								<h3>
									7. "You Can Be a Stock Market Genius" by
									Joel Greenblatt
								</h3>
								<p>
									Despite its somewhat misleading title, this
									book offers sophisticated strategies for
									finding special situations in the market,
									including spin-offs, restructurings, and
									risk arbitrage.
								</p>
								<p>
									<strong>Key concepts:</strong> Special
									situation investing, spinoffs,
									recapitalizations, and merger securities.
								</p>
							</div>

							<div className="my-8 p-6 bg-blue-50 rounded-lg">
								<h3>
									8. "The Most Important Thing" by Howard
									Marks
								</h3>
								<p>
									Compiled from Marks' insightful memos to
									Oaktree Capital clients, this book
									emphasizes second-level thinking and the
									importance of understanding market cycles
									and investor psychology.
								</p>
								<blockquote className="italic border-l-4 border-investment-blue pl-4 my-4">
									"The most important thing is being attentive
									to cycles." — Howard Marks
								</blockquote>
								<p>
									<strong>Key concepts:</strong> Second-level
									thinking, market efficiency and
									inefficiency, the relationship between price
									and value, and understanding risk.
								</p>
							</div>

							<div className="my-8 p-6 bg-blue-50 rounded-lg">
								<h3>
									9. "Against the Gods: The Remarkable Story
									of Risk" by Peter L. Bernstein
								</h3>
								<p>
									This book traces the history of risk
									management from ancient times to modern
									portfolio theory, providing valuable context
									for understanding how we approach
									uncertainty in financial markets.
								</p>
								<p>
									<strong>Key concepts:</strong> The
									historical development of probability
									theory, risk management, and the
									relationship between risk and reward.
								</p>
							</div>

							<div className="my-8 p-6 bg-blue-50 rounded-lg">
								<h3>
									10. "The Essays of Warren Buffett: Lessons
									for Corporate America" edited by Lawrence
									Cunningham
								</h3>
								<p>
									This collection organizes Buffett's annual
									letters to Berkshire Hathaway shareholders
									by topic, providing a coherent view of his
									investment philosophy and business
									principles.
								</p>
								<blockquote className="italic border-l-4 border-investment-blue pl-4 my-4">
									"It's far better to buy a wonderful company
									at a fair price than a fair company at a
									wonderful price." — Warren Buffett
								</blockquote>
								<p>
									<strong>Key concepts:</strong> Owner's
									mentality, circle of competence, economic
									moats, and the importance of management
									integrity and capital allocation.
								</p>
							</div>
						</section>

						<section id="book-categories">
							<h2>Books Categorized by Investment Philosophy</h2>
							<p>
								Investment literature reflects diverse
								approaches to markets. Understanding these
								different philosophies can help you develop your
								own framework or identify which resonates with
								your temperament and goals.
							</p>

							<h3 className="text-2xl font-semibold mt-8 mb-4">
								Value Investing
							</h3>
							<ul>
								<li>
									<strong>
										"The Intelligent Investor" by Benjamin
										Graham
									</strong>{' '}
									- The foundational text for value investing
									principles.
								</li>
								<li>
									<strong>
										"Security Analysis" by Benjamin Graham
										and David Dodd
									</strong>{' '}
									- The technical companion focused on
									fundamental analysis.
								</li>
								<li>
									<strong>
										"Margin of Safety" by Seth Klarman
									</strong>{' '}
									- A modern interpretation of value investing
									with emphasis on risk management.
								</li>
								<li>
									<strong>
										"Value Investing: From Graham to Buffett
										and Beyond" by Bruce Greenwald
									</strong>{' '}
									- Bridges classical value investing with
									contemporary approaches.
								</li>
							</ul>

							<h3 className="text-2xl font-semibold mt-8 mb-4">
								Growth Investing
							</h3>
							<ul>
								<li>
									<strong>
										"Common Stocks and Uncommon Profits" by
										Philip Fisher
									</strong>{' '}
									- The classic text on quality growth
									investing.
								</li>
								<li>
									<strong>
										"One Up On Wall Street" by Peter Lynch
									</strong>{' '}
									- Emphasizes finding high-growth companies
									through everyday observations.
								</li>
								<li>
									<strong>
										"The Warren Buffett Way" by Robert
										Hagstrom
									</strong>{' '}
									- Analyzes Buffett's evolution from pure
									value to "value+growth" investing.
								</li>
							</ul>

							<h3 className="text-2xl font-semibold mt-8 mb-4">
								Quantitative Approaches
							</h3>
							<ul>
								<li>
									<strong>
										"Quantitative Value" by Wesley Gray and
										Tobias Carlisle
									</strong>{' '}
									- Combines quantitative rigor with value
									principles.
								</li>
								<li>
									<strong>
										"Expected Returns" by Antti Ilmanen
									</strong>{' '}
									- A comprehensive look at return sources
									across asset classes.
								</li>
								<li>
									<strong>
										"What Works on Wall Street" by James
										O'Shaughnessy
									</strong>{' '}
									- Empirical analysis of various investment
									strategies.
								</li>
							</ul>

							<h3 className="text-2xl font-semibold mt-8 mb-4">
								Behavioral Finance
							</h3>
							<ul>
								<li>
									<strong>
										"Thinking, Fast and Slow" by Daniel
										Kahneman
									</strong>{' '}
									- Explores cognitive biases affecting
									decision-making.
								</li>
								<li>
									<strong>
										"Fooled by Randomness" by Nassim
										Nicholas Taleb
									</strong>{' '}
									- Examines the role of chance in markets.
								</li>
								<li>
									<strong>
										"The Little Book of Behavioral
										Investing" by James Montier
									</strong>{' '}
									- Practical insights on avoiding behavioral
									pitfalls.
								</li>
							</ul>

							<h3 className="text-2xl font-semibold mt-8 mb-4">
								Market Philosophy and Economics
							</h3>
							<ul>
								<li>
									<strong>
										"The Black Swan" by Nassim Nicholas
										Taleb
									</strong>{' '}
									- The impact of rare, unpredictable events
									on markets and society.
								</li>
								<li>
									<strong>
										"Capital in the Twenty-First Century" by
										Thomas Piketty
									</strong>{' '}
									- Analysis of wealth and income inequality
									with investment implications.
								</li>
								<li>
									<strong>
										"The Alchemy of Finance" by George Soros
									</strong>{' '}
									- Introduces reflexivity theory and market
									dynamics.
								</li>
							</ul>
						</section>

						<section id="classic-vs-contemporary">
							<h2>Classic vs. Contemporary Perspectives</h2>
							<p>
								The investment canon includes both timeless
								classics and modern interpretations.
								Understanding both provides a well-rounded
								perspective on markets and investment
								strategies.
							</p>

							<h3 className="text-2xl font-semibold mt-6 mb-3">
								Classic Texts: Timeless Principles
							</h3>
							<p>
								Investment classics like Graham's "The
								Intelligent Investor" (1949) or Fisher's "Common
								Stocks and Uncommon Profits" (1958) emphasize
								enduring principles that have weathered multiple
								market cycles:
							</p>
							<ul>
								<li>
									Focus on fundamental business analysis
									rather than market timing
								</li>
								<li>
									The concept of margin of safety as risk
									management
								</li>
								<li>
									The importance of investor temperament and
									psychological discipline
								</li>
								<li>
									Long-term perspective as a competitive
									advantage
								</li>
								<li>
									Quality of management as a critical factor
									in business success
								</li>
							</ul>
							<p>
								These books were written in eras with different
								market structures, technologies, and economic
								conditions, yet their core insights remain
								remarkably relevant. The human psychology that
								drives markets has changed little, even as
								markets themselves have evolved.
							</p>

							<h3 className="text-2xl font-semibold mt-6 mb-3">
								Contemporary Works: Modern Applications
							</h3>
							<p>
								Modern investment books build upon classic
								foundations while addressing contemporary
								challenges and opportunities:
							</p>
							<ul>
								<li>
									The impact of technology and globalization
									on business models and competitive
									advantages
								</li>
								<li>
									Algorithmic trading and market
									microstructure
								</li>
								<li>
									Passive investing and factor-based
									strategies
								</li>
								<li>
									ESG (Environmental, Social, Governance)
									considerations
								</li>
								<li>
									Alternative data sources and analytical
									techniques
								</li>
							</ul>
							<p>
								Books like "The Most Important Thing" by Howard
								Marks or "Principles" by Ray Dalio combine
								timeless wisdom with lessons from recent market
								events like the Global Financial Crisis of
								2008-2009 or the COVID-19 market disruption.
							</p>

							<h3 className="text-2xl font-semibold mt-6 mb-3">
								Bridging the Gap
							</h3>
							<p>
								The most valuable approach for today's investor
								is to understand both perspectives. Classic
								texts provide the foundational principles and
								mental models, while contemporary works offer
								adaptation to current market realities. This
								synthesis allows investors to:
							</p>
							<ul>
								<li>
									Distinguish between truly permanent
									principles and outdated tactical advice
								</li>
								<li>
									Recognize patterns across different market
									environments
								</li>
								<li>
									Apply timeless wisdom to novel situations
								</li>
								<li>
									Avoid the trap of assuming "this time is
									different" while acknowledging genuine
									structural changes
								</li>
							</ul>
						</section>

						<section id="practical-application">
							<h2>How to Apply the Knowledge</h2>
							<p>
								Reading investment books is valuable only if the
								knowledge can be effectively applied. Here's how
								to translate literary wisdom into practical
								investment decisions:
							</p>

							<h3 className="text-2xl font-semibold mt-6 mb-3">
								Develop Your Investment Philosophy
							</h3>
							<p>
								After exploring various investment approaches,
								work to develop your own coherent philosophy
								that:
							</p>
							<ul>
								<li>
									Aligns with your temperament, time horizon,
									and goals
								</li>
								<li>
									Can be consistently applied through market
									cycles
								</li>
								<li>
									Incorporates risk management appropriate to
									your situation
								</li>
								<li>
									Defines clear criteria for investment
									decisions
								</li>
							</ul>
							<p>
								Document your philosophy in a personal
								investment policy statement. This serves as a
								touchstone during turbulent markets when
								emotions might otherwise cloud judgment.
							</p>

							<h3 className="text-2xl font-semibold mt-6 mb-3">
								Create Analytical Frameworks
							</h3>
							<p>
								Translate theoretical concepts into practical
								analytical tools:
							</p>
							<ul>
								<li>
									Develop checklists based on your preferred
									investment approach
								</li>
								<li>
									Create standardized analytical templates for
									evaluating investments
								</li>
								<li>
									Establish decision trees for different
									market scenarios
								</li>
								<li>
									Define your circle of competence clearly
								</li>
							</ul>
							<p>
								For example, a value investor might create a
								template that systematically evaluates financial
								strength, competitive position, management
								quality, and valuation metrics for potential
								investments.
							</p>

							<h3 className="text-2xl font-semibold mt-6 mb-3">
								Implement Through Portfolio Construction
							</h3>
							<p>Apply your philosophy at the portfolio level:</p>
							<ul>
								<li>
									Establish asset allocation guidelines based
									on your risk tolerance and goals
								</li>
								<li>
									Determine position sizing rules (e.g., Kelly
									criterion or fixed percentage approaches)
								</li>
								<li>Set rebalancing policies and triggers</li>
								<li>
									Create diversification parameters (sectors,
									geographies, factors)
								</li>
							</ul>
							<p>
								Remember that implementation should focus not
								just on individual security selection but on how
								holdings work together as a portfolio.
							</p>

							<h3 className="text-2xl font-semibold mt-6 mb-3">
								Maintain a Learning System
							</h3>
							<p>
								To continuously improve your investment
								approach:
							</p>
							<ul>
								<li>
									Keep an investment journal documenting
									decisions, rationales, and outcomes
								</li>
								<li>
									Conduct regular post-mortems on both
									successful and unsuccessful investments
								</li>
								<li>
									Create a personal knowledge management
									system for insights from your reading
								</li>
								<li>
									Develop a method for testing new ideas in a
									limited, risk-controlled fashion
								</li>
							</ul>
							<p>
								This systematic approach to learning ensures
								that your investment knowledge compounds over
								time, just as you hope your capital will.
							</p>

							<div className="p-6 bg-gray-100 my-8 rounded-lg">
								<h4 className="font-bold text-xl mb-2">
									Case Study: Applying Multiple Perspectives
								</h4>
								<p className="mb-4">
									Consider an investor evaluating a technology
									company using insights from different
									investment philosophies:
								</p>
								<ul className="list-disc pl-5 space-y-2">
									<li>
										<strong>
											Value perspective (Graham):
										</strong>{' '}
										Analyze balance sheet strength, earnings
										stability, and current valuation
										relative to intrinsic value.
									</li>
									<li>
										<strong>
											Quality growth perspective (Fisher):
										</strong>{' '}
										Assess R&D effectiveness, organizational
										excellence, and potential for market
										expansion.
									</li>
									<li>
										<strong>
											Competitive advantage lens
											(Buffett/Porter):
										</strong>{' '}
										Evaluate economic moat, network effects,
										and threats from substitutes or new
										entrants.
									</li>
									<li>
										<strong>
											Behavioral perspective
											(Kahneman/Taleb):
										</strong>{' '}
										Identify potential cognitive biases
										affecting market perception of the
										company.
									</li>
								</ul>
								<p className="mt-4">
									This multi-faceted analysis produces a more
									robust assessment than any single approach
									alone.
								</p>
							</div>
						</section>

						<section id="conclusion">
							<h2>Conclusion</h2>
							<p>
								The books outlined in this guide represent the
								collective wisdom of generations of investment
								thinkers. Their insights provide not just
								technical knowledge but a philosophical
								foundation for approaching markets with
								discipline, perspective, and intellectual
								honesty.
							</p>
							<p>
								While no single book holds all the answers,
								together they illuminate the multifaceted nature
								of successful investing. The most valuable
								lesson from this literature may be that
								investing excellence requires continuous
								learning—a lifelong commitment to refining one's
								mental models and adapting to changing
								circumstances while staying anchored to enduring
								principles.
							</p>
							<p>
								As you incorporate these books into your
								investment education, remember that knowledge
								alone is insufficient. Implementation,
								consistency, and psychological discipline
								ultimately determine investment outcomes. Let
								these works inform your approach, but recognize
								that the most important investment decisions
								will always involve your own judgment,
								temperament, and ability to think independently.
							</p>
							<div className="my-8 p-6 bg-gray-100 rounded-lg">
								<p className="font-bold">
									Expand your investment knowledge further:
								</p>
								<p>
									Explore our other specialized guides on
									investment literature:
								</p>
								<ul className="list-disc list-inside mt-2">
									<li>
										<a
											href="/blogs/investing-books-beginners"
											className="text-investment-blue hover:underline">
											Top Investment Books for Beginners:
											Start Your Financial Journey Right
										</a>
									</li>
									<li>
										<a
											href="/blogs/investing-strategy-beginners-guide"
											className="text-investment-blue hover:underline">
											Investment Strategies for Beginners:
											A Comprehensive Guide
										</a>
									</li>
									<li>
										<a
											href="/blogs/warren-buffett-recommended-books"
											className="text-investment-blue hover:underline">
											Warren Buffett's Bookshelf:
											Investment Books Recommended by the
											Oracle of Omaha
										</a>
									</li>
								</ul>
							</div>
						</section>
					</div>

					{/* Share Section */}
					<div className="border-t border-gray-200 pt-8 mt-12">
						<h3 className="text-xl font-bold mb-4">
							Share this article
						</h3>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-gray-500 hover:text-blue-600">
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-blue-400">
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true">
									<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
								</svg>
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-blue-800">
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									aria-hidden="true">
									<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
								</svg>
							</a>
						</div>
					</div>
				</article>
			</main>

			<Footer />
		</>
	);
};

export default BestInvestingBooksToRead;
