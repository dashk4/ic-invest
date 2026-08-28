import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Funds } from "@/components/Funds";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getOverviewStats } from "@/lib/api";

export default async function Home() {
  const stats = await getOverviewStats();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats stats={stats} />
        <Funds />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
