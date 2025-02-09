import type { NextConfig } from "next";

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Proxy to Backend
      },
    ];
  },
};

const nextConfig: NextConfig = {
  /* config options here */
  
};

export default nextConfig;
