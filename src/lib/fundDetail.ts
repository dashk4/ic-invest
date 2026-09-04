/**
 * Route and logo metadata. Fund names, descriptions and metrics come from
 * the published service APIs for funds that have them; these entries map a
 * service id to this site's route and local brand asset.
 *
 * sid 5 and 6 are real, active funds (the admin dashboard lists 5 active
 * funds total) whose /api/objective/{sid} record simply hasn't been filled
 * in yet — that's a gap in the admin CMS, not evidence the fund doesn't
 * exist, so treating "no objective" as "drop the fund" was wrong (it took
 * the site from 5 funds shown down to 3). nameFallback/descriptionFallback
 * cover exactly that gap with real content sourced elsewhere: sid 5's own
 * public launch announcement (getServiceNews/getNews), sid 6's copy as
 * supplied directly by the fund. Never used for sid 1/3/4, which always
 * have a real objective.
 */
export type FundDetailMeta = {
  sid: number;
  slug: string;
  /** Undefined until a real brand mark is supplied — the detail page falls
   *  back to a typographic treatment of the fund name rather than showing
   *  the wrong logo or a placeholder image. */
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  /** true when the asset itself is light/white and reads directly on the
   *  dark banner — those show at full size with no backing plate. Logos
   *  with dark ink in the mark (checked by sampling pixel luminance) keep
   *  the light plate behind them or they'd disappear. */
  logoOnDark?: boolean;
  /** Some source marks sit inside a lot of transparent margin, so at the
   *  shared frame size they read smaller than the others — bump this to
   *  scale just that logo up without touching the source asset. */
  logoScale?: number;
  externalSite?: string;
  nameFallback?: { mn: string; en: string };
  descriptionFallback?: { mn: string; en: string };
  staticFacts?: { mn: string; en: string; value: string }[];
  /**
   * Who to show under "Сангийн менежмент" on this fund's page. Supplied
   * directly by the company rather than the CMS's fundmanagers/
   * committeemanagers endpoints — those cover only a couple of funds and
   * still list a person no longer with the company (checked against the
   * live team roster in lib/team.ts).
   */
  advisor?: { name: string; title: string; titleEn: string; photo: string };
};

