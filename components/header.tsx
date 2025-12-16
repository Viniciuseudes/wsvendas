"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#8B0000]">WSVENDASMOTOS</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-[#8B0000] transition-colors">
            Início
          </Link>
          <Link href="/#estoque" className="text-sm font-medium text-foreground hover:text-[#8B0000] transition-colors">
            Estoque
          </Link>
          <Link
            href="/quem-somos"
            className="text-sm font-medium text-foreground hover:text-[#8B0000] transition-colors"
          >
            Quem Somos
          </Link>
          <Link href="/#contato" className="text-sm font-medium text-foreground hover:text-[#8B0000] transition-colors">
            Contato
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-[#8B0000] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              href="/#estoque"
              className="text-sm font-medium text-foreground hover:text-[#8B0000] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Estoque
            </Link>
            <Link
              href="/quem-somos"
              className="text-sm font-medium text-foreground hover:text-[#8B0000] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Quem Somos
            </Link>
            <Link
              href="/#contato"
              className="text-sm font-medium text-foreground hover:text-[#8B0000] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
