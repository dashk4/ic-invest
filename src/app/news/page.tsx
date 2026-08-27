import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Insights } from "@/components/Insights";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Мэдээ, мэдээлэл | IC Asset Management",
  description:
    "Инвескор Ассет Менежмент ҮЦК-ийн сүүлийн үеийн мэдээ, мэдээлэл болон судалгаа.",
};

export default function NewsPage() {
  return (
    <>
      <Header />
      <main>
        <Insights />
      </main>
      <Footer />
    </>
  );
}
