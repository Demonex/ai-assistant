import { withPayload } from "@payloadcms/next/withPayload";

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:2055";

/** @type {import("next").NextConfig} */
const nextConfig = {
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
  output: 'standalone',
};
export default withPayload(nextConfig);
