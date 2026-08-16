---
name: Hakkı Sevenler Uluslararası Yardım Derneği
description: Teal-accented donation platform matched to a real reference site, evidence over stats.
colors:
  ink: "#132A35"
  bg: "#FFFFFF"
  sand: "#F3F8F9"
  line: "#E1E9EA"
  primary: "#0D7377"
  primary-dark: "#0A5C5F"
  primary-light: "#DFF3F1"
  accent: "#0D7377"
  accent-dark: "#0A5C5F"
  accent-light: "#DFF3F1"
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

A charity donation platform that reads like a well-run institution's public
ledger: white pages, deep navy-teal ink for authority, and exactly one
accent — a deep teal — that carries every button, icon chip, link, and
active state. Nothing else competes with it.

This redesign went through three passes before landing here: an original
warm cream/forest-green/terracotta identity, a first reskin toward the
reference site based only on a text description of it (wrongly landed on a
mixed navy/red/rose palette from a bad pixel sample), and this final pass —
matched directly against a screenshot the user captured themselves from
`global-giving-heart.lovable.app`. That screenshot is the authority; treat
it over any earlier written description of "the reference," including
inside this file's own history. The site's structure (routes, data model,
component boundaries) was preserved throughout; only the visual language
changed.

Confirmed rejection: aggregate impact statistics ("18 countries", "41,783+
families") are not this association's real figures and must never be
rendered as if they were — see PRODUCT.md Evidence on Hand. The stats
section instead pulls live counts from the database.

**Key Characteristics:**
- One accent color (deep teal), used for every button, icon chip, link,
  and active nav state — never a second competing hue
- White as the working background; cool blue-gray (`sand`) only for
  register changes (stats band, alternating sections)
- A dark teal top ticker (see Components → Top Ticker) is the one place
  the accent fills a large surface
- Serif display (Fraunces) for headings, humanist sans (Inter) for body
- Real photography, no icon-tile filler where a photo belongs
- Numbers on screen are either live (from the database) or clearly marked
  as placeholders — never invented

## Colors

Restrained strategy: neutrals carry the page, one teal accent carries every
call to action, confirmation, icon mark, and active state.

### Primary / Accent
`primary` and `accent` are the same teal family (kept as two token names
for code-reuse reasons, not two hues).
- **Deep Teal** (`#0D7377`): buttons, links, icon-chip icons, active nav
  pill, focus ring, selection color.
- **Deep Teal Dark** (`#0A5C5F`): hover/active state; also the top ticker's
  solid background.
- **Pale Teal** (`#DFF3F1`): icon-chip backgrounds, active nav-pill
  background — always paired with `primary`/`accent` text or icon, never
  a large field on its own.

### Neutral
- **Deep Navy-Teal Ink** (`#132A35`): all body text and headings.
- **White** (`#FFFFFF`): the default page background and card surface.
- **Cool Blue-Gray** (`#F3F8F9`, token `sand`): the alternate section
  background used to separate registers (stats band, page intros, gallery
  bands).
- **Hairline Blue-Gray** (`#E1E9EA`, token `line`): all borders — card
  edges, dividers, input borders.

### Named Rules
**The One Accent Rule.** Only one hue (teal) ever appears as emphasis —
buttons, links, icon strokes, focus rings, the active nav pill, and the
top ticker's solid fill. No second accent hue (no red, no rose, no orange)
gets introduced for "variety."

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
