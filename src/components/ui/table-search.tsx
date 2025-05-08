import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface TableSearchProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export function TableSearch({
	value,
	onChange,
	placeholder = 'Search...',
}: TableSearchProps) {
	return (
		<div className="relative w-full max-w-sm">
			<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full pl-8 rounded-md border border-gray-200"
			/>
		</div>
	);
}
