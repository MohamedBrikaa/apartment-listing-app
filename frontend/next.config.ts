import type { NextConfig } from "next";
const API_INTERNAL_URL = process.env.API_INTERNAL_URL;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'backend',
        port: '4000',
        pathname: '/uploads/**',
      },
    ],
    domains: ['images.pexels.com'],
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `http://backend:4000/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
