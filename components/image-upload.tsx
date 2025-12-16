"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, ImagePlus, Loader2, X, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string[]; // Recebe um array de URLs
  onChange: (urls: string[]) => void;
  disabled?: boolean;
}

export function ImageUpload({
  value = [],
  onChange,
  disabled,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      const newUrls: string[] = [];

      // Loop para upload de cada arquivo selecionado
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("motos")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("motos").getPublicUrl(filePath);
        newUrls.push(data.publicUrl);
      }

      // Adiciona as novas URLs à lista existente
      onChange([...value, ...newUrls]);
      toast.success(`${newUrls.length} imagem(ns) enviada(s)!`);
    } catch (error) {
      console.error("Erro no upload:", error);
      toast.error("Erro ao enviar imagem. Tente novamente.");
    } finally {
      setIsUploading(false);
      // Limpa o input para permitir selecionar o mesmo arquivo novamente se necessário
      e.target.value = "";
    }
  };

  const handleRemove = (urlToRemove: string) => {
    onChange(value.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="space-y-4">
      {/* Grid de Fotos Existentes */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {value.map((url, index) => (
            <div
              key={url}
              className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
            >
              <Image
                src={url}
                alt={`Foto ${index + 1}`}
                fill
                className="object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-1 top-1 h-6 w-6 opacity-90 hover:opacity-100"
                onClick={() => handleRemove(url)}
                disabled={disabled}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Botão de Upload */}
      <div className="relative flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted/80">
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Enviando fotos...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <div className="flex gap-2">
              <Camera className="h-6 w-6" />
              <ImagePlus className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium">Adicionar Fotos</p>
            <p className="text-xs text-center px-4">
              Clique para selecionar várias fotos de uma vez
            </p>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          multiple // Permite selecionar vários arquivos
          className="absolute inset-0 cursor-pointer opacity-0"
          onChange={handleUpload}
          disabled={disabled || isUploading}
        />
      </div>
    </div>
  );
}
