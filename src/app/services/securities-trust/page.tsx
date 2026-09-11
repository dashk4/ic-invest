import type { Metadata } from "next";
import { Landmark } from "lucide-react";
import { Header } from "@/components/Header";
import { ServiceDetail } from "@/components/ServiceDetail";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Үнэт цаас итгэмжлэх удирдах | IC Asset Management",
  description: "Инвескор Ассет Менежмент ХХК-ийн үнэт цаас итгэмжлэх удирдах үйлчилгээ.",
};

export default function SecuritiesTrustPage() {
  return (
    <>
      <Header />
      <main>
        <ServiceDetail
          icon={<Landmark className="h-[19px] w-[19px]" strokeWidth={1.8} />}
          titleMn="Үнэт цаас итгэмжлэх удирдах"
          titleEn="Securities Trust Management"
        />
      </main>
      <Footer />
    </>
  );
}
