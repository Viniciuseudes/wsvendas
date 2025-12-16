"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface HeroSearchProps {
  onSearch: (query: string) => void
}

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <section className="relative w-full bg-[url('/motorcycle-dealership-showroom-dark.jpg')] bg-cover bg-center py-16 md:py-24">
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-xl">
          <Card className="shadow-xl">
            <CardContent className="p-6">
              <h1 className="mb-2 text-center text-2xl font-bold text-foreground">Encontre sua moto dos sonhos</h1>
              <p className="mb-6 text-center text-muted-foreground">As melhores ofertas em motos seminovas</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Digite aqui o que procura"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" className="w-full bg-[#8B0000] text-white hover:bg-[#6B0000]">
                  BUSCAR
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
