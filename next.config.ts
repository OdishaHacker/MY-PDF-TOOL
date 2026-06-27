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
        config.plugins.push(
          new webpack.NormalModuleReplacementPlugin(
            /^node:/,
            (resource: any) => {
              resource.request = resource.request.replace(/^node:/, '');
            }
          )
        );
      }
      return config;
    },
};

export default nextConfig;
