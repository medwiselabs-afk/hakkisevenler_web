---
name: Hakkı Sevenler Uluslararası Yardım Derneği
description: Restrained white/gray donation platform with a single teal accent, evidence over stats.
colors:
  ink: "#15191B"
  bg: "#FFFFFF"
  sand: "#F2F4F5"
  line: "#E3E7E9"
  primary: "#0F766E"
  primary-dark: "#115E59"
  primary-light: "#CCFBF1"
  accent: "#14B8A6"
  accent-dark: "#0D9488"
  accent-light: "#99F6E4"
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
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-dark}"
  card:
    backgroundColor: "#FFFFFF"
    rounded: "{rounded.card}"
---

# Design System: Hakkı Sevenler Uluslararası Yardım Derneği

## Overview

**Creative North Star: "The Transparent Ledger"**

A charity donation platform that earns trust with evidence, not claims. The
surface reads like a well-run institution's public ledger: white pages, a
single restrained teal for action and confirmation, near-black type for
authority, and a light-gray band whenever the page needs to change register
(stats, alternating sections) without reaching for a second color.

This redesign replaced an earlier warm cream/forest-green/terracotta identity
(evidence, not current state — see git history) with this restrained
white/gray/teal world, at the explicit direction of a named reference site
(`global-giving-heart.lovable.app`). The old world's structure (routes, data
model, component boundaries) was preserved; only the visual language changed.

Confirmed rejection: aggregate impact statistics ("18 countries", "31,638+
families") are not this association's real figures and must never be
rendered as if they were — see PRODUCT.md Evidence on Hand. The stats
section instead pulls live counts from the database.

**Key Characteristics:**
- One accent color (teal), used sparingly, never decoratively
- White as the working background; gray (`sand`) only for register changes
- Serif display (Fraunces) for headings, humanist sans (Inter) for body
- Real photography, no icon-tile filler where a photo belongs
- Numbers on screen are either live (from the database) or clearly marked
  as placeholders — never invented

## Colors

Restrained strategy: neutrals carry the page, one teal accent carries every
call to action, confirmation, and small emphasis mark.

### Primary
- **Deep Teal** (`#0F766E`): links, icon fills on light chips, focus rings,
  selection color, primary text accents (e.g. price/amount emphasis).
- **Deep Teal Dark** (`#115E59`): hover/active state for primary text links,
  darker chip backgrounds.
- **Pale Teal** (`#CCFBF1`): icon-chip backgrounds (e.g. stat icons, trust
  badges) — always paired with `primary`/`primary-dark` text, never on its
  own as a large field.

### Secondary (accent)
- **Bright Teal** (`#14B8A6`): solid CTA buttons ("Bağış Yap"), the one
  color allowed to fill a large shape (a full button).
- **Bright Teal Dark** (`#0D9488`): CTA hover/active state.
- **Bright Teal Light** (`#99F6E4`): reserved for small success/positive
  micro-accents; not currently used as a large fill.

### Neutral
- **Near-Black Ink** (`#15191B`): all body text, headings, icon strokes on
  light surfaces. Also the footer's solid background (white text on ink).
- **White** (`#FFFFFF`): the default page background and card surface.
- **Cool Gray** (`#F2F4F5`, token `sand`): the alternate section background
  used to separate registers (stats band, page intros, gallery bands).
- **Hairline Gray** (`#E3E7E9`, token `line`): all borders — card edges,
  dividers, input borders.

### Named Rules
**The One Accent Rule.** Only two teal values ever appear as a *fill*:
`accent` on primary buttons and `primary-light`/`sand` on small chips. Every
other teal use is text, border, or icon stroke. Introducing a second hue
(the old design's orange) is a regression to the discarded world.

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
- **Label** (600, `text-xs`, tracked): category badges, step-number chips.

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
- **soft** (`0 20px 60px -20px rgba(15,23,25,0.18)`): floating cards over a
  white/gray page (quick-donate widget).
- **warm** (`0 20px 50px -18px rgba(15,118,110,0.35)`): teal-tinted glow
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
- **Icon chip:** circular, `bg-primary-light` fill with `text-primary-dark`
  icon (stats, trust points, work-area cards).

### Cards / Containers
- **Corner Style:** `rounded-2xl`.
- **Background:** white.
- **Shadow Strategy:** none at rest; cards use a `border-line` hairline
  instead, with `hover:border-primary/30` and a slight lift on hover.
- **Border:** 1px `line`.
- **Internal Padding:** `p-5`–`p-6`.

### Navigation
- Sticky header, `bg-bg/70`→`bg-bg/90` blur on scroll. Links `text-ink/75`,
  `hover:text-primary`, with an animated underline. Mobile collapses to a
  slide-down panel behind a hamburger toggle.

## Do's and Don'ts

### Do:
- **Do** keep every stat on screen either live (queried) or explicitly
  marked as a placeholder — see PRODUCT.md Evidence on Hand.
- **Do** use `sand` (light gray), not a second hue, whenever a section
  needs to visually separate from its neighbor.
- **Do** keep buttons as filled teal pills; keep secondary actions as
  outlined pills, never a second color.

### Don't:
- **Don't** reintroduce the discarded orange/terracotta accent or the
  cream/forest-green palette; that identity was explicitly replaced.
- **Don't** invent aggregate impact numbers (countries served, families
  reached) anywhere on the site.
- **Don't** add a kicker/eyebrow label above headings, or hard-offset
  shadows — the type and the soft shadow system already carry hierarchy.
