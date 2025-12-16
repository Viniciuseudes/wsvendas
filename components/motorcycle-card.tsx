import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <Card className="group overflow-hidden border border-gray-100 bg-white rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
      {/* Área da Imagem */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        {motorcycle.imageUrl ? (
          <Image
            src={motorcycle.imageUrl}
            alt={`${motorcycle.brand} ${motorcycle.model}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            <span className="text-sm font-medium">Sem imagem</span>
          </div>
        )}

        {/* Badge de Ano Minimalista */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {motorcycle.year}
          </span>
        </div>
      </div>

      <CardContent className="p-5 flex-1 flex flex-col">
        {/* Marca pequena e cinza */}
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {motorcycle.brand}
        </div>

        {/* Modelo em destaque escuro */}
        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3">
          {motorcycle.model}
        </h3>

        {/* Detalhes em linha */}
        <div className="flex items-center gap-3 text-sm text-slate-500 mb-6">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            {formattedKm} km
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            {motorcycle.color}
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          {/* Preço em Azul Escuro (Navy) - Elegante */}
          <p className="text-xl font-bold text-slate-900">{formattedPrice}</p>

          {/* Botão sutil, apenas texto ou ícone */}
          <Button
            asChild
            variant="ghost"
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 font-medium p-0 h-auto px-4 py-2"
          >
            <Link href={`/moto/${motorcycle.id}`}>Ver detalhes</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
