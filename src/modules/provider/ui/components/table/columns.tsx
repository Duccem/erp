'use client';
import { Primitives } from '@/lib/ddd/types/primitives';
import { Button } from '@/lib/ui/components/ui/button';
import { Checkbox } from '@/lib/ui/components/ui/checkbox';
import { useSortQuery } from '@/lib/ui/components/ui/data-table/hooks';
import { Provider } from '@/modules/provider/domain/provider';
import { ProviderStatusValue } from '@/modules/provider/domain/provider-status';
import { ProviderTypeValue } from '@/modules/provider/domain/provider-type';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, Eye } from 'lucide-react';
import Link from 'next/link';
import DeleteProviderDialog from '../delete/delete-dialog';

const transformType = (type: string) => {
  switch (type) {
    case ProviderTypeValue.COMPANY:
      return 'Empresa';
    case ProviderTypeValue.PERSON:
      return 'Persona';
    default:
      break;
  }
};

const transformStatus = (status: string) => {
  switch (status) {
    case ProviderStatusValue.ACTIVE:
      return 'Activo';
    case ProviderStatusValue.INACTIVE:
      return 'Inactivo';
    default:
      break;
  }
};

export const providerColumns: ColumnDef<Primitives<Provider>>[] = [
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
    accessorKey: 'type',
    cell: ({ row }) => transformType(row.original.type),
    header: () => {
      const { createSortQuery, column, value } = useSortQuery();
      return (
        <Button className="p-0 hover:bg-transparent space-x-2" variant="ghost" onClick={() => createSortQuery('type')}>
          <span>Tipo</span>
          {'type' === column && value === 'ASC' && <ArrowUp size={16} />}
          {'type' === column && value === 'DESC' && <ArrowDown size={16} />}
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    cell: ({ row }) => transformStatus(row.original.status),
    header: () => {
      const { createSortQuery, column, value } = useSortQuery();
      return (
        <Button
          className="p-0 hover:bg-transparent space-x-2"
          variant="ghost"
          onClick={() => createSortQuery('status')}
        >
          <span>Tipo</span>
          {'status' === column && value === 'ASC' && <ArrowUp size={16} />}
          {'status' === column && value === 'DESC' && <ArrowDown size={16} />}
        </Button>
      );
    },
  },
  {
    accessorKey: 'image',
    cell: ({ row }) => (
      <div>
        <img className="w-10 h-10 rounded-full" src={row.original.image} alt={row.original.name} />
      </div>
    ),
    header: () => 'Logo',
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
          <Link href={`/providers/${row.original.id}`}>
            <Button variant="ghost" size={'icon'}>
              <Eye />
            </Button>
          </Link>
          <DeleteProviderDialog provider={row.original} />
        </div>
      );
    },
    header: () => 'Actions',
  },
];
