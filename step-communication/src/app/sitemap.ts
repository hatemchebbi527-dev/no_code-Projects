import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Sitemap generata automaticamente (/sitemap.xml).
 * In Fase 2/3, mappare qui le nuove route (servizi, portfolio, insights)
 * iterando sui rispettivi contenuti.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
