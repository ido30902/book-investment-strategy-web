import React, { useState, useEffect } from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	LabelList,
	ResponsiveContainer,
} from 'recharts';
import { Stock } from '@/utils/stockData';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CircleAlertIcon } from 'lucide-react';

interface ValueBarChartProps {
	stock: Stock;
}

const ValueBarChart = ({ stock }: ValueBarChartProps) => {
	// State to track viewport width for responsive text sizing
	const [isMobile, setIsMobile] = useState(false);

	// Check viewport width on mount and when window resizes
	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Initial check
		checkIfMobile();

		// Add resize listener
		window.addEventListener('resize', checkIfMobile);

		// Cleanup
		return () => window.removeEventListener('resize', checkIfMobile);
	}, []);

	// Check if stock is valid and has all required properties
	if (
		!stock ||
		!stock.graham_props ||
		typeof stock.graham_props.intrinsic_value === 'undefined'
	) {
		return (
			<Alert className="my-4">
				<CircleAlertIcon className="h-4 w-4" />
				<AlertDescription>
					Stock valuation data not available.
				</AlertDescription>
			</Alert>
		);
	}

	try {
		// Calculate if undervalued and the difference
		const isUndervalued: boolean =
			stock.price < stock.graham_props.intrinsic_value;
		const difference: number = Math.abs(
			stock.graham_props.intrinsic_value - stock.price
		);
		const percentageDiff: string = (
			(difference / stock.graham_props.intrinsic_value) *
			100
		).toFixed(1);

		// Define chart data type
		interface ChartDataItem {
			name: string;
			price: number;
			graham: number;
			difference: number;
		}

		// Create data for chart
		const data: ChartDataItem[] = [
			{
				name: stock.symbol,
				price: isUndervalued ? stock.price : 0,
				graham: !isUndervalued ? stock.graham_props.intrinsic_value : 0,
				difference: difference,
			},
		];

		// Custom label for the difference part
		const renderDifferenceLabel = (props: any): React.ReactNode => {
			const { x, y, width, height } = props;
			// Only render if width is large enough for text
			if (width < 50) return null;

			return (
				<text
					x={x + width / 2}
					y={y + height / 2}
					fill={isUndervalued ? '#065f46' : '#fff'}
					textAnchor="middle"
					dominantBaseline="middle"
					fontSize={isMobile ? 10 : 14}
					fontWeight="bold">
					{isUndervalued ? 'Graham Value: $' : 'Price: $'}
					{isUndervalued
						? stock.graham_props.intrinsic_value.toFixed(2)
						: stock.price.toFixed(2)}
				</text>
			);
		};

		// Custom label for the price/graham value
		const renderValueLabel = (props: any): React.ReactNode => {
			const { x, y, width, height, value } = props;

			// For very small segments, don't show text
			if (width < 40) return null;

			return (
				<text
					x={x + width / 2}
					y={y + height / 2}
					fill="#fff"
					textAnchor="middle"
					dominantBaseline="middle"
					fontSize={isMobile ? 10 : 14}
					fontWeight="bold">
					{isUndervalued ? 'Price: $' : 'Graham Value: $'}
					{typeof value === 'number' ? value.toFixed(2) : value}
				</text>
			);
		};

		return (
			<div className="w-full h-full">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						layout="vertical"
						data={data}
						margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
						<XAxis
							type="number"
							domain={[
								0,
								Math.round(
									Math.max(
										stock.price,
										stock.graham_props.intrinsic_value
									) * 1.2
								),
							]}
							tickFormatter={(value) => `$${value}`}
							fontSize={isMobile ? 10 : 12}
						/>
						<YAxis
							dataKey="name"
							type="category"
							width={80}
							fontSize={isMobile ? 11 : 14}
							fontWeight="bold"
						/>

						{isUndervalued ? (
							// Undervalued case
							<>
								<Bar dataKey="price" stackId="a" fill="#10b981">
									<LabelList
										dataKey="price"
										content={renderValueLabel}
										style={{ textAlign: 'center' }}
									/>
								</Bar>
								<Bar
									dataKey="difference"
									stackId="a"
									fill="#d1fae5">
									<LabelList
										dataKey="difference"
										content={renderDifferenceLabel}
										style={{ textAlign: 'center' }}
									/>
								</Bar>
							</>
						) : (
							// Overvalued case
							<>
								<Bar
									dataKey="graham"
									stackId="a"
									fill="#AD1906FF">
									<LabelList
										dataKey="graham"
										content={renderValueLabel}
										style={{ textAlign: 'center' }}
									/>
								</Bar>
								<Bar
									dataKey="difference"
									stackId="a"
									fill="#ef4444">
									<LabelList
										dataKey="difference"
										content={renderDifferenceLabel}
										style={{ textAlign: 'center' }}
									/>
								</Bar>
							</>
						)}
					</BarChart>
				</ResponsiveContainer>
				{/* Text below the chart showing undervalued/overvalued status */}
				<div
					className={`mb-4 text-left ${
						isUndervalued ? 'text-green-600' : 'text-red-600'
					}`}>
					<span className="text-base sm:text-lg md:text-xl font-bold">
						{isUndervalued ? 'Undervalued' : 'Overvalued'} by{' '}
						{percentageDiff}%
					</span>
				</div>
			</div>
		);
	} catch (error) {
		console.error('Error rendering ValueBarChart:', error);
		return (
			<Alert className="my-4">
				<CircleAlertIcon className="h-4 w-4" />
				<AlertDescription>
					Error rendering chart. Please try again later.
				</AlertDescription>
			</Alert>
		);
	}
};

export default ValueBarChart;
