# Portfolio — Akshith Kumar Y V

Live: **https://akshith-2002.github.io/Resume/**

A static, no-build portfolio site. Hand-tuned, zero dependencies, deploy-ready.

## Files

```
index.html              — freelance portfolio (hero, services, work, worklog, process, stack, contact)
case-hackation.html     — HackAtion 2025 (AI Agents winner)
case-rayna.html         — Rayna Tours marketing/ops automation
case-stackd.html        — StackD Smart Vending (AI + IoT)
case-blive.html         — BLive EZY EV fleet
case-opencredits.html   — Open Credits AI-assisted EdTech
cv.html                 — printable resume (Cmd+P → save PDF)
styles.css              — "Build Log" design system + components
script.js               — clock, theme, count-ups, command palette
favicon.svg             — mark
DESIGN.md               — design system source of truth
```

## Design

Neo-brutalist "Build Log" terminal aesthetic: Space Grotesk display + Geist / Geist
Mono, hard 2px borders with solid offset shadows, lime signal accent on near-black
(deep green on the paper-toned light toggle). Framed as a freelance AI &
automation consultant. See [DESIGN.md](DESIGN.md).

## Run locally

```bash
python3 -m http.server 4173
# open http://127.0.0.1:4173/
```

## Deploy

The site auto-deploys via GitHub Pages on push to `main`. The Pages build
serves the repo root, so any push refreshes the live site within ~1 minute.

For other hosts (Netlify, Vercel, Cloudflare Pages): point the deploy at the
repo root with no build command — it's plain static.

## Design system

Always read [DESIGN.md](DESIGN.md) before changing any visual.
Type, color, spacing, motion, and component conventions are defined there.
The dark theme is the brand default; light is an opt-in toggle.

## Edit checklist

| To change | Edit |
|---|---|
| Copy / projects / wording on home | `index.html` |
| A specific case study | `case-<name>.html` |
| Resume content | `cv.html` |
| Colors / type / spacing | `styles.css` (`:root` tokens) + `DESIGN.md` |
| Theme behavior, clock, command palette | `script.js` |

## Notable interactions

- **Cmd+K (or `/`)** — command palette: jump to any section, jump to any case study, open CV, copy contact, toggle theme, save as PDF.
- **Cursor-tracked grid** — hero gridlines reveal under the cursor (radial mask).
- **Count-up KPIs** — KPI numbers animate when scrolled into view (`9`, `30%`, `4,000/day`, etc.).
- **Live IST clock** — ticks in topbar and footer status strip.
- **Theme toggle** — dark ↔ light, saved to localStorage. Dark is the brand default.
- **`prefers-reduced-motion`** — all motion drops to instant for users who request it.
- **Print stylesheet** — strips chrome on `cv.html` for a clean A4-ish PDF.

## Browser support

Built for evergreens (Chrome / Edge / Firefox / Safari current).
Uses CSS variables, `color-mix()`, `clamp()`, `prefers-color-scheme`.
No polyfills, no JS framework, no bundler.
