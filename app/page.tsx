import { Header } from "@/components/header";
import { HeroSearch } from "@/components/hero-search";
import { MotorcycleGrid } from "@/components/motorcycle-grid";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { PaginationControl } from "@/components/pagination-control"; // Importa o novo componente
import { supabase } from "@/lib/supabase";
import { Motorcycle } from "@/lib/data";

export const revalidate = 0;

// Configuração de limite por página
const ITEMS_PER_PAGE = 10;

async function getMotorcycles(search?: string, page: number = 1) {
  // Calcula o intervalo para o Supabase (ex: Pag 1 é range 0-9)
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("motorcycles")
    .select("*", { count: "exact" }) // 'count' pede o total de registros para calcular as páginas
    .eq("sold", false)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })
    .range(from, to); // Aplica o limite

  if (search) {
    query = query.or(`brand.ilike.%${search}%,model.ilike.%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Erro ao buscar motos:", error);
    return { mappedMotos: [], totalCount: 0 };
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
      // Novos campos com fallback
      startType: item.start_type || "Elétrica",
      displacement: item.displacement || 0,
    };
  });

  return { mappedMotos, totalCount: count || 0 };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = params.q;
  // Pega a página da URL ou assume 1 se não existir
  const currentPage = Number(params.page) || 1;

  const { mappedMotos, totalCount } = await getMotorcycles(q, currentPage);

  // Calcula o total de páginas
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSearch />
        <section id="estoque" className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Motos Disponíveis
              </h2>
              <span className="text-sm text-muted-foreground">
                Exibindo {mappedMotos.length} de {totalCount} resultados
              </span>
            </div>

            <MotorcycleGrid motorcycles={mappedMotos} />

            {/* Componente de Paginação */}
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
