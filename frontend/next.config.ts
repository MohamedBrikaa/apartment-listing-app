import type { NextConfig } from "next";
const INTERNAL_API_URL = process.env.INTERNAL_API_URL || 'http://backend:4000';

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
        destination: `${INTERNAL_API_URL}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
