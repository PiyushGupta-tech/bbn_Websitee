# bbn — Ethnic wear storefront (demo)

A front-end demo for **bbn** — Indian ethnic wear e‑commerce. Includes animated UI, hover interactions, product grids, blog, category pages, and a working client-side cart. **Watch & Buy** uses a muted YouTube embed on the home section and floating widget.

> **Note:** This is a **demo / learning project**. Product images use royalty-free stock photos (Unsplash) as stand-ins. Replace URLs in `src/data/` with your own assets for production.

## Features

- **Homepage** — Hero carousel, circular category nav, promo marquee, New Arrivals, Sarees / Lehenga / Salwar / Indo-Western sections, Couple Pairs CTA, reviews, blog teaser, Instagram-style row, success stories, trust badges, footer.
- **Working navigation** — Mega-menu style header, mobile drawer, footer links.
- **Pages** — Category listings, product detail, blog list & post, About, Contact, policies (Shipping, Returns, Privacy, Terms, FAQ), Wholesale, Track Order, Search.
- **Cart** — Add to cart, quantity, localStorage persistence, cart page.
- **Watch & Buy** — Homepage shows **three** vertical shoppable cards + fixed widget; **YouTube** embeds are **muted autoplay**, `controls=0`, same playlist (`src/data/watchBuyVideo.ts`). Optional: `src/data/vizupVideos.ts` remains for legacy Lavante/Vizup iframe URLs if you proxy them yourself.
- **Motion** — Page transitions, scroll reveals, hover zoom on cards, button/link micro-interactions (see `docs/COMPONENTS.md`).

### Vizup embed on your own domain (production)

Plain static hosting cannot load the external shoppable video source in an iframe without a proxy. You need a **reverse proxy** on the **same origin** as your app, stripping frame headers — same idea as Vite’s `/lavante-vizup` route.

Example **nginx** (adjust server name):

```nginx
location /lavante-vizup/ {
  proxy_pass https://lavantefashion.com/;
  proxy_ssl_server_name on;
  proxy_set_header Host lavantefashion.com;
  proxy_hide_header X-Frame-Options;
  proxy_hide_header Content-Security-Policy;
  proxy_hide_header Content-Security-Policy-Report-Only;
  rewrite ^/lavante-vizup/(.*)$ /$1 break;
}
```

Or set **`VITE_VIZUP_IFRAME_BASE`** at build time to your proxy URL (must end without trailing slash before `?vizup_wid=...`).

## Tech Stack

| Layer    | Choice        |
|----------|---------------|
| Build    | Vite 6        |
| UI       | React 19 + TypeScript |
| Routing  | React Router 7 |
| Motion   | Framer Motion |

## Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:5173**

```bash
npm run build   # production build
npm run preview # preview build
```

### Hosting: footer & deep links

Footer links use **client-side routing** (`/pages/…`, `/search`, `/blogs`, etc.). On **Netlify**, `public/_redirects` is copied into `dist/` so refreshing or opening a deep URL still loads the app. On **Vercel**, `vercel.json` does the same. For **Apache**, add `FallbackResource /index.html` or equivalent; for **GitHub Pages**, use a 404.html SPA workaround or host elsewhere.

## Project Docs

| Doc | Purpose |
|-----|---------|
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Folders, data flow, styling approach |
| [docs/PAGES.md](./docs/PAGES.md) | Route map and page responsibilities |
| [docs/COMPONENTS.md](./docs/COMPONENTS.md) | Reusable components and animation patterns |
| [docs/CONSOLE_NOISE.md](./docs/CONSOLE_NOISE.md) | DevTools tip, CSP report-only, YouTube extension errors (what to ignore) |

## Using Your Own Screenshots

1. Copy images into `public/images/`.
2. Update `src/data/products.ts` (or category files) `image` fields to `/images/your-file.jpg`.

## License

Demo project. Use your own branding and assets for production.
