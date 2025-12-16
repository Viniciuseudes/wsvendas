"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { Motorcycle } from "@/lib/data"
import { motorcycles as initialMotorcycles } from "@/lib/data"

type MotorcycleForm = Omit<Motorcycle, "id">

const emptyForm: MotorcycleForm = {
  brand: "",
  model: "",
  year: "",
  km: 0,
  price: 0,
  imageUrl: "",
  transmission: "Manual",
  fuel: "Gasolina",
  color: "",
  plateEnd: "",
  observations: "",
}

export default function AdminPage() {
  const [motos, setMotos] = useState<Motorcycle[]>(initialMotorcycles)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<MotorcycleForm>(emptyForm)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === "km" || name === "price" ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      setMotos((prev) => prev.map((moto) => (moto.id === editingId ? { ...form, id: editingId } : moto)))
    } else {
      const newMoto: Motorcycle = {
        ...form,
        id: Date.now().toString(),
      }
      setMotos((prev) => [...prev, newMoto])
    }

    setForm(emptyForm)
    setEditingId(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (moto: Motorcycle) => {
    setEditingId(moto.id)
    setForm({
      brand: moto.brand,
      model: moto.model,
      year: moto.year,
      km: moto.km,
      price: moto.price,
      imageUrl: moto.imageUrl,
      transmission: moto.transmission,
      fuel: moto.fuel,
      color: moto.color,
      plateEnd: moto.plateEnd,
      observations: moto.observations,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta moto?")) {
      setMotos((prev) => prev.filter((moto) => moto.id !== id))
    }
  }

  const handleOpenNewDialog = () => {
    setEditingId(null)
    setForm(emptyForm)
    setIsDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">Painel Administrativo</h1>
              <p className="text-muted-foreground">Gerencie o estoque de motos</p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenNewDialog} className="bg-[#8B0000] hover:bg-[#6B0000] text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Moto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle>{editingId ? "Editar Moto" : "Cadastrar Nova Moto"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Marca</Label>
                      <Input
                        id="brand"
                        name="brand"
                        value={form.brand}
                        onChange={handleInputChange}
                        placeholder="Ex: Honda"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Modelo</Label>
                      <Input
                        id="model"
                        name="model"
                        value={form.model}
                        onChange={handleInputChange}
                        placeholder="Ex: XRE 300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="year">Ano</Label>
                      <Input
                        id="year"
                        name="year"
                        value={form.year}
                        onChange={handleInputChange}
                        placeholder="Ex: 2022/2022"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="km">Quilometragem</Label>
                      <Input
                        id="km"
                        name="km"
                        type="number"
                        value={form.km}
                        onChange={handleInputChange}
                        placeholder="Ex: 15000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="price">Preço (R$)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleInputChange}
                        placeholder="Ex: 28990"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Cor</Label>
                      <Input
                        id="color"
                        name="color"
                        value={form.color}
                        onChange={handleInputChange}
                        placeholder="Ex: Vermelha"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="transmission">Transmissão</Label>
                      <select
                        id="transmission"
                        name="transmission"
                        value={form.transmission}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      >
                        <option value="Manual">Manual</option>
                        <option value="Automática">Automática</option>
                        <option value="Semi-automática">Semi-automática</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fuel">Combustível</Label>
                      <select
                        id="fuel"
                        name="fuel"
                        value={form.fuel}
                        onChange={handleInputChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      >
                        <option value="Gasolina">Gasolina</option>
                        <option value="Flex">Flex</option>
                        <option value="Elétrica">Elétrica</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="plateEnd">Final da Placa</Label>
                      <Input
                        id="plateEnd"
                        name="plateEnd"
                        value={form.plateEnd}
                        onChange={handleInputChange}
                        placeholder="Ex: 5"
                        maxLength={1}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">URL da Imagem</Label>
                      <Input
                        id="imageUrl"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleInputChange}
                        placeholder="Ex: /minha-moto.jpg"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observations">Observações</Label>
                    <Textarea
                      id="observations"
                      name="observations"
                      value={form.observations}
                      onChange={handleInputChange}
                      placeholder="Ex: Sem sinistro, sem leilão. Único dono..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1 bg-[#8B0000] hover:bg-[#6B0000] text-white">
                      {editingId ? "Salvar Alterações" : "Cadastrar Moto"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Tabela de Motos */}
          <div className="rounded-lg border border-border bg-card">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Moto</TableHead>
                    <TableHead className="hidden sm:table-cell">Ano</TableHead>
                    <TableHead className="hidden md:table-cell">KM</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {motos.map((moto) => (
                    <TableRow key={moto.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">
                            {moto.brand} {moto.model}
                          </p>
                          <p className="text-sm text-muted-foreground sm:hidden">
                            {moto.year} - {moto.km.toLocaleString("pt-BR")} km
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{moto.year}</TableCell>
                      <TableCell className="hidden md:table-cell">{moto.km.toLocaleString("pt-BR")} km</TableCell>
                      <TableCell className="font-medium text-[#8B0000]">
                        R$ {moto.price.toLocaleString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(moto)} aria-label="Editar moto">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(moto.id)}
                            aria-label="Excluir moto"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {motos.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">Nenhuma moto cadastrada.</p>
                <Button onClick={handleOpenNewDialog} className="mt-4 bg-[#8B0000] hover:bg-[#6B0000] text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Cadastrar primeira moto
                </Button>
              </div>
            )}
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Total: {motos.length} moto{motos.length !== 1 ? "s" : ""} cadastrada
            {motos.length !== 1 ? "s" : ""}
          </p>
        </div>
      </main>
    </div>
  )
}
