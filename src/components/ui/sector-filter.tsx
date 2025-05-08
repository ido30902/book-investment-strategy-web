import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { STOCK_SECTORS } from '@/utils/stockData';

interface SectorFilterProps {
	value: string;
	onChange: (value: string) => void;
}

export function SectorFilter({ value, onChange }: SectorFilterProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between">
					{value ? value : 'All Sectors'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search sector..." />
					<CommandEmpty>No sector found.</CommandEmpty>
					<CommandGroup>
						<CommandItem
							value="All Sectors"
							onSelect={() => {
								onChange('');
								setOpen(false);
							}}>
							<Check
								className={cn(
									'mr-2 h-4 w-4',
									value === '' ? 'opacity-100' : 'opacity-0'
								)}
							/>
							All Sectors
						</CommandItem>
						{STOCK_SECTORS.map((sector) => (
							<CommandItem
								key={sector}
								value={sector}
								onSelect={() => {
									onChange(sector);
									setOpen(false);
								}}>
								<Check
									className={cn(
										'mr-2 h-4 w-4',
										value === sector
											? 'opacity-100'
											: 'opacity-0'
									)}
								/>
								{sector}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
