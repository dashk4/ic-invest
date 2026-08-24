"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "./ui/Reveal";
import { SplitReveal } from "./ui/SplitReveal";
import { EvervaultCard } from "./ui/EvervaultCard";
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
    "mt-2 w-full border-b hairline bg-transparent py-2.5 text-fg outline-none transition-colors duration-500 placeholder:text-fg-subtle focus:border-accent";
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

        {/* contact details as evervault cards */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {DETAILS.map((d, i) => {
            const Icon = d.icon;
            const body = (
              <div className="relative flex h-full min-h-[13rem] flex-col justify-between p-6 transition-colors duration-500">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 shadow-[0_0_0_1px_rgba(0,0,0,0)] backdrop-blur-sm transition-colors duration-500 group-hover/card:border-accent/50 group-hover/card:bg-accent/15">
                  <Icon
                    className="h-[19px] w-[19px] text-accent"
                    strokeWidth={1.7}
                  />
                </span>
                <div>
                  <p className={labelClass}>{d.label}</p>
                  <p className="font-display mt-2 text-pretty text-[1.2rem] leading-snug text-fg">
                    {d.value}
                  </p>
                </div>
              </div>
            );

            // ambient dot field behind the card, jade-tinted; the evervault
            // character reveal layers on top of it on hover
            const backdrop = (
              <>
                <div className="absolute inset-0 bg-surface-sunken/40" />
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
              </>
            );

            return (
              <Reveal key={d.label} delay={i * 0.08}>
                {d.href ? (
                  <a href={d.href} className="block h-full">
                    <EvervaultCard className="h-full" backdrop={backdrop}>
                      {body}
                    </EvervaultCard>
                  </a>
                ) : (
                  <EvervaultCard className="h-full" backdrop={backdrop}>
                    {body}
                  </EvervaultCard>
                )}
              </Reveal>
            );
          })}
        </div>

        {/* message form */}
        <Reveal delay={0.15} className="mt-4">
          <div className="rounded-2xl border hairline bg-card p-8 md:p-10">
            <p className={labelClass}>
              {pick(locale, "Санал хүсэлт", "Send a message")}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
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
              <div>
                <label className={labelClass} htmlFor="c-msg">
                  {pick(locale, "Санал хүсэлт", "Message")}
                </label>
                <input
                  id="c-msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={fieldClass}
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
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-medium text-accent-contrast transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:brightness-110"
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
