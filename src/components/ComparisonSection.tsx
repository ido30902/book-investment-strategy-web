
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const generateHistoricalData = (startYear = 1963, endYear = 2023) => {
  const data = [];
  
  let spValue = 100;
  let grahamValue = 100;
  let magicFormulaValue = 100;
  
  for (let year = startYear; year <= endYear; year++) {
    // Random annual returns with slight outperformance for the strategies
    const spReturn = (Math.random() * 0.20) - 0.05;
    const grahamExcess = (Math.random() * 0.08) - 0.02;
    const magicExcess = (Math.random() * 0.10) - 0.02;
    
    spValue = spValue * (1 + spReturn);
    grahamValue = grahamValue * (1 + spReturn + grahamExcess);
    magicFormulaValue = magicFormulaValue * (1 + spReturn + magicExcess);
    
    // Handle market crashes/recessions
    if (year === 1973 || year === 1974 || year === 2000 || year === 2001 
        || year === 2002 || year === 2008) {
      spValue = spValue * 0.75;
      grahamValue = grahamValue * 0.85; // Value strategy performs better in crashes
      magicFormulaValue = magicFormulaValue * 0.80;
    }
    
    // Handle recoveries/bull markets
    if (year === 1975 || year === 1985 || year === 1995 || year === 2009 || year === 2019) {
      spValue = spValue * 1.25;
      grahamValue = grahamValue * 1.20;
      magicFormulaValue = magicFormulaValue * 1.30;
    }
    
    data.push({
      year,
      "S&P 500": Math.round(spValue),
      "Graham Strategy": Math.round(grahamValue),
      "Magic Formula": Math.round(magicFormulaValue),
    });
  }
  
  return data;
};

const ComparisonSection = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    setData(generateHistoricalData());
  }, []);

  return (
    <section id="comparison" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-investment-blue mb-12 text-center">
          Strategy Performance Comparison
        </h2>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">60-Year Historical Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6 text-center">
              Comparing the S&P 500 index against the Graham Strategy and the Magic Formula
              over the last 60 years (simulated performance data)
            </p>
            
            <div className="w-full h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    domain={[0, 'dataMax + 500']}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, undefined]}
                    labelFormatter={(label) => `Year: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="S&P 500" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Graham Strategy" 
                    stroke="#1a56db" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Magic Formula" 
                    stroke="#10b981" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 text-sm text-gray-500 italic text-center">
              Note: This graph shows simulated performance and is for illustrative purposes only. 
              Past performance is not indicative of future results.
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ComparisonSection;
