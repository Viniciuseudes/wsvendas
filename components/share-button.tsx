"use client";

import { Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface ShareButtonProps {
  title: string;
  text: string;
}

export function ShareButton({ title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [url, setUrl] = useState("");

  // Pega a URL apenas no cliente para evitar erro de hidratação
  useEffect(() => {
    setUrl(window.location.href);
    if (typeof navigator !== "undefined" && navigator.share) {
      setCanShare(true);
    }
  }, []);

  const handleShare = async () => {
    if (!url) return;

    // Tenta usar o compartilhamento nativo do celular (Android/iOS)
    if (canShare) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
        toast.success("Compartilhado com sucesso!");
      } catch (error) {
        // Se o usuário cancelar, não faz nada (é normal)
        console.log("Compartilhamento cancelado ou falhou", error);
      }
    } else {
      // Fallback para Computador: Copiar Link
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success("Link copiado! Agora é só colar no WhatsApp.");
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        toast.error("Erro ao copiar link.");
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 text-blue-700 hover:text-blue-800 hover:bg-blue-50 transition-colors"
      onClick={handleShare}
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Link Copiado!" : "Compartilhar"}
    </Button>
  );
}
