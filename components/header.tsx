"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Fundo branco sólido com borda sutil para clareza e elegância
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1 group">
          {/* Logo Tipográfico Moderno */}
          <span className="text-2xl font-black tracking-tighter text-slate-900 italic">
            WS
          </span>
          <span className="text-2xl font-bold tracking-tight text-amber-500 group-hover:text-amber-600 transition-colors">
            VENDAS
          </span>
        </Link>

        {/* Desktop Navigation - Texto sutil, hover elegante */}
        <nav className="hidden items-center gap-8 md:flex">
          {["Início", "Estoque", "Quem Somos", "Contato"].map((item) => (
            <Link
              key={item}
              href={
                item === "Início"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "-")}`
              }
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-amber-500 after:transition-all hover:after:w-full"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="border-t border-gray-100 bg-white md:hidden absolute w-full left-0 shadow-lg">
          <div className="container mx-auto flex flex-col p-4">
            {["Início", "Estoque", "Quem Somos", "Contato"].map((item) => (
              <Link
                key={item}
                href={
                  item === "Início"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className="py-3 text-base font-medium text-slate-600 hover:text-amber-600 border-b border-gray-50 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
