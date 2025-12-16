import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Settings,
  Fuel,
  Palette,
  CreditCard,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { StickyActionBar } from "@/components/sticky-action-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";
import { Motorcycle } from "@/lib/data";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getMotorcycle(id: string) {
  const { data, error } = await supabase
    .from("motorcycles")
    .select(
      `
      id,
      brand,
      model,
      year,
      km,
      price,
      imageUrl:image_url,
      transmission,
      fuel,
      color,
      plateEnd:plate_end,
      observations
    `
    )
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Motorcycle;
}

export default async function MotorcycleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const motorcycle = await getMotorcycle(id);

  if (!motorcycle) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(motorcycle.price);

  const formattedKm = new Intl.NumberFormat("pt-BR").format(motorcycle.km);

  const specs = [
    { icon: Calendar, label: "Ano", value: motorcycle.year },
    { icon: Gauge, label: "Km", value: `${formattedKm} km` },
    { icon: Settings, label: "Câmbio", value: motorcycle.transmission },
    { icon: Fuel, label: "Combustível", value: motorcycle.fuel },
    { icon: Palette, label: "Cor", value: motorcycle.color },
    { icon: CreditCard, label: "Final da Placa", value: motorcycle.plateEnd },
  ];

  const motorcycleName = `${motorcycle.brand} ${motorcycle.model} ${motorcycle.year}`;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1 pb-24 md:pb-12 pt-6">
        <div className="container mx-auto px-4">
          <Button
            asChild
            variant="ghost"
            className="mb-6 hover:text-primary hover:bg-blue-50"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao estoque
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-sm border border-border">
              {motorcycle.imageUrl ? (
                <Image
                  src={motorcycle.imageUrl}
                  alt={`${motorcycle.brand} ${motorcycle.model}`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <span className="text-gray-400 font-medium">
                    Sem imagem disponível
                  </span>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                    {motorcycle.brand}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  {motorcycle.model}
                </h1>
                <p className="mt-4 text-5xl font-black text-primary tracking-tight">
                  {formattedPrice}
                </p>
              </div>

              <Separator />

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-white p-4 rounded-xl border border-border shadow-sm flex flex-col items-center text-center gap-2 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-primary">
                      <spec.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {spec.label}
                      </p>
                      <p className="font-semibold text-gray-900 mt-0.5">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Observations */}
              <Card className="bg-blue-50/50 border-blue-100">
                <CardContent className="p-6">
                  <h2 className="mb-3 text-lg font-bold text-gray-900 flex items-center gap-2">
                    Observações
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {motorcycle.observations ||
                      "Nenhuma observação adicional sobre esta moto."}
                  </p>
                </CardContent>
              </Card>

              {/* Desktop Action Buttons */}
              <div className="hidden gap-4 md:flex">
                <Button
                  asChild
                  className="flex-1 h-14 text-lg bg-[#25D366] hover:bg-[#1fb855] text-white font-bold shadow-lg shadow-green-200 transition-all hover:-translate-y-1"
                >
                  <a
                    href={`https://wa.me/5587992057899?text=${encodeURIComponent(
                      `Olá! Tenho interesse na ${motorcycleName} - ${formattedPrice}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Negociar no WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  className="flex-1 h-14 text-lg bg-primary hover:bg-blue-800 text-white font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
                >
                  <a href="tel:+5587992057899">Ligar Agora</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
      <StickyActionBar motorcycleName={motorcycleName} />
    </div>
  );
}
