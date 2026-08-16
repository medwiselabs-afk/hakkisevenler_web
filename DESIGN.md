---
name: Hakkı Sevenler Uluslararası Yardım Derneği
description: Teal-surface/red-CTA donation platform matched to a real reference site, evidence over stats.
colors:
  ink: "#132A35"
  bg: "#FFFFFF"
  sand: "#F3F8F9"
  line: "#E1E9EA"
  primary: "#0D7377"
  primary-dark: "#0A5C5F"
  primary-light: "#DFF3F1"
  accent: "#DC3B3E"
  accent-dark: "#B32A2D"
  accent-light: "#FBE1E1"
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
ledger: white pages, deep navy-teal ink for authority, teal as the
structural surface color (top ticker, icon chips, links, active states),
and one red reserved purely for the donation call to action. Nothing else
competes with red; teal never fills a button.

**The reference site is a live-edited Lovable preview, not a fixed
artifact.** Across this redesign the same URL
(`global-giving-heart.lovable.app`) has rendered at least three visibly
different palettes when checked at different times (all-teal with no red;
navy/red/rose; teal-surface with red CTAs). Each pass in this file's
history matched the screenshot available at that moment in good faith —
treat the *current* running site and DESIGN.md as authoritative, and expect
that a future visit may show yet another state. If asked to re-match the
reference again, get a fresh screenshot first rather than trusting this
file's prior description of it.

Confirmed rejection: aggregate impact statistics ("18 countries", "41,783+
families") are not this association's real figures and must never be
rendered as if they were — see PRODUCT.md Evidence on Hand. The stats
section instead pulls live counts from the database.

**Key Characteristics:**
- Teal (`primary`) is the structural color: top ticker background, links,
  icon-chip icons, active nav pill, focus ring
- Red (`accent`) is reserved *only* for the "Bağış Yap" call-to-action
  button — everywhere it appears, including inside the teal top ticker
- White as the working background; cool blue-gray (`sand`) only for
  register changes (stats band, alternating sections)
- Serif display (Fraunces) for headings, humanist sans (Inter) for body
- Real photography, no icon-tile filler where a photo belongs
- Numbers on screen are either live (from the database) or clearly marked
  as placeholders — never invented

## Colors

Two-role strategy: teal is the surface/structural color, red is a single
reserved action color used nowhere else.

### Primary (teal)
- **Deep Teal** (`#0D7377`): links, icon-chip icons, active nav pill,
  focus ring, selection color, secondary/outline button borders+text.
- **Deep Teal Dark** (`#0A5C5F`): hover/active state; also the top
  ticker's solid background.
- **Pale Teal** (`#DFF3F1`): icon-chip backgrounds, active nav-pill
  background — always paired with `primary` text or icon, never a large
  field on its own.

### Accent (red — CTA only)
- **Signal Red** (`#DC3B3E`): the "Bağış Yap" button fill, every time it
  appears (header, ticker, hero, cards, forms). Nothing else is red.
- **Signal Red Dark** (`#B32A2D`): CTA hover/active state.
- **Pale Red** (`#FBE1E1`): reserved for a red-tinted chip if a future
  component needs one; not currently used anywhere.

### Neutral
- **Deep Navy-Teal Ink** (`#132A35`): all body text and headings.
- **White** (`#FFFFFF`): the default page background and card surface.
- **Cool Blue-Gray** (`#F3F8F9`, token `sand`): the alternate section
  background used to separate registers (stats band, page intros, gallery
  bands).
- **Hairline Blue-Gray** (`#E1E9EA`, token `line`): all borders — card
  edges, dividers, input borders.

### Named Rules
**The Red-Is-CTA-Only Rule.** Red fills exactly one kind of element: the
"Bağış Yap" action button, wherever it appears. It never becomes a link
color, an icon-chip tint, a border, or a section background. Every other
emphasis need is teal.

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
