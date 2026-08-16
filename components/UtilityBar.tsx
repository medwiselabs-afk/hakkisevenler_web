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
    <div className="hidden border-b border-line/70 bg-sand/40 sm:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5">
        <div className="flex items-center gap-1.5">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="focus-ring flex h-7 w-7 items-center justify-center rounded-full text-ink/45 transition-colors hover:bg-white hover:text-primary"
            >
              <Icon size={13} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-medium">
          <Link
            href="/hesaplarimiz"
            className="focus-ring rounded-full border border-primary/25 px-3 py-1 text-primary-dark transition-colors hover:border-primary hover:bg-primary-light"
          >
            Hesaplarımız
          </Link>
          <Link
            href={loggedIn ? "/hesabim" : "/giris"}
            className="focus-ring rounded-full px-3 py-1 text-ink/60 transition-colors hover:bg-white hover:text-primary"
          >
            {loggedIn ? "Hesabım" : "Giriş / Üye"}
          </Link>
        </div>
      </div>
    </div>
  );
}
