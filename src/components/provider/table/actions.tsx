'use client';

import { Button } from '@/lib/ui/components/ui/button';
import { useDataTableStore } from '@/lib/ui/components/ui/data-table/provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/lib/ui/components/ui/dropdown-menu';
import { Ban, ChevronDown } from 'lucide-react';
import CreateProviderSheet from '../create/sheet';

const ProvidersActions = () => {
  const { setRowSelection, rowSelection } = useDataTableStore((store) => store);
  const transactionIds = Object.keys(rowSelection);
  if (transactionIds.length === 0) {
    return <CreateProviderSheet />;
  }
  return (
    <div className="">
      <div className="flex items-center">
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="space-x-2 h-9">
                <span>Actions</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]" sideOffset={8}>
              <DropdownMenuGroup>
                <DropdownMenuItem className="gap-3" onClick={() => setRowSelection({})}>
                  <Ban className="size-4" />
                  <span>Cancel</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ProvidersActions;
