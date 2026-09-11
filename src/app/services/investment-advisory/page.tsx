import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { Header } from "@/components/Header";
import { ServiceDetail } from "@/components/ServiceDetail";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Хөрөнгө оруулалтын мэргэшсэн зөвлөх үйлчилгээ | IC Asset Management",
  description: "Инвескор Ассет Менежмент ХХК-ийн хөрөнгө оруулалтын мэргэшсэн зөвлөх үйлчилгээ.",
};

export default function InvestmentAdvisoryPage() {
  return (
    <>
      <Header />
      <main>
        <ServiceDetail
          icon={<Compass className="h-[19px] w-[19px]" strokeWidth={1.8} />}
          titleMn="Хөрөнгө оруулалтын мэргэшсэн зөвлөх үйлчилгээ"
          titleEn="Professional Investment Advisory"
        />
      </main>
      <Footer />
    </>
  );
}
