'use client';

import { I18nProviderClient } from '@/lib/translation/client';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

export const Providers = ({ children, locale }: { children: React.ReactNode; locale: string }) => (
  <NuqsAdapter>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
      <Toaster />
    </ThemeProvider>
  </NuqsAdapter>
);

export { useTheme } from 'next-themes';
