'use client';

import { Button } from '@/lib/ui/components/ui/button';
import { Textarea } from '@/lib/ui/components/ui/textarea';
import { CornerDownLeft, Mic, Paperclip } from 'lucide-react';
import { useState } from 'react';

const ChatInput = () => {
  const [value, setValue] = useState('');
  return (
    <div className="w-full">
      <form
        className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring "
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Submitted:', value);
        }}
      >
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          placeholder="Type your message here..."
        />
        <div className="flex items-center p-3 pt-0">
          <Button variant="ghost" size="icon" type="button">
            <Paperclip className="size-4" />
            <span className="sr-only">Attach file</span>
          </Button>

          <Button variant="ghost" size="icon" type="button">
            <Mic className="size-4" />
            <span className="sr-only">Use Microphone</span>
          </Button>

          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Enviar mensaje
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
