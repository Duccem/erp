'use client';

import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NuqsAdapter>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <Toaster />
    </ThemeProvider>
  </NuqsAdapter>
);

export { useTheme } from 'next-themes';
