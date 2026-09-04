import type { NextConfig } from "next";

// Kept in sync with src/lib/config.ts — next/image needs the CMS host as a
// bare hostname here, and this file can't import from the app's path aliases.
const cmsHost = new URL(
  process.env.NEXT_PUBLIC_CMS_BASE ?? "https://ic-invest.mn",
).hostname;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: cmsHost,
        pathname: "/upload/**",
      },
    ],
  },
};

export default nextConfig;
