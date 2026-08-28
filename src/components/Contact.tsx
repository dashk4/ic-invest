"use client";

import { useActionState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { ContactGlobe } from "./ContactGlobe";
import { useLocale, pick } from "@/lib/locale";
import { submitFeedback, type FeedbackState } from "@/app/actions/feedback";

const INITIAL_FEEDBACK_STATE: FeedbackState = { ok: false, message: "" };

export function Contact() {
  const { locale } = useLocale();
  const [state, formAction, pending] = useActionState(
    submitFeedback,
    INITIAL_FEEDBACK_STATE,
  );

  const DETAILS = [
    {
      icon: Phone,
      label: pick(locale, "Утас", "Phone"),
      value: "7505-1575",
      href: "tel:75051575",
    },
    {
      icon: Mail,
      label: pick(locale, "И-мэйл", "Email"),
      value: "info@ic-invest.mn",
      href: "mailto:info@ic-invest.mn",
    },
    {
      icon: MapPin,
      label: pick(locale, "Хаяг", "Address"),
      value: pick(
        locale,
        "Улаанбаатар 14230, Сүхбаатар дүүрэг, 1-р хороо, Парисийн гудамж 42, Ай Си Тауэр, 15 давхар",
        "Parisian street 42, IC Tower, 15th floor, Sukhbaatar district-1, Ulaanbaatar 14230, Mongolia",
      ),
      href: undefined,
    },
  ];

  const fieldClass =
    "mt-2 w-full rounded-xl border border-[color:var(--c-line-strong)] bg-[color:var(--ink-900)] px-4 py-3 text-on-strong outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-on-strong-subtle focus:border-accent-on-dark focus:shadow-[0_0_0_4px_rgba(111,191,163,0.1)]";
  const labelClass = "eyebrow text-on-strong-subtle";

  return (
    <section
      id="contact"
      className="theme-fade relative overflow-hidden bg-surface-strong py-[clamp(4.25rem,8vh,6.5rem)] text-on-strong"
    >
        <div className="grain pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute right-[8%] top-[10%] h-80 w-80 rounded-full bg-accent-on-dark/10 blur-[110px]" />

      <div className="container-page relative">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="relative z-10 lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-accent-on-dark">
                {pick(locale, "Холбоо барих", "Contact")}
              </p>
            </Reveal>
            <h2 className="mt-4 max-w-[15ch] text-balance font-display text-[clamp(2.35rem,4.2vw,3.6rem)] leading-[1.06] text-on-strong">
              <SplitReveal
                text={pick(
                  locale,
                  "Хамтран ажиллах боломж",
                  "A chance to work together",
                )}
              />
            </h2>
            <Reveal delay={0.12}>
              <p className="t-body mt-5 max-w-xl text-pretty text-on-strong-muted">
                {pick(
                  locale,
                  "Монголын хөрөнгийн зах зээлээс эхлээд дэлхийн хөрөнгийн зах зээл хүртэл тантай хамт.",
                  "From Mongolia's capital market to the world's, with you every step.",
                )}
              </p>
            </Reveal>
          </div>

          <div className="relative flex justify-center lg:col-span-5 lg:min-h-[38rem] lg:justify-end">
            <div className="pointer-events-none absolute inset-1/4 rounded-full bg-accent-on-dark/10 blur-3xl" />
            <div className="relative w-full max-w-[400px] shrink-0 lg:w-[min(760px,60vw)] lg:max-w-none lg:translate-x-[65%]">
              <ContactGlobe />
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="grid gap-3 lg:col-span-4">
            {DETAILS.map((d, i) => {
              const Icon = d.icon;
              const cardClass =
                "group flex min-h-[5.5rem] items-center gap-4 rounded-[1.25rem] border border-[color:var(--c-line-strong)] bg-white/[0.035] p-4 transition-[border-color,background-color] duration-300 hover:border-accent-on-dark/40 hover:bg-white/[0.055]";

              const body = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-on-dark text-[color:var(--ink-900)] transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0">
                    <p className="eyebrow text-on-strong-subtle">{d.label}</p>
                    <p className="font-display mt-1 text-pretty text-[0.98rem] leading-snug text-on-strong">
                      {d.value}
                    </p>
                  </div>
                </>
              );

              return (
                <Reveal key={d.label} delay={i * 0.08}>
                  {d.href ? (
                    <a href={d.href} className={cardClass}>
                      {body}
                    </a>
                  ) : (
                    <div className={cardClass}>{body}</div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.08} className="lg:col-span-8">
          <form action={formAction} className="h-full rounded-[1.5rem] border border-[color:var(--c-line-strong)] bg-white/[0.04] p-6 md:p-7">
            <input type="hidden" name="locale" value={locale} />
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className={labelClass}>
                  {pick(locale, "Санал хүсэлт", "Send a message")}
                </p>
                <h3 className="mt-2 font-display text-2xl text-on-strong">
                  {pick(locale, "Санал хүсэлт", "Send a message")}
                </h3>
              </div>
              <p className="t-small max-w-[19rem] text-pretty text-on-strong-muted">
                {pick(
                  locale,
                  "Таны мэдээллийг хүлээн авч, эргэн холбогдоно.",
                  "We'll receive your details and get back to you.",
                )}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="c-name">
                  {pick(locale, "Овог нэр", "Full name")}
                </label>
                <input
                  id="c-name"
                  name="name"
                  required
                  className={fieldClass}
                  placeholder={pick(locale, "Таны нэр", "Your name")}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="c-phone">
                  {pick(locale, "Утас", "Phone")}
                </label>
                <input
                  id="c-phone"
                  name="phone"
                  required
                  className={fieldClass}
                  placeholder="99XX XXXX"
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass} htmlFor="c-msg">
                  {pick(locale, "Санал хүсэлт", "Message")}
                </label>
                <textarea
                  id="c-msg"
                  name="feedback"
                  required
                  rows={3}
                  className={`${fieldClass} resize-none`}
                  placeholder={pick(
                    locale,
                    "Бидэнд илгээх санал хүсэлт",
                    "Your message to us",
                  )}
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={pending}
                className="cta-button cta-button-solid cta-button-on-dark group inline-flex min-h-14 w-fit min-w-[12.5rem] items-center justify-between gap-4 rounded-[1.1rem] border border-accent-on-dark/70 bg-accent-on-dark px-4 py-2.5 text-[1.05rem] font-semibold leading-none text-[color:var(--ink-900)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-wait disabled:opacity-60 md:min-w-[13rem] md:px-5 md:text-[1.15rem]"
              >
                <span className="relative z-10">
                  {pending
                    ? pick(locale, "Илгээж байна…", "Sending…")
                    : pick(locale, "Илгээх", "Submit")}
                </span>
                <span
                  aria-hidden
                  className="cta-arrow relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.7rem] leading-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
                >
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </button>
              {state.message && (
                <p
                  aria-live="polite"
                  className={`t-small ${state.ok ? "text-accent-on-dark" : "text-red-300"}`}
                >
                  {state.message}
                </p>
              )}
            </div>
          </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
