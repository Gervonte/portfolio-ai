import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '@/lib/theme';
import { generatePageMetadata, generateStructuredData } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '../styles/sakura.css';

const inter = Inter({ subsets: ['latin'] });

// Navigation links
const navigationLinks = [
  { link: '#about', label: 'About' },
  { link: '#work', label: 'Work' },
  { link: '#experience', label: 'Experience' },
  { link: '#contact', label: 'Contact' },
];

export const metadata: Metadata = generatePageMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Notifications />
          <Header links={navigationLinks} />
          <main style={{ paddingTop: '60px' }}>{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
