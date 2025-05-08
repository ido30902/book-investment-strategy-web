import { useState } from 'react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Blogs = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const blogPosts = [
		{
			id: 1,
			slug: 'investing-books-for-beginners',
			title: 'Top Investment Books for Beginners: Start Your Financial Journey Right',
			excerpt:
				'Discover the best books that simplify investment concepts for newcomers, helping you build a strong financial foundation.',
			publishDate: 'June 10, 2023',
			readTime: '12 min',
			category: 'Beginners',
			imageSrc: '/images/blog/beginners-investing-books.jpg',
			imageAlt: 'Stack of beginner investing books',
		},
		{
			id: 2,
			slug: 'best-investing-books-to-read',
			title: 'Must-Read Investment Books for Every Serious Investor',
			excerpt:
				'Explore essential investment literature that has shaped financial markets and investment strategies over decades.',
			publishDate: 'June 15, 2023',
			readTime: '15 min',
			category: 'Essential Reading',
			imageSrc: '/images/blog/must-read-investing-books.jpg',
			imageAlt: 'Classic investment literature collection',
		},
		{
			id: 3,
			slug: 'investing-strategy-beginners-guide',
			title: 'Investment Strategies for Beginners: A Comprehensive Guide',
			excerpt:
				'Learn fundamental investment strategies that are perfect for beginners looking to make their first market moves.',
			publishDate: 'June 22, 2023',
			readTime: '14 min',
			category: 'Strategy',
			imageSrc: '/images/blog/beginner-strategy-guide.jpg',
			imageAlt: 'Investment strategy flowchart for beginners',
		},
		{
			id: 4,
			slug: 'warren-buffett-recommended-books',
			title: "Warren Buffett's Bookshelf: Investment Books Recommended by the Oracle of Omaha",
			excerpt:
				"Discover the books that shaped Warren Buffett's investment philosophy and continue to influence his decisions.",
			publishDate: 'June 30, 2023',
			readTime: '13 min',
			category: 'Value Investing',
			imageSrc: '/images/blog/buffett-recommended-books.jpg',
			imageAlt: 'Warren Buffett with his favorite investment books',
		},
		{
			id: 5,
			slug: 'value-investing-essential-books',
			title: 'Value Investing: Essential Books for the Disciplined Investor',
			excerpt:
				'Explore the foundational texts that established value investing and the modern works that continue its legacy.',
			publishDate: 'July 5, 2023',
			readTime: '16 min',
			category: 'Value Investing',
			imageSrc: '/images/blog/value-investing-books.jpg',
			imageAlt: 'Collection of value investing literature',
		},
	];

	const filteredBlogs = blogPosts.filter(
		(blog) =>
			blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
			blog.category.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<>
			<Header />
			<main className="container mx-auto px-4 py-16 mt-16">
				<section className="mb-12">
					<h1 className="text-4xl font-bold text-investment-blue mb-4">
						Investment Literature Blog
					</h1>
					<p className="text-xl text-gray-600 max-w-3xl">
						Discover insights on investment books, strategies, and
						financial wisdom from renowned investors and authors.
					</p>
				</section>

				<section className="mb-12">
					<div className="relative max-w-md mb-8">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<Search className="w-5 h-5 text-gray-400" />
						</div>
						<Input
							type="search"
							placeholder="Search blogs by title, content, or category..."
							className="pl-10"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{filteredBlogs.map((blog) => (
							<article
								key={blog.id}
								className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg transform-gpu hover:-rotate-1 hover:scale-[1.02] perspective-1000">
								<a
									href={`/blogs/${blog.slug}`}
									className="block">
									<div className="aspect-w-16 aspect-h-9 bg-gray-200 relative group perspective-1000">
										<img
											src={blog.imageSrc}
											alt={blog.imageAlt}
											className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-[1.05]"
											onError={(e) => {
												e.currentTarget.src =
													'/images/blog/placeholder.jpg';
											}}
										/>
									</div>
									<div className="p-6">
										<div className="flex items-center justify-between mb-2">
											<span className="text-sm font-medium text-investment-blue px-2 py-1 rounded-full bg-blue-50">
												{blog.category}
											</span>
											<span className="text-sm text-gray-500">
												{blog.readTime} read
											</span>
										</div>
										<h2 className="text-xl font-bold mb-2 hover:text-investment-blue transition-colors">
											{blog.title}
										</h2>
										<p className="text-gray-600 mb-4 line-clamp-3">
											{blog.excerpt}
										</p>
										<div className="text-sm text-gray-500 flex items-center">
											<span>
												Published: {blog.publishDate}
											</span>
										</div>
									</div>
								</a>
							</article>
						))}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Blogs;
