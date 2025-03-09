'use client';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable, type VisibilityState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table';
import { DataTablePagination } from './pagination';
import { useDataTableStore } from './provider';
import { CollectionData, Meta } from './types';
import { updateColumnVisibilityAction } from './update-column-visibility-action';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hasNextPage?: boolean;
  pageSize?: number;
  meta: Meta;
  initialColumnVisibility: VisibilityState;
  columnsKey: string;
  actions: Record<string, (row: TData) => void>;
}

export function DataTable<TData extends CollectionData, TValue>({
  columns,
  data: initialData,
  meta: pageMeta,
  initialColumnVisibility,
  columnsKey,
  actions,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(initialData);
  const { setColumns, rowSelection, setRowSelection } = useDataTableStore((store) => store);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility ?? {});
  const table = useReactTable<TData>({
    getRowId: ({ id }) => id,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      rowSelection,
      columnVisibility,
    },
  });

  useEffect(() => {
    setColumns(table.getAllLeafColumns());
  }, [columnVisibility]);

  useEffect(() => {
    updateColumnVisibilityAction({
      key: columnsKey,
      data: columnVisibility,
    });
  }, [columnVisibility]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <>
      <div className="mb-8 relative w-full rounded-md border">
        <Table className="">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination meta={pageMeta} />
    </>
  );
}

export default DataTable;
