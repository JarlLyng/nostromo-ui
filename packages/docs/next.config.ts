import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable PWA features to avoid workbox warnings
  experimental: {
    ppr: false,
  },
  // Set correct workspace root to avoid lockfile warnings
  outputFileTracingRoot: '/Users/jarl.l/Documents/Github/nostromo-ui',
  // Disable service worker
  generateEtags: false,
};

export default nextConfig;
