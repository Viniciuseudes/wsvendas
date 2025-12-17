"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu, // Voltamos com o ícone padrão para garantir visibilidade
  Phone,
  Search,
  Instagram,
  Home,
  Bike,
  Info,
  ShieldCheck,
} from "lucide-react";

// Configuração dos itens do menu
const navItems = [
  { name: "Início", href: "/", icon: Home },
  { name: "Estoque", href: "/estoque", icon: Bike },
  { name: "Quem Somos", href: "/quem-somos", icon: Info },
  { name: "Vendidas", href: "/vendidas", icon: ShieldCheck },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Efeito que detecta rolagem
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-blue-100 shadow-sm"
          : "bg-white border-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* --- LOGOTIPO: IMAGEM ORIGINAL + TEXTO --- */}
        <Link href="/" className="flex items-center gap-3 group select-none">
          {/* Logo Original */}
          <div className="relative w-40 h-40 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logows.png"
              alt="WS Vendas Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Texto Estilizado */}
          <div className="flex flex-col -space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-[0.15em] font-semibold pl-0.5">
              Compra e
            </span>
            <span className="text-xl font-bold tracking-wide text-[#0f52ba] leading-none font-sans">
              VENDAS
            </span>
          </div>
        </Link>

        {/* --- MENU DESKTOP --- */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#0f52ba] relative py-2",
                pathname === item.href
                  ? "text-[#0f52ba] font-bold"
                  : "text-slate-500"
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[2px] bg-[#0f52ba] transition-all duration-300",
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                )}
              ></span>
            </Link>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-500 hover:text-[#0f52ba]"
          >
            <Search className="w-5 h-5" />
          </Button>
        </nav>

        {/* --- MENU MOBILE (BOTÃO VISÍVEL) --- */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-50 w-12 h-12" // Tamanho garantido
              >
                {/* Ícone Menu CLÁSSICO e VISÍVEL em Azul */}
                <Menu className="w-8 h-8 text-[#0f52ba]" strokeWidth={2.5} />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full border-l border-blue-100 bg-white p-0 flex flex-col"
            >
              {/* Topo do Menu Mobile */}
              <SheetHeader className="p-6 border-b border-blue-50">
                <SheetTitle className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/logows.png"
                      alt="WS Vendas Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-bold tracking-widest text-lg text-[#0f52ba]">
                    MENU
                  </span>
                </SheetTitle>
              </SheetHeader>

              {/* Lista de Links */}
              <div className="flex-1 overflow-y-auto py-8 px-6 bg-slate-50/50">
                <nav className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <SheetClose key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-4 text-xl font-light py-4 px-4 rounded-xl transition-all active:scale-95",
                          pathname === item.href
                            ? "bg-white shadow-md text-[#0f52ba] font-medium border border-blue-100"
                            : "text-slate-600 hover:bg-blue-50 hover:text-[#0f52ba]"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-6 h-6",
                            pathname === item.href
                              ? "text-[#0f52ba]"
                              : "text-slate-400"
                          )}
                        />
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {/* Banner Azul */}
                <div className="mt-8 p-6 bg-gradient-to-br from-[#0f52ba] to-[#003366] rounded-2xl text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/20 transition-colors"></div>

                  <h4 className="font-bold text-lg mb-2 relative z-10">
                    Tem uma moto parada?
                  </h4>
                  <p className="text-blue-100 text-sm mb-4 relative z-10">
                    Transforme ela em dinheiro hoje mesmo.
                  </p>
                  <Button className="w-full bg-white text-[#0f52ba] hover:bg-blue-50 font-bold relative z-10 border-none">
                    Avaliar minha Moto
                  </Button>
                </div>
              </div>

              {/* Rodapé Mobile */}
              <div className="p-6 border-t border-blue-50 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-slate-500">Acompanhe a WS</span>
                  <Link
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-[#0f52ba] hover:bg-[#0f52ba] hover:text-white transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </Link>
                </div>
                <SheetClose asChild>
                  <Button
                    className="w-full h-14 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg shadow-sm rounded-xl"
                    asChild
                  >
                    <Link href="https://wa.me/5584999999999" target="_blank">
                      <Phone className="w-5 h-5 mr-2" />
                      Falar no WhatsApp
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
