import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon } from "./SocialIcons";
import Reveal from "./motion/Reveal";
import NewsletterForm from "./NewsletterForm";

const SOCIALS = [
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: YoutubeIcon, href: "#", label: "Youtube" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-line bg-ink text-bg/80">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      <Reveal className="relative mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo-icon.png"
                alt="Hakkı Sevenler Uluslararası Yardım Derneği"
                width={36}
                height={36}
                className="h-9 w-9 flex-shrink-0"
              />
              <span className="font-display text-lg text-white">
                Hakkı Sevenler <span className="text-bg/70">Uluslararası Yardım Derneği</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bg/55">
              Ankara Keçiören merkezli; hafızlık eğitimi, aşevi, mobil ikram ve yurt içi/yurt dışı
              insani yardım alanlarında faaliyet gösteren bir yardım kuruluşudur. Her bağış, kanıt
              ve kayıtla izlenebilir.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-bg/60 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary-light"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Kurumsal</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/hakkimizda" className="transition-colors hover:text-accent">Hakkımızda</Link></li>
              <li><Link href="/gundem" className="transition-colors hover:text-accent">Gündem</Link></li>
              <li><Link href="/sss" className="transition-colors hover:text-accent">Sık Sorulan Sorular</Link></li>
              <li><Link href="/kvkk" className="transition-colors hover:text-accent">KVKK Metni</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Faaliyetler</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/faaliyetlerimiz" className="transition-colors hover:text-accent">Faaliyetlerimiz</Link></li>
              <li><Link href="/kurban" className="transition-colors hover:text-accent">Kurban Bağışı</Link></li>
              <li><Link href="/kampanyalar?kategori=SU_KUYUSU" className="transition-colors hover:text-accent">Afrika Su Kuyusu</Link></li>
              <li><Link href="/kampanyalar?kategori=EGITIM" className="transition-colors hover:text-accent">Hafızlık Kur'an Kursu</Link></li>
              <li><Link href="/sevenler-davet" className="transition-colors hover:text-accent">Sevenler Davet</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Bültenimize katılın</p>
            <p className="mt-3 text-sm text-bg/55">Kampanya ve şeffaflık raporlarından ilk siz haberdar olun.</p>
            <div className="mt-3">
              <NewsletterForm />
            </div>
            <ul className="mt-5 space-y-2 text-sm text-bg/60">
              <li className="flex items-center gap-2"><Phone size={14} className="text-primary-light" /> 0850 000 00 00</li>
              <li className="flex items-center gap-2"><Mail size={14} className="text-primary-light" /> info@hakkisevenler.org.tr</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <div className="relative border-t border-white/10 py-5 text-center text-xs text-bg/50">
        <p className="mx-auto max-w-lg">
          © {new Date().getFullYear()} Hakkı Sevenler Uluslararası Yardım Derneği — Bu proje bir
          demo/başlangıç iskeletidir.
        </p>
      </div>
    </footer>
  );
}
