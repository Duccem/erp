'use client';
import { Primitives } from '@/lib/ddd/types/primitives';
import { Button } from '@/lib/ui/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/lib/ui/components/ui/sheet';
import { Provider } from '@/modules/provider/domain/provider';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import EditProviderForm from './form';

const EditProviderSheet = ({ provider }: { provider: Primitives<Provider> }) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <Edit />
        </Button>
      </SheetTrigger>
      <SheetContent className=" sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-lg">
          <SheetHeader className="px-0">
            <SheetTitle className="text-2xl">Proveedor: {provider.name}</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <EditProviderForm toggle={() => setOpen(!open)} provider={provider} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditProviderSheet;
