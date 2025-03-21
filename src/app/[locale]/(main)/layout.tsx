import AppBreadcrumb from '@/components/shared/breadcrumb';
import { AppSidebar } from '@/components/shared/sidebar';
import { AppTopBar } from '@/components/shared/top-bar';
import { UserSession } from '@/components/shared/user-session';
import { SidebarInset, SidebarProvider } from '@/lib/ui/components/ui/sidebar';
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
        <SidebarInset>
          <div className="flex flex-col items-start w-full">
            <AppTopBar />

            <Suspense>{children}</Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
