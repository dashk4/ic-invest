import { getJobListings } from "@/lib/careers";
import { CareersList } from "./CareersList";

// Temporarily hidden per owner request: the CMS still lists an old
// "Investment Manager" posting that is no longer an actual open role, and
// there's no CMS-side way to distinguish "closed" from "open" postings.
// Flip this back to false once a real opening exists.
const HIDE_CAREERS = true;

export async function Careers() {
  if (HIDE_CAREERS) return null;

  const jobs = await getJobListings("mn");

  if (jobs.length === 0) return null;

  return (
    <section id="workplace" className="theme-fade min-h-svh bg-surface-alt pb-24 pt-36 md:pt-44">
      <div className="container-page max-w-3xl">
        <p className="eyebrow text-accent">Ажлын байр</p>
        <h2 className="t-h2 mt-4 max-w-xl text-balance text-fg">
          Танд санал болгож буй ажлын байр
        </h2>

        <CareersList jobs={jobs} />
      </div>
    </section>
  );
}
