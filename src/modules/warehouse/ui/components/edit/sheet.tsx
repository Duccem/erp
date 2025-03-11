'use client';
import { Primitives } from '@/lib/ddd/types/primitives';
import { Button } from '@/lib/ui/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/lib/ui/components/ui/sheet';
import { Warehouse } from '@/modules/warehouse/domain/warehouse';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import EditWarehouseForm from './form';

const EditWarehouseSheet = ({ warehouse }: { warehouse: Primitives<Warehouse> }) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'outline'}>
          <Edit />
          Edit warehouse
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-lg">
          <SheetHeader className="px-0">
            <SheetTitle className="text-2xl">Warehouse {warehouse.name}</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <EditWarehouseForm toggle={() => setOpen((current) => !current)} warehouse={warehouse} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditWarehouseSheet;
