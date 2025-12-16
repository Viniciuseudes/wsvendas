import Image from "next/image"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Motorcycle } from "@/lib/data"

interface MotorcycleCardProps {
  motorcycle: Motorcycle
}

export function MotorcycleCard({ motorcycle }: MotorcycleCardProps) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(motorcycle.price)

  const formattedKm = new Intl.NumberFormat("pt-BR").format(motorcycle.km)

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse na ${motorcycle.brand} ${motorcycle.model} ${motorcycle.year} - ${formattedPrice}`,
  )
  const whatsappLink = `https://wa.me/5511999999999?text=${whatsappMessage}`

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={motorcycle.imageUrl || "/placeholder.svg"}
          alt={`${motorcycle.brand} ${motorcycle.model}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform hover:scale-110"
          aria-label="Contato via WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground">
          {motorcycle.brand} {motorcycle.model}
        </h3>
        <p className="text-sm text-muted-foreground">
          {motorcycle.year} • {formattedKm} km
        </p>
        <Separator className="my-3" />
        <p className="text-xl font-bold text-foreground">{formattedPrice}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-[#8B0000] text-white hover:bg-[#6B0000]">
          <Link href={`/moto/${motorcycle.id}`}>SAIBA MAIS</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
