import { toHijri, toGregorian } from "hijri-converter";

export type SpecialOccasion = {
  slug: string;
  label: string;
  message: string;
  icon: "utensils" | "moon" | "sparkles" | "party" | "gift" | "soup" | "heart";
  href: string;
};

type OccasionDef = SpecialOccasion & {
  hijriMonth: number;
  hijriDayStart: number;
  hijriDayEnd: number;
  daysBefore: number;
};

// Sırayla kontrol edilir; üstteki alt-aralık, alttaki geniş aralıkla çakışırsa öncelik alır
// (örn. Kadir Gecesi, Ramazan ayı genel mesajından önce gelir).
const OCCASIONS: OccasionDef[] = [
  {
    slug: "asure",
    label: "AŞURE GÜNÜ",
    message: "Aşure Gününde Bir Kaseye Vesile Olun",
    icon: "soup",
    href: "/kampanyalar/acil-gida-kolisi",
    hijriMonth: 1,
    hijriDayStart: 10,
    hijriDayEnd: 10,
    daysBefore: 3,
  },
  {
    slug: "mevlid",
    label: "MEVLİD KANDİLİ",
    message: "Bir Tabak Yemeğe Vesile Olun",
    icon: "utensils",
    href: "/kampanyalar/acil-gida-kolisi",
    hijriMonth: 3,
    hijriDayStart: 12,
    hijriDayEnd: 12,
    daysBefore: 3,
  },
  {
    slug: "mirac",
    label: "MİRAÇ KANDİLİ",
    message: "Bu Mübarek Gecede Bir Duaya Vesile Olun",
    icon: "moon",
    href: "/kampanyalar",
    hijriMonth: 7,
    hijriDayStart: 27,
    hijriDayEnd: 27,
    daysBefore: 3,
  },
  {
    slug: "berat",
    label: "BERAT KANDİLİ",
    message: "Bu Mübarek Gecede Bir Duaya Vesile Olun",
    icon: "moon",
    href: "/kampanyalar",
    hijriMonth: 8,
    hijriDayStart: 15,
    hijriDayEnd: 15,
    daysBefore: 3,
  },
  {
    slug: "kadir",
    label: "KADİR GECESİ",
    message: "Bin Aydan Hayırlı Gecede Bağışa Vesile Olun",
    icon: "sparkles",
    href: "/kampanyalar",
    hijriMonth: 9,
    hijriDayStart: 27,
    hijriDayEnd: 27,
    daysBefore: 2,
  },
  {
    slug: "ramazan",
    label: "RAMAZAN AYI",
    message: "Fitre ve İftar Bağışına Vesile Olun",
    icon: "utensils",
    href: "/kampanyalar/acil-gida-kolisi",
    hijriMonth: 9,
    hijriDayStart: 1,
    hijriDayEnd: 29,
    daysBefore: 0,
  },
  {
    slug: "ramazan-bayrami",
    label: "RAMAZAN BAYRAMI",
    message: "Bayram Sevincini Paylaşmaya Vesile Olun",
    icon: "party",
    href: "/kampanyalar",
    hijriMonth: 10,
    hijriDayStart: 1,
    hijriDayEnd: 3,
    daysBefore: 2,
  },
  {
    slug: "kurban-bayrami",
    label: "KURBAN BAYRAMI",
    message: "Kurban Bağışına Vesile Olun",
    icon: "gift",
    href: "/kampanyalar?kategori=KURBAN",
    hijriMonth: 12,
    hijriDayStart: 10,
    hijriDayEnd: 13,
    daysBefore: 3,
  },
];

export const DEFAULT_OCCASION: SpecialOccasion = {
  slug: "genel",
  label: "ŞEFFAFLIK DEFTERİ",
  message: "Her Kuruş Kayıt Altında, Bugün Bağış Yapın",
  icon: "heart",
  href: "/kampanyalar",
};

function toUTCDate(gy: number, gm: number, gd: number) {
  return new Date(Date.UTC(gy, gm - 1, gd));
}

function addDays(d: Date, days: number) {
  const copy = new Date(d);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

/**
 * Bugün (veya verilen tarih) için aktif dini günü döndürür. Hijri <-> Miladi
 * dönüşümü Umm al-Qura verisiyle yapılır (hijri-converter); resmi Diyanet
 * duyurusundan ±1 gün fark olabilir, çünkü nihai karar ay gözlemine dayanır.
 */
export function getActiveOccasion(today: Date = new Date()): {
  occasion: SpecialOccasion;
  occurrenceKey: string;
} {
  const gy = today.getFullYear();
  const gm = today.getMonth() + 1;
  const gd = today.getDate();
  const todayUTC = toUTCDate(gy, gm, gd);
  const { hy } = toHijri(gy, gm, gd);

  for (const occ of OCCASIONS) {
    const start = toGregorian(hy, occ.hijriMonth, occ.hijriDayStart);
    const end = toGregorian(hy, occ.hijriMonth, occ.hijriDayEnd);
    const windowStart = addDays(toUTCDate(start.gy, start.gm, start.gd), -occ.daysBefore);
    const windowEnd = toUTCDate(end.gy, end.gm, end.gd);

    if (todayUTC >= windowStart && todayUTC <= windowEnd) {
      const { slug, label, message, icon, href } = occ;
      return {
        occasion: { slug, label, message, icon, href },
        occurrenceKey: `${occ.slug}-${start.gy}-${start.gm}-${start.gd}`,
      };
    }
  }

  return { occasion: DEFAULT_OCCASION, occurrenceKey: DEFAULT_OCCASION.slug };
}
