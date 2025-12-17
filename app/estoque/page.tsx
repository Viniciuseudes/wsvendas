import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotorcycleGrid } from "@/components/motorcycle-grid";
import { PaginationControl } from "@/components/pagination-control";
import { StockFilters } from "@/components/stock-filters";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { supabase } from "@/lib/supabase";
import { Motorcycle } from "@/lib/data";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export const revalidate = 0;
const ITEMS_PER_PAGE = 12;

// --- LÓGICA DE BUSCA COM FILTROS ---
async function getStockMotorcycles(params: {
  [key: string]: string | undefined;
}) {
  const page = Number(params.page) || 1;
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("motorcycles")
    .select("*", { count: "exact" })
    .eq("sold", false)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false })
    .range(from, to);

  // 1. Filtro de Preço
  if (params.minPrice) query = query.gte("price", params.minPrice);
  if (params.maxPrice) query = query.lte("price", params.maxPrice);

  // 2. Filtro de Km
  if (params.minKm) query = query.gte("km", params.minKm);
  if (params.maxKm) query = query.lte("km", params.maxKm);

  // 3. Filtro de Marcas
  if (params.brands) {
    const selected = params.brands.split(",");
    const mainBrands = ["Honda", "Yamaha", "Shineray"];

    if (selected.includes("Outras")) {
      const excludedBrands = mainBrands.filter((b) => !selected.includes(b));
      if (excludedBrands.length > 0) {
        query = query.not("brand", "in", `(${excludedBrands.join(",")})`);
      }
    } else {
      query = query.in("brand", selected);
    }
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Erro no estoque:", error);
    return { motos: [], total: 0 };
  }

  const motos: Motorcycle[] = data.map((item) => ({
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
    sold: item.sold,
    displayOrder: item.display_order,
    startType: item.start_type || "Elétrica",
    displacement: item.displacement || 0,
  }));

  return { motos, total: count || 0 };
}

export default async function EstoquePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const { motos, total } = await getStockMotorcycles(params);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const currentPage = Number(params.page) || 1;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      {/* --- CABEÇALHO NOVO (ESTILO HERO SEARCH) --- */}
      <div className="relative w-full bg-slate-900 py-16 overflow-hidden shadow-lg">
        {/* Background Pattern sutil */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Glow Dourado sutil no fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="container relative mx-auto px-4 text-center md:text-left z-10">
          <h1 className="text-3xl font-black md:text-5xl tracking-tight mb-4 text-white">
            Nosso Estoque
          </h1>
          {/* Ajustei a cor do texto para slate-300 para combinar com o fundo escuro */}
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl">
            Encontre a moto perfeita para o seu dia a dia ou lazer.{" "}
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* BARRA LATERAL (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
              <StockFilters />
            </div>
          </aside>

          {/* FILTROS MOBILE */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-blue-200 text-blue-800 bg-blue-50 h-12 text-lg font-semibold"
                >
                  <Filter className="w-5 h-5" />
                  Filtrar e Ordenar
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] overflow-y-auto"
              >
                <div className="py-6">
                  <h2 className="font-bold text-xl mb-6 text-slate-900">
                    Filtros
                  </h2>
                  <StockFilters />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* GRADE DE RESULTADOS */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-medium">
                Mostrando <strong>{motos.length}</strong> de{" "}
                <strong>{total}</strong> ofertas
              </span>
            </div>

            <MotorcycleGrid motorcycles={motos} />

            <div className="mt-12">
              <PaginationControl
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
