import './globals.css';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Dropbox Brand Clone - Kraftbase',
  description: 'Frontend assignment',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
