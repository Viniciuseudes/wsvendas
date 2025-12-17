"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, Trash2 } from "lucide-react";

// Configurações dos Sliders
const PRICE_LIMITS = { min: 0, max: 80000, step: 1000 };
const KM_LIMITS = { min: 0, max: 100000, step: 1000 };

export function StockFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMounted = useRef(false);

  // Estados locais
  const [brands, setBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([
    PRICE_LIMITS.min,
    PRICE_LIMITS.max,
  ]);
  const [kmRange, setKmRange] = useState([KM_LIMITS.min, KM_LIMITS.max]);

  // 1. Carrega filtros da URL ao iniciar
  useEffect(() => {
    if (isMounted.current) return; // Evita re-setar se já montou

    const brandsParam = searchParams.get("brands");
    if (brandsParam) setBrands(brandsParam.split(","));

    const minP = Number(searchParams.get("minPrice")) || PRICE_LIMITS.min;
    const maxP = Number(searchParams.get("maxPrice")) || PRICE_LIMITS.max;
    setPriceRange([minP, maxP]);

    const minK = Number(searchParams.get("minKm")) || KM_LIMITS.min;
    const maxK = Number(searchParams.get("maxKm")) || KM_LIMITS.max;
    setKmRange([minK, maxK]);

    isMounted.current = true;
  }, [searchParams]);

  // 2. Efeito Automático (Debounce)
  useEffect(() => {
    if (!isMounted.current) return;

    // Cria um timer para atualizar a URL apenas quando o usuário parar de mexer
    const timer = setTimeout(() => {
      const params = new URLSearchParams();

      // Marcas
      if (brands.length > 0) params.set("brands", brands.join(","));

      // Preço
      if (priceRange[0] > PRICE_LIMITS.min)
        params.set("minPrice", priceRange[0].toString());
      if (priceRange[1] < PRICE_LIMITS.max)
        params.set("maxPrice", priceRange[1].toString());

      // Km
      if (kmRange[0] > KM_LIMITS.min)
        params.set("minKm", kmRange[0].toString());
      if (kmRange[1] < KM_LIMITS.max)
        params.set("maxKm", kmRange[1].toString());

      // Mantém na página 1 ao filtrar
      params.set("page", "1");

      router.push(`/estoque?${params.toString()}`, { scroll: false });
    }, 500); // Espera 500ms

    return () => clearTimeout(timer); // Limpa timer se usuário mexer de novo antes dos 500ms
  }, [brands, priceRange, kmRange, router]);

  // Funções Auxiliares
  const toggleBrand = (brand: string) => {
    setBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setBrands([]);
    setPriceRange([PRICE_LIMITS.min, PRICE_LIMITS.max]);
    setKmRange([KM_LIMITS.min, KM_LIMITS.max]);
    router.push("/estoque");
  };

  const hasActiveFilters =
    brands.length > 0 ||
    priceRange[0] > PRICE_LIMITS.min ||
    priceRange[1] < PRICE_LIMITS.max ||
    kmRange[0] > KM_LIMITS.min ||
    kmRange[1] < KM_LIMITS.max;

  const formatMoney = (val: number) =>
    val.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    });

  const formatKm = (val: number) => `${val.toLocaleString("pt-BR")} km`;

  return (
    <div className="space-y-8">
      {/* --- BOTÃO DE LIMPAR (Só aparece se tiver filtro) --- */}
      {hasActiveFilters && (
        <Button
          variant="destructive"
          onClick={clearFilters}
          className="w-full font-bold shadow-sm"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Remover Filtros
        </Button>
      )}

      {/* --- SEÇÃO DE MARCAS --- */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          Marcas
          {brands.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {brands.length}
            </Badge>
          )}
        </h3>
        <div className="space-y-3">
          {["Honda", "Yamaha", "Shineray", "Outras"].map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={brands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <Label
                htmlFor={brand}
                className="text-sm font-medium leading-none cursor-pointer text-slate-600"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* --- SLIDER DE PREÇO --- */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Faixa de Preço</h3>
        </div>

        <Slider
          defaultValue={[PRICE_LIMITS.min, PRICE_LIMITS.max]}
          max={PRICE_LIMITS.max}
          step={PRICE_LIMITS.step}
          min={PRICE_LIMITS.min}
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-4"
        />

        <div className="flex items-center justify-between mt-2 text-sm text-slate-600 font-medium">
          <span>{formatMoney(priceRange[0])}</span>
          <span>{formatMoney(priceRange[1])}</span>
        </div>
      </div>

      <Separator />

      {/* --- SLIDER DE QUILOMETRAGEM --- */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">Quilometragem</h3>
        </div>

        <Slider
          defaultValue={[KM_LIMITS.min, KM_LIMITS.max]}
          max={KM_LIMITS.max}
          step={KM_LIMITS.step}
          min={KM_LIMITS.min}
          value={kmRange}
          onValueChange={setKmRange}
          className="py-4"
        />

        <div className="flex items-center justify-between mt-2 text-sm text-slate-600 font-medium">
          <span>{formatKm(kmRange[0])}</span>
          <span>{formatKm(kmRange[1])}</span>
        </div>
      </div>
    </div>
  );
}
