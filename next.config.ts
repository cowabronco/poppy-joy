import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "shopify.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/ref/geraldine",
        destination:
          "/?utm_source=instagram&utm_medium=influencer&utm_campaign=geraldine",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
