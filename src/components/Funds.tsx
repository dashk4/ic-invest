import { excerpt, FUNDS, getFundFacts, getObjective, numericValue } from "@/lib/api";
import { FUND_LABEL_EN } from "@/lib/fundI18n";
import { FUND_DESCRIPTION_EN, FUND_DETAILS } from "@/lib/fundDetail";
import { FundsList, type FundCardData } from "./FundsList";
// 3D marquee didn't land well visually — parked, not deleted, in case it's
// worth revisiting with a different tile design later.
// import { FundsMarquee } from "./FundsMarquee";
import { FundsHeading } from "./FundsHeading";

export async function Funds() {
  // Every fund in FUNDS is a real, admin-active service (5 today) — the
  // admin's own objective/{sid} record just hasn't been filled in yet for
  // two of them (sid 5 and 6), which used to get misread as "not published"
  // and silently dropped the card entirely (admin showed 5 active funds,
  // the site showed 3). FUND_DETAILS' fallback name/description covers that
  // gap with real content sourced elsewhere (sid 5's own launch
  // announcement; sid 6's copy supplied directly) rather than hiding the fund.
  const funds: FundCardData[] = await Promise.all(
    FUNDS.map(async (f): Promise<FundCardData> => {
      const [objective, facts] = await Promise.all([
        getObjective(f.sid),
        getFundFacts(f.sid),
      ]);

      // this site is entirely Mongolian, so a real fact label always has
      // Cyrillic in it; the admin's test rows ("QWe"/"aaa", "qqq"/"as" on
      // sid 5) are pure Latin and never match. (A prior version of this
      // filter checked the combined "label value" string against
      // /^(qwe|aaa)$/, which can never match since that string always has
      // a space in it — see the same fix in funds/[slug]/page.tsx.)
      const usableFacts = facts.filter(
        (fact) => fact.first_text.trim() && fact.last_text.trim() && /[Ѐ-ӿ]/.test(fact.first_text),
      );
      const navFact = facts.find((x) => /цэвэр үнэ цэн/i.test(x.first_text));
      const meta = FUND_DETAILS.find((d) => d.sid === f.sid);
      const slug = meta?.slug ?? String(f.sid);

      return {
        sid: f.sid,
        code: f.code,
        href: `/funds/${slug}`,
        name: objective?.name ?? meta?.nameFallback?.mn ?? f.label,
        labelMn: f.label,
        labelEn: FUND_LABEL_EN[f.sid] ?? f.label,
        excerptMn: objective?.text
          ? excerpt(objective.text, 135)
          : (meta?.descriptionFallback?.mn.split("\n\n")[0] ?? ""),
        excerptEn: FUND_DESCRIPTION_EN[f.sid]
          ? excerpt(FUND_DESCRIPTION_EN[f.sid], 135)
          : (meta?.descriptionFallback?.en.split("\n\n")[0] ?? ""),
        nav:
          navFact &&
          usableFacts.includes(navFact) &&
          numericValue(navFact.last_text) != null
            ? numericValue(navFact.last_text)
            : null,
      };
    }),
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
