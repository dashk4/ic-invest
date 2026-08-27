import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { FundCalculator } from "@/components/FundCalculator";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Тооцоолуур | IC Asset Management",
  description:
    "Тогтмол хуримтлалын ирээдүйн өгөөжийг өөрийн сонгосон давтамж, дүн, хугацаагаар ойролцоогоор тооцоолно.",
};

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main>
        <FundCalculator />
      </main>
      <Footer />
    </>
  );
}
