import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SevaSetu | Citizen Service Agent',
  description: 'AI-powered citizen service workflow demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
