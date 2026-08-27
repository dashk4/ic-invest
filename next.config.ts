import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ic-invest.mn",
        pathname: "/upload/**",
      },
    ],
  },
};

export default nextConfig;
