---
name: Hakkı Sevenler Uluslararası Yardım Derneği
description: Modern, professional charity platform with teal-to-red gradient design combining trust, energy, and actionable engagement.
colors:
  ink: "#0F172A"
  bg: "#FFFFFF"
  sand: "#F8FAFC"
  line: "#E2E8F0"
  primary: "#1B8FA6"
  primary-dark: "#145A6F"
  primary-light: "#E6F3F7"
  accent: "#E74C3C"
  accent-dark: "#C82E1D"
  accent-light: "#FADBD8"
  success: "#10B981"
  success-dark: "#047857"
  success-light: "#D1FAE5"
typography:
  display:
    fontFamily: "Fraunces, Iowan Old Style, Palatino Linotype, serif"
    fontWeight: 600
    lineHeight: 1.15
  body:
    fontFamily: "Inter, Seravek, Gill Sans Nova, Ubuntu, Calibri, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  card: "1rem"
  pill: "9999px"
spacing:
  section-y: "4rem"
  section-y-lg: "6rem"
  container: "72rem"
components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, #1B8FA6 0%, #E74C3C 100%)"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    boxShadow: "0 0 30px -5px rgba(231, 76, 60, 0.4)"
  card:
    backgroundColor: "#FFFFFF"
---

# Design System: Hakkı Sevenler Uluslararası Yardım Derneği - Modern Professional Edition

## Overview

**Creative North Star: "Trust Through Action"**

A contemporary charity donation platform featuring a professional teal-to-red gradient palette that conveys reliability, compassion, and purposeful action. The design balances modern aesthetics with deep user experience principles, using refined gradients, elegant shadows, and meaningful typography to create an inviting experience that encourages engagement and trust.

**Key Characteristics:**
- Deep Teal (`primary: #1B8FA6`) as the primary structural color: headers, navigation, focus states, and interactive elements
- Signal Red (`accent: #E74C3C`) reserved for powerful calls-to-action and critical features
- Modern gradient combinations (teal→red) for buttons, progress bars, and elevated components
- Soft, professional shadows and blur effects for depth without distraction
- Refined animation system with smooth transitions and purposeful motion
- White as the primary background with subtle gradient overlays for visual sophistication
- Success green for positive confirmations and completed states
- Contemporary sans-serif and serif combination for maximum legibility and personality

## Typography

**Display Font:** Fraunces (with Iowan Old Style, Palatino Linotype, serif)
**Body Font:** Inter (with Seravek, Gill Sans Nova, Ubuntu, Calibri,
sans-serif)

**Character:** A confident serif for headlines against a plain-spoken
grotesque for everything functional — the pairing of an annual report's
cover line with its body copy.

### Hierarchy
- **Display** (600, `text-4xl`–`text-5xl` / 2.25–3rem, tight leading):
  page-level H1s (`Kurban Bağışı`, `Faaliyetlerimiz`).
- **Headline** (400–600, `text-3xl`–`text-4xl`): section headings
  (`Bağışınızın dokunduğu alanlar`).
- **Title** (600, `text-lg`–`text-xl`): card titles, component headings.
- **Body** (400, `text-sm`–`text-base`, `text-ink/60` for secondary):
  paragraph copy, descriptions; secondary text always dims from `ink`,
  never switches to a plain gray.
- **Label** (600, `text-xs`, tracked): category badges, step-number chips,
  the ticker's "Yaklaşan dini günler" tag.

## Layout

Container: `max-w-6xl` (72rem) centered, `px-4` gutters. Sections alternate
white and `sand` bands as the register-change device (never a border alone).
Vertical rhythm: `py-16` mobile, `py-20`–`py-24` desktop between major
sections. Cards sit in responsive grids (`sm:grid-cols-2 lg:grid-cols-3/4`)
that collapse to a single column on mobile.

## Elevation & Depth

Flat by default; two soft, large-blur shadows carry emphasis instead of
hard offsets.

