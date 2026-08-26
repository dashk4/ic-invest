"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import DotField from "./ui/DotField";
import { ContactGlobe } from "./ContactGlobe";
import { useLocale, pick } from "@/lib/locale";

export function Contact() {
  const { locale } = useLocale();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

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

  const mailtoHref = `mailto:info@ic-invest.mn?subject=${encodeURIComponent(
    (locale === "en" ? "Message from " : "Санал хүсэлт — ") +
      (name || (locale === "en" ? "Website visitor" : "Хэрэглэгч")),
  )}&body=${encodeURIComponent(
    `${pick(locale, "Овог нэр", "Name")}: ${name}\n${pick(locale, "Утас", "Phone")}: ${phone}\n\n${message}`,
  )}`;

  const fieldClass =
    "mt-2 w-full rounded-xl border border-[color:var(--c-line-strong)] bg-surface-sunken/40 px-4 py-3 text-fg outline-none transition-colors duration-300 placeholder:text-fg-subtle focus:border-accent focus:bg-surface-sunken/70";
  const labelClass = "eyebrow text-fg-subtle";

  return (
    <section id="contact" className="theme-fade section-y bg-surface-alt">
      <div className="container-page">
        {/* globe + heading */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-accent">
                {pick(locale, "Холбоо барих", "Contact")}
              </p>
            </Reveal>
            <h2 className="t-h2 mt-6 max-w-[13ch] text-balance text-fg">
              <SplitReveal
                text={pick(
                  locale,
                  "Хамтран ажиллахад бэлэн үү",
                  "Ready to work together",
                )}
              />
            </h2>
            <Reveal delay={0.12}>
              <p className="t-body mt-6 max-w-md text-pretty text-fg-muted">
                {pick(
                  locale,
                  "Улаанбаатараас дэлхийн хөрөнгийн зах зээл рүү — Инвескор Глобал Кью ETF нь Насдак дээр бүртгэлтэй хамгийн том компаниудад хөрөнгө оруулдаг.",
                  "From Ulaanbaatar to the world's capital markets — the Invescore Global Q ETF invests in the largest companies listed on Nasdaq.",
                )}
              </p>
            </Reveal>
          </div>

          <div className="flex justify-center lg:col-span-6 lg:justify-end">
            <ContactGlobe />
          </div>
        </div>

        {/* contact details — ambient dot field behind each card, no reveal
            gimmick this time, just the ambient texture */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {DETAILS.map((d, i) => {
            const Icon = d.icon;
            const cardClass =
              "group relative flex h-full min-h-[13rem] flex-col justify-between overflow-hidden rounded-2xl border border-[color:var(--c-line-strong)] bg-surface-sunken/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50";

            const body = (
              <>
                <div className="pointer-events-none absolute inset-0 z-0">
                  <DotField
                    dotRadius={1.3}
                    dotSpacing={15}
                    cursorRadius={150}
                    cursorForce={0.08}
                    bulgeStrength={36}
                    glowRadius={130}
                    gradientFrom="rgba(111,191,163,0.4)"
                    gradientTo="rgba(74,157,129,0.14)"
                    glowColor="#6fbfa3"
                  />
                </div>
                <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/15">
                  <Icon className="h-[19px] w-[19px] text-accent" strokeWidth={1.7} />
                </span>
                <div className="relative z-10">
                  <p className={labelClass}>{d.label}</p>
                  <p className="font-display mt-2 text-pretty text-[1.2rem] leading-snug text-fg">
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

        {/* message form — same ambient dot field, larger radius for the
            bigger card */}
        <Reveal delay={0.15} className="mt-4">
          <div className="relative overflow-hidden rounded-2xl border border-[color:var(--c-line-strong)] bg-card p-8 md:p-10">
            <div className="pointer-events-none absolute inset-0 z-0">
              <DotField
                dotRadius={1.2}
                dotSpacing={16}
                cursorRadius={220}
                cursorForce={0.06}
                bulgeStrength={30}
                glowRadius={170}
                gradientFrom="rgba(111,191,163,0.35)"
                gradientTo="rgba(74,157,129,0.12)"
                glowColor="#6fbfa3"
              />
            </div>

            <p className={`relative z-10 ${labelClass}`}>
              {pick(locale, "Санал хүсэлт", "Send a message")}
            </p>

            <div className="relative z-10 mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className={labelClass} htmlFor="c-name">
                  {pick(locale, "Овог нэр", "Full name")}
                </label>
                <input
                  id="c-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldClass}
                  placeholder="99XX XXXX"
                />
              </div>
              <div className="md:col-span-1">
                <label className={labelClass} htmlFor="c-msg">
                  {pick(locale, "Санал хүсэлт", "Message")}
                </label>
                <textarea
                  id="c-msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={1}
                  className={`${fieldClass} resize-none`}
                  placeholder={pick(
                    locale,
                    "Бидэнд юугаар туслах вэ?",
                    "How can we help?",
                  )}
                />
              </div>
            </div>

            <a
              href={mailtoHref}
              className="group relative z-10 mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-medium text-accent-contrast transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:brightness-110"
            >
              {pick(locale, "Илгээх", "Submit")}
              <span
                aria-hidden
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
