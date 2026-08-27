"use client";

import { useActionState, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLocale, pick } from "@/lib/locale";
import { submitCv, type CvState } from "@/app/actions/cv";
import type { JobListing } from "@/lib/careers";

const INITIAL_CV_STATE: CvState = { ok: false, message: "" };

export function CareersList({ jobs }: { jobs: JobListing[] }) {
  const [openId, setOpenId] = useState<string | null>(jobs[0]?.id ?? null);

  return (
    <div className="mt-10 space-y-3">
      {jobs.map((job) => (
        <JobAccordionItem
          key={job.id}
          job={job}
          isOpen={openId === job.id}
          onToggle={() => setOpenId((current) => (current === job.id ? null : job.id))}
        />
      ))}
    </div>
  );
}

function JobAccordionItem({
  job,
  isOpen,
  onToggle,
}: {
  job: JobListing;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { locale } = useLocale();
  const [showForm, setShowForm] = useState(false);
  const [state, formAction, pending] = useActionState(submitCv, INITIAL_CV_STATE);

  const fieldClass =
    "mt-2 w-full rounded-xl border hairline bg-surface-sunken/40 px-4 py-3 text-fg outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-fg-subtle focus:border-accent focus:shadow-[0_0_0_4px_rgba(74,157,129,0.1)]";

  return (
    <div className="overflow-hidden rounded-2xl border hairline bg-surface">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span className="font-display text-xl text-fg">{job.title}</span>
        <span
          aria-hidden
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border hairline text-fg-subtle transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>

      {isOpen && (
        <div className="border-t hairline px-6 pb-8 pt-6">
          <div
            className="prose-news max-w-none text-pretty t-body text-fg-muted [&_a]:text-accent [&_a]:underline [&_h2]:mt-0 [&_h2]:font-display [&_h2]:text-lg [&_h2]:text-fg [&_li]:mt-1 [&_p+p]:mt-4 [&_strong]:font-semibold [&_strong]:text-fg [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: job.contentHtml }}
          />

          {!showForm ? (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="cta-button cta-button-solid cta-button-brand group mt-8 inline-flex min-h-14 w-fit min-w-[10rem] items-center justify-between gap-4 rounded-[1.1rem] border border-action bg-action px-4 py-2.5 text-[1.05rem] font-semibold leading-none text-action-contrast transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:brightness-105 md:px-5"
            >
              <span className="relative z-10">{pick(locale, "CV илгээх", "Submit CV")}</span>
              <span
                aria-hidden
                className="cta-arrow relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem] leading-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
              </span>
            </button>
          ) : (
            <form action={formAction} className="mt-8 max-w-md border-t hairline pt-6">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="jobId" value={job.id} />
              <p className="eyebrow text-fg-subtle">
                {job.title} — {pick(locale, "CV илгээх", "Submit your CV")}
              </p>
              <div className="mt-4">
                <label className="eyebrow text-fg-subtle" htmlFor={`cv-name-${job.id}`}>
                  {pick(locale, "Овог нэр", "Full name")}
                </label>
                <input
                  id={`cv-name-${job.id}`}
                  name="sender_name"
                  required
                  className={fieldClass}
                  placeholder={pick(locale, "Таны нэр", "Your name")}
                />
              </div>
              <div className="mt-4">
                <label className="eyebrow text-fg-subtle" htmlFor={`cv-file-${job.id}`}>
                  {pick(locale, "CV файл", "CV file")}
                </label>
                <input
                  id={`cv-file-${job.id}`}
                  name="cv_file"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  className="mt-2 w-full text-[0.9rem] text-fg-muted file:mr-4 file:rounded-lg file:border-0 file:bg-accent/10 file:px-4 file:py-2 file:text-[0.85rem] file:font-medium file:text-accent"
                />
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={pending}
                  className="cta-button cta-button-solid cta-button-brand group inline-flex min-h-12 w-fit items-center gap-3 rounded-[1.1rem] border border-action bg-action px-5 py-2.5 text-[0.95rem] font-semibold text-action-contrast transition-all duration-500 hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-wait disabled:opacity-60"
                >
                  {pending ? pick(locale, "Илгээж байна…", "Sending…") : pick(locale, "Илгээх", "Submit")}
                </button>
                {state.message && (
                  <p aria-live="polite" className={`t-small ${state.ok ? "text-accent" : "text-red-500"}`}>
                    {state.message}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
