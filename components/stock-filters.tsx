"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MAIN_BRANDS = ["Honda", "Yamaha", "Shineray"];

export function StockFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados locais
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [minKm, setMinKm] = useState(searchParams.get("minKm") || "");
  const [maxKm, setMaxKm] = useState(searchParams.get("maxKm") || "");

  // Estado das marcas (array de strings)
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    const brandsParam = searchParams.get("brands");
    return brandsParam ? brandsParam.split(",") : [];
  });

  // Aplica os filtros na URL
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    if (minKm) params.set("minKm", minKm);
    else params.delete("minKm");
    if (maxKm) params.set("maxKm", maxKm);
    else params.delete("maxKm");

    if (selectedBrands.length > 0) {
      params.set("brands", selectedBrands.join(","));
    } else {
      params.delete("brands");
    }

    // Reseta para a página 1 ao filtrar
    params.set("page", "1");

    router.push(`/estoque?${params.toString()}`);
  };

  // Handler para checkbox de marcas
  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands((prev) =>
      checked ? [...prev, brand] : prev.filter((b) => b !== brand)
    );
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setMinKm("");
    setMaxKm("");
    setSelectedBrands([]);
    router.push("/estoque");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" /> Filtros
        </h3>
        {(minPrice ||
          maxPrice ||
          minKm ||
          maxKm ||
          selectedBrands.length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-red-500 h-8 px-2"
          >
            Limpar <X className="w-3 h-3 ml-1" />
          </Button>
        )}
      </div>

      <Accordion
        type="multiple"
        defaultValue={["price", "km", "brands"]}
        className="w-full"
      >
        {/* --- FILTRO DE PREÇO --- */}
        <AccordionItem value="price">
          <AccordionTrigger>Faixa de Preço</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 p-1">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Mínimo (R$)
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Máximo (R$)
                </Label>
                <Input
                  type="number"
                  placeholder="Sem limite"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* --- FILTRO DE QUILOMETRAGEM --- */}
        <AccordionItem value="km">
          <AccordionTrigger>Quilometragem</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 p-1">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Mínimo (km)
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={minKm}
                  onChange={(e) => setMinKm(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Máximo (km)
                </Label>
                <Input
                  type="number"
                  placeholder="Qualquer"
                  value={maxKm}
                  onChange={(e) => setMaxKm(e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* --- FILTRO DE MARCAS --- */}
        <AccordionItem value="brands">
          <AccordionTrigger>Marcas</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {MAIN_BRANDS.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`brand-${brand}`}
                    className="font-normal cursor-pointer"
                  >
                    {brand}
                  </Label>
                </div>
              ))}

              {/* Opção OUTRAS */}
              <div className="flex items-center space-x-2 pt-2 border-t mt-2">
                <Checkbox
                  id="brand-Outras"
                  checked={selectedBrands.includes("Outras")}
                  onCheckedChange={(checked) =>
                    handleBrandChange("Outras", checked as boolean)
                  }
                />
                <Label
                  htmlFor="brand-Outras"
                  className="font-normal cursor-pointer text-muted-foreground"
                >
                  Outras Marcas
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        onClick={applyFilters}
        className="w-full bg-[#0f52ba] hover:bg-blue-700 font-bold"
      >
        Aplicar Filtros
      </Button>
    </div>
  );
}
