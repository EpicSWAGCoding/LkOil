'use client'

import { Nunito } from 'next/font/google';

import './globals.css';
import { AuthProvider } from '@/app/contexts/AuthContext';
import { YMaps } from '@pbe/react-yandex-maps';

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({ children, }: Readonly <{ children: React.ReactNode; }>) {
  return (
      <AuthProvider>
        <YMaps>
          <html lang="en">
            <head>
              <link data-rh="true" rel="icon" href="/logo.png" />
            </head>
            <body className={nunito.className}>
                {children}
            </body>
          </html>
        </YMaps>
      </AuthProvider>
  );
}