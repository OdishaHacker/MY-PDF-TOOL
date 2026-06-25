import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
    webpack: (config, { isServer, webpack }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          path: false,
          os: false,
          crypto: false,
          stream: false,
          buffer: false,
          https: false,
          http: false,
          net: false,
          tls: false,
        };
        config.resolve.alias = {
          ...config.resolve.alias,
          "node:fs": false,
          "node:path": false,
          "node:os": false,
          "node:crypto": false,
          "node:stream": false,
          "node:buffer": false,
          "node:https": false,
          "node:http": false,
          "node:net": false,
          "node:tls": false,
        };
      }
      return config;
  },
};

export default nextConfig;
