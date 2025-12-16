import { MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StickyActionBarProps {
  motorcycleName: string
}

export function StickyActionBar({ motorcycleName }: StickyActionBarProps) {
  const whatsappMessage = encodeURIComponent(`Olá! Tenho interesse na ${motorcycleName}`)
  const whatsappLink = `https://wa.me/5511999999999?text=${whatsappMessage}`
  const phoneLink = "tel:+5511999999999"

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background p-4 md:hidden">
      <div className="flex gap-3">
        <Button asChild className="flex-1 bg-[#25D366] text-white hover:bg-[#1fb855]">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-5 w-5" />
            WhatsApp
          </a>
        </Button>
        <Button asChild className="flex-1 bg-[#0066CC] text-white hover:bg-[#0055aa]">
          <a href={phoneLink}>
            <Phone className="mr-2 h-5 w-5" />
            Ligar
          </a>
        </Button>
      </div>
    </div>
  )
}
