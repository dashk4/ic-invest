/**
 * Per-fund content that the live API doesn't provide: the real logo asset,
 * and — for sid 5 only — the name/description/facts, since its objective
 * endpoint returns null. That copy is a direct translation of the fund's own
 * public launch announcement (see getNews(1, "mn") id 32), not invented.
 */
export type FundDetailMeta = {
  sid: number;
  slug: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  nameFallback: { mn: string; en: string };
  descriptionFallback?: { mn: string; en: string };
  staticFacts?: { mn: string; en: string; value: string }[];
  externalSite?: string;
};

export const FUND_DETAILS: FundDetailMeta[] = [
  {
    sid: 1,
    slug: "mbs",
    logo: "/brand/Mobi-Fund_Red_Logo_PNG.png",
    logoWidth: 1311,
    logoHeight: 560,
    nameFallback: { mn: "Мобисан хувийн ХОС", en: "Mobisan private fund" },
  },
  {
    sid: 3,
    slug: "ric",
    logo: "/brand/Ricycle_Logo_PNG.png",
    logoWidth: 1876,
    logoHeight: 1251,
    nameFallback: { mn: '"Инвескор РИ Сайкл" хувийн ХОС', en: "Invescore RI Cycle private fund" },
  },
  {
    sid: 4,
    slug: "etf",
    logo: "/brand/Ungut-full.png",
    logoWidth: 3000,
    logoHeight: 800,
    nameFallback: {
      mn: "Инвескор Глобал Кью хамтын биржээр арилжаалагддаг хөрөнгө оруулалтын сан",
      en: "Invescore Global Q exchange-traded fund",
    },
  },
  {
    sid: 5,
    slug: "mf",
    logo: "/brand/E-Fund%20hevtee.svg",
    logoWidth: 355,
    logoHeight: 97,
    nameFallback: { mn: "И Эс Пи Ирээдүй хамтын нээлттэй сан", en: "E-Fund (ISP Ireedui) mutual fund" },
    descriptionFallback: {
      mn: 'И Эс Пи Ирээдүй хамтын хөрөнгө оруулалтын сан нь ажил олгогч байгууллага болон тэдгээрийн ажилтнуудад зориулсан хуримтлалын сан бөгөөд ажилтнуудын санхүүгийн тогтвортой байдлыг дэмжих, урт хугацааны хуримтлал бий болгох зорилготой юм.\n\n"Инвескор Ассет Менежмент" ХХК-ийн үүсгэн байгуулсан "И Эс Пи Ирээдүй Хамтын ХОС" ХХК нь Санхүүгийн зохицуулах хорооны 2025 оны 10 дугаар сарын 24-ний өдрийн №424 дүгээр тогтоолоор нэгж эрхээ олон нийтэд санал болгох зөвшөөрөл авсны дагуу анхдагч зах зээлийн арилжааг албан ёсоор нээлээ.',
      en: "The E-Fund is a collective savings and investment fund for employer organizations and their staff, built to support employees' financial stability and long-term savings.\n\nEstablished by Invescore Asset Management LLC, \"И Эс Пи Ирээдүй Хамтын ХОС\" LLC received approval from the Financial Regulatory Commission (Resolution No. 424, 24 October 2025) to offer its units to the public, and formally opened primary-market trading.",
    },
    staticFacts: [
      { mn: "Анхдагч арилжааны хугацаа", en: "Primary offering window", value: "2025.10.29 – 2025.11.29" },
    ],
    externalSite: "www.efund.mn",
  },
];

export const FUND_DESCRIPTION_EN: Record<number, string> = {
  1: "Established by Mobicom Corporation for the future well-being and development of its employees, Mobisan is an employer–employee collective savings and investment fund built to give staff long-term financial security.",
  3: 'Invescore RI Cycle was established as a private investment fund to invest in businesses that recycle waste — which imposes major environmental and economic costs on Mongolia — back into productive economic activity, generating both a positive environmental and social impact and a financial return.\n\nThe fund\'s environmental and social impact: portfolio businesses recycle waste into raw materials and finished products, directly supporting UN Sustainable Development Goal 12.5 — "by 2030, substantially reduce waste generation through prevention, reduction, recycling and reuse" — and indirectly supporting goals for public health and climate action.',
  4: "The INQ ETF gives Mongolian investors access to a basket of the 101 largest companies listed on Nasdaq, the world's second-largest stock exchange — at low cost, with no foreign-transfer fees, and at whatever amount an investor chooses. It is Mongolia's first exchange-traded fund. Roughly half of the 101 constituent companies are high-growth, financially strong technology firms, and because their shares are priced in US dollars, the fund also acts as a hedge against tögrög depreciation.",
};
