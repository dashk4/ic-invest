import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { excerpt, getNewsById, uploadUrl } from "@/lib/api";
import { NewsArticle } from "@/components/NewsArticle";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = Number((await params).id);
  const item = Number.isFinite(id) ? await getNewsById(id, "mn") : null;
  if (!item) return {};
  return {
    title: `${item.title} | IC Asset Management`,
    description: excerpt(item.content, 160),
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  if (!Number.isFinite(id)) notFound();

  // The CMS doesn't pair MN/EN articles under a shared id — they're
  // independent per-language lists (e.g. id 9 only exists in the English
  // feed) — so this looks the id up in both and NewsArticle shows whichever
  // exists for the current locale, rather than assuming a translation is
  // always present.
  const [mn, en] = await Promise.all([getNewsById(id, "mn"), getNewsById(id, "en")]);
  if (!mn && !en) notFound();

  const itemMn = mn ? { ...mn, pictureUrl: uploadUrl(mn.picture) } : null;
  const itemEn = en ? { ...en, pictureUrl: uploadUrl(en.picture) } : null;

  return (
    <>
      <Header />
      <main>
        <section className="theme-fade min-h-svh bg-surface pb-24 pt-36 md:pt-44">
          {/* max-w-3xl has to sit on an inner wrapper: .container-page is
              unlayered CSS, so its own max-width beats the utility class and
              the article ran the full page width. */}
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              <Link href="/news" className="group inline-flex items-center gap-3 text-fg-subtle">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border hairline transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1 group-hover:border-accent group-hover:text-accent">
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="eyebrow transition-colors duration-300 group-hover:text-accent">
                  Мэдээ, мэдээлэл
                </span>
              </Link>

              <NewsArticle itemMn={itemMn} itemEn={itemEn} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
