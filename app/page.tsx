"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { HeroSearch } from "@/components/hero-search"
import { MotorcycleGrid } from "@/components/motorcycle-grid"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { motorcycles } from "@/lib/data"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMotorcycles = useMemo(() => {
    if (!searchQuery.trim()) return motorcycles

    const query = searchQuery.toLowerCase()
    return motorcycles.filter(
      (moto) =>
        moto.brand.toLowerCase().includes(query) ||
        moto.model.toLowerCase().includes(query) ||
        moto.year.includes(query) ||
        moto.color.toLowerCase().includes(query),
    )
  }, [searchQuery])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <HeroSearch onSearch={setSearchQuery} />

        <section id="estoque" className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">Nosso Estoque</h2>
            <MotorcycleGrid motorcycles={filteredMotorcycles} />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
