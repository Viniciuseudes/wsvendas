import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Configuração correta da fonte para carregar em todos os dispositivos
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // Cria a variável CSS para o Tailwind usar
  display: "swap",
});

export const metadata: Metadata = {
  title: "WSVENDAS - Motos Premium",
  description: "Qualidade, procedência e as melhores condições do mercado.",
};

// Configuração essencial para funcionar o zoom e escala no iPhone/Android
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
