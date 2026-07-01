# Design System — Akshith Kumar Y V Portfolio

## Product Context
- **What this is:** Freelance portfolio for an AI & automation consultant (Technical BA / PM background) who builds AI agents, n8n workflows, data pipelines, and the specs behind them.
- **Who it's for:** Founders and teams who need a process automated or an AI agent built right; recruiters/clients scanning for BA + AI fluency.
- **Positioning:** "I write the spec and I ship the system." Freelance AI/automation consultant, available for engagements.

## Aesthetic Direction
- **Direction:** "Build Log" — Neo-brutalist × Terminal.
- **Mood:** Engineer-built, opinionated, high-contrast. Reads like an operator's terminal, not a marketing page.
- **Decoration level:** Structural. Borders, hard offset shadows, and mono labels do the work — no gradients, no decorative noise, no soft blur.
- **Risks taken (deliberate):**
  1. Uppercase Space Grotesk display + heavy mono structure. Bold, memorable, not the usual portfolio serif.
  2. Hard 2px borders with solid offset shadows (`6px 6px 0`) that shift on hover — the brutalist signature.
  3. Lime signal accent on near-black; deep green on paper for the light toggle.

## Typography
- **Display:** Space Grotesk (Google Fonts) `400/500/700` — uppercase, tight tracking, used for hero, section titles, card titles.
- **Body:** Geist Sans `400/500/600`.
- **Data/UI/Meta:** Geist Mono `400/500` — labels, KPIs, nav, pills, status strip, command palette.
- **Loading:** `preconnect` + `display=swap` from Google Fonts.
- **Fluid scale:** `--fs-hero` clamp(2.75rem→7.5rem), `--fs-d1`, `--fs-d2`, plus fixed body/meta/micro. See `:root` in styles.css.

## Color
- **Approach:** One signal accent (lime), one rare warm accent (amber). High-contrast borders via `--edge`.
- **Dark (default):** `--bg #0A0A0A`, `--panel #141416`, `--ink #F4F4EF`, `--ink-dim #9C9C95`, `--line #262628`, `--line-strong #37373A`, `--edge #F4F4EF`, `--accent #C8FF4D` (lime), `--warm #FF8A4C`.
- **Light (toggle, warm paper):** `--bg #F3F1E9`, `--panel #FBFAF5`, `--ink #0C0C0D`, `--edge #0C0C0D`, `--accent #1F5C1F` (deep green — lime is illegible on cream), `--warm #B4531A`.
- **Contrast:** Text/bg pairings meet AA+. Accent used decoratively for borders/dots and as button fill (with `--accent-ink` for legible text on lime/green).

## Spacing & Layout
- **Base:** 4px. Scale `--sp-1`…`--sp-10` (4→128).
- **Max width:** 1240px. Gutter `clamp(16px, 4vw, 40px)`.
- **Geometry:** No border radius (brutalist). Structural border weight `--bw: 2px`. Hard offset shadows, never blurred.
- **Background:** Faint 64px grid with a top-down vignette (`body::before`) so it fades at the edges.

## Motion
- **Approach:** Intentional. Hero line reveal (translate + blur → sharp), blinking terminal cursor, cursor-tracked lime hero grid (radial mask), KPI count-ups on scroll, card hover = translate + hard shadow.
- **Easing:** `--ease` cubic-bezier(0.16,1,0.3,1). Durations 90/200/420/720ms.
- **Reduced motion:** All animations honor `prefers-reduced-motion` — reveals show instantly, cursor/dot animations off.

## Key Components
- **Button:** solid block, 2px `--edge` border, `6px 6px 0` shadow; hover translates `-3px,-3px` and grows the shadow; active presses in.
- **Pill / tag:** bordered rectangle, mono micro-caps. Variants LIVE (lime), WON/OPEN (amber), SHIPPED (muted).
- **Service card:** 2×2 bordered grid, `S/0x` mono index, uppercase title, tag row.
- **Case card:** bordered panel, status pill + year, uppercase display title, KPI row (mono), stack tags; hover lifts with a lime hard shadow.
- **Worklog:** compact 3-col bordered grid for the "More Automations Shipped" set (no fabricated KPIs).
- **Cap table / CV / case pages:** all share the bordered-panel + mono-label system.
- **Command palette:** ⌘K / `/`, bordered modal, lime prompt, keyboard nav.
- **Status strip:** pinned bottom bar — AVAILABLE FOR FREELANCE + location + UTC + live IST clock.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-26 | Initial "Operator's Console" system (dark editorial serif + mono). | First build. |
| 2026-07-01 | Redesigned to "Build Log" neo-brutalist terminal; reframed as freelance AI/automation consultant. | Client wanted a proper freelancer portfolio and a distinctive new design. Added Services section + worklog of shipped automations. |
| 2026-07-01 | Space Grotesk display replaces Fraunces; kept Geist + Geist Mono. | Grotesk uppercase suits the brutalist/terminal POV; serif read too editorial. |
| 2026-07-01 | Hard borders + offset shadows, zero radius, lime-on-black / green-on-paper. | Commit to the brutalist POV; avoid template smell and AI-slop gradients. |
