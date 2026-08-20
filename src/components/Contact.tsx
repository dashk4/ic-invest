"use client";

import { useState } from "react";
import { Reveal } from "./ui/Reveal";
import { RollText } from "./ui/RollText";
import { SplitReveal } from "./ui/SplitReveal";
import { useLocale, pick } from "@/lib/locale";

export function Contact() {
  const { locale } = useLocale();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const DETAILS = [
    { label: pick(locale, "Утас", "Phone"), value: "7505-1575", href: "tel:75051575" },
    { label: pick(locale, "И-мэйл", "Email"), value: "info@ic-invest.mn", href: "mailto:info@ic-invest.mn" },
    {
      label: pick(locale, "Хаяг", "Address"),
      value: pick(
        locale,
        "Монгол улс, Улаанбаатар хот 14230, Сүхбаатар дүүрэг, 1-р хороо, Парисийн гудамж 42, Ай Си Тауэр, 15 давхар",
        "Sukhbaatar district-1, Parisian street 42, IC Tower, 15th floor, Ulaanbaatar 14230, Mongolia"
      ),
      href: undefined,
    },
  ];

  const mailtoHref = `mailto:info@ic-invest.mn?subject=${encodeURIComponent(
    (locale === "en" ? "Message from " : "Санал хүсэлт — ") + (name || (locale === "en" ? "Website visitor" : "Хэрэглэгч"))
  )}&body=${encodeURIComponent(
    `${pick(locale, "Овог нэр", "Name")}: ${name}\n${pick(locale, "Утас", "Phone")}: ${phone}\n\n${message}`
  )}`;

  return (
    <section id="contact" className="theme-fade bg-surface py-24 md:py-32">
      <div className="container-page grid grid-cols-1 gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow text-accent">{pick(locale, "Холбоо барих", "Contact")}</p>
          </Reveal>
          <h2 className="font-display mt-4 max-w-md text-balance text-4xl font-medium leading-tight text-fg md:text-5xl">
            <SplitReveal text={pick(locale, "Хамтран ажиллахад бэлэн үү", "Ready to work together")} />
          </h2>

          <Reveal delay={0.12} className="mt-12 space-y-7">
            {DETAILS.map((d) => (
              <div key={d.label} className="border-t hairline pt-5">
                <p className="eyebrow text-fg-subtle">{d.label}</p>
                {d.href ? (
                  <a href={d.href} className="mt-2 block text-lg text-fg hover:text-accent">
                    {d.value}
                  </a>
                ) : (
                  <p className="mt-2 max-w-sm text-lg leading-snug text-fg">{d.value}</p>
                )}
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border hairline bg-card p-8 md:p-10">
            <p className="eyebrow text-fg-subtle">{pick(locale, "Санал хүсэлт", "Send a message")}</p>
            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm uppercase tracking-wide text-fg-muted">
                  {pick(locale, "Овог нэр", "Full name")}
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full border-b hairline bg-transparent py-2 text-fg outline-none focus:border-accent"
                  placeholder={pick(locale, "Таны нэр", "Your name")}
                />
              </div>
              <div>
                <label className="text-sm uppercase tracking-wide text-fg-muted">
                  {pick(locale, "Утас", "Phone")}
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full border-b hairline bg-transparent py-2 text-fg outline-none focus:border-accent"
                  placeholder="99XX XXXX"
                />
              </div>
              <div>
                <label className="text-sm uppercase tracking-wide text-fg-muted">
                  {pick(locale, "Санал хүсэлт", "Message")}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="mt-2 w-full resize-none border-b hairline bg-transparent py-2 text-fg outline-none focus:border-accent"
                  placeholder={pick(locale, "Бидэнд юугаар туслах вэ?", "How can we help?")}
                />
              </div>
              <a
                href={mailtoHref}
                className="group eyebrow mt-2 inline-flex w-fit items-center gap-2 overflow-hidden rounded-full bg-surface-strong px-7 py-3.5 text-on-strong transition-transform duration-400 ease-out hover:scale-[1.03] active:scale-[0.98]"
              >
                <RollText hoverClassName="text-bronze-light">{pick(locale, "Илгээх", "Submit")}</RollText>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
