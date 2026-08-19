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
          THESIS: Professional, trustworthy charity platform using teal-to-red gradients
          for maximum credibility and actionable engagement.
          
          DESIGN: White primary background with gradient overlay accents, deep teal (#1B8FA6) 
          as the structural color for headers/navigation/focus states, signal red (#E74C3C) 
          for powerful CTAs, soft shadows and refined gradients for depth, contemporary 
          Fraunces serif + Inter sans-serif typography, 2xl rounded cards with subtle borders.
          
          STORY: Visitor is immediately engaged by professional, trustworthy design; navigates 
          campaigns with confidence; makes donations through secure, elegant forms; tracks 
          impact with beautiful visualizations.
          
          FIRST VIEWPORT: Gradient teal top ticker with religious calendar items, hero campaign 
          slider with engaging imagery, quick-donate widget with smart selection.
          
          PALETTE: Primary teal (#1B8FA6 → #145A6F), accent red (#E74C3C), success green (#10B981), 
          professional neutrals (0F172A ink, F8FAFC sand, E2E8F0 line).
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
