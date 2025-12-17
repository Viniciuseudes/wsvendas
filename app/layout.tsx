import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://wsvendasmotos.vercel.app/";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "WS Vendas | Motos Seminovas e Novas",
    template: "%s | WS Vendas", // Isso cria títulos automáticos tipo "Honda XRE 300 | WS Vendas"
  },
  description:
    "Encontre a moto dos seus sonhos com procedência e garantia. Confira nosso estoque atualizado de seminovas.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: "WS Vendas",
    images: [
      {
        url: "/og-image-padrao.jpg", // Crie uma imagem padrão 1200x630px e coloque na pasta public
        width: 1200,
        height: 630,
        alt: "WS Vendas - Estoque de Motos",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Sonner />
        </ThemeProvider>
      </body>
    </html>
  );
}
