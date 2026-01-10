import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NAVADA OS - Protocol 26/1',
  description: 'Modern operating system optimized for Osoyoo touchscreen displays',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased touch-manipulation select-none">
        {children}
      </body>
    </html>
  );
}
