import { Header } from "@/components/header";
import { HeroSearch } from "@/components/hero-search";
import { MotorcycleGrid } from "@/components/motorcycle-grid";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { supabase } from "@/lib/supabase";
import { Motorcycle } from "@/lib/data";

// Isso garante que a página sempre busque dados novos (sem cache)
export const revalidate = 0;

async function getMotorcycles(search?: string) {
  let query = supabase
    .from("motorcycles")
    .select("*") // Pegamos tudo como está no banco
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`brand.ilike.%${search}%,model.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Erro ao buscar motos:", error);
    return [];
  }

  // AQUI É A MÁGICA: Convertemos os dados do Banco (snake_case) para o Frontend (camelCase)
  // Atuamos como Dev Senior garantindo a integridade dos dados
  const mappedMotos: Motorcycle[] = data.map((item) => ({
    id: item.id,
    brand: item.brand,
    model: item.model,
    year: item.year,
    km: item.km,
    price: item.price,
    imageUrl: item.image_url, // O segredo: image_url (banco) vira imageUrl (front)
    transmission: item.transmission,
    fuel: item.fuel,
    color: item.color,
    plateEnd: item.plate_end,
    observations: item.observations,
  }));

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
