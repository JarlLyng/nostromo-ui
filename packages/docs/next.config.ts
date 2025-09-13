import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable PWA features to avoid workbox warnings
  experimental: {
    ppr: false,
  },
  // Set correct workspace root to avoid lockfile warnings
  outputFileTracingRoot: '/Users/jarl.l/Documents/Github/nostromo-ui',
  // Disable service worker and PWA features
  generateEtags: false,
  // Disable static optimization for better dev experience
  trailingSlash: false,
  // Disable image optimization warnings
  images: {
    unoptimized: true,
  },
  // Disable webpack cache to avoid stale data
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
