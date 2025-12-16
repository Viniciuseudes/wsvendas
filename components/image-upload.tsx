"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, ImagePlus, Loader2, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // 1. Gera um nome único para o arquivo (timestamp + nome limpo)
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // 2. Upload para o Supabase Storage (Bucket 'motos')
      const { error: uploadError } = await supabase.storage
        .from("motos")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 3. Pegar a URL pública
      const { data } = supabase.storage.from("motos").getPublicUrl(filePath);

      // 4. Passar a URL para o formulário pai
      onChange(data.publicUrl);
      toast.success("Imagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro no upload:", error);
      toast.error("Erro ao enviar imagem. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted/80">
        {/* Estado de Carregamento */}
        {isUploading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium">Enviando foto...</p>
            </div>
          </div>
        )}

        {/* Visualização da Imagem ou Botão de Upload */}
        {value ? (
          <>
            <Image
              src={value}
              alt="Foto da moto"
              fill
              className="object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2 z-10 h-8 w-8"
              onClick={handleRemove}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
            {/* Ícones indicativos */}
            <div className="flex gap-2">
              <Camera className="h-8 w-8" />
              <ImagePlus className="h-8 w-8" />
            </div>
            <p className="text-sm font-medium">Toque para adicionar foto</p>
            <p className="text-xs">Câmera ou Galeria</p>
          </div>
        )}

        {/* Input Invisível que cobre a área (Funciona em Mobile e Desktop) */}
        {!value && (
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={handleUpload}
            disabled={disabled || isUploading}
            // O atributo capture permite abrir a câmera direto em mobile se desejado,
            // mas sem ele o celular pergunta "Câmera ou Arquivos", o que é mais versátil.
            // Se quiser FORÇAR câmera, use capture="environment".
            // Vamos deixar sem capture para dar a escolha ao usuário.
          />
        )}
      </div>
    </div>
  );
}
