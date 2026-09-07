/**
 * Team roster as grouped on ic-invest.mn/mn/about — three categories, not two.
 * Portraits are stored under /public/team and referenced by each member.
 */
export type Member = {
  mn: string;
  mnTitle: string;
  en: string;
  enTitle: string;
  photo: string;
  /**
   * Zoom applied to the portrait inside its 4:5 card frame, anchored to the
   * top edge. The photos come from different shoots and frame their subject
   * at different distances; this pulls the odd one out back in line with the
   * rest of the grid. Leave unset when the source already matches.
   */
  photoZoom?: number;
};

export type TeamGroup = {
  mn: string;
  en: string;
  members: Member[];
};

export const TEAM: TeamGroup[] = [
  {
    mn: "Төлөөлөн удирдах зөвлөл",
    en: "Board of Directors",
    members: [
      {
        mn: "Р. Пүрэв",
        mnTitle: "ТУЗ-ийн дарга",
        en: "Purev Ralgaa",
        enTitle: "Chairman of the Board",
        photo: "/team/purev-ralgaa.webp",
      },
      {
        mn: "Б. Энхбат",
        mnTitle: "ТУЗ-ийн хараат бус гишүүн",
        en: "Enkhbat Batsukh",
        enTitle: "Independent Board Member",
        photo: "/team/enkhbat-batsukh.webp",
      },
      {
        mn: "С. Өнөр",
        mnTitle: "ТУЗ-ийн хараат бус гишүүн",
        en: "Unur Sukhbaatar",
        enTitle: "Independent Board Member",
        photo: "/team/unur-sukhbaatar.webp",
      },
    ],
  },
  {
    mn: "Удирдлагын баг",
    en: "Management team",
    members: [
      {
        mn: "Б. Мөнгөнзул",
        mnTitle: "Гүйцэтгэх захирал",
        en: "Mungunzul Badamvaanchig",
        enTitle: "Chief Executive Officer",
        photo: "/team/mungunzul-badamvaanchig.webp",
      },
      {
        mn: "Э. Нямбаяр",
        mnTitle: "Хөрөнгө оруулалт хариуцсан захирал",
        en: "Nyambayar Enkhbat",
        enTitle: "Head of Investment",
        photo: "/team/nyambayar-enkhbat.png",
        // shot further back than the portrait beside it, so the subject
        // reads noticeably smaller in-frame at the same crop — pull in to
        // match Mungunzul's scale rather than zooming her tighter still.
        photoZoom: 1.25,
      },
    ],
  },
  {
    mn: "Хамт олон",
    en: "Team",
    members: [
      {
        mn: "С. Дэлгэрмаа",
        mnTitle: "Ерөнхий нягтлан бодогч",
        en: "Delgermaa Sangi-Ochir",
        enTitle: "General Accountant",
        photo: "/team/delgermaa-sangi-ochir.webp",
      },
      {
        mn: "М. Даваажав",
        mnTitle: "Хуульч, комплаенсын менежер",
        en: "Davaajav Munkhjargal",
        enTitle: "Compliance Officer",
        photo: "/team/davaajav-munkhjargal.webp",
      },
      {
        mn: "О. Насанжаргал",
        mnTitle: "Ахлах хөрөнгө оруулалтын менежер",
        en: "Nasanjargal Odsuren",
        enTitle: "Senior Investment Manager",
        photo: "/team/nasanjargal-odsuren.webp",
      },
      {
        mn: "Г. Амарбаатар",
        mnTitle: "Хөрөнгө оруулалтын менежер",
        en: "Amarbaatar Ganbaatar",
        enTitle: "Investment Manager",
        photo: "/team/amarbaatar-ganbaatar.webp",
      },
      {
        mn: "Ү. Гончигболд",
        mnTitle: "Хөрөнгө оруулалтын менежер",
        en: "Gonchigbold Unenbat",
        enTitle: "Investment Manager",
        photo: "/team/gonchigbold-unenbat.webp",
      },
      {
        mn: "Б. Мөнхжин",
        mnTitle: "Хөрөнгө оруулалтын менежер",
        en: "Munkhjin",
        enTitle: "Investment Manager",
        photo: "/team/munkhjin.png",
      },
    ],
  },
];

export const ALL_MEMBERS: Member[] = TEAM.flatMap((g) => g.members);
