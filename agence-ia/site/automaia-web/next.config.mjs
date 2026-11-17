import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Ancienne page sectorielle (centres et salles de sport) remplacée par la
  // landing hôtels et restaurants : on redirige pour ne casser aucun lien.
  async redirects() {
    return [
      { source: "/cliniche", destination: "/hotel-ristoranti", permanent: true },
      { source: "/:locale(fr|en)/cliniche", destination: "/:locale/hotel-ristoranti", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
