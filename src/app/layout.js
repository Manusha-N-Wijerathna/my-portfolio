import { Inter } from 'next/font/google';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Manusha Nuwan | Portfolio',
  description: 'Freelance UI/UX Designer & Frontend Developer',
  icons: {
    icon: '/mnw_logo.svg',
    apple: '/mnw_logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}