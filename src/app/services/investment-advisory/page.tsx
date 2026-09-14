import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { Header } from "@/components/Header";
import { ServiceDetail } from "@/components/ServiceDetail";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Хөрөнгө оруулалтын зөвлөх үйлчилгээ | IC Asset Management",
  description: "Инвескор Ассет Менежмент ХХК-ийн хөрөнгө оруулалтын зөвлөх үйлчилгээ.",
};

export default function InvestmentAdvisoryPage() {
  return (
    <>
      <Header />
      <main>
        <ServiceDetail
          icon={<Compass className="h-[19px] w-[19px]" strokeWidth={1.8} />}
          titleMn="Хөрөнгө оруулалтын зөвлөх үйлчилгээ"
          titleEn="Investment Advisory Service"
          lead={{
            mn: "Хөрөнгө оруулалтын шийдвэрээ судалгаа, шинжилгээнд тулгуурлан гаргахад тань мэргэжлийн зөвлөгөө, мэдээллээр дэмжин ажиллана.",
            en: "We support you with professional advice and information so you can base your investment decisions on research and analysis.",
          }}
          paragraphs={[
            {
              mn: '"Инвескор Ассет Менежмент" нь хөрөнгө оруулагчийн санхүүгийн зорилго, хөрөнгө оруулалтын хугацаа, эрсдэл хүлээх түвшинд нийцсэн мэргэжлийн зөвлөх үйлчилгээг үзүүлдэг.',
              en: "Invescore Asset Management provides professional advisory services matched to each investor's financial goals, investment horizon and risk tolerance.",
            },
            {
              mn: "Үйлчилгээний хүрээнд дотоодын болон олон улсын зах зээл, хөрөнгө оруулалтын хэрэгслүүдэд судалгаа, шинжилгээ хийж, тэдгээрийн боломж, эрсдэлийг үнэлэн багцын бүтэц, хөрөнгийн хуваарилалтын талаар зөвлөмж боловсруулна.",
              en: "As part of this service, we research and analyze domestic and international markets and investment instruments, assess their opportunities and risks, and develop recommendations on portfolio structure and asset allocation.",
            },
            {
              mn: "Бид судалгаа, шинжилгээ, эрсдэлийн үнэлгээнд үндэслэн хөрөнгө оруулагчдыг оновчтой, мэдээлэлд суурилсан шийдвэр гаргахад дэмжин ажилладаг.",
              en: "Based on our research, analysis and risk assessment, we help investors make sound, well-informed decisions.",
            },
          ]}
          buttonMn="Зөвлөгөө авах"
          buttonEn="Get advice"
        />
      </main>
      <Footer />
    </>
  );
}
