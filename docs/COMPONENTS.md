# Components & Animation

## Layout

| Component | Role |
|-----------|------|
| `Header` | Top bar promo, socials, logo, desktop nav + mega dropdowns, search icon, cart badge, mobile menu. |
| `Footer` | About blurb, link columns, newsletter, payment icons, copyright. |
| `Layout` | Wraps children with Header + Footer. |
| `VizupVideoWidget` | Fixed right-side panel: same muted YouTube as Watch & Buy (`watchBuyVideo.ts`); minimize control. |
| `WatchAndBuyVideos` | Home “Watch and Buy”: **3** vertical 9:16 cards; muted autoplay, hidden controls (`watchBuyVideo.ts` + `buildWatchBuyYoutubeEmbedSrc`). |
| `PageTransition` | Framer Motion `AnimatePresence` + `motion.main` for route enter/exit. |

## Home sections

| Component | Animations / hover |
|-----------|-------------------|
| `HeroCarousel` | Auto-advance slides; dots; parallax-style subtle scale on active slide; CTA hover lift. |
| `CategoryCircles` | Circle images scale + shadow on hover; label underline animation. |
| `MarqueeBar` | Infinite horizontal scroll (CSS animation). |
| `watchBuyVideo.ts` | `WATCH_BUY_VIDEOS[]` (homepage Watch & Buy clips), playlist id, `buildWatchBuyYoutubeEmbedSrc` / `watchBuyYoutubeEmbedSrc()` (autoplay, mute, controls=0, loop). |
| `vizupVideos.ts` | Legacy Lavante/Vizup IDs + `vizupIframeSrc()` if you use a same-origin proxy. |
| `ProductSection` | Section title fade-in on scroll; “View all” button hover. |
| `ProductCard` | Image zoom, shadow lift, discount/sale badges; stars; price; quick “Add” on hover overlay. |
| `CouplePairsBanner` | Split layout; image subtle ken-burns; button arrow slide. |
| `ReviewsMarquee` | Horizontal scrolling review cards. |
| `BlogTeaser` | Card lift + image zoom on hover. |
| `SuccessStories` | B2B testimonial cards: gold accent bar, tags, stars, verified badge; lift + shadow on hover; scroll-in animation. |
| `TrustBadges` | Icon pulse on hover. |

## Global hover patterns

- **Links** — `color` + `translateX` for chevrons.
- **Buttons** — `scale(1.02)`, shadow, background shift.
- **Cards** — `translateY(-4px)`, stronger shadow, inner image `scale(1.06)`.
- **Nav dropdown** — Fade + slide down.

## Accessibility

- Focus-visible outlines on interactive elements.
- `prefers-reduced-motion`: disable or shorten marquee and heavy transitions where applied in CSS.