### Shadow Vocabulary
- **soft** (`0 20px 60px -20px rgba(19,42,53,0.2)`): floating cards over a
  white/gray page (quick-donate widget).
- **warm** (`0 20px 50px -18px rgba(13,115,119,0.35)`): teal-tinted glow
  under CTA buttons and image banners.

### Named Rules
**The No Hard Shadow Rule.** Every shadow is soft and large-radius; a
zero-blur offset shadow does not belong to this world.

## Shapes

Cards and panels: `rounded-2xl` (1rem). Buttons and chips: fully rounded
(`rounded-full`) pills. Borders are always the hairline `line` gray at 1px;
no colored side-borders.

## Components

### Buttons
- **Shape:** fully rounded pill (`rounded-full`).
- **Primary:** `bg-accent` / white text, `hover:bg-accent-dark`, subtle
  `-translate-y-0.5` lift + `shadow-warm` on hover.
- **Secondary/Ghost:** `border border-primary/30` with `text-primary-dark`,
  `hover:bg-primary-light`.

### Chips
- **Category badge:** white/95 pill on card imagery, `text-primary-dark`.
- **Icon chip:** circular, `bg-primary-light` (pale teal) fill with
  `text-primary`/`text-accent` icon (stats, trust points, work-area cards).

### Cards / Containers
- **Corner Style:** `rounded-2xl`.
- **Background:** white.
- **Shadow Strategy:** none at rest; cards use a `border-line` hairline
  instead, with `hover:border-primary/30` and a slight lift on hover.
- **Border:** 1px `line`.
- **Internal Padding:** `p-5`–`p-6`.

### Navigation
- Sticky header, `bg-bg/70`→`bg-bg/90` blur on scroll. The current page's
  link gets a pale-teal pill background (`bg-primary-light text-primary-dark`);
  other links are `text-ink/75`, `hover:text-primary`. Mobile collapses to a
  slide-down panel behind a hamburger toggle. Logo carries a small gray
  tagline ("Yurt içinde ve yurt dışında iyilik") under the wordmark on
  `sm:` and up.

### Top Ticker (signature component)
- Solid `bg-primary-dark` strip, the site's only large teal fill, sitting
  above everything else (before the header).
- Left (desktop only): a pinned, non-scrolling "Yaklaşan dini günler" label
  with a calendar icon, separated by a `border-white/15` divider.
- Center: an auto-scrolling marquee (`animate-marquee`, the list duplicated
  once for a seamless loop, paused on hover) of recurring Islamic-calendar
  giving categories (Sadaka, Aşure Hayrı, Kurban & Adak Vekâleti, Mevlid
  Kandili Bağışı, Kur'an-ı Kerim Hediyesi, Zekât & Fitre) — generic category
  names, not fabricated statistics or dates.
- Right: a pinned solid-white "Bağış Yap" pill (the one place a button uses
  white-on-teal instead of teal-on-white).

## Do's and Don'ts

### Do:
- **Do** keep every stat on screen either live (queried) or explicitly
  marked as a placeholder — see PRODUCT.md Evidence on Hand.
- **Do** use `sand` (light blue-gray), not a second hue, whenever a section
  needs to visually separate from its neighbor.
- **Do** keep buttons, icon chips, links, and the active nav pill in the
  same one teal family.
- **Do** match a reference site by screenshotting and looking at it
  directly before writing color tokens — a text-only description or a
  single automated pixel sample is not reliable enough to commit to.

### Don't:
- **Don't** reintroduce the discarded cream/forest-green/terracotta palette
  or the intermediate navy/red/rose palette; both were explicitly replaced
  after direct visual comparison with a real screenshot of the reference.
- **Don't** invent aggregate impact numbers (countries served, families
  reached) anywhere on the site.
- **Don't** add a kicker/eyebrow label above headings, or hard-offset
  shadows — the type and the soft shadow system already carry hierarchy.
