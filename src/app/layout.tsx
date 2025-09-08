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

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

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
        {/* Preload critical resources for better LCP */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400 700;
                font-display: swap;
                src: url('/fonts/inter-var.woff2') format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <Notifications />
          {/* Skip to main content link for accessibility */}
          <a
            href="#about"
            style={{
              position: 'absolute',
              top: '-40px',
              left: '6px',
              background: '#E91E63',
              color: 'white',
              padding: '8px',
              textDecoration: 'none',
              borderRadius: '4px',
              zIndex: 10000,
              fontSize: '14px',
              fontWeight: 'bold',
            }}
            onFocus={e => {
              e.target.style.top = '6px';
            }}
            onBlur={e => {
              e.target.style.top = '-40px';
            }}
          >
            Skip to main content
          </a>
          <Header links={navigationLinks} />
          <main style={{ paddingTop: '60px' }}>{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
