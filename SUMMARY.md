# Occasus Digital — Website

> Official site for **Occasus Digital**, an indie video game studio.

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | [Astro](https://astro.build) v6.3.6 (SSG) |
| Language | TypeScript (strict) |
| Styling | Scoped `<style>` blocks + CSS variables |
| Content | Markdown via Astro Content Collections (blog) |
| i18n | Astro i18n routing + client-side runtime switcher |
| Image | `sharp` via Astro's `Image` component |
| CI/CD | GitHub Actions → GitHub Pages |
| Fonts | Anton (headings), Inter (body) — Google Fonts |
| 3rd party | Ko-fi chat widget |

## Structure

```
src/
  components/     — Navbar, LanguageSwitcher, Seo
  content/        — Blog posts (Markdown)
  data/           — Game definitions
  i18n/           — Translation modules (en, fr, es, de, pt)
  layouts/        — BaseLayout, BlogLayout, GameLayout, PageLayout
  pages/          — Routes (index, about, blog/, games/[slug], + locale copies)
  styles/         — global.css, variables.css
  utils/          — fetchData, formatDate
```

## Locales

- **en** (default), **fr**, **es**, **de**, **pt**
- Every page is duplicated under `src/pages/{locale}/`
- Language preference saved to `localStorage` as `excurse-lang`

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage — hero video rotator, studio intro, games carousel, blog preview, footer |
| `/about` | About page (placeholder) |
| `/games/[slug]` | Game detail — cover, description, screenshots gallery, videos, download links |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post (rendered Markdown) |
| `/api/contact` | Contact form POST endpoint |

## Games

- **Endhell** — FPS / Endless Runner (mobile + PC)
- **Parabellum Rain** — 2D platformer action-RPG
- **Babel Adventure** — Platformer / semi-roguelike (no jumping)
- **Spectra Collab** — Interactive virtual space with imaginary game boxes

## Design

- Dark theme with maroon accent (`#a94141`)
- Scanline background, glassmorphism (backdrop-filter blur)
- Responsive breakpoints: 768px, 480px

## Scripts

```bash
npm run dev       # astro dev
npm run build     # astro build
npm run preview   # astro preview
```

## CI/CD

On push to `main`: build with Node 22 + `npm ci`, deploy `dist/` to GitHub Pages.
