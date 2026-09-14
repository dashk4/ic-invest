import type { Metadata } from "next";
import { Landmark } from "lucide-react";
import { Header } from "@/components/Header";
import { ServiceDetail } from "@/components/ServiceDetail";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Үнэт цаас итгэмжлэн удирдах үйлчилгээ | IC Asset Management",
  description: "Инвескор Ассет Менежмент ХХК-ийн үнэт цаас итгэмжлэн удирдах үйлчилгээ.",
};

export default function SecuritiesTrustPage() {
  return (
    <>
      <Header />
      <main>
        <ServiceDetail
          icon={<Landmark className="h-[19px] w-[19px]" strokeWidth={1.8} />}
          titleMn="Үнэт цаас итгэмжлэн удирдах үйлчилгээ"
          titleEn="Securities Trust Management Service"
          paragraphs={[
            {
              mn: '"Инвескор Ассет Менежмент" нь харилцагчийн хөрөнгийг гэрээнд заасан нөхцөл, хөрөнгө оруулалтын бодлогын хүрээнд мэргэжлийн түвшинд удирдах үнэт цаасны итгэмжлэн удирдах үйлчилгээг үзүүлдэг.',
              en: "Invescore Asset Management provides securities trust management services, professionally managing client assets within the terms of the agreement and the investment policy.",
            },
            {
              mn: "Үйлчилгээний хүрээнд харилцагчийн хөрөнгө оруулалтын зорилго, хугацаа, эрсдэлийн түвшинд нийцүүлэн багцын бүтэц, хөрөнгийн хуваарилалтыг тодорхойлж, тохирох үнэт цаасыг сонгон хөрөнгө оруулалтын шийдвэрийг хэрэгжүүлнэ. Хөрөнгийг гэрээнд заасан нөхцөл, зорилтот өгөөжийн түвшинд нийцүүлэн удирдаж, харилцагчийн хөрөнгө оруулалтын зорилтыг хэрэгжүүлэхэд чиглэн ажиллана.",
              en: "As part of this service, we determine portfolio structure and asset allocation matched to the client's investment goals, horizon and risk tolerance, select suitable securities, and implement investment decisions. Assets are managed in line with the terms of the agreement and target return, working to achieve the client's investment objectives.",
            },
            {
              mn: "Мөн хөрөнгө оруулалтын багцын гүйцэтгэл, зах зээлийн нөхцөл болон эрсдэлийг тогтмол хянаж, шаардлагатай тохиолдолд багцын бүтцэд зохих өөрчлөлт хийж удирдана.",
              en: "We also regularly monitor portfolio performance, market conditions and risk, adjusting the portfolio structure as needed.",
            },
          ]}
          closing={{
            mn: "Үнэт цаас итгэмжлэн удирдах үйлчилгээний талаар дэлгэрэнгүй мэдээлэл авахыг хүсвэл манай мэргэжлийн багтай холбогдоорой.",
            en: "To learn more about our securities trust management service, get in touch with our professional team.",
          }}
          buttonMn="Мэдээлэл авах"
          buttonEn="Get in touch"
        />
      </main>
      <Footer />
    </>
  );
}
