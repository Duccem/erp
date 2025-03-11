'use client';
import { Button } from '@/lib/ui/components/ui/button';
import { Checkbox } from '@/lib/ui/components/ui/checkbox';
import { useSortQuery } from '@/lib/ui/components/ui/data-table/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, Eye, Trash } from 'lucide-react';
import Link from 'next/link';

export const warehouseColumns: ColumnDef<{ id: string; name: string; address: string }>[] = [
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
      return (
        <Checkbox
          className=""
          checked={table?.getIsAllPageRowsSelected() || (table?.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      );
    },
  },
  {
    accessorKey: 'name',
    cell: ({ row }) => row.original.name,
    header: () => {
      const { createSortQuery, column, value } = useSortQuery();
      return (
        <Button className="p-0 hover:bg-transparent space-x-2" variant="ghost" onClick={() => createSortQuery('name')}>
          <span>Name</span>
          {'name' === column && value === 'ASC' && <ArrowUp size={16} />}
          {'name' === column && value === 'DESC' && <ArrowDown size={16} />}
        </Button>
      );
    },
  },
  {
    accessorKey: 'address',
    cell: ({ row }) => row.original.address,
    header: () => {
      const { createSortQuery, column, value } = useSortQuery();
      return (
        <Button
          className="p-0 hover:bg-transparent space-x-2"
          variant="ghost"
          onClick={() => createSortQuery('address')}
        >
          <span>Address</span>
          {'address' === column && value === 'ASC' && <ArrowUp size={16} />}
          {'address' === column && value === 'DESC' && <ArrowDown size={16} />}
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
        <div className="flex items-center justify-start gap-3">
          <Link href={`/warehouses/${row.original.id}`}>
            <Button variant="ghost" size={'icon'}>
              <Eye />
            </Button>
          </Link>
          <Button variant="ghost" size={'icon'}>
            <Trash />
          </Button>
        </div>
      );
    },
    header: () => 'Actions',
  },
];
