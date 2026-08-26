const BASE = "https://ic-invest.mn";
const REVALIDATE_SECONDS = 3600;

export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at?: string;
  publish_date?: string;
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
