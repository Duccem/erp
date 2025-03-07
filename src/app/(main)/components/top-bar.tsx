'use client';

import { authClient } from '@/lib/auth/client';
import { BetterUser } from '@/lib/auth/server';
import { Avatar, AvatarFallback, AvatarImage } from '@/lib/ui/components/ui/avatar';
import { Button } from '@/lib/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/ui/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/ui/components/ui/select';
import { Bell, LogOut, Sparkles, SunMoon, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from 'usehooks-ts';
import { AppSidebarButton } from './sidebar';

export const AppTopBar = () => {
  return (
    <div className="flex w-full justify-between items-center pl-5 pr-8 py-5">
      <div className="flex w-1/2 items-center gap-5">
        <AppSidebarButton />
      </div>
      <div className="flex items-center gap-3">
        <ProfileButton />
      </div>
    </div>
  );
};

const ProfileButton = () => {
  const router = useRouter();
  const [user] = useLocalStorage<BetterUser | null>('user', null);

  const { setTheme, theme } = useTheme();

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="w-10 h-10 rounded-full border p-0 outline-none border-none focus-visible:outline-none focus:outline-none cursor-pointer"
        >
          <Avatar className="h-10 w-10 rounded-full bg-secondary">
            <AvatarImage src={user?.image || ''} alt={user?.name || ''} className="object-contain" />
            <AvatarFallback className="rounded-lg">
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56" align="end" sideOffset={8}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.name || ''}</span>
              <span className="truncate text-xs">{user?.email || ''}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 text-sm  cursor-pointer">
            <Sparkles className="size-4" />
            Mejora a pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2 text-sm  cursor-pointer" onClick={() => router.push('/profile')}>
            <User className="size-4" />
            Perfil
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-2 text-sm  cursor-pointer">
            <Bell className="size-4" />
            Notificaciones
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <div className="flex justify-between items-center gap-3 py-3 pr-3">
            <div className="ml-2 flex justify-start items-center gap-2">
              <SunMoon className="size-4" />
              Tema
            </div>
            <Select defaultValue={theme} onValueChange={(value) => setTheme(value)}>
              <SelectTrigger className=" w-1/2 p-2 h-[25px]">
                <SelectValue placeholder="select" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value={'light'}>
                  <span className="flex w-full justify-between items-center gap-3">Light</span>
                </SelectItem>
                <SelectItem value={'dark'}>
                  <span className="flex w-full justify-between items-center gap-3">Dark</span>
                </SelectItem>
                <SelectItem value={'system'}>
                  <span className="flex w-full justify-between items-center gap-3">System</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-sm  cursor-pointer" onClick={logout}>
          <LogOut className="size-4" />
          Salir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
