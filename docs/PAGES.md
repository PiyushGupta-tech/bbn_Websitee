# Pages & Routes

Base URL: `/` (dev: `http://localhost:5173`).

| Path | Page | Description |
|------|------|-------------|
| `/` | Home | Full landing: hero, categories, marquee, product sections, couple CTA, reviews, blog, social row, testimonials, trust strip, footer widgets. |
| `/collections/:categorySlug` | Category | Grid of products for `sarees`, `lehenga-choli`, `salwar-kameez`, `indo-western`, `new-arrivals`, `jewellery`, `gown-dresses`, `couple-pairs`. |
| `/products/:slug` | Product | Image gallery feel, title, price, Add to cart, related products. |
| `/blogs` | Blog index | Three-column blog cards. |
| `/blogs/:slug` | Blog post | Featured image + article body. |
| `/search` | Search | Query param `?q=` filters products by title. |
| `/cart` | Cart | Line items, subtotal, link to continue shopping. |
| `/pages/about` | About | Brand story. |
| `/pages/contact` | Contact | Form UI (client-side only). |
| `/pages/wholesale` | Wholesale | B2B blurb. |
| `/pages/shipping-policy` | Shipping | Static policy text. |
| `/pages/return-policy` | Returns | Static policy text. |
| `/pages/privacy-policy` | Privacy | Static policy text. |
| `/pages/terms-of-service` | Terms | Static policy text. |
| `/pages/faq` | FAQ | Accordion-style FAQs. |
| `/pages/track-order` | Track order | Placeholder lookup form. |

Static content uses a single dynamic route `pages/:doc` where `doc` is e.g. `about`, `contact`, `shipping-policy` (see `src/data/staticDocs.ts`). Exceptions: `pages/faq` (accordion), `pages/couple-pairs` (banner + products).

## Footer / header links

All footer “Customer Services” and “Quick Links” entries map to the routes above. Header category links go to `/collections/{slug}`.

## 404

Unknown paths show a small “Page not found” with link home.
