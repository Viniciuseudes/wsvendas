import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
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

  // Pega a primeira foto para mostrar no card
  const mainImage = motorcycle.imageUrls?.[0] || null;

  return (
    <Link href={`/moto/${motorcycle.id}`} className="block h-full group">
      <Card className="overflow-hidden border border-gray-100 bg-white rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full cursor-pointer">
        {/* Área da Imagem */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
          {mainImage ? (
            <Image
              src={mainImage}
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

          <div className="absolute bottom-3 left-3">
            <span className="bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {motorcycle.year}
            </span>
          </div>
        </div>

        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            {motorcycle.brand}
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3 group-hover:text-blue-700 transition-colors">
            {motorcycle.model}
          </h3>
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
            <p className="text-xl font-bold text-slate-900">{formattedPrice}</p>
            <span className="text-sm font-medium text-amber-600 group-hover:text-amber-700 bg-amber-50 px-3 py-2 rounded-md transition-colors">
              Saiba mais
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
