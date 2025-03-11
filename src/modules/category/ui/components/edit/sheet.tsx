'use client';
import { Primitives } from '@/lib/ddd/types/primitives';
import { Button } from '@/lib/ui/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/lib/ui/components/ui/sheet';
import { Category } from '@/modules/category/domain/category';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import EditCategoryForm from './form';

const EditCategorySheet = ({ category }: { category: Primitives<Category> }) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'outline'}>
          <Edit />
          Edita la categoría
        </Button>
      </SheetTrigger>
      <SheetContent className=" sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-lg">
          <SheetHeader className="px-0">
            <SheetTitle className="text-2xl">Categoria {category.name}</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <EditCategoryForm toggle={() => setOpen((current) => !current)} category={category} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditCategorySheet;
