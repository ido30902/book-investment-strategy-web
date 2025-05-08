import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { formatMarketCap } from '@/lib/tableUtils';

interface MarketCapRangeSliderProps {
	min: number;
	max: number;
	value: [number, number];
	onChange: (value: [number, number]) => void;
}

// Market cap tiers in dollars
const marketCapTiers = [
	0, // $0
	100_000_000, // $100M
	1_000_000_000, // $1B
	10_000_000_000, // $10B
	100_000_000_000, // $100B
	1_000_000_000_000, // $1T
	10_000_000_000_000, // $10T
];

export function MarketCapRangeSlider({
	min,
	max,
	value,
	onChange,
}: MarketCapRangeSliderProps) {
	const [open, setOpen] = useState(false);
	const [tempValue, setTempValue] = useState<[number, number]>(value);

	// Update local state when prop value changes
	React.useEffect(() => {
		setTempValue(value);
	}, [value]);

	// Convert market cap dollar amount to logarithmic scale for slider
	const logScale = (value: number) => {
		if (value <= 0) return 0;
		return Math.log10(value);
	};

	// Convert logarithmic scale back to dollar amount
	const fromLogScale = (value: number) => {
		return Math.pow(10, value);
	};

	// Map dollar amounts to log scale for the slider
	const logMin = logScale(min);
	const logMax = logScale(max);
	const logValue: [number, number] = [
		logScale(tempValue[0]),
		logScale(tempValue[1]),
	];

	const handleSliderChange = (newValues: number[]) => {
		// Convert log scale values back to dollar amounts
		const newDollarValues: [number, number] = [
			fromLogScale(newValues[0]),
			fromLogScale(newValues[1]),
		];
		setTempValue(newDollarValues);
	};

	const handleApply = () => {
		onChange(tempValue);
		setOpen(false);
	};

	const handleReset = () => {
		setTempValue([min, max]);
		onChange([min, max]);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className="h-8 border border-gray-200 flex gap-2">
					<SlidersHorizontal className="h-4 w-4" />
					<span>
						{formatMarketCap(value[0])} -{' '}
						{formatMarketCap(value[1])}
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 bg-white/80 backdrop-blur-sm border-none">
				<div className="space-y-6">
					<h4 className="font-medium leading-none">
						Market Cap Range
					</h4>
					<div className="space-y-2">
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>{formatMarketCap(tempValue[0])}</span>
							<span>{formatMarketCap(tempValue[1])}</span>
						</div>
						<Slider
							value={logValue}
							min={logMin}
							max={logMax}
							step={0.1}
							onValueChange={handleSliderChange}
							className="py-4 [&_[role=slider]]:bg-white [&_[role=slider]]:border-2 [&_[role=slider]]:border-blue-800"
						/>
						<div className="flex justify-between pt-3">
							<Button
								variant="outline"
								size="sm"
								onClick={handleReset}
								className="border border-gray-200 hover:bg-red-500 hover:text-white">
								Reset
							</Button>
							<Button
								size="sm"
								onClick={handleApply}
								className="bg-blue-800 hover:bg-blue-900 text-white">
								Apply
							</Button>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
