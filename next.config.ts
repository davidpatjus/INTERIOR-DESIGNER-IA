import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // Ignora errores de validación de TypeScript
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
