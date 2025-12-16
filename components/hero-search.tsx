"use client";

import type React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HeroSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery)}#estoque`);
    } else {
      router.push("/");
    }
  };

  return (
    // Fundo Slate-900 (Azul Meia noite profundo)
    <section className="relative w-full bg-slate-900 py-24 md:py-36 overflow-hidden">
      {/* Background Pattern sutil (Opcional, para textura) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Glow Dourado sutil no fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Encontre a moto <br />
            <span className="text-amber-500">perfeita para você</span>
          </h1>
          <p className="mb-10 text-lg text-slate-300 font-light">
            Qualidade, procedência WSmotos (todas as motos revisdas) e os
            melhores preços da região do araripe.
          </p>

          <div className="bg-white p-2 rounded-full shadow-2xl flex items-center max-w-xl mx-auto">
            <div className="pl-4 text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <form onSubmit={handleSubmit} className="flex-1 flex">
              <Input
                type="text"
                placeholder="Busque por marca ou modelo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-12 border-none shadow-none focus-visible:ring-0 text-base bg-transparent placeholder:text-slate-400 text-slate-900"
              />
              <Button
                type="submit"
                className="h-12 rounded-full px-8 bg-slate-900 text-white hover:bg-slate-800 transition-all font-medium"
              >
                Buscar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
