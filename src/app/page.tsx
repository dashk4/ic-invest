import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Funds } from "@/components/Funds";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FUNDS, getFundFacts, getObjective, getOverviewStats, numericValue } from "@/lib/api";
import { FUND_LABEL_EN } from "@/lib/fundI18n";

export default async function Home() {
  const [objective, facts, stats] = await Promise.all([
    getObjective(4),
    getFundFacts(4),
    getOverviewStats(),
  ]);
  const heroMeta = FUNDS.find((fund) => fund.sid === 4)!;
  const navFact = facts.find((x) => /цэвэр үнэ цэн/i.test(x.first_text));
  const unitsFact = facts.find((x) => /нэгж эрхийн тоо/i.test(x.first_text));

  return (
    <>
      <Header />
      <main>
        <Hero
          heroFund={{
            name: objective?.name ?? "",
            code: heroMeta.code,
            categoryMn: heroMeta.label,
            categoryEn: FUND_LABEL_EN[heroMeta.sid] ?? heroMeta.label,
            nav: numericValue(navFact?.last_text),
            units: numericValue(unitsFact?.last_text),
          }}
        />
        <Stats stats={stats} />
        <Funds />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
