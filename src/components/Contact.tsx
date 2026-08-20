"use client";

import { useState } from "react";
import { Reveal } from "./ui/Reveal";
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
        "Улаанбаатар 14230, Сүхбаатар дүүрэг, 1-р хороо, Парисийн гудамж 42, Ай Си Тауэр, 15 давхар",
        "Parisian street 42, IC Tower, 15th floor, Sukhbaatar district-1, Ulaanbaatar 14230, Mongolia"
      ),
      href: undefined,
    },
  ];

  const mailtoHref = `mailto:info@ic-invest.mn?subject=${encodeURIComponent(
    (locale === "en" ? "Message from " : "Санал хүсэлт — ") +
      (name || (locale === "en" ? "Website visitor" : "Хэрэглэгч"))
  )}&body=${encodeURIComponent(
    `${pick(locale, "Овог нэр", "Name")}: ${name}\n${pick(locale, "Утас", "Phone")}: ${phone}\n\n${message}`
  )}`;

  const fieldClass =
    "mt-2 w-full border-b hairline bg-transparent py-2.5 text-fg outline-none transition-colors duration-500 placeholder:text-fg-subtle focus:border-accent";
  const labelClass = "eyebrow text-fg-subtle";

  return (
    <section id="contact" className="theme-fade section-y bg-surface-alt">
      <div className="container-page grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow text-accent">{pick(locale, "Холбоо барих", "Contact")}</p>
          </Reveal>
          <h2 className="t-h2 mt-6 max-w-[13ch] text-balance text-fg">
            <SplitReveal
              text={pick(locale, "Хамтран ажиллахад бэлэн үү", "Ready to work together")}
            />
          </h2>

          <Reveal delay={0.12}>
            <dl className="mt-12 space-y-8">
              {DETAILS.map((d) => (
                <div key={d.label} className="border-t hairline pt-5">
                  <dt className={labelClass}>{d.label}</dt>
                  <dd className="mt-3">
                    {d.href ? (
                      <a
                        href={d.href}
                        className="link-underline t-lead text-fg transition-colors duration-500 hover:text-accent"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="t-lead max-w-sm text-pretty text-fg">{d.value}</p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-6">
          <div className="rounded-2xl border hairline bg-card p-8 md:p-10">
            <p className={labelClass}>{pick(locale, "Санал хүсэлт", "Send a message")}</p>

            <div className="mt-8 space-y-6">
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
                <textarea
                  id="c-msg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className={`${fieldClass} resize-none`}
                  placeholder={pick(locale, "Бидэнд юугаар туслах вэ?", "How can we help?")}
                />
              </div>

              <a
                href={mailtoHref}
                className="group mt-2 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-[0.95rem] font-medium text-accent-contrast transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:brightness-110"
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
