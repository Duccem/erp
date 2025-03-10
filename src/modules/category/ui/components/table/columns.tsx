'use client';
import { Button } from '@/lib/ui/components/ui/button';
import { Checkbox } from '@/lib/ui/components/ui/checkbox';
import { useSortQuery } from '@/lib/ui/components/ui/data-table/hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/ui/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, MoreHorizontal } from 'lucide-react';

export const categoryColumns: ColumnDef<{ id: string; name: string; color: string }>[] = [
  {
    id: 'select',
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <Checkbox className="" checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />
      );
    },
    header: ({ table }) => {
      <Checkbox
        className=""
        checked={table?.getIsAllPageRowsSelected() || (table?.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />;
    },
  },
  {
    accessorKey: 'name',
    cell: ({ row }) => row.original.name,
    header: () => {
      const { createSortQuery, column, value } = useSortQuery();
      return (
        <Button className="p-0 hover:bg-transparent space-x-2" variant="ghost" onClick={() => createSortQuery('name')}>
          <span>Nombre</span>
          {'name' === column && value === 'ASC' && <ArrowUp size={16} />}
          {'name' === column && value === 'DESC' && <ArrowDown size={16} />}
        </Button>
      );
    },
  },
  {
    accessorKey: 'color',
    cell: ({ row }) => <div className="size-4 rounded-[4px]" style={{ backgroundColor: row.original.color }}></div>,
    header: () => {
      const { createSortQuery, column, value } = useSortQuery();
      return (
        <Button className="p-0 hover:bg-transparent space-x-2" variant="ghost" onClick={() => createSortQuery('color')}>
          <span>Color</span>
          {'color' === column && value === 'ASC' && <ArrowUp size={16} />}
          {'color' === column && value === 'DESC' && <ArrowDown size={16} />}
        </Button>
      );
    },
  },
  {
    id: 'actions',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row, table }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-none">
            <DropdownMenuItem onClick={() => console.log('')} className="rounded-none">
              View details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive rounded-none">Cancelar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    header: () => 'Acciones',
  },
];
