# Occasus Digital — Website

Official site for **Occasus Digital**, an indie video game studio. Live at <https://occasus-digital.com>.

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + React Router v8 (framework mode, `ssr: false` + full pre-rendering) |
| Build | Vite 8, TypeScript (strict) |
| Styling | CSS Modules + design tokens in `app/styles/global.css` |
| Motion | `motion` (scroll reveals), CSS transitions |
| Content | Markdown blog posts in `content/blog`, parsed at build time (gray-matter + marked) |
| i18n | URL-prefixed locales (`/fr`, `/es`, `/de`, `/pt`; English unprefixed) |
| Hosting | GitHub Pages via GitHub Actions |

## Scripts

```bash
npm run dev        # dev server
npm run build      # pre-render every page × locale into build/client, + sitemap & 404.html
npm run preview    # serve build/client locally
npm run typecheck
node scripts/optimize-images.ts   # regenerate app/assets/img/*.webp from app/assets/images
```

## Structure

```
app/
  root.tsx              html shell, nav, footer, Ko-fi widget, error/404 boundary
  routes.ts             route table (`:lang?` prefix wraps every page)
  routes/               home, about, game, blog-index, blog-post, not-found
  components/           Nav, Footer, LanguageSwitcher, VideoReel, GameCard, PostList, Lightbox, …
  data/games.ts         game catalogue (images, videos, store links, accent colour)
  data/team.ts          team members
  i18n/translations.ts  all UI strings for en/fr/es/de/pt (type-checked for missing keys)
  lib/                  SEO meta, build-time content loader, prerender path list
  assets/images/        source artwork (full size)   → assets/img/ (optimized WebP, what ships)
content/blog/*.md       blog posts (frontmatter: title, description, pubDate, updatedDate?, heroImage?, tags[])
public/                 videos, blog thumbnails, favicons, robots.txt
scripts/                sitemap/404 post-build step, image optimizer
```

## Common tasks

- **New blog post:** add `content/blog/<slug>.md`. It's picked up by the build in every locale.
- **New game:** add it to `app/data/games.ts` and to `GAME_SLUGS` in `app/lib/paths.ts`, add `gameInfo.<slug>.*` and `game.<slug>.*` strings for each locale, drop its art into `app/assets/images/*`, then run the image optimizer.
- **New UI string:** add the key to every locale in `app/i18n/translations.ts` (TypeScript fails if one is missing) and use `t("key")`.

## Deploy

Pushing to `main` builds with Node 22 and deploys `build/client` to GitHub Pages. `404.html` is the SPA fallback, so unknown URLs render the in-app 404 page.
