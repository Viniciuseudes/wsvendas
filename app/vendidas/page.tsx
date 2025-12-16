import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { supabase } from "@/lib/supabase";
import { Motorcycle } from "@/lib/data";
import { SoldCard } from "@/components/sold-card";
import { CheckCircle2 } from "lucide-react";

export const revalidate = 0;

async function getSoldMotorcycles() {
  const { data, error } = await supabase
    .from("motorcycles")
    .select("*")
    .eq("sold", true) // Busca APENAS as vendidas
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar vendidas:", error);
    return [];
  }

  // Mapeamento de dados
  const mappedMotos: Motorcycle[] = data.map((item) => ({
    id: item.id,
    brand: item.brand,
    model: item.model,
    year: item.year,
    km: item.km,
    price: item.price,
    imageUrls: item.images || (item.image_url ? [item.image_url] : []),
    transmission: item.transmission,
    fuel: item.fuel,
    color: item.color,
    plateEnd: item.plate_end,
    observations: item.observations,
    sold: true,
    displayOrder: 0,
  }));

  return mappedMotos;
}

export default async function VendidasPage() {
  const soldMotorcycles = await getSoldMotorcycles();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="flex-1">
        <div className="bg-green-700 py-12 text-white text-center">
          <div className="container mx-auto px-4">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-300 mb-4" />
            <h1 className="text-3xl font-bold md:text-5xl">Motos Vendidas</h1>
            <p className="mt-4 text-lg text-green-100 max-w-2xl mx-auto">
              Confira as máquinas que já encontraram seus novos donos. Qualidade
              e procedência que geram confiança.
            </p>
          </div>
        </div>

        <section className="py-12 container mx-auto px-4">
          {soldMotorcycles.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>Nenhuma moto marcada como vendida ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {soldMotorcycles.map((moto) => (
                <SoldCard key={moto.id} motorcycle={moto} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
