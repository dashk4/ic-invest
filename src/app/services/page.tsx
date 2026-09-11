import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Үйлчилгээ | IC Asset Management",
  description: "Инвескор Ассет Менежмент ХХК-ийн санал болгож буй үйлчилгээнүүд.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <Services />
      </main>
      <Footer />
    </>
  );
}
