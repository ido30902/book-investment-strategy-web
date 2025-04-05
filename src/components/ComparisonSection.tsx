import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const ComparisonSection = () => {
	const jsonData = [
		{
			year: 1973,
			s_and_p_500: 100000,
			joel_greenblatt_magic_formula: 100000,
			benjamin_graham_strategy: 100000,
		},
		{
			year: 1974,
			s_and_p_500: 73530,
			joel_greenblatt_magic_formula: 87620,
			benjamin_graham_strategy: 84170,
		},
		{
			year: 1975,
			s_and_p_500: 100783,
			joel_greenblatt_magic_formula: 126748,
			benjamin_graham_strategy: 120162,
		},
		{
			year: 1976,
			s_and_p_500: 124811,
			joel_greenblatt_magic_formula: 164423,
			benjamin_graham_strategy: 156511,
		},
		{
			year: 1977,
			s_and_p_500: 115855,
			joel_greenblatt_magic_formula: 166988,
			benjamin_graham_strategy: 160217,
		},
		{
			year: 1978,
			s_and_p_500: 123463,
			joel_greenblatt_magic_formula: 188539,
			benjamin_graham_strategy: 177609,
		},
		{
			year: 1979,
			s_and_p_500: 146225,
			joel_greenblatt_magic_formula: 232113,
			benjamin_graham_strategy: 215708,
		},
		{
			year: 1980,
			s_and_p_500: 193634,
			joel_greenblatt_magic_formula: 319921,
			benjamin_graham_strategy: 279751,
		},
		{
			year: 1981,
			s_and_p_500: 184130,
			joel_greenblatt_magic_formula: 346309,
			benjamin_graham_strategy: 284759,
		},
		{
			year: 1982,
			s_and_p_500: 223548,
			joel_greenblatt_magic_formula: 450995,
			benjamin_graham_strategy: 360288,
		},
		{
			year: 1983,
			s_and_p_500: 273864,
			joel_greenblatt_magic_formula: 576628,
			benjamin_graham_strategy: 448098,
		},
		{
			year: 1984,
			s_and_p_500: 291028,
			joel_greenblatt_magic_formula: 650828,
			benjamin_graham_strategy: 486682,
		},
		{
			year: 1985,
			s_and_p_500: 383410,
			joel_greenblatt_magic_formula: 932205,
			benjamin_graham_strategy: 644764,
		},
		{
			year: 1986,
			s_and_p_500: 454969,
			joel_greenblatt_magic_formula: 1157322,
			benjamin_graham_strategy: 775946,
		},
		{
			year: 1987,
			s_and_p_500: 478860,
			joel_greenblatt_magic_formula: 1300134,
			benjamin_graham_strategy: 792866,
		},
		{
			year: 1988,
			s_and_p_500: 558397,
			joel_greenblatt_magic_formula: 1723087,
			benjamin_graham_strategy: 964631,
		},
		{
			year: 1989,
			s_and_p_500: 735346,
			joel_greenblatt_magic_formula: 2449886,
			benjamin_graham_strategy: 1213893,
		},
		{
			year: 1990,
			s_and_p_500: 712350,
			joel_greenblatt_magic_formula: 2495306,
			benjamin_graham_strategy: 1202338,
		},
		{
			year: 1991,
			s_and_p_500: 929369,
			joel_greenblatt_magic_formula: 3589553,
			benjamin_graham_strategy: 1619793,
		},
		{
			year: 1992,
			s_and_p_500: 1000047,
			joel_greenblatt_magic_formula: 4180152,
			benjamin_graham_strategy: 1820343,
		},
		{
			year: 1993,
			s_and_p_500: 1100852,
			joel_greenblatt_magic_formula: 5134720,
			benjamin_graham_strategy: 2175204,
		},
		{
			year: 1994,
			s_and_p_500: 1115383,
			joel_greenblatt_magic_formula: 5511969,
			benjamin_graham_strategy: 2246491,
		},
		{
			year: 1995,
			s_and_p_500: 1534586,
			joel_greenblatt_magic_formula: 8008399,
			benjamin_graham_strategy: 2993628,
		},
		{
			year: 1996,
			s_and_p_500: 1886967,
			joel_greenblatt_magic_formula: 11010269,
			benjamin_graham_strategy: 3765663,
		},
		{
			year: 1997,
			s_and_p_500: 2516521,
			joel_greenblatt_magic_formula: 15383068,
			benjamin_graham_strategy: 4900623,
		},
		{
			year: 1998,
			s_and_p_500: 3235864,
			joel_greenblatt_magic_formula: 20353817,
			benjamin_graham_strategy: 5872816,
		},
		{
			year: 1999,
			s_and_p_500: 3916667,
			joel_greenblatt_magic_formula: 25399329,
			benjamin_graham_strategy: 6613737,
		},
		{
			year: 2000,
			s_and_p_500: 3560259,
			joel_greenblatt_magic_formula: 27748982,
			benjamin_graham_strategy: 7171474,
		},
		{
			year: 2001,
			s_and_p_500: 3137044,
			joel_greenblatt_magic_formula: 29169609,
			benjamin_graham_strategy: 7596567,
		},
		{
			year: 2002,
			s_and_p_500: 2444759,
			joel_greenblatt_magic_formula: 27337656,
			benjamin_graham_strategy: 6960819,
		},
		{
			year: 2003,
			s_and_p_500: 3145855,
			joel_greenblatt_magic_formula: 38862985,
			benjamin_graham_strategy: 9416100,
		},
		{
			year: 2004,
			s_and_p_500: 3488229,
			joel_greenblatt_magic_formula: 46066816,
			benjamin_graham_strategy: 10893082,
		},
		{
			year: 2005,
			s_and_p_500: 3659462,
			joel_greenblatt_magic_formula: 54050940,
			benjamin_graham_strategy: 11799626,
		},
		{
			year: 2006,
			s_and_p_500: 4237294,
			joel_greenblatt_magic_formula: 65703922,
			benjamin_graham_strategy: 14177448,
		},
		{
			year: 2007,
			s_and_p_500: 4470102,
			joel_greenblatt_magic_formula: 63185862,
			benjamin_graham_strategy: 13927962,
		},
		{
			year: 2008,
			s_and_p_500: 2816164,
			joel_greenblatt_magic_formula: 42535261,
			benjamin_graham_strategy: 10357676,
		},
		{
			year: 2009,
			s_and_p_500: 3561434,
			joel_greenblatt_magic_formula: 59811553,
			benjamin_graham_strategy: 13656899,
		},
		{
			year: 2010,
			s_and_p_500: 4097587,
			joel_greenblatt_magic_formula: 76180389,
			benjamin_graham_strategy: 16352109,
		},
		{
			year: 2011,
			s_and_p_500: 4184026,
			joel_greenblatt_magic_formula: 75100288,
			benjamin_graham_strategy: 17111731,
		},
		{
			year: 2012,
			s_and_p_500: 4853470,
			joel_greenblatt_magic_formula: 89932594,
			benjamin_graham_strategy: 20223791,
		},
		{
			year: 2013,
			s_and_p_500: 6425560,
			joel_greenblatt_magic_formula: 123139130,
			benjamin_graham_strategy: 26032428,
		},
		{
			year: 2014,
			s_and_p_500: 7305357,
			joel_greenblatt_magic_formula: 136012596,
			benjamin_graham_strategy: 28594319,
		},
		{
			year: 2015,
			s_and_p_500: 7406169,
			joel_greenblatt_magic_formula: 136352627,
			benjamin_graham_strategy: 27971786,
		},
		{
			year: 2016,
			s_and_p_500: 8292146,
			joel_greenblatt_magic_formula: 159187487,
			benjamin_graham_strategy: 33115416,
		},
		{
			year: 2017,
			s_and_p_500: 10102422,
			joel_greenblatt_magic_formula: 186866332,
			benjamin_graham_strategy: 38329168,
		},
	];

	return (
		<section id="comparison" className="py-20">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl md:text-4xl font-bold text-investment-blue mb-12 text-center">
					Strategy Performance Comparison
				</h2>

				<Card className="shadow-lg">
					<CardHeader>
						<CardTitle className="text-2xl text-center">
							60-Year Historical Performance Comparison
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600 mb-6 text-center">
							Comparing the S&P 500 index against the Graham
							Strategy and the Magic Formula over the last 60
							years (simulated performance data)
						</p>

						<div className="w-full h-[250px] md:h-[400px]">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart
									data={jsonData}
									margin={{
										top: 5,
										right: 30,
										left: 20,
										bottom: 5,
									}}>
									<XAxis
										dataKey="year"
										tick={{ fontSize: 12 }}
										interval="preserveStartEnd"
									/>
									<YAxis
										tick={{ fontSize: 12 }}
										domain={[0, 'dataMax + 500']}
										tickFormatter={(value) => {
											if (value >= 1000000000000) {
												return `$${(
													value / 1000000000000
												).toFixed(1)}T`;
											} else if (value >= 1000000000) {
												return `$${(
													value / 1000000000
												).toFixed(1)}B`;
											} else if (value >= 1000000) {
												return `$${(
													value / 1000000
												).toFixed(1)}M`;
											} else if (value >= 1000) {
												return `$${(
													value / 1000
												).toFixed(1)}K`;
											}
											return `$${value}`;
										}}
									/>
									<Tooltip
										formatter={(value: number) => {
											if (value >= 1000000000000) {
												return [
													`$${(
														value / 1000000000000
													).toFixed(1)}T`,
													undefined,
												];
											} else if (value >= 1000000000) {
												return [
													`$${(
														value / 1000000000
													).toFixed(1)}B`,
													undefined,
												];
											} else if (value >= 1000000) {
												return [
													`$${(
														value / 1000000
													).toFixed(1)}M`,
													undefined,
												];
											} else if (value >= 1000) {
												return [
													`$${(value / 1000).toFixed(
														1
													)}K`,
													undefined,
												];
											}
											return [`$${value}`, undefined];
										}}
										labelFormatter={(label) =>
											`Year: ${label}`
										}
									/>
									<Legend />
									<Line
										type="monotone"
										name="S&P 500 Index"
										dataKey="s_and_p_500"
										stroke="#8884d8"
										activeDot={{ r: 8 }}
										strokeWidth={2}
									/>
									<Line
										type="monotone"
										name="Magic Formula by Joel Greenblatt"
										dataKey="joel_greenblatt_magic_formula"
										stroke="#1a56db"
										activeDot={{ r: 8 }}
										strokeWidth={2}
									/>
									<Line
										type="monotone"
										name="Benjamin Graham Strategy"
										dataKey="benjamin_graham_strategy"
										stroke="#10b981"
										activeDot={{ r: 8 }}
										strokeWidth={2}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>

						<div className="mt-8 text-sm text-gray-500 italic text-center">
							Note: This graph shows simulated performance and is
							for illustrative purposes only. Past performance is
							not indicative of future results.
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
};

export default ComparisonSection;
