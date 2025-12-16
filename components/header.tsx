import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Esquerda: Logo e Nome "Compra e Vendas" */}
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <div className="relative h-40 w-40 flex-shrink-0">
            <Image
              src="/logows.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-sm font-medium text-muted-foreground leading-tight max-w-[100px]">
            Compra e Vendas
          </span>
        </Link>

        {/* Centro/Direita: Menu Desktop (Sem botões extras) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Início
          </Link>
          <Link
            href="/#estoque"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Motos Disponíveis
          </Link>
          <Link
            href="/motos-vendidas"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Motos Vendidas
          </Link>
          <Link
            href="/quem-somos"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Quem Somos
          </Link>
        </nav>

        {/* Menu Mobile (Hambúrguer) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="text-left mb-4">Menu</SheetTitle>
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-lg font-medium hover:text-primary">
                Início
              </Link>
              <Link
                href="/#estoque"
                className="text-lg font-medium hover:text-primary"
              >
                Motos Disponíveis
              </Link>
              <Link
                href="/motos-vendidas"
                className="text-lg font-medium hover:text-primary"
              >
                Motos Vendidas
              </Link>
              <Link
                href="/quem-somos"
                className="text-lg font-medium hover:text-primary"
              >
                Quem Somos
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
