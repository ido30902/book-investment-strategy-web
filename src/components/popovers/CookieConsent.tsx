import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CookieConsent = () => {
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		// Check if user has already made a choice
		const cookieConsent = localStorage.getItem('cookieConsent');
		if (cookieConsent === null) {
			// If no choice has been made, show the banner
			setIsVisible(true);
		}
	}, []);

	const acceptCookies = () => {
		localStorage.setItem('cookieConsent', 'accepted');
		setIsVisible(false);
	};

	const declineCookies = () => {
		localStorage.setItem('cookieConsent', 'declined');
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
			<div className="container mx-auto">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<div className="mb-4 md:mb-0 pr-4">
						<p>
							We use cookies to enhance your browsing experience
							and analyze our traffic. By clicking "Accept", you
							consent to our use of cookies. Learn more in our{' '}
							<a
								href="/privacy-policy"
								className="underline hover:text-blue-300"
								onClick={(e) => {
									e.preventDefault();
									navigate('/privacy-policy');
								}}>
								Privacy Policy
							</a>
							.
						</p>
					</div>
					<div className="flex space-x-4">
						<button
							onClick={declineCookies}
							className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
							Decline
						</button>
						<button
							onClick={acceptCookies}
							className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
							Accept
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CookieConsent;
