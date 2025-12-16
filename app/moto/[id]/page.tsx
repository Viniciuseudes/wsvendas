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
  // Select corrigido com renomeação (alias)
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
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pb-24 md:pb-0">
        <div className="container mx-auto px-4 py-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao estoque
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              {motorcycle.imageUrl ? (
                <Image
                  src={motorcycle.imageUrl}
                  alt={`${motorcycle.brand} ${motorcycle.model}`}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {motorcycle.brand} {motorcycle.model}
                </h1>
                <p className="mt-2 text-4xl font-bold text-[#8B0000]">
                  {formattedPrice}
                </p>
              </div>

              <Separator />

              {/* Specs Grid */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-foreground">
                    Especificações
                  </h2>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <spec.icon className="h-5 w-5 text-[#8B0000]" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {spec.label}
                          </p>
                          <p className="font-medium text-foreground">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Observations */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-2 text-lg font-semibold text-foreground">
                    Observações
                  </h2>
                  <p className="text-muted-foreground">
                    {motorcycle.observations || "Nenhuma observação adicional."}
                  </p>
                </CardContent>
              </Card>

              {/* Desktop Action Buttons */}
              <div className="hidden gap-4 md:flex">
                <Button
                  asChild
                  className="flex-1 bg-[#25D366] text-white hover:bg-[#1fb855]"
                >
                  <a
                    href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                      `Olá! Tenho interesse na ${motorcycleName} - ${formattedPrice}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  className="flex-1 bg-[#0066CC] text-white hover:bg-[#0055aa]"
                >
                  <a href="tel:+5511999999999">Ligar</a>
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
