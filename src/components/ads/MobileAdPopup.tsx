import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const MobileAdPopup = () => {
	const [showAd, setShowAd] = useState(false);

	useEffect(() => {
		// Show ad after 5 seconds
		const timer = setTimeout(() => {
			setShowAd(true);
		}, 2500);

		return () => clearTimeout(timer);
	}, []);

	// Load Google Ads script
	useEffect(() => {
		const script = document.createElement('script');
		script.src =
			'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8429293774791012';
		script.async = true;
		script.crossOrigin = 'anonymous';
		document.head.appendChild(script);

		return () => {
			// Clean up script on unmount
			try {
				document.head.removeChild(script);
			} catch (e) {
				console.error('Error removing Google Ads script:', e);
			}
		};
	}, []);

	// Initialize ad
	useEffect(() => {
		if (showAd && typeof window !== 'undefined') {
			try {
				// Add proper TypeScript definition for adsbygoogle
				(window as any).adsbygoogle = (window as any).adsbygoogle || [];
				(window as any).adsbygoogle.push({});
			} catch (e) {
				console.error('Error initializing Google ad:', e);
			}
		}
	}, [showAd]);

	if (!showAd) return null;

	return (
		<div className="fixed inset-0 bg-white z-50">
			<div className="flex justify-between items-center p-4">
				<span className="text-xs text-gray-500">Advertisement</span>
				<button
					onClick={() => setShowAd(false)}
					className="text-gray-500 hover:text-gray-700">
					<X size={18} />
				</button>
			</div>
			<div className="flex justify-center items-center h-[calc(100vh-48px)]">
				{/* Google Ad Container */}
				<ins
					className="adsbygoogle"
					style={{ display: 'block', width: '100%', height: '100%' }}
					data-ad-client="ca-pub-8429293774791012"
					data-ad-format="auto"
					data-full-width-responsive="true"
					data-ad-slot="mobile-popup"
				/>
			</div>
		</div>
	);
};

export default MobileAdPopup;
