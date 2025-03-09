'use client';

import { SlidersIcon } from 'lucide-react';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { useDataTableStore } from './provider';

export function ColumnVisibility({ disabled }: { disabled?: boolean }) {
  const { columns } = useDataTableStore((store) => store);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" disabled={disabled} className="h-9">
          <SlidersIcon size={18} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0 " align="start">
        <div className="flex flex-col p-4 space-y-2 max-h-[352px] overflow-auto">
          {columns
            .filter((column) => column.columnDef.enableHiding !== false && column.id !== 'status')
            .map((column) => {
              return (
                <div key={column.id} className="flex items-center space-x-2">
                  <Checkbox
                    className=""
                    id={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(checked) => column.toggleVisibility(checked)}
                  />
                  <label
                    htmlFor={column.id}
                    className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {column.id}
                  </label>
                </div>
              );
            })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
