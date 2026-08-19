import Link from "next/link";
import { FacebookIcon, InstagramIcon, YoutubeIcon, LinkedinIcon } from "./SocialIcons";

const SOCIALS = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: YoutubeIcon, href: "#", label: "Youtube" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
];

export default function UtilityBar({ loggedIn }: { loggedIn: boolean }) {
  return (
    <div className="hidden border-b border-line/50 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 sm:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-all duration-200 hover:bg-gradient-to-br hover:from-primary/15 hover:to-accent/15 hover:text-primary hover:shadow-md"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <Link
            href="/hesaplarimiz"
            className="focus-ring rounded-full border border-primary/30 px-3.5 py-1.5 text-primary transition-all duration-200 hover:border-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:shadow-md"
          >
            Hesaplarımız
          </Link>
          <Link
            href={loggedIn ? "/hesabim" : "/giris"}
            className="focus-ring rounded-full px-3.5 py-1.5 text-ink/60 transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary hover:shadow-md"
          >
            {loggedIn ? "Hesabım" : "Giriş / Üye"}
          </Link>
        </div>
      </div>
    </div>
  );
}
