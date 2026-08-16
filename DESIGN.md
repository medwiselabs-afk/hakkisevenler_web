---
name: Hakkı Sevenler Uluslararası Yardım Derneği
description: Navy/red/rose donation platform matched to a real reference site, evidence over stats.
colors:
  ink: "#14213D"
  bg: "#FFFFFF"
  sand: "#EEF3F8"
  line: "#DCE3EC"
  primary: "#1D3A5F"
  primary-dark: "#0B1F39"
  primary-light: "#E4EAF1"
  accent: "#C22E30"
  accent-dark: "#9E2528"
  accent-light: "#FBE1E3"
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

**Creative North Star: "The Institutional Ledger"**

A charity donation platform that reads like a well-run institution's public
record: navy authority, one decisive red for the single ask ("Bağış Yap"),
and a soft rose for the small icon marks that dot trust and program cards.
White pages, a light blue-gray band whenever the page needs to change
register (stats, alternating sections), and nothing else competing for
attention.

This redesign replaced an earlier warm cream/forest-green/terracotta
identity, and then a first (incorrect) all-teal pass, with this navy/red/
rose world — matched by directly screenshotting and pixel-sampling the named
reference site (`global-giving-heart.lovable.app`) rather than trusting a
text-only description of it. The old world's structure (routes, data model,
component boundaries) was preserved; only the visual language changed.

Confirmed rejection: aggregate impact statistics ("18 countries", "31,638+
families") are not this association's real figures and must never be
rendered as if they were — see PRODUCT.md Evidence on Hand. The stats
section instead pulls live counts from the database.

**Key Characteristics:**
- Navy (`primary`) carries text emphasis, links, borders, and outline
  buttons; red (`accent`) is reserved for the one primary action per view;
  pale rose (`accent-light`) is only for small icon-chip backgrounds
- White as the working background; blue-gray (`sand`) only for register
  changes
- Serif display (Fraunces) for headings, humanist sans (Inter) for body
- Real photography, no icon-tile filler where a photo belongs
- Numbers on screen are either live (from the database) or clearly marked
  as placeholders — never invented

## Colors

Full-palette strategy (matched to the reference, not a from-scratch
choice): navy is the dominant secondary hue (text emphasis, links, outline
buttons), red is the single primary-action color, rose is a small tertiary
accent for icon marks. Values were captured by pixel-sampling an actual
screenshot of the reference site, not estimated from a text description.

### Primary
- **Deep Navy** (`#1D3A5F`): links, borders/focus rings, selection color,
  outline-button text, nav underline, price/amount emphasis.
- **Ink Navy** (`#0B1F39`): hover/active state for navy elements, and the
  reference's own hero/dark-surface tone (not currently used as a large
  fill on this site, reserved for a future dark section).
- **Pale Navy** (`#E4EAF1`): reserved for navy-tinted chip backgrounds if a
  future component needs a navy chip instead of a rose one.

### Secondary (accent)
- **Signal Red** (`#C22E30`): solid CTA buttons ("Bağış Yap"), the *only*
  color allowed to fill a large shape (a full button). Used once per view.
- **Signal Red Dark** (`#9E2528`): CTA hover/active state.
- **Pale Rose** (`#FBE1E3`): icon-chip backgrounds (stat icons, trust
  badges, program cards) — always paired with `accent` icon color, never
  on its own as a large field.

### Neutral
- **Deep Navy Ink** (`#14213D`): all body text, headings, icon strokes on
  light surfaces. Also the footer's solid background (white text on ink).
- **White** (`#FFFFFF`): the default page background and card surface.
- **Cool Blue-Gray** (`#EEF3F8`, token `sand`): the alternate section
  background used to separate registers (stats band, page intros, gallery
  bands) — matches the reference's light stat-section tone.
- **Hairline Blue-Gray** (`#DCE3EC`, token `line`): all borders — card
  edges, dividers, input borders.

### Named Rules
**The One Red Rule.** Red (`accent`) fills at most one element per
viewport — the primary "Bağış Yap" action. Every other emphasis need
(links, borders, secondary buttons, big numbers) is navy, never red.
**The Rose-Is-Chip-Only Rule.** Pale rose (`accent-light` + `accent` icon)
only appears inside a small circular icon chip. It never becomes a section
background, a card border, or a button fill.

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
- **warm** (`0 20px 50px -18px rgba(194,46,48,0.35)`): red-tinted glow under
  CTA buttons and image banners.

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
- **Do** use `sand` (light blue-gray), not a second hue, whenever a section
  needs to visually separate from its neighbor.
- **Do** keep the primary CTA as a filled red pill; keep secondary actions
  as navy-outlined pills, never a second fill color.
- **Do** keep icon chips rose (`accent-light` bg + `accent` icon); don't
  recolor them navy even though navy is the dominant text color.

### Don't:
- **Don't** reintroduce the discarded cream/forest-green/terracotta palette
  or the intermediate all-teal palette; both identities were explicitly
  replaced after direct visual comparison with the reference site.
- **Don't** invent aggregate impact numbers (countries served, families
  reached) anywhere on the site.
- **Don't** add a kicker/eyebrow label above headings, or hard-offset
  shadows — the type and the soft shadow system already carry hierarchy.
