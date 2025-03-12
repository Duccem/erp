'use client';
import { Button } from '@/lib/ui/components/ui/button';
import { Input } from '@/lib/ui/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/lib/ui/components/ui/sheet';
import { Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

const ChatSheet = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={'outline'} size={'icon'}>
          <Sparkles />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none">
        <div className="bg-background flex flex-col justify-between p-6 border border-sidebar h-full overflow-y-auto no-scroll  rounded-lg">
          <SheetHeader className="w-full">
            <SheetTitle className="text-2xl text-center">Lumen Assist</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <div className="flex flex-1 px-3">
            <div className="flex flex-col gap-2 flex-1  rounded-lg"></div>
          </div>
          <SheetFooter className="w-full flex flex-row justify-between gap-2 items-center">
            <Input placeholder="Escribe lo que quieras" className="w-full" />
            <Button>
              <Send />
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSheet;
