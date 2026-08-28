import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Careers } from "@/components/Careers";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ажлын байр | IC Asset Management",
  description: "Инвескор Ассет Менежмент ХХК-д санал болгож буй ажлын байрнууд.",
};

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        <Careers />
      </main>
      <Footer />
    </>
  );
}
