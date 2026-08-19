import Link from "next/link";
import type { Metadata } from "next";
import type { ElementType } from "react";
import {
  Home,
  UtensilsCrossed,
  Truck,
  GraduationCap,
  PartyPopper,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  IceCream,
  Popcorn,
  Cloud,
  Grid3x3,
  Donut,
  Flame,
  Sparkles,
  MapPin,
  Users,
  Soup,
  Gift,
  Star,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
  title: "Sevenler Davet | Hakkı Sevenler Uluslararası Yardım Derneği",
  description:
    "Sevenler Davet: 150 kişilik davet evi, catering, mobil ikram, okul etkinlikleri ve organizasyon hizmetleri. Hakkı Sevenler Derneği'nin iktisadi işletmesi.",
};

const QUICK_NAV: { href: string; label: string; icon: ElementType }[] = [
  { href: "#davet-evi", label: "Davet Evi", icon: Home },
  { href: "#catering", label: "Catering", icon: UtensilsCrossed },
  { href: "#mobil-ikram", label: "Mobil İkram", icon: Truck },
  { href: "#okul-etkinlikleri", label: "Okul Etkinlikleri", icon: GraduationCap },
  { href: "#organizasyon", label: "Organizasyon", icon: PartyPopper },
];

const DAVET_EVI_LIST = [
  "Nişan organizasyonları",
  "Sünnet programları",
  "Mevlit programları",
  "Kur'an-ı Kerim programları",
  "Dinî toplantı ve organizasyonlar",
  "Okul mezuniyet programları",
  "Yemekli davetler",
  "Aile ve topluluk programları",
  "Özel organizasyonlar",
];

const CATERING_LIST = [
  "Mevlit yemekleri",
  "Düğün ve nişan yemekleri",
  "Sünnet yemekleri",
  "Toplantı yemekleri",
  "Kurumsal yemekler",
  "Okul etkinlikleri",
  "Toplu yemek organizasyonları",
  "Özel gün yemekleri",
];

const IKRAM_TYPES: { label: string; icon: ElementType }[] = [
  { label: "Dondurma", icon: IceCream },
  { label: "Patlamış Mısır", icon: Popcorn },
  { label: "Pamuk Şekeri", icon: Cloud },
  { label: "Waffle", icon: Grid3x3 },
  { label: "Lokma", icon: Donut },
  { label: "Sıcak Yemek", icon: Flame },
];

const FINAL_LINKS = [
  { href: "#davet-evi", label: "Davet Evi" },
  { href: "#catering", label: "Catering" },
  { href: "#mobil-ikram", label: "Mobil İkram" },
  { href: "/iletisim", label: "Teklif Al" },
];

const DECOR_POSITIONS = [
  "left-[10%] top-[18%] -rotate-12",
  "right-[12%] top-[24%] rotate-6",
  "left-[16%] bottom-[18%] rotate-12",
  "right-[10%] bottom-[22%] -rotate-6",
];

