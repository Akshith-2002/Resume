# Design System — Akshith Kumar Y V Portfolio

## Product Context
- **What this is:** Personal portfolio for a Technical Business Analyst & Project Manager who ships AI/automation systems.
- **Who it's for:** Hiring managers at AI-forward product companies, founders looking for a BA/PM who can vibe-code, and recruiters scanning for BA + AI fluency.
- **Positioning:** Strategist who codes. Operator who ships. Bridge between business, engineering, and AI.

## Aesthetic Direction
- **Direction:** Operator's Console — Editorial × Mission Control
- **Decoration level:** Intentional (serif display does emotional work, monospace meta does the operator signaling, no decorative noise)
- **Mood:** Always-on. Confident. Reads like a serious operator's status page, not a marketing site.
- **Risks taken (deliberate):**
  1. Dark-first (most BA portfolios go light/safe). Owns the always-shipping operator vibe.
  2. Editorial serif paired with mono — not a typical pairing. Sells the strategist + builder duality.
  3. Project cards as ops monitor cards (live status pill, KPI metric, stack labels), not generic case-study tiles.

## Typography
- **Display/Hero:** Fraunces Variable (Google Fonts) — `wght 400-700`, `opsz 9-144`. Optical-size axis lets the giant hero feel different from inline serif accents.
- **Body:** Geist Sans (Google Fonts) — 400, 500, 600. Tight letterforms, modern but not trendy.
- **Data/UI/Meta:** Geist Mono (Google Fonts) — 400, 500. For labels, KPIs, status pills, footer strip.
- **Loading strategy:** `preconnect` + `display=swap` from fonts.googleapis.com. Self-host can come later.
- **Scale (perfect fourth, 1.333):**
  - `--fs-display-1`: clamp(3.5rem, 8vw + 1rem, 8rem) — hero headline
  - `--fs-display-2`: clamp(2.25rem, 4vw + 1rem, 4rem) — section opener
  - `--fs-h1`: 2rem
  - `--fs-h2`: 1.5rem
  - `--fs-h3`: 1.125rem
  - `--fs-body`: 1rem (16px)
  - `--fs-meta`: 0.8125rem (13px) — monospace
  - `--fs-micro`: 0.6875rem (11px) — uppercase tracked

## Color
- **Approach:** Restrained. One signal accent (lime), one rare warm accent (amber) for hover/highlight only.
- **Dark (default):**
  - `--bg`: `#0A0A0B` — near-black with slight warmth
  - `--surface`: `#15151A` — card lift
  - `--surface-2`: `#1C1C22` — elevated card
  - `--rule`: `#2A2A33` — hairlines
  - `--rule-strong`: `#3D3D48` — visible borders
  - `--text`: `#ECECEC` — primary
  - `--text-muted`: `#8A8A95` — meta, labels
  - `--text-dim`: `#5A5A63` — tertiary
  - `--accent`: `#C8FF4D` — signal lime (live dots, KPIs, hover states)
  - `--accent-warm`: `#FF8A4C` — rare second accent
  - `--success`: `#5DD39E`
  - `--warn`: `#FFB347`
- **Light variant (toggle):**
  - `--bg`: `#FAF8F3` — warm paper
  - `--surface`: `#F2EFE8`
  - `--text`: `#0E0E12`
  - `--accent`: `#1F4A1F` — deep green replaces lime in light mode (lime is illegible on cream)
- **Contrast:** All text/bg pairings ≥ AA (4.5:1) and most ≥ AAA (7:1). Accent on bg is decorative-only when used for borders/dots.

## Spacing
- **Base unit:** 4px
- **Density:** Comfortable (ops dashboards are dense, but a portfolio needs breathing room)
- **Scale:** `--sp-1`(4) `--sp-2`(8) `--sp-3`(12) `--sp-4`(16) `--sp-5`(24) `--sp-6`(32) `--sp-7`(48) `--sp-8`(64) `--sp-9`(96) `--sp-10`(128)

## Layout
- **Approach:** Hybrid — strict 12-col grid for app sections (projects, skills), creative-editorial for hero and section openers.
- **Max content width:** 1280px
- **Gutter:** 24px → 32px on ≥1024px
- **Border radius scale:** sm 4px / md 8px / lg 12px / xl 16px. Cards use 12px. Pills use 9999px (full).
- **Hairlines:** 1px `--rule` on internal dividers, 1px `--rule-strong` on card borders.

## Motion
- **Approach:** Intentional. Hero load choreography (serif optical-size morph), KPI count-ups on scroll, cursor-tracked grid lines on hero.
- **Easing:** `--ease-out`: cubic-bezier(0.16, 1, 0.3, 1) / `--ease-in-out`: cubic-bezier(0.65, 0, 0.35, 1)
- **Duration:** micro 80ms / short 200ms / medium 400ms / long 700ms
- **Reduced motion:** All animations honor `@media (prefers-reduced-motion: reduce)` — they cut to instant or fade only.

## Components

### Status pill
Inline-flex, 9999px radius, mono micro-text, optional pulsing dot. Variants: LIVE (lime), SHIPPED (muted), WON (warm).

### Project card
- Border 1px `--rule-strong`, radius 12px, padding 32px
- Top row: status pill + year range
- Title: serif display
- KPI: oversized mono number with label
- Stack labels: mono micro pills
- Outcome line: body
- Hairline accent line on hover

### Skill matrix
Real grid: category column (mono caps) → skill chips. No bubbles. Dense.

### Footer status strip
Always-pinned bottom strip: `LIVE` dot + current location + UTC offset + availability + clock.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-26 | Initial design system created | Operator's Console direction confirmed by Akshith. Editorial serif + monospace + dark surfaces; project cards as ops monitor cards. |
| 2026-04-26 | Fraunces + Geist + Geist Mono | Free on Google Fonts, modern, distinct. Avoids Inter/Roboto/Poppins (overused). |
| 2026-04-26 | Lime accent (#C8FF4D) | Signals "live system." Avoids purple gradient AI-slop. Pairs with warm amber for rare secondary highlight. |
