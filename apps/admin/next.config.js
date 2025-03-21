import { withPayload } from "@payloadcms/next/withPayload";
import importMetaEnv from "@import-meta-env/unplugin";

const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!url) {
    url = `http://localhost:${process.env.PORT || 2055}`;
  }

  return url;
};

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:2055";
/** @type {import("next").NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/web"],
  webpack: (config) => {
    /*config.plugins.unshift(importMetaEnv.webpack({
      example: ".env.example",
      env: ".env",
      transformMode: "runtime",
    }));*/
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };
    return config;
  },
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", ""),
        };
      }),
    ],
  },
  typescript: {
    // потому что падает линтинг в submodule
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: [getServerSideURL(), process.env.NEXT_PUBLIC_FRONTEND_URL].map(urlString => {
        try {
          const url = new URL(urlString);
          return url.port ? `${url.hostname}:${url.port}` : url.hostname;
        } catch (error) {
          console.error(`Invalid URL: ${urlString}`);
          return undefined;
        }
      }).filter(Boolean),
    },
  },
};
export default withPayload(nextConfig);
