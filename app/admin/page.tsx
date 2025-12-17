"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/header";
import { ImageUpload } from "@/components/image-upload";
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
import {
  Plus,
  Pencil,
  Trash2,
  Lock,
  ImageIcon,
  GripVertical,
} from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { Motorcycle } from "@/lib/data";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

// --- SCHEMA ATUALIZADO ---
const motorcycleSchema = z.object({
  brand: z.string().min(2, "Marca obrigatória"),
  model: z.string().min(2, "Modelo obrigatório"),
  year: z.string().regex(/^\d{4}\/\d{4}$/, "Formato AAAA/AAAA"),
  km: z.coerce.number().min(0),
  price: z.coerce.number().min(1, "Preço inválido"),
  images: z.array(z.string()).min(1, "Pelo menos 1 foto obrigatória"),
  transmission: z.string(),
  fuel: z.string(),
  color: z.string().min(2, "Cor obrigatória"),
  plateEnd: z.string().length(1, "Apenas 1 dígito"),
  observations: z.string().optional(),
  // NOVOS CAMPOS
  startType: z.string(),
  displacement: z.coerce.number().min(1, "Cilindrada obrigatória"),
});

type MotorcycleFormValues = z.infer<typeof motorcycleSchema>;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [motos, setMotos] = useState<Motorcycle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<MotorcycleFormValues>({
    resolver: zodResolver(motorcycleSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: "",
      km: 0,
      price: 0,
      images: [],
      transmission: "Manual",
      fuel: "Gasolina",
      color: "",
      plateEnd: "",
      observations: "",
      startType: "Elétrica",
      displacement: 0,
    },
  });

  useEffect(() => {
    setIsMounted(true);
    if (isAuthenticated) fetchMotorcycles();
  }, [isAuthenticated]);

  async function fetchMotorcycles() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("motorcycles")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      const normalizedData = (data as any[]).map((item) => ({
        ...item,
        imageUrls: item.images || (item.image_url ? [item.image_url] : []),
        displayOrder: item.display_order || 9999,
        sold: item.sold || false,
        plateEnd: item.plate_end || "",
        observations: item.observations || "",
        // Mapeia snake_case do banco para camelCase do form
        startType: item.start_type || "Elétrica",
        displacement: item.displacement || 0,
      }));
      setMotos(normalizedData);
    } catch (error: any) {
      console.error("Erro Fetch:", error);
      toast.error("Erro ao buscar dados.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(motos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setMotos(items);

    try {
      const updates = items.map((moto, index) => ({
        id: moto.id,
        display_order: index,
      }));
      for (const update of updates) {
        await supabase
          .from("motorcycles")
          .update({ display_order: update.display_order })
          .eq("id", update.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleSold = async (moto: Motorcycle) => {
    const newStatus = !moto.sold;
    setMotos((prev) =>
      prev.map((m) => (m.id === moto.id ? { ...m, sold: newStatus } : m))
    );
    const { error } = await supabase
      .from("motorcycles")
      .update({ sold: newStatus })
      .eq("id", moto.id);

    if (error) {
      toast.error("Erro ao atualizar status.");
      fetchMotorcycles();
    } else {
      toast.success(newStatus ? "Vendida!" : "Disponível!");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "abrobreira123") {
      setIsAuthenticated(true);
      toast.success("Bem-vindo!");
    } else {
      toast.error("Senha incorreta.");
    }
  };

  const onSubmit = async (values: MotorcycleFormValues) => {
    try {
      const maxOrder = motos.reduce(
        (max, m) => Math.max(max, m.displayOrder || 0),
        0
      );

      // Prepara objeto para o banco (snake_case)
      const dbData: any = {
        brand: values.brand,
        model: values.model,
        year: values.year,
        km: values.km,
        price: values.price,
        images: values.images,
        transmission: values.transmission,
        fuel: values.fuel,
        color: values.color,
        plate_end: values.plateEnd,
        observations: values.observations,
        sold: false,
        // NOVOS CAMPOS
        start_type: values.startType,
        displacement: values.displacement,
      };

      if (values.images.length > 0) dbData.image_url = values.images[0];
      if (!editingId) dbData.display_order = maxOrder + 1;

      let error = null;
      if (editingId) {
        const res = await supabase
          .from("motorcycles")
          .update(dbData)
          .eq("id", editingId);
        error = res.error;
      } else {
        const res = await supabase.from("motorcycles").insert(dbData);
        error = res.error;
      }

      if (error) throw error;

      toast.success(editingId ? "Moto atualizada!" : "Moto cadastrada!");
      await fetchMotorcycles();
      handleCloseDialog();
    } catch (err: any) {
      console.error("Erro detalhado:", err);
      alert(`Erro: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Excluir esta moto?")) {
      const { error } = await supabase
        .from("motorcycles")
        .delete()
        .eq("id", id);
      if (error) toast.error("Erro: " + error.message);
      else {
        toast.success("Moto excluída.");
        fetchMotorcycles();
      }
    }
  };

  const handleEdit = (moto: any) => {
    setEditingId(moto.id);
    form.reset({
      brand: moto.brand || "",
      model: moto.model || "",
      year: moto.year || "",
      km: moto.km || 0,
      price: moto.price || 0,
      images: moto.imageUrls || [],
      transmission: moto.transmission || "Manual",
      fuel: moto.fuel || "Gasolina",
      color: moto.color || "",
      plateEnd: moto.plateEnd || "",
      observations: moto.observations || "",
      // Preenche novos campos
      startType: moto.startType || "Elétrica",
      displacement: moto.displacement || 0,
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
      images: [],
      transmission: "Manual",
      fuel: "Gasolina",
      color: "",
      plateEnd: "",
      observations: "",
      startType: "Elétrica",
      displacement: 0,
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    form.reset();
  };

  if (!isMounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20">
        <div className="w-full max-w-md rounded-lg border bg-background p-8 shadow-lg">
          <div className="mb-6 flex flex-col items-center gap-2 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Lock className="h-6 w-6 text-[#0f52ba]" />
            </div>
            <h1 className="text-2xl font-bold">Área Restrita</h1>
            <p className="text-sm text-muted-foreground">Senha de admin</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Senha"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="text-center"
            />
            <Button type="submit" className="w-full bg-[#0f52ba] text-white">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  }

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
                {motos.length} motos registradas
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => window.open("/vendidas", "_blank")}
              >
                Ver Pág. Vendidas
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={handleOpenNewDialog}
                    className="bg-[#0f52ba] text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Nova Moto
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
                      <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Galeria de Fotos</FormLabel>
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
                              <FormLabel>KM</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* NOVOS CAMPOS: Cilindradas e Partida */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="displacement"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cilindradas (cc)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Ex: 160"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="startType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Partida</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Elétrica">
                                    Elétrica
                                  </SelectItem>
                                  <SelectItem value="Pedal">Pedal</SelectItem>
                                  <SelectItem value="Elétrica e Pedal">
                                    Elétrica e Pedal
                                  </SelectItem>
                                </SelectContent>
                              </Select>
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
                              <FormLabel>Preço</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
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
                              <FormLabel>Final Placa</FormLabel>
                              <FormControl>
                                <Input maxLength={1} {...field} />
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
                                    <SelectValue />
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
                                    <SelectValue />
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
                              <Textarea className="resize-none" {...field} />
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
                          className="flex-1 bg-[#0f52ba] text-white"
                          disabled={form.formState.isSubmitting}
                        >
                          {form.formState.isSubmitting
                            ? "Salvando..."
                            : editingId
                            ? "Salvar"
                            : "Cadastrar"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card shadow-sm">
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead>Foto</TableHead>
                      <TableHead>Moto</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <Droppable droppableId="motos-list">
                    {(provided) => (
                      <TableBody
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {motos.length > 0 ? (
                          motos.map((moto: any, index) => (
                            <Draggable
                              key={moto.id}
                              draggableId={moto.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <TableRow
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`transition-colors ${
                                    moto.sold
                                      ? "bg-red-50 hover:bg-red-100"
                                      : "hover:bg-slate-50"
                                  } ${
                                    snapshot.isDragging
                                      ? "bg-blue-50 shadow-lg"
                                      : ""
                                  }`}
                                >
                                  <TableCell {...provided.dragHandleProps}>
                                    <div className="cursor-grab active:cursor-grabbing text-slate-400 p-2 touch-none">
                                      <GripVertical className="h-5 w-5" />
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="relative h-10 w-16 overflow-hidden rounded bg-muted">
                                      {moto.imageUrls &&
                                      moto.imageUrls.length > 0 ? (
                                        <img
                                          src={moto.imageUrls[0]}
                                          alt=""
                                          className="h-full w-full object-cover"
                                        />
                                      ) : (
                                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                          <ImageIcon className="h-4 w-4" />
                                        </div>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="font-medium">
                                      {moto.brand} {moto.model}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {moto.year} • {moto.displacement}cc
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <Switch
                                        checked={moto.sold}
                                        onCheckedChange={() =>
                                          handleToggleSold(moto)
                                        }
                                      />
                                      <Badge
                                        variant={
                                          moto.sold ? "destructive" : "outline"
                                        }
                                        className={
                                          moto.sold
                                            ? ""
                                            : "text-green-600 border-green-200 bg-green-50"
                                        }
                                      >
                                        {moto.sold ? "Vendida" : "Disponível"}
                                      </Badge>
                                    </div>
                                  </TableCell>
                                  <TableCell className="font-medium">
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
                              )}
                            </Draggable>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              {isLoading
                                ? "Carregando..."
                                : "Nenhuma moto cadastrada."}
                            </TableCell>
                          </TableRow>
                        )}
                        {provided.placeholder}
                      </TableBody>
                    )}
                  </Droppable>
                </Table>
              </div>
            </DragDropContext>
          </div>
        </div>
      </main>
    </div>
  );
}
