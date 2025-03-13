import '@/assets/globals.css';
import iconDark from '@/assets/images/lumen-dark.png';
import icon from '@/assets/images/lumen-light.png';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Providers } from './providers';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ducen ERP',
  description: 'Powered AI Administrative Assistant',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href={icon.src} sizes="any" className="hidden dark:block" />
      <link rel="icon" href={iconDark.src} sizes="any" className="dark:hidden" />
      <body className={`${nunito.className} antialiased`} suppressHydrationWarning>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
