import { useEffect } from 'react';

const DesktopSideAds = () => {
	// Load Google Ads script
	useEffect(() => {
		const script = document.createElement('script');
		script.src =
			'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
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

	// Initialize ads
	useEffect(() => {
		if (typeof window !== 'undefined') {
			try {
				(window.adsbygoogle = window.adsbygoogle || []).forEach((ad) =>
					ad.push({})
				);
			} catch (e) {
				console.error('Error initializing Google ads:', e);
			}
		}
	}, []);

	return (
		<>
			{/* Left sidebar ad */}
			<div className="fixed left-2 top-1/4 w-[160px] hidden xl:block z-10">
				<div className="bg-gray-100 p-1 rounded">
					<span className="text-xs text-gray-500 block mb-1">
						Advertisement
					</span>
					<div className="flex justify-center items-center min-h-[600px]">
						<ins
							className="adsbygoogle"
							style={{
								display: 'block',
								width: '160px',
								height: '600px',
							}}
							data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
							data-ad-slot="XXXXXXXXXX"
						/>
					</div>
				</div>
			</div>

			{/* Right sidebar ad */}
			<div className="fixed right-2 top-1/4 w-[160px] hidden xl:block z-10">
				<div className="bg-gray-100 p-1 rounded">
					<span className="text-xs text-gray-500 block mb-1">
						Advertisement
					</span>
					<div className="flex justify-center items-center min-h-[600px]">
						<ins
							className="adsbygoogle"
							style={{
								display: 'block',
								width: '160px',
								height: '600px',
							}}
							data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
							data-ad-slot="XXXXXXXXXX"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default DesktopSideAds;
