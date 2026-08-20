import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 0,
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
        source: "/",
        has: [{ type: "host", value: "www.poppyjoy.nl" }],
        destination: "https://poppyjoy.nl/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.poppyjoy.nl" }],
        destination: "https://poppyjoy.nl/:path*",
        permanent: true,
      },
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
