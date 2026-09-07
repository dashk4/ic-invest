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
    // Default is 60s, which re-checks the CMS on almost every unique visit.
    // Fund logos, team photos and news images change rarely — matches this
    // site's existing 1h data-staleness tolerance (see REVALIDATE_SECONDS
    // in lib/api.ts) rather than inventing a separate policy.
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;
