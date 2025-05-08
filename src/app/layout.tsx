import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Doris Zhang | Personal Website",
  description: "Welcome to Doris Liyu Zhang's personal website - Computer Science student at HKUST",
  icons: {
    icon: '/images/favicon.svg',
    apple: '/images/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
