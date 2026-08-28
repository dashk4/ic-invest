import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FundDetail, type FundDetailData } from "@/components/FundDetail";
import {
  excerpt,
  FUNDS,
  getApproach,
  getCommitteeManagers,
  getFundDocuments,
  getFundFacts,
  getFundManagers,
  getObjective,
  getPartners,
  getPerformance,
  getPortfolio,
  getPortfolioChart,
  getServiceNews,
  numericValue,
} from "@/lib/api";
import { FUND_LABEL_EN } from "@/lib/fundI18n";
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
  const fund = FUNDS.find((f) => f.sid === meta?.sid);
  if (!meta || !fund) return {};
  const objective = await getObjective(meta.sid);
  const name = objective?.name ?? meta.nameFallback?.mn ?? fund.label;
  const description = objective?.text
    ? excerpt(objective.text, 160)
    : (meta.descriptionFallback?.mn.split("\n\n")[0] ?? undefined);
  return {
    title: `${name} | IC Asset Management`,
    description,
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

  const [objective, apiFacts, managers, committeeManagers, portfolio, portfolioChart, performance, approach, partners, documents, serviceNews, otherObjectives] = await Promise.all([
    getObjective(meta.sid),
    getFundFacts(meta.sid),
    getFundManagers(meta.sid),
    getCommitteeManagers(meta.sid),
    getPortfolio(meta.sid),
    getPortfolioChart(meta.sid),
    getPerformance(meta.sid),
    getApproach(meta.sid),
    getPartners(meta.sid),
    getFundDocuments(meta.sid),
    getServiceNews(meta.sid),
    Promise.all(
      FUNDS.filter((other) => other.sid !== meta.sid).map(async (other) => ({
        sid: other.sid,
        objective: await getObjective(other.sid),
      })),
    ),
  ]);

  // Cyrillic-content check: this site is entirely Mongolian-language, so a
  // real CMS fact/approach label always has Cyrillic in it (e.g. "Нэгж
  // эрхийн цэвэр үнэ цэн"). The admin's test/placeholder rows (sid 5 has
  // "QWe"/"aaa", "qqq"/"as" as fundfacts labels and "qqedf"/"ww" as an
  // approach entry) are short Latin keyboard-mash strings that never occur
  // in real content. A previous version of this filter checked the combined
  // "label value" string against /^(qwe|aaa)$/, which can never match (the
  // combined string always has a space in it), so it silently let every
  // junk row through — checking the label alone for Cyrillic actually works
  // and generalizes past this one fixed pair of test strings.
  const hasCyrillic = (s: string) => /[Ѐ-ӿ]/.test(s);

  const realFacts: FundDetailData["facts"] = apiFacts
    .filter(
      (fact) =>
        fact.first_text.trim() && fact.last_text.trim() && hasCyrillic(fact.first_text),
    )
    .map((f) => {
      const n = numericValue(f.last_text);
      return {
        labelMn: f.first_text,
        labelEn: f.first_text,
        value: f.last_text,
        numeric: n,
      };
    });
  // sid 5 has no usable fundfacts row at all (only test junk), but does have
  // one real, verifiable fact — its own primary-offering window — supplied
  // as static fallback data rather than fetched, since there's no live
  // endpoint for it.
  const facts: FundDetailData["facts"] =
    realFacts.length > 0
      ? realFacts
      : (meta.staticFacts ?? []).map((f) => ({
          labelMn: f.mn,
          labelEn: f.en,
          value: f.value,
          numeric: null,
        }));

  const realApproach = approach.filter(
    (item) => hasCyrillic(item.name) || hasCyrillic(item.text),
  );

  const otherFunds = otherObjectives.map(({ sid, objective: otherObjective }) => {
    const other = FUNDS.find((item) => item.sid === sid)!;
    const otherMeta = FUND_DETAILS.find((item) => item.sid === sid)!;
    return {
      slug: otherMeta.slug,
      code: other.code,
      name: otherObjective?.name ?? otherMeta.nameFallback?.mn ?? other.label,
      nameEn: otherObjective?.name ?? otherMeta.nameFallback?.en ?? other.label,
    };
  });

  const name = objective?.name ?? meta.nameFallback?.mn ?? fund.label;
  const descriptionMn = objective?.text ?? meta.descriptionFallback?.mn ?? "";
  const descriptionEn = objective?.text
    ? (FUND_DESCRIPTION_EN[meta.sid] ?? objective.text)
    : (meta.descriptionFallback?.en ?? "");

  const data: FundDetailData = {
    sid: meta.sid,
    slug: meta.slug,
    index: FUND_DETAILS.findIndex((f) => f.sid === meta.sid),
    code: fund.code,
    labelMn: fund.label,
    labelEn: FUND_LABEL_EN[meta.sid] ?? fund.label,
    name,
    blurbMn: objective?.text
      ? excerpt(objective.text, 120)
      : (meta.descriptionFallback?.mn.split("\n\n")[0] ?? ""),
    blurbEn: objective?.text
      ? excerpt(FUND_DESCRIPTION_EN[meta.sid] ?? objective.text, 120)
      : (meta.descriptionFallback?.en.split("\n\n")[0] ?? ""),
    descriptionMn,
    descriptionEn,
    logo: meta.logo,
    logoWidth: meta.logoWidth,
    logoHeight: meta.logoHeight,
    logoOnDark: meta.logoOnDark ?? false,
    logoScale: meta.logoScale ?? 1,
    facts,
    externalSite: meta.externalSite,
    otherFunds,
    live: {
      managers,
      committeeManagers,
      portfolio,
      portfolioChart,
      performance,
      approach: realApproach,
      partners,
      documents,
      serviceNews,
    },
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
