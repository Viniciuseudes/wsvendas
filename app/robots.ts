import { MetadataRoute } from "next";

// 🔴 SUBSTITUA PELA SUA URL REAL
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://wsvendasmotos.vercel.app/";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/private"], // Protege rotas administrativas do Google
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}