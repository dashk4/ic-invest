import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Funds } from "@/components/Funds";
import { Insights } from "@/components/Insights";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getFundFacts, getObjective } from "@/lib/api";

export default async function Home() {
  const [objective, facts] = await Promise.all([getObjective(4), getFundFacts(4)]);
  const navFact = facts.find((x) => /цэвэр үнэ цэн/i.test(x.first_text));
  const unitsFact = facts.find((x) => /нэгж эрхийн тоо/i.test(x.first_text));

  return (
    <>
      <Header />
      <main>
        <Hero
          heroFund={{
            name: objective?.name ?? "Инвескор Глобал Кью",
            nav: navFact ? Number(navFact.last_text) : null,
            units: unitsFact ? Number(unitsFact.last_text) : null,
          }}
        />
        <Stats />
        <Funds />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
