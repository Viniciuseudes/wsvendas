import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Motorcycle } from "@/lib/data";

interface MotorcycleCardProps {
  motorcycle: Motorcycle;
}

export function MotorcycleCard({ motorcycle }: MotorcycleCardProps) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(motorcycle.price);

  const formattedKm = new Intl.NumberFormat("pt-BR").format(motorcycle.km);

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg border-border">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {/* Verifica se existe URL da imagem. Se sim, mostra a imagem. Se não, mostra 'Sem Foto' */}
        {motorcycle.imageUrl ? (
          <Image
            src={motorcycle.imageUrl}
            alt={`${motorcycle.brand} ${motorcycle.model}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <span className="text-sm">Sem Foto</span>
          </div>
        )}

        {/* REMOVIDO: O ícone flutuante do WhatsApp que ficava aqui */}
      </div>

      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-foreground">
          {motorcycle.brand} {motorcycle.model}
        </h3>
        <p className="text-sm text-muted-foreground">
          {motorcycle.year} • {formattedKm} km
        </p>
        <Separator className="my-3" />
        <p className="text-xl font-bold text-[#8B0000]">{formattedPrice}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          asChild
          className="w-full bg-[#8B0000] text-white hover:bg-[#6B0000]"
        >
          <Link href={`/moto/${motorcycle.id}`}>SAIBA MAIS</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
