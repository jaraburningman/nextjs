import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true, // needed for GitHub Pages
  },
  basePath: '/jaraburningman', // 👈 replace with your repo name
  assetPrefix: '/jaraburningman/',
  distDir: 'build'
};

export default nextConfig;
