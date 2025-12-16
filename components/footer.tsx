import { Facebook, Instagram, Youtube, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    // Fundo Slate-950 (Quase preto)
    <footer id="contato" className="bg-slate-950 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Coluna 1: Marca e Sobre */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-3xl font-black italic tracking-tighter text-white"
            >
              WS<span className="text-amber-500">VENDAS</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Sua referência em motos novas e seminovas em Ouricuri e toda
              região do Araripe. Qualidade, procedência e confiança em cada
              negociação.
            </p>
          </div>

          {/* Coluna 2: Contato */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg">Fale Conosco</h4>

            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                <address className="not-italic text-sm leading-relaxed">
                  Ouricuri - Pernambuco
                  <br />
                  Região do Araripe
                </address>
              </div>

              <a
                href="https://wa.me/5587992057899"
                target="_blank"
                className="flex items-center gap-3 hover:text-white transition-colors group"
              >
                <Phone className="h-5 w-5 text-amber-500 group-hover:text-green-500 transition-colors" />
                <span className="font-bold text-lg">(87) 9 9205-7899</span>
              </a>
            </div>
          </div>

          {/* Coluna 3: Redes Sociais */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg">Siga a gente</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/wsmotopecaseacessorios_?igsh=MWczYTkwZmpnb29tbg=="
                target="_blank"
                className="p-3 bg-slate-900 rounded-lg hover:bg-gradient-to-tr hover:from-amber-600 hover:to-purple-600 hover:text-white transition-all duration-300 border border-slate-800 hover:border-transparent group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 border border-slate-800 hover:border-transparent"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-slate-900 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 border border-slate-800 hover:border-transparent"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Coluna 4: Localização (Mapa Pequeno) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg">Localização</h4>
            <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4003.511360162517!2d-40.09028612493519!3d-7.889592792133098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x79ff3001c3dcb7f%3A0x4f7851d0832b1b5d!2sws%20pe%C3%A7as%20e%20acess%C3%B3rios!5e1!3m2!1spt-BR!2sbr!4v1765904747077!5m2!1spt-BR!2sbr"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-32 opacity-80 hover:opacity-100 transition-opacity"
              ></iframe>
              <div className="p-2 text-center">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  className="text-xs text-amber-500 hover:underline"
                >
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            © {new Date().getFullYear()} WS Vendas. Todos os direitos
            reservados.
          </p>
          <p>Desenvolvido com tecnologia de ponta; Por Vinicius Eudes .</p>
        </div>
      </div>
    </footer>
  );
}
