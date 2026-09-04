/**
 * Base URL of the Laravel CMS this site reads all of its content from —
 * news, fund objectives, portfolios, documents, job listings, and the
 * contact/CV form endpoints. This front end has no database of its own; if
 * this host is unreachable the site renders with empty content.
 *
 * It lives in an env var because the CMS is being moved off the apex domain:
 * ic-invest.mn will point at this Next.js app, and the Laravel app it feeds
 * from moves to cms.ic-invest.mn. Set NEXT_PUBLIC_CMS_BASE to that host once
 * the subdomain serves the CMS; until then the default keeps working.
 *
 * NEXT_PUBLIC_ because one consumer is a client component (the document
 * download link on the fund detail page), so the value has to reach the
 * browser bundle, not just the server.
 *
 * Note: system.ic-invest.mn (the investor login portal) is a *different*
 * service on different infrastructure and is deliberately not routed through
 * here — those links stay hardcoded.
 */
export const CMS_BASE = (
  process.env.NEXT_PUBLIC_CMS_BASE ?? "https://ic-invest.mn"
).replace(/\/+$/, "");
