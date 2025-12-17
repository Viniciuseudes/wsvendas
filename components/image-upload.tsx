"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import {
  Camera,
  ImagePlus,
  Loader2,
  Trash2,
  Check,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { getCroppedImg } from "@/lib/canvas-utils";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
}

export function ImageUpload({
  value = [],
  onChange,
  disabled,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result?.toString() || null);
        setIsDialogOpen(true);
        setZoom(1); // Reinicia o zoom ao abrir
      });
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setIsUploading(true);
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.jpg`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("motos")
        .upload(filePath, croppedBlob, {
          contentType: "image/jpeg",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("motos").getPublicUrl(filePath);

      onChange([...value, data.publicUrl]);
      toast.success("Imagem enviada com sucesso!");

      setIsDialogOpen(false);
      setImageSrc(null);
    } catch (error: any) {
      console.error("Erro no upload:", error);
      toast.error("Erro ao salvar imagem: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (urlToRemove: string) => {
    onChange(value.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="space-y-4">
      {/* Grid de Fotos */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {value.map((url, index) => (
            <div
              key={url}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border bg-muted group"
            >
              <Image
                src={url}
                alt={`Foto ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 shadow-sm"
                  onClick={() => handleRemove(url)}
                  disabled={disabled}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botão de Adicionar */}
      <div
        className="relative flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted/80 hover:border-primary/50"
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Processando...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <div className="flex gap-2">
              <Camera className="h-6 w-6" />
              <ImagePlus className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium">Adicionar Foto</p>
            <p className="text-xs text-center px-4">
              Clique para selecionar e ajustar
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
          disabled={disabled || isUploading}
        />
      </div>

      {/* Modal de Recorte */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => !isUploading && setIsDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Ajustar Enquadramento</DialogTitle>
          </DialogHeader>

          {/* Container do Cropper com fundo cinza para visualizar bordas brancas */}
          <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden border shadow-inner">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                showGrid={true}
                // --- MÁGICA AQUI ---
                restrictPosition={false} // Permite mover a imagem "pra longe" criando bordas
                objectFit="contain" // Tenta encaixar a imagem inteira inicialmente
                minZoom={0.5} // Permite diminuir até 50%
              />
            )}
          </div>

          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <div className="flex items-center gap-1">
                <ZoomOut className="h-3 w-3" /> Diminuir
              </div>
              <div className="flex items-center gap-1">
                Aumentar <ZoomIn className="h-3 w-3" />
              </div>
            </div>
            <Slider
              value={[zoom]}
              min={0.5} // Mínimo menor que 1 para permitir afastar
              max={3}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
              className="w-full"
            />
            <p className="text-[10px] text-center text-muted-foreground">
              Dica: Diminua o zoom para adicionar bordas brancas
              automaticamente.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                setImageSrc(null);
              }}
              disabled={isUploading}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveCrop}
              disabled={isUploading}
              className="bg-[#0f52ba] text-white"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" /> Confirmar Foto
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
