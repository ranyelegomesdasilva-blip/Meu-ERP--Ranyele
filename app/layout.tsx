import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'ERP Pink - Cadastro de Produtos',
  description: 'Sistema de gestão empresarial moderno',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body suppressHydrationWarning className="font-sans">{children}</body>
    </html>
  );
}