export const FUND_DETAILS: FundDetailMeta[] = [
  {
    sid: 1,
    slug: "mbs",
    logo: "/brand/Mobi-Fund_Red_Logo_PNG.png",
    logoWidth: 1311,
    logoHeight: 560,
    logoOnDark: true,
    advisor: {
      name: "Г. Амарбаатар",
      title: "Хөрөнгө оруулалтын зөвлөх",
      titleEn: "Investment Advisor",
      photo: "/team/amarbaatar-ganbaatar.webp",
    },
  },
  {
    sid: 3,
    slug: "ric",
    logo: "/brand/Ricycle_Logo_PNG-removebg-preview.png",
    logoWidth: 612,
    logoHeight: 408,
    logoOnDark: true,
    logoScale: 1.4,
    advisor: {
      name: "Г. Амарбаатар",
      title: "Хөрөнгө оруулалтын зөвлөх",
      titleEn: "Investment Advisor",
      photo: "/team/amarbaatar-ganbaatar.webp",
    },
  },
  {
    sid: 4,
    slug: "etf",
    logo: "/brand/Tsagaan-full.png",
    logoWidth: 3000,
    logoHeight: 800,
    logoOnDark: true,
    advisor: {
      name: "Ү. Гончигболд",
      title: "Хөрөнгө оруулалтын зөвлөх",
      titleEn: "Investment Advisor",
      photo: "/team/gonchigbold-unenbat.webp",
    },
  },
  {
    sid: 5,
    slug: "mf",
    logo: "/brand/E-Fund%20hevtee.png",
    logoWidth: 710,
    logoHeight: 194,
    logoOnDark: true,
    externalSite: "www.efund.mn",
    nameFallback: { mn: "И Эс Пи Ирээдүй хамтын нээлттэй сан", en: "E-Fund (ISP Ireedui) mutual fund" },
    descriptionFallback: {
      mn: 'И Эс Пи Ирээдүй хамтын хөрөнгө оруулалтын сан нь ажил олгогч байгууллага болон тэдгээрийн ажилтнуудад зориулсан хуримтлалын сан бөгөөд ажилтнуудын санхүүгийн тогтвортой байдлыг дэмжих, урт хугацааны хуримтлал бий болгох зорилготой юм.\n\n"Инвескор Ассет Менежмент" ХХК-ийн үүсгэн байгуулсан "И Эс Пи Ирээдүй Хамтын ХОС" ХХК нь Санхүүгийн зохицуулах хорооны 2025 оны 10 дугаар сарын 24-ний өдрийн №424 дүгээр тогтоолоор нэгж эрхээ олон нийтэд санал болгох зөвшөөрөл авсны дагуу анхдагч зах зээлийн арилжааг албан ёсоор нээлээ.',
      en: "The E-Fund is a collective savings and investment fund for employer organizations and their staff, built to support employees' financial stability and long-term savings.\n\nEstablished by Invescore Asset Management LLC, \"И Эс Пи Ирээдүй Хамтын ХОС\" LLC received approval from the Financial Regulatory Commission (Resolution No. 424, 24 October 2025) to offer its units to the public, and formally opened primary-market trading.",
    },
    advisor: {
      name: "О. Насанжаргал",
      title: "Хөрөнгө оруулалтын зөвлөх",
      titleEn: "Investment Advisor",
      photo: "/team/nasanjargal-odsuren.webp",
    },
  },
  {
    sid: 6,
    slug: "veq",
    // real mark, confirmed by the user — white ink, reads directly on the
    // dark banner with no backing plate.
    logo: "/brand/Tsagaan%20hevtee@300x.png",
    logoWidth: 1436,
    logoHeight: 373,
    logoOnDark: true,
    nameFallback: { mn: '"Вертикор Экъюти" хувийн ХОС', en: "Vertikor Equity private fund" },
    descriptionFallback: {
      mn: "Вертикор Экъюти хувийн хөрөнгө оруулалтын сан нь хувьцаа, өрийн хэрэгсэл болон бусад санхүүгийн хэрэгслүүдэд хөрөнгө оруулах, Сангийн хөрөнгийг эрсдэл, өгөөжийн оновчтой түвшинд идэвхтэйгээр удирдан хөрөнгө оруулагч нарт боломжит хамгийн өндөр өгөөжийг хүртээхэд оршино.",
      en: "Vertikor Equity private fund invests in equities, debt instruments and other financial instruments, actively managing the fund's assets at an optimal balance of risk and return to deliver investors the highest return possible.",
    },
    advisor: {
      name: "Ү. Гончигболд",
      title: "Хөрөнгө оруулалтын зөвлөх",
      titleEn: "Investment Advisor",
      photo: "/team/gonchigbold-unenbat.webp",
    },
  },
  {
    sid: 7,
    slug: "pocket",
    logo: "/brand/pocket-fund.png",
    logoWidth: 1006,
    logoHeight: 248,
    logoOnDark: true,
    nameFallback: { mn: "Покет Хуримтлал Хамтын Нээлттэй Сан", en: "Pocket Savings open-end mutual fund" },
    descriptionFallback: {
      mn: "Покет Хуримтлал сан нь Тогтмол хуримтлалын дадалтай хөрөнгө оруулагчдын хөрөнгийг технологийн дэвшил, шинэлэг шийдлээр мэргэжлийн түвшинд удирдаж, ухаалгаар өсгөх зорилготой сан юм. Бид технологийн давуу талыг ашиглан хөрөнгө оруулалтыг илүү энгийн, хүртээмжтэй, ойлгомжтой болгож, таны өнөөдрийн хуримтлалыг ирээдүйн санхүүгийн боломж болгоход тусална.",
      en: "The Pocket Savings fund manages the assets of investors with a habit of regular saving at a professional level using technological advances and innovative solutions, growing them intelligently. We use the advantages of technology to make investing simpler, more accessible and easier to understand, helping turn your saving today into financial opportunity tomorrow.",
    },
    advisor: {
      name: "Ү. Гончигболд",
      title: "Хөрөнгө оруулалтын зөвлөх",
      titleEn: "Investment Advisor",
      photo: "/team/gonchigbold-unenbat.webp",
    },
  },
];

/** English translations of sid 1/3/4's real objective.text (they always
 *  have one live) — the API has no locale parameter, so there's no live
 *  English source to fetch instead. */
export const FUND_DESCRIPTION_EN: Record<number, string> = {
  1: "Established by Mobicom Corporation for the future well-being and development of its employees, Mobisan is an employer–employee collective savings and investment fund built to give staff long-term financial security.",
  3: 'Invescore RI Cycle was established as a private investment fund to invest in businesses that recycle waste — which imposes major environmental and economic costs on Mongolia — back into productive economic activity, generating both a positive environmental and social impact and a financial return.\n\nThe fund\'s environmental and social impact: portfolio businesses recycle waste into raw materials and finished products, directly supporting UN Sustainable Development Goal 12.5 — "by 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse" — and indirectly supporting goals for public health and climate action.',
  4: "The INQ ETF gives Mongolian investors access to a basket of the 101 largest companies listed on Nasdaq, the world's second-largest stock exchange — at low cost, with no foreign-transfer fees, and at whatever amount an investor chooses. It is Mongolia's first exchange-traded fund. Roughly half of the 101 constituent companies are high-growth, financially strong technology firms, and because their shares are priced in US dollars, the fund also acts as a hedge against tögrög depreciation.",
};
