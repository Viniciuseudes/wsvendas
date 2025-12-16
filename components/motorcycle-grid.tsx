import type { Motorcycle } from "@/lib/data"
import { MotorcycleCard } from "./motorcycle-card"

interface MotorcycleGridProps {
  motorcycles: Motorcycle[]
}

export function MotorcycleGrid({ motorcycles }: MotorcycleGridProps) {
  if (motorcycles.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">Nenhuma moto encontrada. Tente outro termo de busca.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {motorcycles.map((motorcycle) => (
        <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
      ))}
    </div>
  )
}
