import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    // Fundo Slate-950 (Quase preto)
    <footer id="contato" className="bg-slate-950 text-slate-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-3 md:text-left text-center">
          {/* Coluna 1: Marca */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link
              href="/"
              className="text-3xl font-black italic tracking-tighter text-white"
            >
              WS<span className="text-amber-500">VENDAS</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs">
              Sua referência em motos novas e seminovas. Qualidade e confiança
              em cada negociação.
            </p>
          </div>

          {/* Coluna 2: Contato */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-white font-bold text-lg">Contato</h4>
            <address className="not-italic text-sm leading-relaxed">
              Av. Principal, 1234 - Centro
              <br />
              São Paulo - SP
            </address>
            <a
              href="https://wa.me/5587992057899"
              className="text-white font-bold text-lg hover:text-amber-500 transition-colors"
            >
              (87) 9 9205-7899
            </a>
          </div>

          {/* Coluna 3: Social */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-white font-bold text-lg">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-slate-900 rounded-full hover:bg-amber-500 hover:text-white transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-900 rounded-full hover:bg-amber-500 hover:text-white transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-900 rounded-full hover:bg-amber-500 hover:text-white transition-all"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} WS Vendas. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
