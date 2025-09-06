import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable for Replit environment
  experimental: {},
  // Add static export for Netlify
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
