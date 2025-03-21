'use client';
import { Button } from '@/lib/ui/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/lib/ui/components/ui/sheet';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from './chat-bubble';
import ChatInput from './input';
import { ChatMessageList } from './message-list';

const ChatSheet = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: 'Hello! How can I help you today?',
      sender: 'ai',
    },
    {
      id: 2,
      content: 'I have a question about the component library.',
      sender: 'user',
    },
    {
      id: 3,
      content: "Sure! I'd be happy to help. What would you like to know?",
      sender: 'ai',
    },
  ]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
            <SheetTitle className="text-2xl text-center">Asistente de Lumen</SheetTitle>
            <SheetClose />
          </SheetHeader>
          <div className="flex flex-1 px-4">
            <div className="flex flex-col gap-2 flex-1  rounded-lg border">
              <ChatMessageList>
                {messages.map((message) => (
                  <ChatBubble key={message.id} variant={message.sender === 'user' ? 'sent' : 'received'}>
                    <ChatBubbleAvatar
                      className="h-8 w-8 shrink-0"
                      src={
                        message.sender === 'user'
                          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop'
                          : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop'
                      }
                      fallback={message.sender === 'user' ? 'US' : 'AI'}
                    />
                    <ChatBubbleMessage variant={message.sender === 'user' ? 'sent' : 'received'}>
                      {message.content}
                    </ChatBubbleMessage>
                  </ChatBubble>
                ))}

                {isLoading && (
                  <ChatBubble variant="received">
                    <ChatBubbleAvatar
                      className="h-8 w-8 shrink-0"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                      fallback="AI"
                    />
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>
                )}
              </ChatMessageList>
            </div>
          </div>
          <SheetFooter className="w-full flex flex-row justify-between gap-2 items-center">
            <ChatInput />
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSheet;
