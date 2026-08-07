/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/contatti",
        destination: "/audit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
