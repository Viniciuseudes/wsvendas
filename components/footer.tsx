import { Facebook, Instagram, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer id="contato" className="bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link href="/" className="text-2xl font-bold text-[#8B0000]">
            WSVENDASMOTOS
          </Link>

          <address className="not-italic text-gray-400">
            Av. Principal, 1234 - Centro
            <br />
            São Paulo - SP, 01234-567
          </address>

          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#8B0000]"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#8B0000]"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#8B0000]"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} WSVENDASMOTOS. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
