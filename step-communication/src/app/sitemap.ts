import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { services } from "@/content/services";

/** Sitemap generata automaticamente (/sitemap.xml). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/servizi`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/chi-siamo`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.url}/contatti`, changeFrequency: "yearly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteConfig.url}/servizi/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes].map((r) => ({
    ...r,
    lastModified: now,
  }));
}
