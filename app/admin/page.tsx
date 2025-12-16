"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/header";
import { ImageUpload } from "@/components/image-upload"; // Componente novo
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Lock } from "lucide-react";
import { toast } from "sonner";
import type { Motorcycle } from "@/lib/data";

// --- SCHEMA DE VALIDAÇÃO ---
const motorcycleSchema = z.object({
  brand: z.string().min(2, "Marca obrigatória"),
  model: z.string().min(2, "Modelo obrigatório"),
  year: z.string().regex(/^\d{4}\/\d{4}$/, "Formato AAAA/AAAA (ex: 2022/2023)"),
  km: z.coerce.number().min(0),
  price: z.coerce.number().min(1, "Preço inválido"),
  imageUrl: z.string().min(1, "A foto é obrigatória"), // Valida se o upload foi feito
  transmission: z.string(),
  fuel: z.string(),
  color: z.string().min(2, "Cor obrigatória"),
  plateEnd: z.string().length(1, "Apenas 1 dígito"),
  observations: z.string().optional(),
});

type MotorcycleFormValues = z.infer<typeof motorcycleSchema>;

export default function AdminPage() {
  // --- ESTADOS DE AUTENTICAÇÃO ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  // --- ESTADOS DO SISTEMA ---
  const [motos, setMotos] = useState<Motorcycle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // --- REACT HOOK FORM ---
  const form = useForm<MotorcycleFormValues>({
    resolver: zodResolver(motorcycleSchema),
    defaultValues: {
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
    },
  });

  // --- EFEITO: CARREGAR MOTOS DO SUPABASE ---
  useEffect(() => {
    if (isAuthenticated) {
      fetchMotorcycles();
    }
  }, [isAuthenticated]);

  async function fetchMotorcycles() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("motorcycles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar motos.");
      console.error(error);
    } else {
      setMotos(data as Motorcycle[]);
    }
    setIsLoading(false);
  }

  // --- FUNÇÕES DE LOGIN ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "abrobreira123") {
      setIsAuthenticated(true);
      toast.success("Bem-vindo ao Painel!");
    } else {
      toast.error("Senha incorreta.");
    }
  };

  // --- FUNÇÕES DE CRUD (CREATE/UPDATE/DELETE) ---
  const onSubmit = async (values: MotorcycleFormValues) => {
    try {
      // Mapear os nomes dos campos do formulário para o banco (snake_case no banco)
      const dbData = {
        brand: values.brand,
        model: values.model,
        year: values.year,
        km: values.km,
        price: values.price,
        image_url: values.imageUrl, // No banco é image_url
        transmission: values.transmission,
        fuel: values.fuel,
        color: values.color,
        plate_end: values.plateEnd, // No banco é plate_end
        observations: values.observations,
      };

      if (editingId) {
        // ATUALIZAR
        const { error } = await supabase
          .from("motorcycles")
          .update(dbData)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Moto atualizada!");
      } else {
        // CRIAR
        const { error } = await supabase.from("motorcycles").insert(dbData);

        if (error) throw error;
        toast.success("Moto cadastrada!");
      }

      await fetchMotorcycles(); // Recarrega a lista
      handleCloseDialog();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar moto.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta moto?")) {
      const { error } = await supabase
        .from("motorcycles")
        .delete()
        .eq("id", id);

      if (error) {
        toast.error("Erro ao excluir.");
      } else {
        toast.success("Moto excluída.");
        fetchMotorcycles();
      }
    }
  };

  const handleEdit = (moto: any) => {
    // Use 'any' aqui temporariamente ou tipagem correta do banco
    setEditingId(moto.id);
    form.reset({
      brand: moto.brand,
      model: moto.model,
      year: moto.year,
      km: moto.km,
      price: moto.price,
      imageUrl: moto.image_url, // Atenção ao mapeamento reverso
      transmission: moto.transmission,
      fuel: moto.fuel,
      color: moto.color,
      plateEnd: moto.plate_end,
      observations: moto.observations || "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenNewDialog = () => {
    setEditingId(null);
    form.reset({
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
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    form.reset();
  };

  // --- RENDERIZAÇÃO: TELA DE LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20">
        <div className="w-full max-w-md rounded-lg border bg-background p-8 shadow-lg">
          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-[#8B0000]" />
            </div>
            <h1 className="text-2xl font-bold">Área Restrita</h1>
            <p className="text-sm text-muted-foreground">
              Digite a senha de administrador
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Senha"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="text-center"
            />
            <Button
              type="submit"
              className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-white"
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDERIZAÇÃO: PAINEL ADMINISTRATIVO ---
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                Painel Administrativo
              </h1>
              <p className="text-muted-foreground">
                {motos.length} motos cadastradas no sistema
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleOpenNewDialog}
                  className="bg-[#8B0000] hover:bg-[#6B0000] text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Moto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? "Editar Moto" : "Cadastrar Nova Moto"}
                  </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Componente de Upload de Imagem */}
                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Foto da Moto</FormLabel>
                          <FormControl>
                            <ImageUpload
                              value={field.value}
                              onChange={field.onChange}
                              disabled={form.formState.isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marca</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Honda" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Modelo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: XRE 300" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ano</FormLabel>
                            <FormControl>
                              <Input placeholder="2022/2022" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="km"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quilometragem</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preço (R$)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0.00"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="plateEnd"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Final da Placa</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ex: 5"
                                maxLength={1}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="transmission"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transmissão</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Manual">Manual</SelectItem>
                                <SelectItem value="Automática">
                                  Automática
                                </SelectItem>
                                <SelectItem value="Semi-automática">
                                  Semi-automática
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fuel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Combustível</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Gasolina">
                                  Gasolina
                                </SelectItem>
                                <SelectItem value="Flex">Flex</SelectItem>
                                <SelectItem value="Elétrica">
                                  Elétrica
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cor</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Vermelha" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="observations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Observações</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Detalhes adicionais..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={handleCloseDialog}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-[#8B0000] hover:bg-[#6B0000] text-white"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting
                          ? "Salvando..."
                          : editingId
                          ? "Salvar Alterações"
                          : "Cadastrar Moto"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-lg border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Foto</TableHead>
                    <TableHead>Moto</TableHead>
                    <TableHead className="hidden sm:table-cell">Ano</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Carregando...
                      </TableCell>
                    </TableRow>
                  ) : motos.length > 0 ? (
                    motos.map((moto: any) => (
                      <TableRow key={moto.id}>
                        <TableCell>
                          <div className="relative h-10 w-16 overflow-hidden rounded bg-muted">
                            {moto.image_url ? (
                              <img
                                src={moto.image_url}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs">
                                Sem foto
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {moto.brand} {moto.model}
                          </div>
                          <div className="text-xs text-muted-foreground sm:hidden">
                            {moto.year}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {moto.year}
                        </TableCell>
                        <TableCell className="font-medium text-[#8B0000]">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(moto.price)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(moto)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(moto.id)}
                              className="text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        Nenhuma moto cadastrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
