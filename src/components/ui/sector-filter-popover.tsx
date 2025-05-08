import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { STOCK_SECTORS } from '@/utils/stockData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface SectorFilterPopoverProps {
	selectedSectors: string[];
	onChange: (sectors: string[]) => void;
}

export function SectorFilterPopover({
	selectedSectors,
	onChange,
}: SectorFilterPopoverProps) {
	const [open, setOpen] = useState(false);
	const [localSelectedSectors, setLocalSelectedSectors] =
		useState<string[]>(selectedSectors);

	// Handle checkbox change
	const handleSectorChange = (sector: string, checked: boolean) => {
		if (checked) {
			setLocalSelectedSectors((prev) => [...prev, sector]);
		} else {
			setLocalSelectedSectors((prev) => prev.filter((s) => s !== sector));
		}
	};

	// Apply the selected sectors
	const handleApply = () => {
		onChange(localSelectedSectors);
		setOpen(false);
	};

	// Reset to "All Sectors"
	const handleReset = () => {
		setLocalSelectedSectors([]);
		onChange([]);
		setOpen(false);
	};

	// Sync local state when props change
	React.useEffect(() => {
		setLocalSelectedSectors(selectedSectors);
	}, [selectedSectors]);

	const activeFiltersCount = selectedSectors.length;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="h-8 gap-1 border border-gray-200">
					<Filter className="h-4 w-4" />
					<span>Sectors</span>
					{activeFiltersCount > 0 && (
						<Badge
							variant="secondary"
							className="ml-1 rounded-full text-xs">
							{activeFiltersCount}
						</Badge>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-[220px] p-4 bg-white/80 backdrop-blur-sm border-none"
				align="end">
				<div className="space-y-4">
					<h4 className="font-medium text-sm">Filter by Sector</h4>
					<ScrollArea className="h-[200px] pr-4">
						<div className="space-y-3">
							{STOCK_SECTORS.map((sector) => (
								<div
									key={sector}
									className="flex items-center space-x-2">
									<Checkbox
										id={`sector-${sector}`}
										checked={localSelectedSectors.includes(
											sector
										)}
										onCheckedChange={(checked) =>
											handleSectorChange(
												sector,
												checked === true
											)
										}
									/>
									<label
										htmlFor={`sector-${sector}`}
										className="text-sm cursor-pointer flex-1">
										{sector}
									</label>
								</div>
							))}
						</div>
					</ScrollArea>
					<div className="flex justify-between">
						<Button
							variant="outline"
							size="sm"
							onClick={handleReset}
							className="hover:bg-red-500 hover:text-white">
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
			</PopoverContent>
		</Popover>
	);
}
