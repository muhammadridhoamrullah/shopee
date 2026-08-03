import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.ngrok-free.app"],
  // Config webpack di bawah cuma dipakai saat dev di Docker (dipaksa --webpack
  // untuk atasi bug file watcher). Turbopack (default sekarang) tidak
  // membaca config ini sama sekali -- turbopack: {} di sini cuma untuk
  // memberi tahu Next.js bahwa itu memang disengaja, bukan kesalahan.
  turbopack: {},
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
    ],
  },
};

export default nextConfig;
