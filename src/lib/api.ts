import axios from 'axios';

const url = 'https://investmentbookstrategy.com/api/';

const headers = {
	'Content-Type': 'application/json',
};

export const getStocks = async () => {
	try {
		const response = await axios.get(`${url}/stocks`, { headers });
		return response.data;
	} catch (error) {
		console.error('Error fetching stocks:', error);
		throw error;
	}
};

export const getStocksWithLimit = async (limit: number) => {
	try {
		const response = await axios.get(`${url}stocks/?limit=${limit}`, {
			headers,
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching stocks:', error);
		throw error;
	}
};

export const getTopMagicFormulaStocks = async (limit: number) => {
	try {
		const response = await axios.get(
			`${url}stocks/top-magic-formula?limit=${limit}`,
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
		const response = await axios.get(
			`${url}stocks/top-graham?limit=${limit}`,
			{
				headers,
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching top graham stocks:', error);
		throw error;
	}
};

export const getStockBySymbol = async (symbol: string) => {
	try {
		const response = await axios.get(`${url}stocks/${symbol}`, {
			headers,
		});
		return response.data;
	} catch (error) {
		console.error(`Error fetching stock ${symbol}:`, error);
		throw error;
	}
};

export const getLastUpdated = async () => {
	try {
		const response = await axios.get(`${url}last-updated`, { headers });
		return response.data;
	} catch (error) {
		console.error('Error fetching last updated:', error);
		throw error;
	}
};

export const updateNewsletter = async (email: string) => {
	try {
		const response = await axios.post(
			`${url}newsletter`,
			{ email },
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.error('Error updating newsletter:', error);
		throw error;
	}
};
