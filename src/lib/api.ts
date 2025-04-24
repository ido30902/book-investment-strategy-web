import axios from 'axios';

const url = 'https://investmentbookstrategy.com/api/stocks';

const headers = {
	'Content-Type': 'application/json',
};

export const getStocks = async () => {
	try {
		const response = await axios.get(url, { headers });
		return response.data;
	} catch (error) {
		console.error('Error fetching stocks:', error);
		throw error;
	}
};

export const getStocksWithLimit = async (limit: number) => {
	try {
		const response = await axios.get(`${url}?limit=${limit}`, { headers });
		return response.data;
	} catch (error) {
		console.error('Error fetching stocks:', error);
		throw error;
	}
};

export const getTopMagicFormulaStocks = async (limit: number) => {
	try {
		const response = await axios.get(
			`${url}/top-magic-formula?limit=${limit}`,
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching top magic formula stocks:', error);
		throw error;
	}
};

export const getTopGrahamStocks = async (limit: number) => {
	try {
		const response = await axios.get(`${url}/top-graham?limit=${limit}`, {
			headers,
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching top graham stocks:', error);
		throw error;
	}
};

export const getStockBySymbol = async (symbol: string) => {
	try {
		const response = await axios.get(`${url}/${symbol}`, {
			headers,
		});
		return response.data;
	} catch (error) {
		console.error(`Error fetching stock ${symbol}:`, error);
		throw error;
	}
};
