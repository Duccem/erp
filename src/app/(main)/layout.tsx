import { AppSidebar } from '@/lib/ui/components/internal/sidebar';
import { AppTopBar } from '@/lib/ui/components/internal/top-bar';
import { UserSession } from '@/lib/ui/components/internal/user-session';
import { SidebarProvider } from '@/lib/ui/components/ui/sidebar';
import { Suspense } from 'react';

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
