import React from 'react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

interface DisclaimerProps {
	children?: React.ReactNode;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ children }) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<button className="inline-flex items-center text-white hover:text-investment-blue-light focus:outline-none">
					{children || 'Disclaimer'}
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-80 p-4 text-sm">
				<div className="space-y-2">
					<h4 className="font-medium text-blue-900">
						Important Disclaimer
					</h4>
					<p>
						The information provided on this website is for
						educational purposes only and does not constitute
						financial advice.
					</p>
					<p>
						Past performance is not indicative of future results.
						All investments involve risk, including the possible
						loss of principal.
					</p>
					<p>
						Before making any investment decisions, please consult
						with a qualified financial advisor.
					</p>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default Disclaimer;
