import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

// 🔴 SUBSTITUA PELA SUA URL REAL
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://wsvendasmotos.vercel.app/";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Busca todas as motos disponíveis
  const { data: motorcycles } = await supabase
    .from("motorcycles")
    .select("id, created_at")
    .eq("sold", false); // Opcional: só mostrar motos disponíveis

  // 2. Cria as URLs das motos
  const motoUrls = (motorcycles || []).map((moto) => ({
    url: `${BASE_URL}/moto/${moto.id}`,
    lastModified: new Date(moto.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 3. Retorna URLs estáticas + dinâmicas
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/estoque`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/quem-somos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...motoUrls,
  ];
}