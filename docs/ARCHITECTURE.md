# Architecture

## High-level

```
Browser
  └── React SPA (Vite)
        ├── React Router (URL → Page component)
        ├── Framer Motion (layout + scroll + hover orchestration)
        ├── React Context (cart state + persistence)
        └── Static JSON-like modules in src/data/*.ts
```

## Directory layout

```
lavanya/
├── public/                 # Static files served as-is
│   └── images/             # Optional local product/hero images
├── docs/                   # This documentation
├── src/
│   ├── main.tsx            # Entry + BrowserRouter
│   ├── App.tsx             # Routes + layout shell
│   ├── index.css           # CSS variables, resets, utilities
│   ├── data/               # Products, categories, blog posts, nav
│   ├── context/            # CartContext
│   ├── components/         # Layout + sections + UI primitives
│   ├── pages/              # Route-level views
│   └── styles/             # Optional module CSS (if split later)
├── index.html
├── vite.config.ts
├── package.json
└── README.md
```

## Data model

- **Products** — `id`, `slug`, `title`, `categoryId`, `price`, `compareAtPrice`, `discountPercent`, `image`, `rating`, `reviewCount`, optional `description`.
- **Categories** — `id`, `slug`, `name`, `heroImage`, `description`.
- **Blog posts** — `slug`, `title`, `excerpt`, `image`, `body` (HTML string or paragraphs).

All data is **in-memory TypeScript** for the demo; swapping to a headless CMS or API is a matter of replacing fetch calls in page loaders or `useEffect`.

## Styling

- **Design tokens** in `:root` (`--color-bg`, `--font-sans`, `--radius`, etc.).
- **BEM-like** class names where helpful; mostly semantic sections.
- **Responsive** — Mobile-first breakpoints at 768px and 1024px.
- **Hover / focus** — Visible focus rings for accessibility; hover states on cards, nav, buttons.

## State

- **Cart** — `CartContext`: items `{ productId, qty }`, persisted to `localStorage` key `bbn-cart-v1`.

## Build output

Vite emits static assets to `dist/` — deployable to Netlify, Vercel, GitHub Pages (with `base` if needed), or any static host.