function ServiceVisual({
  n,
  icon: Icon,
  decor,
  gradient,
  label,
}: {
  n: string;
  icon: ElementType;
  decor: ElementType[];
  gradient: string;
  label: string;
}) {
  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] ${gradient} shadow-soft`}>
      {/* TODO: gerçek fotoğraf eklenecek */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div aria-hidden className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-ink/15 blur-3xl" />

      {decor.slice(0, 4).map((DecorIcon, i) => (
        <span
          key={i}
          aria-hidden
          className={`absolute hidden h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white shadow-sm ring-1 ring-white/25 backdrop-blur-sm sm:flex ${DECOR_POSITIONS[i % DECOR_POSITIONS.length]}`}
        >
          <DecorIcon size={18} />
        </span>
      ))}

      <div className="relative flex h-full items-center justify-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm">
          <Icon size={42} strokeWidth={1.5} className="text-white" />
        </span>
      </div>

      <span className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 font-mono text-xs font-bold text-ink shadow-sm">
        {n}
      </span>
      <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink/70">
        {label}
      </span>
    </div>
  );
}

export default function SevenlerDavetPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-sand/60">
        <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-amber-800">
              <Sparkles size={13} />
              Sevenler Davet
            </span>
            <h1 className="mt-5 text-balance font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
              Organizasyonunuz Bizden, Güzelliği Hatıralarınızda Kalsın
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-ink/70 sm:text-lg">
              Sevenler Davet, Hakkı Sevenler Uluslararası Yardım Derneği bünyesindeki iktisadi
              işletmemizin organizasyon, davet, yemek ve catering hizmetlerini sunan markasıdır.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-ink/55 sm:text-base">
              Modern davet evimizden mobil ikram ve catering hizmetlerimize kadar, özel günlerinizi
              özenle hazırlıyor ve ihtiyaç duyduğunuz hizmeti bulunduğunuz yere kadar
              ulaştırıyoruz.
            </p>
          </Reveal>

          <Reveal
            delay={0.1}
            className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-left shadow-sm sm:p-5"
          >
            <AlertTriangle size={20} className="mt-0.5 flex-shrink-0 text-amber-600" />
            <p className="text-sm text-amber-900">
              <strong className="font-semibold">Önemli:</strong> Sevenler Davet, derneğimizin
              yardım ve bağış faaliyetlerinden ayrı olarak iktisadi işletme kapsamında{" "}
              <strong className="font-semibold">ücretli hizmet</strong> vermektedir.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {QUICK_NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
              >
                <Icon size={14} />
                {label}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="davet-evi" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <ServiceVisual
                n="01"
                icon={Home}
                decor={[Users, MapPin, Sparkles, PartyPopper]}
                gradient="bg-gradient-to-br from-primary to-primary-dark"
                label="Sevenler Davet Evi"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">Sevenler Davet Evi</h2>
              <p className="mt-1.5 text-sm font-semibold text-primary sm:text-base">
                150 Kişiye Kadar Modern ve Nezih Davet Alanı
              </p>
              <p className="mt-4 text-ink/65">
                Ankara Keçiören&apos;deki modern ve özenle donatılmış 150 kişilik davet evimizde
                özel günlerinize ev sahipliği yapıyoruz.
              </p>
              <StaggerGroup className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {DAVET_EVI_LIST.map((item) => (
                  <StaggerItem key={item} className="flex items-center gap-2 text-sm text-ink/70">
                    <CheckCircle2 size={16} className="flex-shrink-0 text-primary" />
                    {item}
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <Link
                href="/iletisim"
                className="focus-ring group mt-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark"
              >
                Davet Evini İncele
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="catering" className="scroll-mt-24 border-b border-line bg-sand/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="lg:order-first">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">Catering & Toplu Yemek</h2>
              <p className="mt-1.5 text-sm font-semibold text-accent sm:text-base">
                Siz Davetinizi Planlayın, Yemeğiniz Bizden
              </p>
              <p className="mt-4 text-ink/65">
                Davetinizi kendi mekânınızda mı yapacaksınız? Sevenler Davet Catering olarak
                yemeklerinizi hazırlıyor, talep ettiğiniz noktaya ulaştırıyoruz.
              </p>
              <StaggerGroup className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {CATERING_LIST.map((item) => (
                  <StaggerItem key={item} className="flex items-center gap-2 text-sm text-ink/70">
                    <CheckCircle2 size={16} className="flex-shrink-0 text-accent" />
                    {item}
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <Link
                href="/iletisim"
                className="focus-ring group mt-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark"
              >
                Catering Hizmeti Al
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
            <Reveal delay={0.1} className="lg:order-last">
              <ServiceVisual
                n="02"
                icon={UtensilsCrossed}
                decor={[Soup, Truck, Sparkles]}
                gradient="bg-gradient-to-br from-accent to-accent-dark"
                label="Catering & Toplu Yemek"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="mobil-ikram" className="scroll-mt-24 border-b border-line">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
          <Reveal>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">Mobil İkram & Organizasyon</h2>
            <p className="mt-1.5 text-sm font-semibold text-amber-700 sm:text-base">
              Mekân Sizden, İkram Bizden
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-ink/65">
              Mobil ikram araçlarımızla organizasyonunuzu bulunduğunuz yere taşıyoruz.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto mt-8 max-w-2xl">
            <ServiceVisual
              n="03"
              icon={Truck}
              decor={[IceCream, Popcorn, Cloud, Grid3x3]}
              gradient="bg-gradient-to-br from-amber-400 to-amber-600"
              label="Mobil İkram & Organizasyon"
            />
          </Reveal>

          <StaggerGroup className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {IKRAM_TYPES.map(({ label, icon: Icon }) => (
              <StaggerItem
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800"
              >
                <Icon size={16} className="text-amber-600" />
                {label}
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.15} className="mx-auto mt-8 max-w-2xl">
            <p className="text-ink/65">
              Okullardan kurumsal etkinliklere, özel organizasyonlardan toplu programlara kadar
              mobil ikram hizmeti sunuyoruz.
            </p>
            <Link
              href="/iletisim"
              className="focus-ring group mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark"
            >
              Mobil İkram Talep Et
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="okul-etkinlikleri" className="scroll-mt-24 border-b border-line bg-sand/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">Okul Etkinlikleri</h2>
              <p className="mt-1.5 text-sm font-semibold text-primary sm:text-base">
                Çocukların Mutluluğuna Lezzet Katıyoruz
              </p>
              <p className="mt-4 text-ink/65">
                Millî Eğitim Bakanlığına bağlı okullarımızın; mezuniyet programları, yıl sonu
                etkinlikleri, öğrenci programları, özel günleri ve sosyal etkinliklerinde mobil
                ikram ve organizasyon hizmetleri sunuyoruz.
              </p>
              <p className="mt-3 text-ink/65">
                Pamuk şekeri, patlamış mısır, waffle, dondurma ve çeşitli ikram alternatifleriyle
                okul etkinliklerini daha renkli hâle getiriyoruz.
              </p>
              <Link
                href="/iletisim"
                className="focus-ring group mt-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark"
              >
                Okul Etkinliği Planla
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <ServiceVisual
                n="04"
                icon={GraduationCap}
                decor={[Gift, Star, PartyPopper]}
                gradient="bg-gradient-cta"
                label="Okul Etkinlikleri"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="organizasyon" className="scroll-mt-24">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:py-24">
          <Reveal>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
              <PartyPopper size={24} />
            </span>
            <h2 className="mt-5 font-display text-2xl text-ink sm:text-3xl">
              Organizasyon Hizmetleri
            </h2>
            <p className="mt-1.5 text-sm font-semibold text-primary sm:text-base">
              Özel Gününüzü Birlikte Planlayalım
            </p>
            <p className="mt-4 text-ink/65">
              Mekân, yemek ve ikram ihtiyaçlarınızı tek noktadan planlayabileceğiniz organizasyon
              çözümleri sunuyoruz. İster Sevenler Davet Evimizde, ister kendi belirlediğiniz
              mekânda; programınıza uygun yemek, catering ve mobil ikram hizmetleriyle
              yanınızdayız.
            </p>
            <Link
              href="/iletisim"
              className="focus-ring mt-6 inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-primary-dark transition-colors hover:border-primary hover:bg-primary-light"
            >
              Organizasyon Talebi Oluştur
              <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-cta px-6 py-14 text-center shadow-warm sm:px-14 sm:py-16">
            <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-ink/10 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance font-display text-3xl leading-tight text-white sm:text-4xl">
                Davetiniz Nerede Olursa Olsun, Hizmetimiz Yanınızda
              </h2>
              <p className="mt-4 text-balance text-white/85 sm:text-lg">
                150 kişilik modern davet evimiz, profesyonel catering hizmetimiz ve mobil ikram
                araçlarımızla özel günlerinizi birlikte güzelleştiriyoruz.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {FINAL_LINKS.map(({ href, label }, i) => {
                  const isLast = i === FINAL_LINKS.length - 1;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`focus-ring inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                        isLast
                          ? "bg-white text-accent-dark shadow-lg hover:bg-white/90"
                          : "border border-white/40 text-white hover:border-white hover:bg-white/10"
                      }`}
                    >
                      {label}
                      {isLast && <ArrowRight size={15} />}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
