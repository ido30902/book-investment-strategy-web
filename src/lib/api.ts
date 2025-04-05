import axios from 'axios';

const url = 'http://192.168.1.35:4000/api/stocks';
const headers = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
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
