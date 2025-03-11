'use client';
import { Button } from '@/lib/ui/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/lib/ui/components/ui/sheet';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateSubCategoryForm from './form';

const CreateSubCategorySheet = ({ categoryId }: { categoryId: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'outline'}>
          <Plus className="h-4 w-4" />
          <span>Agregar subcategoría</span>
        </Button>
      </SheetTrigger>
      <SheetContent className=" sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-lg">
          <SheetHeader className="px-0">
            <SheetTitle className="text-2xl">Agrega una sub categoria</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <CreateSubCategoryForm toggle={() => setOpen((current) => !current)} categoryId={categoryId} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateSubCategorySheet;
