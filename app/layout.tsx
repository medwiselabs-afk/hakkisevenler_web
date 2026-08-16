import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HesitationPopup from "@/components/HesitationPopup";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hakkı Sevenler Uluslararası Yardım Derneği | Bağış Platformu",
  description:
    "Şeffaf, izlenebilir bağış defteri ile yardımlarınızı ihtiyaç sahiplerine ulaştırıyoruz.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body flex min-h-screen flex-col overflow-x-hidden bg-bg text-ink">
        {/*
          THESIS: Trust through proof, not scale claims — a restrained white/gray charity
          site where evidence (photos, hisse counts, 3D Secure) replaces invented stats.
          OWN-WORLD: white/navy-teal-ink neutrals, teal (#0D7377) as the structural surface
          color (ticker, links, icon chips), red (#DC3B3E) reserved only for the "Bağış Yap"
          CTA, Fraunces display + Inter body, rounded-2xl cards, soft shadows, no gradient chrome.
          STORY: visitor sees the mission, trusts the payment/proof mechanics, donates to a
          campaign or kurban hisse, and can later see delivery evidence.
          FIRST VIEWPORT: dark-teal top ticker, campaign slider hero, quick-donate widget below.
          FORM: brief-pinned redesign of https://global-giving-heart.lovable.app/, applied
          as a token/section reskin over the existing Next.js structure (no concept roll —
          direction was pinned by the user, see PRODUCT.md Brand Commitments). The reference is
          a live-edited Lovable preview and has changed palette between checks — see DESIGN.md
          Overview for the instability note; re-verify against a fresh screenshot before trusting
          this comment's hex values again.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish
          review, the verdict, and DESIGN.md.
        */}
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <HesitationPopup />
      </body>
    </html>
  );
}
