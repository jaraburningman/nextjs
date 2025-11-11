import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export', // Static export for GitHub Pages
  basePath: isProd ? '/nextjs' : '',
  assetPrefix: isProd ? '/nextjs/' : '',
  images: {
    unoptimized: true, // since GitHub Pages can't do dynamic image optimization
  },

};

export default nextConfig;
