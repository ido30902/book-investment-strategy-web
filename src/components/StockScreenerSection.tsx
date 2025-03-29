
import { useState, useEffect } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { allStocks, Stock } from "@/utils/stockData";
import { ArrowUpDown } from "lucide-react";

const StockScreenerSection = () => {
  const [magicFormulaStocks, setMagicFormulaStocks] = useState<Stock[]>([]);
  const [grahamStocks, setGrahamStocks] = useState<Stock[]>([]);
  const [magicFormulaSortConfig, setMagicFormulaSortConfig] = useState({ key: '', direction: '' });
  const [grahamSortConfig, setGrahamSortConfig] = useState({ key: '', direction: '' });
  const [magicFormulaFilters, setMagicFormulaFilters] = useState({
    marketCapMin: 50,
    marketCapMax: 1000,
    stockCount: 20
  });
  const [grahamFilters, setGrahamFilters] = useState({
    marketCapMin: 50,
    marketCapMax: 1000,
    stockCount: 20
  });

  // Filter and sort stocks based on Magic Formula (Greenblatt)
  useEffect(() => {
    // Filter by market cap
    let filtered = allStocks.filter(stock => 
      stock.marketCap >= magicFormulaFilters.marketCapMin && 
      stock.marketCap <= magicFormulaFilters.marketCapMax
    );
    
    // Magic Formula ranks stocks by combining two factors:
    // 1. Return on Capital (higher is better)
    // 2. Earnings Yield (higher is better)
    filtered.forEach(stock => {
      // Adjust these calculation weights as needed
      stock['combinedRank'] = stock.returnOnCapital + stock.earningsYield;
    });
    
    // Sort by combined rank (descending)
    filtered.sort((a, b) => (b['combinedRank'] || 0) - (a['combinedRank'] || 0));
    
    // Limit to requested number of stocks
    filtered = filtered.slice(0, magicFormulaFilters.stockCount);
    
    // Apply user sort if set
    if (magicFormulaSortConfig.key && magicFormulaSortConfig.direction) {
      filtered.sort((a, b) => {
        if (a[magicFormulaSortConfig.key] < b[magicFormulaSortConfig.key]) {
          return magicFormulaSortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[magicFormulaSortConfig.key] > b[magicFormulaSortConfig.key]) {
          return magicFormulaSortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setMagicFormulaStocks(filtered);
  }, [magicFormulaFilters, magicFormulaSortConfig]);

  // Filter and sort stocks based on Graham's criteria
  useEffect(() => {
    // Filter by market cap
    let filtered = allStocks.filter(stock => 
      stock.marketCap >= grahamFilters.marketCapMin && 
      stock.marketCap <= grahamFilters.marketCapMax
    );
    
    // Graham's criteria:
    // 1. Low P/E ratio
    // 2. Low P/B ratio
    // 3. Strong financial position (current ratio)
    // 4. Low debt-to-equity ratio
    // 5. Net current asset value
    filtered.forEach(stock => {
      // Calculate Graham score (weighted score of the above criteria)
      stock['grahamScore'] = 
        (15/stock.peRatio) + // Higher score for lower P/E
        (2/stock.pbRatio) + // Higher score for lower P/B
        (stock.currentRatio * 0.5) + // Higher score for higher current ratio
        ((1/stock.debtToEquity) * 0.3) + // Higher score for lower debt
        (stock.net_current_asset_value > 0 ? 2 : 0); // Bonus for positive NCAV
    });
    
    // Sort by Graham score (descending)
    filtered.sort((a, b) => (b['grahamScore'] || 0) - (a['grahamScore'] || 0));
    
    // Limit to requested number of stocks
    filtered = filtered.slice(0, grahamFilters.stockCount);
    
    // Apply user sort if set
    if (grahamSortConfig.key && grahamSortConfig.direction) {
      filtered.sort((a, b) => {
        if (a[grahamSortConfig.key] < b[grahamSortConfig.key]) {
          return grahamSortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[grahamSortConfig.key] > b[grahamSortConfig.key]) {
          return grahamSortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setGrahamStocks(filtered);
  }, [grahamFilters, grahamSortConfig]);

  // Sort function for tables
  const requestSort = (key: string, tabName: string) => {
    if (tabName === 'magic-formula') {
      setMagicFormulaSortConfig((prevConfig) => {
        if (prevConfig.key === key) {
          const direction = prevConfig.direction === 'ascending' ? 'descending' : 'ascending';
          return { key, direction };
        }
        return { key, direction: 'ascending' };
      });
    } else {
      setGrahamSortConfig((prevConfig) => {
        if (prevConfig.key === key) {
          const direction = prevConfig.direction === 'ascending' ? 'descending' : 'ascending';
          return { key, direction };
        }
        return { key, direction: 'ascending' };
      });
    }
  };

  // Helper to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value);
  };

  // Helper to format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <section id="screener" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-investment-blue mb-12 text-center">
          Investment Strategy Stock Screeners
        </h2>
        
        <Tabs defaultValue="magic-formula" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="magic-formula">Magic Formula</TabsTrigger>
            <TabsTrigger value="graham">Graham Strategy</TabsTrigger>
          </TabsList>
          
          {/* Magic Formula Tab */}
          <TabsContent value="magic-formula">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Magic Formula Stock Screener</CardTitle>
                    <CardDescription className="mt-2">
                      Based on Joel Greenblatt's investment strategy focusing on return on capital and earnings yield.
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mt-4 md:mt-0">
                        Adjust Filters
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Adjust Screener Filters</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Market Cap Range (Billions $)</h4>
                          <div className="flex items-center space-x-4">
                            <Slider 
                              value={[magicFormulaFilters.marketCapMin, magicFormulaFilters.marketCapMax]}
                              min={1}
                              max={2000}
                              step={10}
                              onValueChange={(value) => setMagicFormulaFilters({
                                ...magicFormulaFilters,
                                marketCapMin: value[0],
                                marketCapMax: value[1]
                              })}
                              className="flex-1"
                            />
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Input 
                              type="number"
                              value={magicFormulaFilters.marketCapMin}
                              onChange={(e) => setMagicFormulaFilters({
                                ...magicFormulaFilters,
                                marketCapMin: Number(e.target.value)
                              })}
                              className="w-24"
                              min={1}
                            />
                            <span className="mx-2">to</span>
                            <Input 
                              type="number"
                              value={magicFormulaFilters.marketCapMax}
                              onChange={(e) => setMagicFormulaFilters({
                                ...magicFormulaFilters,
                                marketCapMax: Number(e.target.value)
                              })}
                              className="w-24"
                              max={2000}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">Number of Stocks to Display</h4>
                          <div className="flex items-center space-x-4">
                            <Slider 
                              value={[magicFormulaFilters.stockCount]}
                              min={5}
                              max={35}
                              step={1}
                              onValueChange={(value) => setMagicFormulaFilters({
                                ...magicFormulaFilters,
                                stockCount: value[0]
                              })}
                              className="flex-1"
                            />
                            <Input 
                              type="number"
                              value={magicFormulaFilters.stockCount}
                              onChange={(e) => setMagicFormulaFilters({
                                ...magicFormulaFilters,
                                stockCount: Number(e.target.value)
                              })}
                              className="w-24"
                              min={1}
                              max={35}
                            />
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Ticker</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead className="text-right cursor-pointer" onClick={() => requestSort('price', 'magic-formula')}>
                          <div className="flex justify-end items-center">
                            Price
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right cursor-pointer" onClick={() => requestSort('marketCap', 'magic-formula')}>
                          <div className="flex justify-end items-center">
                            Market Cap
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right cursor-pointer" onClick={() => requestSort('returnOnCapital', 'magic-formula')}>
                          <div className="flex justify-end items-center">
                            ROC
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right cursor-pointer" onClick={() => requestSort('earningsYield', 'magic-formula')}>
                          <div className="flex justify-end items-center">
                            Earnings Yield
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {magicFormulaStocks.map((stock) => (
                        <TableRow key={stock.id}>
                          <TableCell className="font-medium">{stock.ticker}</TableCell>
                          <TableCell>{stock.name}</TableCell>
                          <TableCell>{stock.sector}</TableCell>
                          <TableCell className="text-right">{formatCurrency(stock.price)}</TableCell>
                          <TableCell className="text-right">{stock.marketCap}B</TableCell>
                          <TableCell className="text-right">{formatPercentage(stock.returnOnCapital)}</TableCell>
                          <TableCell className="text-right">{formatPercentage(stock.earningsYield)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Graham Strategy Tab */}
          <TabsContent value="graham">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Graham Strategy Stock Screener</CardTitle>
                    <CardDescription className="mt-2">
                      Based on Benjamin Graham's value investing principles focusing on financially sound companies at bargain prices.
                    </CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="mt-4 md:mt-0">
                        Adjust Filters
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Adjust Screener Filters</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Market Cap Range (Billions $)</h4>
                          <div className="flex items-center space-x-4">
                            <Slider 
                              value={[grahamFilters.marketCapMin, grahamFilters.marketCapMax]}
                              min={1}
                              max={2000}
                              step={10}
                              onValueChange={(value) => setGrahamFilters({
                                ...grahamFilters,
                                marketCapMin: value[0],
                                marketCapMax: value[1]
                              })}
                              className="flex-1"
                            />
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <Input 
                              type="number"
                              value={grahamFilters.marketCapMin}
                              onChange={(e) => setGrahamFilters({
                                ...grahamFilters,
                                marketCapMin: Number(e.target.value)
                              })}
                              className="w-24"
                              min={1}
                            />
                            <span className="mx-2">to</span>
                            <Input 
                              type="number"
                              value={grahamFilters.marketCapMax}
                              onChange={(e) => setGrahamFilters({
                                ...grahamFilters,
                                marketCapMax: Number(e.target.value)
                              })}
                              className="w-24"
                              max={2000}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-medium">Number of Stocks to Display</h4>
                          <div className="flex items-center space-x-4">
                            <Slider 
                              value={[grahamFilters.stockCount]}
                              min={5}
                              max={35}
                              step={1}
                              onValueChange={(value) => setGrahamFilters({
                                ...grahamFilters,
                                stockCount: value[0]
                              })}
                              className="flex-1"
                            />
                            <Input 
                              type="number"
                              value={grahamFilters.stockCount}
                              onChange={(e) => setGrahamFilters({
                                ...grahamFilters,
                                stockCount: Number(e.target.value)
                              })}
                              className="w-24"
                              min={1}
                              max={35}
                            />
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Ticker</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead className="text-right cursor-pointer" onClick={() => requestSort('price', 'graham')}>
                          <div className="flex justify-end items-center">
                            Price
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right cursor-pointer" onClick={() => requestSort('peRatio', 'graham')}>
                          <div className="flex justify-end items-center">
                            P/E
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right cursor-pointer" onClick={() => requestSort('pbRatio', 'graham')}>
                          <div className="flex justify-end items-center">
                            P/B
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right cursor-pointer" onClick={() => requestSort('currentRatio', 'graham')}>
                          <div className="flex justify-end items-center">
                            Current Ratio
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead className="text-right cursor-pointer" onClick={() => requestSort('debtToEquity', 'graham')}>
                          <div className="flex justify-end items-center">
                            Debt/Equity
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grahamStocks.map((stock) => (
                        <TableRow key={stock.id}>
                          <TableCell className="font-medium">{stock.ticker}</TableCell>
                          <TableCell>{stock.name}</TableCell>
                          <TableCell>{stock.sector}</TableCell>
                          <TableCell className="text-right">{formatCurrency(stock.price)}</TableCell>
                          <TableCell className="text-right">{stock.peRatio.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{stock.pbRatio.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{stock.currentRatio.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{stock.debtToEquity.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default StockScreenerSection;
