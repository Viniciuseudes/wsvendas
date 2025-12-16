import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Motorcycle } from "@/lib/data";

interface SoldCardProps {
  motorcycle: Motorcycle;
}

export function SoldCard({ motorcycle }: SoldCardProps) {
  // Pega a primeira foto ou null
  const mainImage = motorcycle.imageUrls?.[0] || null;

  return (
    // Sem LINK aqui, é apenas um card estático
    <Card className="overflow-hidden border border-red-100 bg-slate-50 opacity-90 rounded-xl flex flex-col h-full grayscale-[0.3]">
      {/* Área da Imagem */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={`${motorcycle.brand} ${motorcycle.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            <span className="text-sm font-medium">Sem imagem</span>
          </div>
        )}

        {/* Badge VENDIDA Gigante */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Badge className="text-xl px-6 py-2 bg-green-600 hover:bg-green-600 border-2 border-white shadow-2xl uppercase tracking-widest font-black rotate-[-12deg]">
            VENDIDA
          </Badge>
        </div>
      </div>

      <CardContent className="p-5 flex-1 flex flex-col text-center">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {motorcycle.brand}
        </div>

        <h3 className="text-lg font-bold text-slate-700 leading-tight mb-2">
          {motorcycle.model}
        </h3>

        <div className="text-sm text-slate-500 mb-4">
          {motorcycle.year} • {motorcycle.color}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-sm font-medium text-green-700">
            Mais um sonho realizado!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
