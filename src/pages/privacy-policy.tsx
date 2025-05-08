import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

const PrivacyPolicy = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-grow py-12">
				<div className="container mx-auto px-4 max-w-4xl">
					<h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

					<div className="space-y-6 text-gray-700">
						<section>
							<h2 className="text-xl font-semibold mb-3">
								Introduction
							</h2>
							<p>
								This Privacy Policy outlines how Investment Book
								Strategies ("we", "our", or "us") collects,
								uses, and protects your information when you
								visit our website.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-semibold mb-3">
								Investment Methods Disclaimer
							</h2>
							<p>
								<strong>Important:</strong> The investment
								methods, strategies, formulas, and approaches
								displayed on this website are NOT the property
								of the website owner. These methods are derived
								from published investment books and publicly
								available resources. We do not claim ownership
								of these methodologies.
							</p>
							<p className="mt-2">
								This website serves as an educational platform
								that compares and analyzes various investment
								approaches from published literature. The
								website owner makes no claim to have invented or
								developed these investment strategies. All
								credit belongs to the original authors and
								publishers.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-semibold mb-3">
								Information We Collect
							</h2>
							<p>
								We collect information that you provide directly
								to us, such as when you subscribe to our
								newsletter, and information we collect
								automatically when you visit our website,
								including:
							</p>
							<ul className="list-disc pl-6 mt-2">
								<li>
									Log data (IP address, browser type, pages
									visited)
								</li>
								<li>Device information</li>
								<li>Cookies and similar technologies</li>
							</ul>
						</section>

						<section>
							<h2 className="text-xl font-semibold mb-3">
								Cookies
							</h2>
							<p>
								We use cookies to enhance your browsing
								experience, analyze site traffic, and
								personalize content. You can choose to accept or
								decline cookies. If you choose to decline
								cookies, some features of the website may not
								function as intended.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-semibold mb-3">
								How We Use Your Information
							</h2>
							<p>We use the information we collect to:</p>
							<ul className="list-disc pl-6 mt-2">
								<li>
									Provide, maintain, and improve our services
								</li>
								<li>Send you technical notices and updates</li>
								<li>Respond to your comments and questions</li>
								<li>
									Understand how users interact with our
									website
								</li>
								<li>
									Detect, investigate, and prevent fraudulent
									transactions and other illegal activities
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-xl font-semibold mb-3">
								Data Sharing
							</h2>
							<p>
								We do not sell your personal information. We may
								share your information with third-party service
								providers who help us operate our website and
								provide services.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-semibold mb-3">
								Changes to This Policy
							</h2>
							<p>
								We may update this privacy policy from time to
								time. We will notify you of any changes by
								posting the new policy on this page.
							</p>
						</section>

						<section>
							<h2 className="text-xl font-semibold mb-3">
								Contact Us
							</h2>
							<p>
								If you have any questions about this Privacy
								Policy, please contact us at info@axiobm.com.
							</p>
						</section>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default PrivacyPolicy;
