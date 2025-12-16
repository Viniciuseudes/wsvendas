import { Header } from "@/components/header";
import { HeroSearch } from "@/components/hero-search";
import { MotorcycleGrid } from "@/components/motorcycle-grid";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { supabase } from "@/lib/supabase";
import { Motorcycle } from "@/lib/data";

export const revalidate = 0;

async function getMotorcycles(search?: string) {
  let query = supabase
    .from("motorcycles")
    .select("*")
    .eq("sold", false) // IMPORTANTE: Só pega as que NÃO estão vendidas
    .order("display_order", { ascending: true }) // Respeita sua ordem do admin
    .order("created_at", { ascending: false }); // Desempate por data

  if (search) {
    query = query.or(`brand.ilike.%${search}%,model.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Erro ao buscar motos:", error);
    return [];
  }

  const mappedMotos: Motorcycle[] = data.map((item) => {
    let images: string[] = [];
    if (item.images && Array.isArray(item.images)) {
      images = item.images;
    } else if (item.image_url) {
      images = [item.image_url];
    }

    return {
      id: item.id,
      brand: item.brand,
      model: item.model,
      year: item.year,
      km: item.km,
      price: item.price,
      imageUrls: images,
      transmission: item.transmission,
      fuel: item.fuel,
      color: item.color,
      plateEnd: item.plate_end,
      observations: item.observations,
      sold: item.sold || false,
      displayOrder: item.display_order || 0,
    };
  });

  return mappedMotos;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const motorcycles = await getMotorcycles(q);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSearch />
        <section id="estoque" className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
              Motos Disponiveis ({motorcycles.length})
            </h2>
            <MotorcycleGrid motorcycles={motorcycles} />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
