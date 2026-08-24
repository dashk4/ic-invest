import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Бидний тухай | IC Asset Management",
  description:
    "Инвескор Ассет Менежмент ҮЦК — алсын хараа, үнэт зүйл, төлөөлөн удирдах зөвлөл болон хамт олон.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </>
  );
}
