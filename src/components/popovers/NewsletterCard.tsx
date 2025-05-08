import { updateNewsletter } from '@/lib/api';
import { useState } from 'react';

interface NewsletterCardProps {
	onClose: () => void;
}

const NewsletterCard = ({ onClose }: NewsletterCardProps) => {
	const [email, setEmail] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Add newsletter subscription logic here
		console.log('Email submitted:', email);
		updateNewsletter(email);
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<div className="text-center mb-6">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						Subscribe to Our Newsletter
					</h2>
					<p className="text-gray-600">
						Get the latest investment strategies and tips delivered
						to your inbox.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Your email address"
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
						Subscribe Now
					</button>
				</form>

				<p className="text-xs text-gray-500 mt-4 text-center">
					By subscribing, you agree to our terms and privacy policy.
					You can unsubscribe at any time.
				</p>
			</div>
		</div>
	);
};

export default NewsletterCard;
