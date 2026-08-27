import { excerpt, getInsights, getNews } from "@/lib/api";
import { NewsGrid } from "./NewsGrid";
import { InsightsHeading } from "./InsightsHeading";

export async function Insights() {
  const [mnRaw, enRaw, marketOutlook] = await Promise.all([
    getNews(1, "mn"),
    getNews(1, "en"),
    getInsights(1, { type: 1 }),
  ]);
  const unique = (items: typeof mnRaw) =>
    Array.from(new Map(items.map((item) => [item.id, item])).values());
  const mnSource = unique([...mnRaw, ...marketOutlook]);
  const enSource = enRaw.length > 0 ? enRaw : marketOutlook;
  const mn = mnSource.map((n) => ({ ...n, content: excerpt(n.content, 120) }));
  const en = enSource.map((n) => ({ ...n, content: excerpt(n.content, 120) }));

  return (
    <section
      id="insights"
      className="theme-fade min-h-svh bg-surface pb-[clamp(5rem,10vh,8rem)] pt-36 md:pt-44"
    >
      <div className="container-page">
        <InsightsHeading />
        <NewsGrid mn={mn} en={en} />
      </div>
    </section>
  );
}
