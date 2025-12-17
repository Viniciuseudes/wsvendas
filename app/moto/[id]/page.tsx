import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
import {
  Calendar,
  Gauge,
  FileText,
  ChevronLeft,
  MessageCircle,
  Phone,
  Ban,
  Zap, // Ícone para Partida
  Settings, // Ícone para Cilindradas
} from "lucide-react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { supabase } from "@/lib/supabase";
import type { Motorcycle } from "@/lib/data";
import { ShareButton } from "@/components/share-button";

export const revalidate = 0;

async function getMotorcycle(id: string): Promise<Motorcycle | null> {
  const { data, error } = await supabase
    .from("motorcycles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  let images: string[] = [];
  if (data.images && Array.isArray(data.images) && data.images.length > 0) {
    images = data.images;
  } else if (data.image_url) {
    images = [data.image_url];
  }

  return {
    id: data.id,
    brand: data.brand,
    model: data.model,
    year: data.year,
    km: data.km,
    price: data.price,
    imageUrls: images,
    transmission: data.transmission,
    fuel: data.fuel,
    color: data.color,
    plateEnd: data.plate_end,
    observations: data.observations,
    sold: data.sold || false,
    displayOrder: data.display_order || 0,
    // NOVOS CAMPOS
    startType: data.start_type || "Não informada",
    displacement: data.displacement || 0,
  };
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const moto = await getMotorcycle(id);

  if (!moto) {
    return {
      title: "Moto não encontrada | WS Vendas",
    };
  }

  const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(moto.price);

  return {
    title: `${moto.brand} ${moto.model} - ${price}`,
    description: `${moto.year} • ${moto.displacement}cc • ${moto.km}km. ${
      moto.observations || "Confira!"
    }`,
    openGraph: {
      images: [moto.imageUrls[0] || "/placeholder.jpg"],
    },
  };
}

export default async function MotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const motorcycle = await getMotorcycle(id);

  if (!motorcycle) return notFound();

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(motorcycle.price);

  const formattedKm = new Intl.NumberFormat("pt-BR").format(motorcycle.km);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Voltar para o estoque
            </Link>

            <ShareButton
              title={`${motorcycle.brand} ${motorcycle.model}`}
              text={`Olha essa máquina: ${motorcycle.model} (${motorcycle.displacement}cc) por ${formattedPrice}`}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* CARROSSEL */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 relative">
                {motorcycle.sold && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
                    <Badge className="text-xl px-6 py-2 bg-red-600 border-2 border-white shadow-2xl uppercase tracking-widest font-black -rotate-12">
                      VENDIDA
                    </Badge>
                  </div>
                )}

                {motorcycle.imageUrls.length > 0 ? (
                  <Carousel className="w-full">
                    <CarouselContent>
                      {motorcycle.imageUrls.map((img, index) => (
                        <CarouselItem key={index}>
                          <div className="relative aspect-[4/3] w-full bg-gray-100">
                            <Image
                              src={img}
                              alt={`${motorcycle.model} - Foto ${index + 1}`}
                              fill
                              className="object-cover"
                              priority={index === 0}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {motorcycle.imageUrls.length > 1 && (
                      <>
                        <CarouselPrevious className="left-2 opacity-70 hover:opacity-100 z-30" />
                        <CarouselNext className="right-2 opacity-70 hover:opacity-100 z-30" />
                      </>
                    )}
                  </Carousel>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-gray-100 text-muted-foreground">
                    Sem imagem disponível
                  </div>
                )}
              </div>
              <p className="text-center text-sm text-gray-500">
                {motorcycle.imageUrls.length} fotos disponíveis
              </p>
            </div>

            {/* INFO */}
            <div className="flex flex-col space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className="text-primary bg-primary/5"
                  >
                    {motorcycle.brand}
                  </Badge>
                  <Badge variant="secondary" className="bg-slate-100">
                    {motorcycle.displacement}cc
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                  {motorcycle.model}
                </h1>

                {motorcycle.sold ? (
                  <p className="mt-2 text-2xl font-bold text-muted-foreground line-through decoration-red-500">
                    {formattedPrice}
                  </p>
                ) : (
                  <p className="mt-2 text-3xl font-bold text-blue-700">
                    {formattedPrice}
                  </p>
                )}
              </div>

              {!motorcycle.sold && (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white shadow-md"
                    asChild
                  >
                    <Link
                      href={`https://wa.me/5587992057899?text=Olá, interesse na ${motorcycle.model} (${motorcycle.displacement}cc)`}
                      target="_blank"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Negociar no WhatsApp
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full gap-2"
                    asChild
                  >
                    <Link href="tel:+5587992057899">
                      <Phone className="h-5 w-5" />
                      Ligar Agora
                    </Link>
                  </Button>
                </div>
              )}

              <Separator />

              {/* GRID DE ESPECIFICAÇÕES ATUALIZADO */}
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Ano</span>
                  <div className="flex items-center font-medium">
                    <Calendar className="mr-2 h-4 w-4 text-primary" />
                    {motorcycle.year}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Km</span>
                  <div className="flex items-center font-medium">
                    <Gauge className="mr-2 h-4 w-4 text-primary" />
                    {formattedKm} km
                  </div>
                </div>

                {/* NOVOS ÍCONES E CAMPOS */}
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Motor</span>
                  <div className="flex items-center font-medium">
                    <Settings className="mr-2 h-4 w-4 text-primary" />
                    {motorcycle.displacement} cc
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Partida</span>
                  <div className="flex items-center font-medium">
                    <Zap className="mr-2 h-4 w-4 text-primary" />
                    {motorcycle.startType}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Câmbio</span>
                  <p className="font-medium">{motorcycle.transmission}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Cor</span>
                  <p className="font-medium">{motorcycle.color}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">
                    Placa Final
                  </span>
                  <p className="font-medium">{motorcycle.plateEnd}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">
                    Combustível
                  </span>
                  <p className="font-medium">{motorcycle.fuel}</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <FileText className="h-5 w-5 text-primary" />
                  Observações
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  {motorcycle.observations || "Nenhuma observação adicional."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
