import React, { useState, useEffect } from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	Column,
	PaginationState,
	sortingFns,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Stock, STOCK_SECTORS } from '@/utils/stockData';
import { TableSearch } from '@/components/ui/table-search';
import { PageSizeSelector } from '@/components/ui/page-size-selector';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import {
	formatCurrency,
	formatMarketCap,
	calculateValuation,
	formatPERatio,
} from '@/lib/tableUtils';
import { MarketCapRangeSlider } from '@/components/ui/market-cap-range-slider';
import { SectorFilterPopover } from '@/components/ui/sector-filter-popover';
import { useNavigate } from 'react-router-dom';
const STORAGE_KEY_GRAHAM = 'graham-filters';

export function GrahamTable({ stocks }: { stocks: Stock[] }) {
	const navigate = useNavigate();

	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'graham_rank',
			desc: false,
		},
	]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const [pageSize, setPageSize] = useState(10);

	// Find min and max market cap for range slider
	const minMarketCap = Math.min(
		...stocks.map((stock) => stock.marketCap || 0)
	);
	const maxMarketCap = Math.max(
		...stocks.map((stock) => stock.marketCap || Number.MAX_SAFE_INTEGER)
	);

	// Initialize all sectors checked by default
	const [selectedSectors, setSelectedSectors] = useState<string[]>([
		...STOCK_SECTORS,
	]);

	// Initialize market cap range
	const [marketCapRange, setMarketCapRange] = useState<[number, number]>([
		minMarketCap,
		maxMarketCap,
	]);

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	// Load filters from local storage on component mount
	useEffect(() => {
		const savedFilters = localStorage.getItem(STORAGE_KEY_GRAHAM);
		if (savedFilters) {
			try {
				const { sectors, marketCap } = JSON.parse(savedFilters);
				if (sectors && Array.isArray(sectors)) {
					setSelectedSectors(sectors);
				}
				if (
					marketCap &&
					Array.isArray(marketCap) &&
					marketCap.length === 2
				) {
					// Only use saved market cap range if it's within current data bounds
					const [min, max] = marketCap;
					const validMin = Math.max(min, minMarketCap);
					const validMax = Math.min(max, maxMarketCap);
					setMarketCapRange([validMin, validMax]);
				}
			} catch (error) {
				console.error('Error loading saved filters:', error);
			}
		}
	}, []);

	// Save filters to local storage when they change
	useEffect(() => {
		if (selectedSectors || marketCapRange) {
			const filtersToSave = {
				sectors: selectedSectors,
				marketCap: marketCapRange,
			};
			localStorage.setItem(
				STORAGE_KEY_GRAHAM,
				JSON.stringify(filtersToSave)
			);
		}
	}, [selectedSectors, marketCapRange]);

	// Custom filter function for market cap range
	const filterMarketCapRange = (
		row: any,
		columnId: string,
		value: [number, number]
	) => {
		const marketCap = row.getValue(columnId) as number;
		return marketCap >= value[0] && marketCap <= value[1];
	};

	// Custom filter function for multiple sectors
	const filterMultipleSectors = (
		row: any,
		columnId: string,
		value: string[]
	) => {
		const sector = row.getValue(columnId) as string;
		// If all sectors are selected or none are selected, show all sectors
		if (!value.length || value.length === STOCK_SECTORS.length) return true;
		// Otherwise, show only the selected sectors
		return value.includes(sector);
	};

	// Handle market cap range change
	const handleMarketCapChange = (range: [number, number]) => {
		setMarketCapRange(range);
		// Update the column filter
		const marketCapColumn = table.getColumn('marketCap');
		if (marketCapColumn) {
			marketCapColumn.setFilterValue(range);
		}
	};

	// Handle sector filter change
	const handleSectorFilterChange = (sectors: string[]) => {
		setSelectedSectors(sectors);
		// Get the sector column and set its filter value
		const sectorColumn = table.getColumn('sector');
		if (sectorColumn) {
			sectorColumn.setFilterValue(sectors);
		}
	};

	// Define table columns
	const columns: ColumnDef<Stock>[] = [
		{
			accessorKey: 'graham_rank',
			accessorFn: (row) => row.graham_props.graham_rank,
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title="Rank"
					tooltip="Overall rank based on Graham criteria (lower is better)"
				/>
			),
			cell: ({ row }) => (
				<div className="text-center font-bold">
					{row.original.graham_props.graham_rank}
				</div>
			),
		},
		{
			accessorKey: 'symbol',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Ticker" />
			),
			cell: ({ row }) => (
				<div className="flex items-center justify-center gap-2">
					<img
						title={`${row.original.name} logo`}
						src={row.original.logo_url}
						className="w-6 h-6 rounded-full"
						alt={`${row.original.name} logo`}
					/>
					<div className="font-bold">{row.getValue('symbol')}</div>
				</div>
			),
			enableSorting: false,
		},
		{
			accessorKey: 'name',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Company Name" />
			),
			cell: ({ row }) => (
				<div className="text-center">{row.getValue('name')}</div>
			),
			enableSorting: false,
		},
		{
			accessorKey: 'sector',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Sector" />
			),
			cell: ({ row }) => (
				<div className="text-center">{row.getValue('sector')}</div>
			),
			enableSorting: false,
			filterFn: filterMultipleSectors,
		},
		{
			accessorKey: 'marketCap',
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title="Market Cap"
					tooltip="Market Capitalization"
				/>
			),
			cell: ({ row }) => (
				<div className="text-center font-medium">
					{formatMarketCap(row.getValue('marketCap'))}
				</div>
			),
			filterFn: filterMarketCapRange,
		},
		{
			accessorKey: 'price',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Current Price" />
			),
			cell: ({ row }) => (
				<div className="text-center font-medium">
					{formatCurrency(row.getValue('price'))}
				</div>
			),
		},
		{
			accessorKey: 'intrinsic_value',
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title="Graham Value"
					tooltip="Calculated intrinsic value based on Graham's formula"
				/>
			),
			cell: ({ row }) => (
				<div className="text-center font-medium">
					{formatCurrency(row.original.graham_props.intrinsic_value)}
				</div>
			),
		},
		{
			accessorKey: 'priceToGrahamValue',
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title="Valuation"
					tooltip="Price to Graham Value Ratio (< 1 may indicate undervaluation)"
				/>
			),
			cell: ({ row }) => {
				const valuation = calculateValuation(row.original);
				return (
					<div
						className={`text-center font-bold ${
							valuation.isUndervalued
								? 'text-green-600'
								: 'text-red-600'
						}`}>
						{valuation.text}
					</div>
				);
			},
		},
		{
			accessorKey: 'pe',
			header: ({ column }) => (
				<DataTableColumnHeader
					column={column}
					title="P/E Ratio"
					tooltip="Price to Earnings Ratio"
				/>
			),
			cell: ({ row }) => (
				<div className="text-center font-medium">
					{formatPERatio(row.getValue('pe'))}
				</div>
			),
		},
	];

	// Update pagination when page size changes
	React.useEffect(() => {
		setPagination((prev) => ({
			...prev,
			pageSize,
		}));
	}, [pageSize]);

	// Initialize table
	const table = useReactTable({
		data: stocks,
		columns,
		state: {
			sorting,
			columnFilters,
			globalFilter,
			pagination,
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		filterFns: {
			marketCapRange: filterMarketCapRange,
			sectors: filterMultipleSectors,
		},
		sortingFns: {
			...sortingFns,
		},
	});

	// Set initial filters
	useEffect(() => {
		// Apply sector filter
		const sectorColumn = table.getColumn('sector');
		if (sectorColumn) {
			sectorColumn.setFilterValue(selectedSectors);
		}

		// Apply market cap filter
		const marketCapColumn = table.getColumn('marketCap');
		if (marketCapColumn) {
			marketCapColumn.setFilterValue(marketCapRange);
		}
	}, [table, selectedSectors, marketCapRange]);

	return (
		<div className="space-y-4">
			<div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
				<div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-2">
					<TableSearch
						value={globalFilter}
						onChange={setGlobalFilter}
						placeholder="Search companies..."
					/>
					<div className="flex items-center space-x-1">
						<SectorFilterPopover
							selectedSectors={selectedSectors}
							onChange={handleSectorFilterChange}
						/>
						<MarketCapRangeSlider
							min={minMarketCap}
							max={maxMarketCap}
							value={marketCapRange}
							onChange={handleMarketCapChange}
						/>
					</div>
				</div>

				<div className="hidden md:flex space-x-2">
					<PageSizeSelector value={pageSize} onChange={setPageSize} />
				</div>
			</div>

			<div className="rounded-md border border-gray-200 shadow-sm overflow-hidden">
				<div className="max-h-[calc(100vh-300px)] overflow-auto">
					<Table>
						<TableHeader className="sticky top-0 bg-background z-10 border-b">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="text-center h-12">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={
											row.original.graham_props
												.graham_rank
										}
										data-state={
											row.getIsSelected() && 'selected'
										}
										className="h-14"
										onClick={() => {
											navigate(
												`/stock/${row.original.symbol}`
											);
										}}>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className="text-center align-middle py-4">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow className="h-14">
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center">
										No results found.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>

			<div className="flex items-center justify-end space-x-2">
				<div className="text-sm text-muted-foreground">
					Page {table.getState().pagination.pageIndex + 1} of{' '}
					{table.getPageCount()}
				</div>
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={(e) => {
									e.preventDefault();
									table.previousPage();
								}}
								aria-disabled={!table.getCanPreviousPage()}
								className={
									!table.getCanPreviousPage()
										? 'pointer-events-none opacity-50'
										: ''
								}
							/>
						</PaginationItem>
						{/* Show page numbers only on desktop */}
						<div className="hidden md:flex">
							{Array.from(
								{ length: table.getPageCount() },
								(_, i) => i + 1
							)
								.filter(
									(page) =>
										page === 1 ||
										page === table.getPageCount() ||
										Math.abs(
											page -
												table.getState().pagination
													.pageIndex -
												1
										) <= 1
								)
								.map((page, i, array) => {
									const prevPage = array[i - 1];
									const showEllipsis =
										prevPage && page - prevPage > 1;

									return (
										<div key={page} className="contents">
											{showEllipsis && (
												<PaginationItem>
													<span className="px-2">
														...
													</span>
												</PaginationItem>
											)}
											<PaginationItem>
												<PaginationLink
													href="#"
													onClick={(e) => {
														e.preventDefault();
														table.setPageIndex(
															page - 1
														);
													}}
													isActive={
														table.getState()
															.pagination
															.pageIndex ===
														page - 1
													}>
													{page}
												</PaginationLink>
											</PaginationItem>
										</div>
									);
								})}
						</div>
						{/* Show current page on mobile */}
						<div className="md:hidden">
							<PaginationItem>
								<PaginationLink href="#" isActive={true}>
									{table.getState().pagination.pageIndex + 1}
								</PaginationLink>
							</PaginationItem>
						</div>
						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={(e) => {
									e.preventDefault();
									table.nextPage();
								}}
								aria-disabled={!table.getCanNextPage()}
								className={
									!table.getCanNextPage()
										? 'pointer-events-none opacity-50'
										: ''
								}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
