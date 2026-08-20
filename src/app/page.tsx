import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Philosophy } from "@/components/Philosophy";
import { VisionBanner } from "@/components/VisionBanner";
import { Funds } from "@/components/Funds";
import { Insights } from "@/components/Insights";
import { Team } from "@/components/Team";
import { WhyIC } from "@/components/WhyIC";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Philosophy />
        <VisionBanner />
        <Funds />
        <Insights />
        <Team />
        <WhyIC />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
