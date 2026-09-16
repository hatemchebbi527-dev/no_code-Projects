// Manuvo - Web App Manifest (PWA installabile).
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Manuvo",
    short_name: "Manuvo",
    description: "Manuvo - il marketplace che collega artigiani e privati.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FAF8F4",
    theme_color: "#DC2626",
    orientation: "portrait",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
