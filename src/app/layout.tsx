import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SkipLink from '@/components/SkipLink';
import { generatePageMetadata, generateStructuredData } from '@/lib/seo';
import { theme } from '@/lib/theme';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import '../styles/mobile-tooltips.css';
import '../styles/sakura.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter',
});

// Navigation links
const navigationLinks = [
  { link: '#work', label: 'Work' },
  { link: '#experience', label: 'Experience' },
  { link: '#about', label: 'About' },
  { link: '#contact', label: 'Contact' },
];

export const metadata: Metadata = generatePageMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = generateStructuredData();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Fonts are handled by Next.js Google Fonts */}
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Notifications />
          <SkipLink />
          <Header links={navigationLinks} />
          <main style={{ paddingTop: '60px' }}>{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
