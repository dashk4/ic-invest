import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FundDetail, type FundDetailData } from "@/components/FundDetail";
import { excerpt, FUNDS, getFundFacts, getObjective } from "@/lib/api";
import { FUND_EXCERPT_EN, FUND_LABEL_EN } from "@/lib/fundI18n";
import { FUND_DESCRIPTION_EN, FUND_DETAILS } from "@/lib/fundDetail";

export function generateStaticParams() {
  return FUND_DETAILS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = FUND_DETAILS.find((f) => f.slug === slug);
  if (!meta) return {};
  const objective = await getObjective(meta.sid);
  const name = objective?.name ?? meta.nameFallback.mn;
  return {
    title: `${name} | IC Asset Management`,
    description: objective?.text ?? meta.descriptionFallback?.mn,
  };
}

export default async function FundPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = FUND_DETAILS.find((f) => f.slug === slug);
  const fund = FUNDS.find((f) => f.sid === meta?.sid);
  if (!meta || !fund) notFound();

  const [objective, apiFacts] = await Promise.all([
    getObjective(meta.sid),
    getFundFacts(meta.sid),
  ]);

  // sid 5's fundfacts endpoint returns placeholder test data ("QWe" -> "aaa"),
  // so real numeric facts only ever come from the API for sid 4 — everything
  // else falls back to the static, real facts in fundDetail.ts (or nothing).
  const facts: FundDetailData["facts"] =
    meta.sid === 4
      ? apiFacts.map((f) => {
          const n = Number(f.last_text);
          return {
            labelMn: f.first_text,
            labelEn: f.first_text,
            value: f.last_text,
            numeric: Number.isFinite(n) ? n : null,
          };
        })
      : (meta.staticFacts ?? []).map((f) => ({
          labelMn: f.mn,
          labelEn: f.en,
          value: f.value,
          numeric: null,
        }));

  const otherFunds = FUND_DETAILS.filter((f) => f.sid !== meta.sid).map((f) => {
    const other = FUNDS.find((x) => x.sid === f.sid)!;
    return { slug: f.slug, code: other.code, name: f.nameFallback.mn, nameEn: f.nameFallback.en };
  });

  const data: FundDetailData = {
    sid: meta.sid,
    slug: meta.slug,
    index: FUND_DETAILS.findIndex((f) => f.sid === meta.sid),
    code: fund.code,
    labelMn: fund.label,
    labelEn: FUND_LABEL_EN[meta.sid] ?? fund.label,
    name: objective?.name ?? meta.nameFallback.mn,
    blurbMn: objective?.text ? excerpt(objective.text, 120) : meta.descriptionFallback?.mn.split("\n\n")[0] ?? "",
    blurbEn: FUND_EXCERPT_EN[meta.sid] ?? meta.descriptionFallback?.en.split("\n\n")[0] ?? "",
    descriptionMn: objective?.text ?? meta.descriptionFallback?.mn ?? "",
    descriptionEn: FUND_DESCRIPTION_EN[meta.sid] ?? meta.descriptionFallback?.en ?? "",
    logo: meta.logo,
    logoWidth: meta.logoWidth,
    logoHeight: meta.logoHeight,
    facts,
    externalSite: meta.externalSite,
    otherFunds,
  };

  return (
    <>
      <Header />
      <main>
        <FundDetail fund={data} />
      </main>
      <Footer />
    </>
  );
}
