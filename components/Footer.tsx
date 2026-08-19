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
    <footer className="relative mt-20 overflow-hidden border-t border-line bg-gradient-to-br from-ink/85 via-ink/80 to-ink/85 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent/8 blur-3xl" />

      <Reveal className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Logo Section */}
          <div className="md:col-span-4">
            <Link href="/" className="focus-ring group inline-block transition-all hover:opacity-90">
              <Image
                src="/hakki_sevenler_logo_transparent.png"
                alt="Hakkı Sevenler Uluslararası Yardım Derneği"
                width={300}
                height={240}
                className="h-auto w-full max-w-xs"
              />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/75">
              Kurban, sadaka, eğitim ve insani yardım çalışmalarını şeffaf bir şekilde yürüten bir yardım kuruluşudur.
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-xs text-white/70 backdrop-blur-sm">
              <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10 10-4.48 10-10S17.52 1 12 1m-2 15l-5-5 1.41-1.41L10 12.17l7.59-7.59L19 6l-9 9z" />
              </svg>
              Bağışlar 3D Secure ile korunur
            </div>
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/25 hover:text-primary-light hover:shadow-lg backdrop-blur-sm"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="md:col-span-8">
            <div className="grid gap-10 sm:grid-cols-3">
              {/* Sayfalar */}
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-primary">Sayfalar</p>
                <ul className="space-y-3 text-sm text-white/75">
                  <li><Link href="/hakkimizda" className="transition-colors hover:text-primary-light">Hakkımızda</Link></li>
                  <li><Link href="/faaliyetlerimiz" className="transition-colors hover:text-primary-light">Faaliyetlerimiz</Link></li>
                  <li><Link href="/kurban" className="transition-colors hover:text-primary-light">Kurban Bağışı</Link></li>
                  <li><Link href="/bagis" className="transition-colors hover:text-primary-light">Bağış Yap</Link></li>
                </ul>
              </div>

              {/* İletişim */}
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-primary">İletişim</p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3 text-white/75">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    <span>Merkez ofis adresi (güncellenecek)</span>
                  </li>
                  <li className="flex items-center gap-3 text-white/75">
                    <Phone size={16} className="flex-shrink-0" />
                    <span>+90 000 000 00 00</span>
                  </li>
                  <li className="flex items-center gap-3 text-white/75">
                    <Mail size={16} className="flex-shrink-0" />
                    <span>info@hakkisevenler.org.tr</span>
                  </li>
                </ul>
              </div>

              {/* Yasal */}
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-wider text-primary">Yasal</p>
                <ul className="space-y-3 text-sm text-white/75">
                  <li><Link href="/kvkk" className="transition-colors hover:text-primary-light">KVKK Metni</Link></li>
                  <li><Link href="/sss" className="transition-colors hover:text-primary-light">Sık Sorulan Sorular</Link></li>
                  <li><Link href="/gundem" className="transition-colors hover:text-primary-light">Gündem</Link></li>
                  <li><Link href="/iletisim" className="transition-colors hover:text-primary-light">İletişim</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="relative border-t border-white/10 py-6 text-center text-xs text-white/50">
        <p>
          © {new Date().getFullYear()} Hakkı Sevenler Derneği. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
