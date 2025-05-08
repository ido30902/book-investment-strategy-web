// Utility functions for formatting table values
import { Stock } from '@/utils/stockData';
import { format } from 'date-fns';
// Format currency values
export const formatCurrency = (value: number): string => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}).format(value);
};

// Format market cap values (e.g., $1.2B, $450M)
export const formatMarketCap = (value: number): string => {
	if (value >= 1_000_000_000_000) {
		return `${formatCurrency(value / 1_000_000_000_000)}T`;
	} else if (value >= 1_000_000_000) {
		return `${formatCurrency(value / 1_000_000_000)}B`;
	} else if (value >= 1_000_000) {
		return `${formatCurrency(value / 1_000_000)}M`;
	} else if (value >= 1_000) {
		return `${formatCurrency(value / 1_000)}K`;
	} else {
		return `$${value.toLocaleString()}`;
	}
};

// Format percentage values
export function formatPercent(value: number): string {
	if (value === null || value === undefined) return '-';
	return `${(value * 100).toFixed(2)}%`;
}

// Format decimal values
export const formatDecimal = (value: number): string => {
	return new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
	}).format(value);
};

// Format P/E ratio to always show 2 decimal places
export const formatPERatio = (value: number): string => {
	return value.toFixed(2);
};

// Add helper for calculating and formatting the price to graham value
export const calculateValuation = (stock: Stock) => {
	const grahamValue = stock.graham_props.intrinsic_value;
	const price = stock.price;

	// Calculate percentage difference
	const percentDiff = ((grahamValue - price) / grahamValue) * 100;

	// If graham value is greater than price, the stock is undervalued
	if (grahamValue > price) {
		return {
			text: `Undervalued by ${Math.abs(percentDiff).toFixed(2)}%`,
			isUndervalued: true,
		};
	} else {
		return {
			text: `Overvalued by ${Math.abs(percentDiff).toFixed(2)}%`,
			isUndervalued: false,
		};
	}
};

export function formatNumber(value: number, decimals: number = 2): string {
	if (value === null || value === undefined) return '-';
	return value.toLocaleString(undefined, {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});
}

export function formatDate(date: string): string {
	const parsedDate = Date.parse(date);

	return format(parsedDate, 'MMMM do, yyyy');
}
