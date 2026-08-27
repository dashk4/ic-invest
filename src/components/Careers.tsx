import { getJobListings } from "@/lib/careers";
import { CareersList } from "./CareersList";

export async function Careers() {
  const jobs = await getJobListings("mn");

  if (jobs.length === 0) return null;

  return (
    <section id="workplace" className="theme-fade section-y bg-surface-alt">
      <div className="container-page max-w-3xl">
        <p className="eyebrow text-accent">Ажлын байр</p>
        <h2 className="t-h2 mt-4 max-w-xl text-balance text-fg">
          Танд санал болгож буй ажлын байрнууд
        </h2>

        <CareersList jobs={jobs} />
      </div>
    </section>
  );
}
