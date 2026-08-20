import { excerpt, FUNDS, getFundFacts, getObjective } from "@/lib/api";
import { FUND_EXCERPT_EN, FUND_LABEL_EN } from "@/lib/fundI18n";
import { FundsGrid, type FundCardData } from "./FundsGrid";
import { FundsHeading } from "./FundsHeading";
import { Marquee } from "./ui/Marquee";

export async function Funds() {
  const funds: FundCardData[] = await Promise.all(
    FUNDS.map(async (f) => {
      const objective = await getObjective(f.sid);
      const facts = f.sid === 4 ? await getFundFacts(f.sid) : [];
      const navFact = facts.find((x) => /цэвэр үнэ цэн/i.test(x.first_text));
      return {
        sid: f.sid,
        code: f.code,
        href: f.href,
        name: objective?.name ?? f.label,
        labelMn: f.label,
        labelEn: FUND_LABEL_EN[f.sid] ?? f.label,
        excerptMn: objective?.text ? excerpt(objective.text, 150) : "",
        excerptEn: FUND_EXCERPT_EN[f.sid] ?? "",
        nav: navFact ? Number(navFact.last_text) : null,
      };
    })
  );

  const tickerItems = funds.map((f) => `${f.code} · ${f.name}`);

  return (
    <section id="funds" className="theme-fade bg-surface-strong py-24 text-on-strong md:py-32">
      <div className="container-page">
        <FundsHeading />
      </div>
      <Marquee items={tickerItems} />
      <div className="container-page">
        <FundsGrid funds={funds} />
      </div>
    </section>
  );
}
