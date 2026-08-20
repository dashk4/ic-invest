import { excerpt, getNews } from "@/lib/api";
import { NewsGrid } from "./NewsGrid";
import { InsightsHeading } from "./InsightsHeading";

export async function Insights() {
  const [mnRaw, enRaw] = await Promise.all([getNews(1, "mn"), getNews(1, "en")]);
  const mn = mnRaw.map((n) => ({ ...n, content: excerpt(n.content, 120) }));
  const en = enRaw.map((n) => ({ ...n, content: excerpt(n.content, 120) }));

  return (
    <section id="insights" className="theme-fade section-y bg-surface">
      <div className="container-page">
        <InsightsHeading />
        <NewsGrid mn={mn} en={en} />
      </div>
    </section>
  );
}
