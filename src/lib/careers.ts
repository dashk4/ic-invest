const BASE_URL = "https://ic-invest.mn";

export type JobListing = {
  id: string;
  title: string;
  contentHtml: string;
};

/**
 * There's no job-listings API (checked /api/vacancy(ies), /api/job(s),
 * /api/career(s), /api/workplace, /api/position(s) — all 404). Job postings
 * are server-rendered directly into /{locale}/contact-us as an accordion
 * under <section id="workplace">, each with its own "CV илгээх" button that
 * opens a modal posting to /save/cvupload/{id} — so this scrapes that
 * section the same way submitFeedback already scrapes the CSRF token from
 * the same page.
 *
 * The boundary for each item's description is "up to the next
 * .send-button div" rather than trying to match the .accordion-content
 * div's true closing tag — the source HTML nests a stray <p> around block
 * elements (browsers silently auto-close it), which makes exact tag-balance
 * matching unreliable, whereas the CV button is a solid, consistent marker.
 */
export async function getJobListings(locale: "mn" | "en" = "mn"): Promise<JobListing[]> {
  try {
    const res = await fetch(`${BASE_URL}/${locale}/contact-us`, {
      next: { revalidate: 3600 },
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return [];
    const html = await res.text();

    const section = html.match(/<section id="workplace"[\s\S]*?(?=<section id=|<footer|$)/)?.[0];
    if (!section) return [];

    const itemBlocks = section.match(/<div class="accordion-item">[\s\S]*?(?=<div class="accordion-item">|$)/g) ?? [];

    return itemBlocks
      .map((block): JobListing | null => {
        const title = block.match(/accordion-title">([^<]*)</)?.[1]?.trim();
        const contentHtml = block.match(/accordion-content content">([\s\S]*?)<div class="send-button">/)?.[1];
        const id = block.match(/cvupload\/(\d+)/)?.[1];
        if (!title || !contentHtml || !id) return null;
        return { id, title, contentHtml };
      })
      .filter((job): job is JobListing => job !== null);
  } catch {
    return [];
  }
}
