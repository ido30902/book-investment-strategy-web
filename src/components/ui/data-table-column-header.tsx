import { Column } from '@tanstack/react-table';
import { ChevronsUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface DataTableColumnHeaderProps<TData, TValue>
	extends React.HTMLAttributes<HTMLDivElement> {
	column: Column<TData, TValue>;
	title: string;
	tooltip?: string;
}

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
	tooltip,
	className,
}: DataTableColumnHeaderProps<TData, TValue>) {
	if (!column.getCanSort()) {
		return (
			<div className={cn('flex items-center', className)}>
				{tooltip ? (
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span>{title}</span>
							</TooltipTrigger>
							<TooltipContent>
								<p>{tooltip}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : (
					title
				)}
			</div>
		);
	}

	return (
		<div className={cn('flex items-center space-x-2', className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="-ml-3 h-8 data-[state=open]:bg-accent">
						{tooltip ? (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<span className="flex items-center">
											{title}
											{column.getIsSorted() === 'desc' ? (
												<ChevronDown className="ml-2 h-4 w-4" />
											) : column.getIsSorted() ===
											  'asc' ? (
												<ChevronUp className="ml-2 h-4 w-4" />
											) : (
												<ChevronsUpDown className="ml-2 h-4 w-4" />
											)}
										</span>
									</TooltipTrigger>
									<TooltipContent>
										<p>{tooltip}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						) : (
							<span className="flex items-center">
								{title}
								{column.getIsSorted() === 'desc' ? (
									<ChevronDown className="ml-2 h-4 w-4" />
								) : column.getIsSorted() === 'asc' ? (
									<ChevronUp className="ml-2 h-4 w-4" />
								) : (
									<ChevronsUpDown className="ml-2 h-4 w-4" />
								)}
							</span>
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					className="bg-white/80 backdrop-blur-sm">
					<DropdownMenuItem
						onClick={() => column.toggleSorting(false)}
						className="hover:bg-emerald-500 hover:text-white">
						<ChevronUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Asc
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => column.toggleSorting(true)}
						className="hover:bg-emerald-500 hover:text-white">
						<ChevronDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Desc
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
