# Portfolio — Akshith Kumar Y V

A static, no-build portfolio site. Three files, zero dependencies, deploy-ready.

```
index.html      — markup
styles.css      — design system + components
script.js       — clock, theme toggle, count-ups, command palette
DESIGN.md       — design system source of truth (read me before changing visuals)
```

## Run locally

```bash
python3 -m http.server 4173
# open http://127.0.0.1:4173/
```

Or just double-click `index.html` — it works as a `file://` page too (though
Cmd+K and a few features need an HTTP origin).

## Deploy

The site is plain static HTML/CSS/JS. Drag-drop into:

- **Netlify** — drop the folder onto `app.netlify.com/drop`
- **Vercel** — `npx vercel --prod`
- **GitHub Pages** — push to a repo, enable Pages on `main` branch
- **Cloudflare Pages** — connect the repo, build command empty, output dir `.`

For your existing `akshithyv.netlify.app`: in the Netlify dashboard, set this
folder as the deploy root or drop it directly.

## Design system

Always read [DESIGN.md](DESIGN.md) before changing any visual.
Type, color, spacing, motion, and component conventions are defined there.
The dark theme is the brand default; light is an opt-in toggle.

## Edit checklist

| To change | Edit |
|---|---|
| Copy / projects / wording | `index.html` |
| Colors / type / spacing | `styles.css` (`:root` tokens) + `DESIGN.md` |
| Theme behavior, clock, command palette | `script.js` |

## Notable interactions

- **Cmd+K (or `/`)** — command palette: jump to sections, copy contact, toggle theme, save as PDF
- **Theme toggle (top right)** — dark ↔ light, saved to localStorage
- **Cursor-tracked grid** — hero background gridlines reveal under the cursor
- **Count-up KPIs** — KPI numbers animate when scrolled into view
- **`prefers-reduced-motion`** — all motion is dropped to instant for users who request it
- **Print** — sticky chrome is stripped; you get a clean printable / PDF resume page

## Browser support

Built for evergreens (Chrome/Edge/Firefox/Safari current). Uses CSS variables,
`color-mix()`, `clamp()`, `@container`-free grid. No polyfills.
