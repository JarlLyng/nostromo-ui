import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Disable PWA features to avoid workbox warnings
  experimental: {
    ppr: false,
  },
  // Set correct workspace root to avoid lockfile warnings
  outputFileTracingRoot: path.join(__dirname, "../../"),
  // Disable service worker and PWA features
  generateEtags: false,
  // Disable static optimization for better dev experience
  trailingSlash: false,
  // Disable image optimization warnings
  images: {
    unoptimized: true,
  },
  // Configure webpack to resolve workspace packages
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    
    // Add workspace packages to resolve
    config.resolve.alias = {
      ...config.resolve.alias,
      '@nostromo/ui-core': path.resolve(__dirname, '../../packages/ui-core/src'),
      '@nostromo/ui-tw': path.resolve(__dirname, '../../packages/ui-tw/src'),
    };
    
    return config;
  },
  // Disable all PWA and service worker features
  poweredByHeader: false,
  // Disable compression to avoid issues
  compress: false,
};

export default nextConfig;
