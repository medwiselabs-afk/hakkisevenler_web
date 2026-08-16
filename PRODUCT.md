# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are individual donors (public, Turkish-speaking) who browse active
charity campaigns and make one-time or recurring donations, with the option to
donate anonymously. A secondary, lighter-weight flow is a quick/SMS-style donor
who donates without creating an account. Registered users can log in to view
their own donation history (`/hesabim`).

## Product Purpose

A donation platform for **Hakkı Sevenler Uluslararası Yardım Derneği**, a real
Turkish charitable association. It lets the association publish campaigns
(emergency aid, kurban/sacrifice shares, water wells, orphan support,
education, health, general) with a funding goal and current amount, and lets
donors give to a specific campaign or a specific "share" (hisse) of a
share-based campaign (e.g. kurban shares), one-time or recurring.

## Positioning

The confirmed, already-built differentiator is **donation-to-proof
traceability**: each donation record can carry a `proofVideoUrl`, and the
homepage has a dedicated "Deftere düşen anlar" (moments recorded in the
ledger) gallery surfacing photo/video evidence of where donations landed. This
is the honest transparency claim to lead with — not aggregate impact
statistics, which are not yet real for this association (see Evidence on
Hand).

## Operating Context

- Payment is processed via **iyzico** (Turkish payment gateway, sandbox
  currently), with a callback route confirming payment status.
- Registration requires explicit KVKK (Turkish personal-data-protection law)
  consent, stored per user.
- Campaigns can be tied to the Islamic/hijri calendar (`lib/religiousCalendar.ts`,
  `hijri-converter` dependency) for religious-date-linked campaigns like Kurban.
- An SMS-donation flow exists as a UI pattern (`SmsDonateSlider`) reflecting
  the common Turkish practice of donating via a text-message keyword.

## Capabilities and Constraints

- Campaign categories are a fixed enum: `ACIL_YARDIM`, `KURBAN`, `SU_KUYUSU`,
  `YETIM`, `EGITIM`, `SAGLIK`, `GENEL`.
- Monetary amounts are stored in kuruş (integer, smallest currency unit).
- Share-based campaigns (`isShareBased`) track `totalShares` /
  `takenShares` (e.g. a kurban animal split into shares).
- Donations track status (`BEKLEMEDE`/pending, `BASARILI`/success,
  `BASARISIZ`/failed, `IADE`/refunded), recurring flag, and anonymity flag.
- Dev database is SQLite (`better-sqlite3`); production would need a Postgres
  migration (already noted in the codebase).
- Per the user, the requested redesign should also add new pages/routes to
  match a reference site's structure: a **Faaliyetlerimiz** (activities/field
  work) page and a dedicated **Kurban** campaign page, in addition to the
  existing pages (Hakkımızda, SSS, KVKK, Kampanyalar, Hesabım, Giriş, Kayıt,
  İletişim, Hesaplarımız).

## Brand Commitments

- Name: **Hakkı Sevenler Uluslararası Yardım Derneği** (confirmed, already in
  site metadata).
- Existing type system: display font `Fraunces`, body font `Inter`, custom
  Tailwind tokens `bg-bg` / `text-ink` / `primary` / `accent` / `sand` / `line`.
- Visual redesign is explicitly modeled after
  `https://global-giving-heart.lovable.app/` (a reference site for the same
  association's brand) per the user's direct request — treat its layout
  rhythm, section set, and tone (transparency-forward, professional,
  photography-supported) as the target direction; see DESIGN.md once written.

## Evidence on Hand

- Real: the campaign/donation schema itself, the proof-video field, the
  category taxonomy, the KVKK consent requirement, the "how it works" 3-step
  copy already on the homepage.
- **Real organizational content** (found in `app/dernek_faaliyetleri.md`,
  authored by the user, not this assistant): the association is based in
  **Ankara Keçiören**. Confirmed real programs: **Hacı Mikdat Hafızlık
  Kur'an Kursu** (Quran memorization school — education/housing/food/
  scholarship support), **Aşevi** and **Mobil Aşevi** (soup kitchen + mobile
  catering vehicle, run with Türkiye Diyanet Vakfı Keçiören Şubesi),
  **Gazze relief** (hot meals, bread, water, food), **Africa (Nigeria)**
  water-well and vekâlet-kurban (vacip/adak/akika/şükür) programs, and
  **Sevenler Davet** — a separate for-profit economic enterprise (150-person
  event venue, catering, mobile treats) whose revenue funds the charity;
  it is explicitly a **paid service, not a donation**, per the source
  document, and must never be wired to the donation/payment flow. This file
  also contains ready real marketing headlines/CTAs per program, now used
  verbatim or near-verbatim in the redesigned pages.
- **Not real / must not be fabricated:** aggregate impact numbers such as
  "18 ülkede saha çalışması" or "33.105+ aileye ulaşan yardım" seen on the
  reference site — the user confirmed these are not this association's real
  figures. Any stats section must use neutral/structural placeholders (e.g.
  driven by live DB counts) instead of invented numbers.
- Still open: a real street address (İletişim page currently shows
  "Keçiören, Ankara (açık adres güncellenecek)" — city corrected from a
  fake İstanbul placeholder, exact street still pending), a real phone
  number, and real photography (current images are stock/Unsplash,
  illustrative only).
- The existing DB category enum (`ACIL_YARDIM`, `KURBAN`, `SU_KUYUSU`,
  `YETIM`, `EGITIM`, `SAGLIK`, `GENEL`) does not exactly mirror the real
  program list above; marketing pages map real program names onto the
  closest existing category filter rather than changing the schema (a
  schema/migration change was out of scope for this redesign pass).

## Product Principles

1. Never invent factual claims (impact numbers, testimonials, geographic
   reach) — this is a real association's site, not a demo.
2. Transparency is the real differentiator (proof photos/videos per
   donation) — design should foreground evidence, not manufactured trust
   signals.
3. Preserve existing product/data model and routes; extend the page set
   (Faaliyetlerimiz, Kurban) rather than replacing the donation/auth
   machinery.
4. Content stays Turkish, matching the existing site's voice and terminology.

## Accessibility & Inclusion

No project-specific requirement established beyond standard web accessibility
(existing `focus-ring` utility class in use).
