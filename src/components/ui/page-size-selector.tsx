import * as React from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface PageSizeSelectorProps {
	value: number;
	onChange: (value: number) => void;
	options?: number[];
}

export function PageSizeSelector({
	value,
	onChange,
	options = [10, 20, 30, 50, 100],
}: PageSizeSelectorProps) {
	return (
		<div className="flex items-center space-x-2">
			<p className="text-sm text-muted-foreground">Rows per page</p>
			<Select
				value={value.toString()}
				onValueChange={(val) => onChange(Number(val))}>
				<SelectTrigger className="h-8 w-[70px]">
					<SelectValue placeholder={value} />
				</SelectTrigger>
				<SelectContent className="bg-white/80 backdrop-blur-sm">
					{options.map((option) => (
						<SelectItem
							key={option}
							value={option.toString()}
							className="hover:bg-emerald-500 hover:text-white transition-colors">
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
