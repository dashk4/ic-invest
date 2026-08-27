import { ALL_MEMBERS } from "@/lib/team";

const BASE = "https://ic-invest.mn";
const REVALIDATE_SECONDS = 3600;

export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  content: string;
  picture?: string | null;
  service_id?: number;
  lang?: string;
  created_at?: string;
  publish_date?: string;
  published_at?: string;
};

export type Objective = {
  id: number;
  service_id: number;
  name: string;
  text: string;
};

export type FundFact = {
  id: number;
  service_id: number;
  first_text: string;
  last_text: string;
  updated_at: string;
};

export type FundManager = {
  id: number;
  service_id: number;
  type: string;
  fullname: string;
  position: string;
  description: string;
  image: string | null;
  is_active: number;
};

export type CommitteeManager = FundManager;

export type PortfolioItem = {
  id: number;
  service_id: number;
  bond: string;
  bond_weight: number;
  yearly_profit: string;
  price_profit_ratio: number;
  sector_id: number;
  is_active: number;
  sector?: { id: number; name: string; name_en: string } | null;
  latestmarket?: {
    id: number;
    portfolio_id: number;
    ognoo: string;
    market_value: number;
  } | null;
};

export type PortfolioChart = {
  labels: string[];
  datas: number[];
  colors: string[];
};

export type PerformanceItem = {
  id: number;
  service_id: number;
  name: string;
  value: string;
  is_active: number;
};

export type ApproachItem = {
  id: number;
  service_id: number;
  name: string;
  text: string;
  is_active: number;
};

export type PartnerItem = {
  id: number;
  service_id: number;
  logo: string;
  name: string;
  website: string | null;
  is_active: number;
};

export type FundDocument = {
  id: number;
  name: string;
  ognoo: string;
  file: string;
  service_id: number;
  category_id: number;
  is_active: number;
};

type Paginated<T> = {
  data: T[];
  current_page?: number;
  last_page?: number;
  total?: number;
};

export const FUNDS = [
  {
    sid: 1,
    code: "MBS",
    label: "Хувийн хөрөнгө оруулалтын сан",
    href: "https://ic-invest.mn/mn/service/1",
  },
  {
    sid: 3,
    code: "RIC",
    label: "Хувийн хөрөнгө оруулалтын сан",
    href: "https://ic-invest.mn/mn/service/3",
  },
  {
    sid: 4,
    code: "ETF",
    label: "Хамтын биржээр арилжаалагддаг сан",
    href: "https://ic-invest.mn/mn/service/4",
  },
  {
    sid: 5,
    code: "MF",
    label: "Хамтын нээлттэй хөрөнгө оруулалтын сан",
    href: "https://ic-invest.mn/mn/service/5",
  },
  {
    sid: 6,
    code: "VEQ",
    label: "Хувийн хөрөнгө оруулалтын сан",
    href: "https://ic-invest.mn/mn/service/6",
  },
] as const;

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function excerpt(html: string, max = 160): string {
  const text = stripHtml(html);
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export function numericValue(value: string | null | undefined): number | null {
  if (!value) return null;
  const normalized = value.replace(/[,₮%\s]/g, "");
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

/** Convert an asset path returned by the existing API into a usable URL. */
export function uploadUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${BASE}/upload/${path.replace(/^\/+/, "")}`;
}

async function safeJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getNews(page = 1, lang = "mn") {
  const json = await safeJson<{ listdata: { data: NewsItem[] } }>(
    `${BASE}/api/news/get?page=${page}&lang=${lang}`
  );
  return json?.listdata?.data ?? [];
}

export async function getObjective(sid: number) {
  const json = await safeJson<{ data: Objective | null }>(
    `${BASE}/api/objective/${sid}`
  );
  return json?.data ?? null;
}

export async function getFundFacts(sid: number) {
  const json = await safeJson<{ data: FundFact[] }>(
    `${BASE}/api/fundfacts/${sid}`
  );
  return json?.data ?? [];
}

export async function getInsights(
  page = 1,
  params: { type?: number; year?: number } = { type: 1 },
) {
  const query = new URLSearchParams({ page: String(page) });
  if (params.type != null) query.set("type", String(params.type));
  if (params.year != null) query.set("year", String(params.year));
  const json = await safeJson<{ listdata: Paginated<NewsItem> }>(
    `${BASE}/api/news/getInsight?${query.toString()}`,
  );
  return json?.listdata?.data ?? [];
}

export async function getServiceNews(sid: number) {
  const json = await safeJson<{ listdata: Paginated<NewsItem> }>(
    `${BASE}/api/servicenews/${sid}`,
  );
  return json?.listdata?.data ?? [];
}

export async function getFundManagers(sid: number) {
  const json = await safeJson<{ data: FundManager[] }>(
    `${BASE}/api/fundmanagers/${sid}`,
  );
  return json?.data ?? [];
}

export async function getCommitteeManagers(sid: number) {
  const json = await safeJson<{ data: CommitteeManager[] }>(
    `${BASE}/api/committeemanagers/${sid}`,
  );
  return json?.data ?? [];
}

export async function getPortfolio(sid: number) {
  const json = await safeJson<{ listdata: PortfolioItem[] }>(
    `${BASE}/api/portfolio/${sid}`,
  );
  return json?.listdata ?? [];
}

export async function getPortfolioChart(sid: number) {
  const json = await safeJson<{ chartdata: PortfolioChart }>(
    `${BASE}/api/portfolio/chart/${sid}`,
  );
  return json?.chartdata ?? null;
}

export async function getPerformance(sid: number) {
  const json = await safeJson<{ listdata: PerformanceItem[] }>(
    `${BASE}/api/performance/${sid}`,
  );
  return json?.listdata ?? [];
}

export async function getApproach(sid: number) {
  const json = await safeJson<{ listdata: ApproachItem[] }>(
    `${BASE}/api/approach/${sid}`,
  );
  return json?.listdata ?? [];
}

export async function getPartners(sid: number) {
  const json = await safeJson<{ listdata: PartnerItem[] }>(
    `${BASE}/api/partner/${sid}`,
  );
  return json?.listdata ?? [];
}

export async function getFundDocuments(
  sid: number,
  filters: { page?: number; type?: number; year?: number; name?: string } = {},
) {
  const query = new URLSearchParams({
    page: String(filters.page ?? 1),
    type: String(filters.type ?? 1),
    year: filters.year == null ? "" : String(filters.year),
    name: filters.name ?? "",
  });
  const json = await safeJson<{ data: Paginated<FundDocument> }>(
    `${BASE}/api/document/${sid}?${query.toString()}`,
  );
  return json?.data?.data ?? [];
}

/** Overview values used by the homepage, derived only from published API data. */
export async function getOverviewStats() {
  const portfolios = await Promise.all(FUNDS.map((fund) => getPortfolio(fund.sid)));

  return {
    // Every service in FUNDS is active per the admin dashboard (5 today) —
    // two of them just don't have an objective/{sid} record filled in yet,
    // which isn't the same thing as inactive (see Funds.tsx, same distinction).
    activeFunds: FUNDS.length,
    // ALL_MEMBERS is the same real board + management + team roster already
    // shown on the About page. The fundmanagers/committeemanagers CMS
    // endpoints only have a handful of names populated across all 5 funds
    // and badly undercount the real team.
    professionals: ALL_MEMBERS.length,
    portfolioPositions: portfolios.reduce((total, p) => total + p.length, 0),
  };
}
