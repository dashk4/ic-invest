import { excerpt, FUNDS, getFundFacts, getObjective } from "@/lib/api";
import { FUND_EXCERPT_EN, FUND_LABEL_EN } from "@/lib/fundI18n";
import { FUND_DETAILS } from "@/lib/fundDetail";
import { FundsList, type FundCardData } from "./FundsList";
// 3D marquee didn't land well visually — parked, not deleted, in case it's
// worth revisiting with a different tile design later.
// import { FundsMarquee } from "./FundsMarquee";
import { FundsHeading } from "./FundsHeading";

export async function Funds() {
  const funds: FundCardData[] = await Promise.all(
    FUNDS.map(async (f) => {
      const objective = await getObjective(f.sid);
      const facts = f.sid === 4 ? await getFundFacts(f.sid) : [];
      const navFact = facts.find((x) => /цэвэр үнэ цэн/i.test(x.first_text));
      const meta = FUND_DETAILS.find((d) => d.sid === f.sid);
      const slug = meta?.slug ?? String(f.sid);
      // sid 5 and 6 have no live objective (the API returns null for both),
      // so their card copy falls back to the same real, hand-entered text
      // used on their own detail page instead of going blank.
      return {
        sid: f.sid,
        code: f.code,
        href: `/funds/${slug}`,
        name: objective?.name ?? meta?.nameFallback.mn ?? f.label,
        labelMn: f.label,
        labelEn: FUND_LABEL_EN[f.sid] ?? f.label,
        excerptMn: objective?.text
          ? excerpt(objective.text, 135)
          : (meta?.descriptionFallback?.mn.split("\n\n")[0] ?? ""),
        excerptEn: FUND_EXCERPT_EN[f.sid] ?? meta?.descriptionFallback?.en.split("\n\n")[0] ?? "",
        nav: navFact ? Number(navFact.last_text) : null,
      };
    })
  );

  return (
    <section
      id="funds"
      className="theme-fade section-y relative overflow-hidden bg-surface-strong text-on-strong"
    >
      <div className="grain pointer-events-none absolute inset-0">
        <div
          className="drift-slow absolute right-[-10%] top-[10%] h-[55vh] w-[55vh] rounded-full opacity-[0.10] blur-[140px]"
          style={{ background: "var(--jade-500)" }}
        />
      </div>

      <div className="container-page relative">
        <FundsHeading />
        {/* <FundsMarquee funds={funds} /> */}
        <FundsList funds={funds} />
      </div>
    </section>
  );
}
