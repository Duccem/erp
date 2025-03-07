import { SidebarProvider } from '@/lib/ui/components/ui/sidebar';
import { Suspense } from 'react';
import { AppSidebar } from './components/sidebar';
import { AppTopBar } from './components/top-bar';
import { UserSession } from './components/user-session';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex justify-start items-start w-full ">
      <UserSession />
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col items-start w-full">
          <AppTopBar />
          <Suspense>{children}</Suspense>
        </div>
      </SidebarProvider>
    </div>
  );
}
