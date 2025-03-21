'use client';
import { Button } from '@/lib/ui/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/lib/ui/components/ui/sheet';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreateCategoryForm from './form';

const CreateCategorySheet = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent className=" sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-5 rounded-lg">
          <SheetHeader>
            <SheetTitle className="text-2xl">Create a new category in your organization</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <CreateCategoryForm toggle={() => setOpen((current) => !current)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCategorySheet;
