# Components & Animation

## Layout

| Component | Role |
|-----------|------|
| `Header` | Top bar promo, socials, logo, desktop nav + mega dropdowns, search icon, cart badge, mobile menu. |
| `Footer` | About blurb, link columns, newsletter, payment icons, copyright. |
| `Layout` | Wraps children with Header + Footer + floats (WhatsApp, currency pill). On routes other than `/`, renders `VizupVideoWidget` (compact shoppable-video strip with prev/next on the sides). |
| `VizupVideoWidget` | Fixed right-side panel: iframe cycles through 16 Vizup video IDs; **›** / **‹** buttons; minimize to pill; “Open full screen” if embedding is blocked. |
| `WatchAndBuyVideos` | Home “Watch and Buy” section: large 9:16 iframe + same prev/**next-on-right** pattern, dot index, external shop link. |
| `PageTransition` | Framer Motion `AnimatePresence` + `motion.main` for route enter/exit. |

## Home sections

| Component | Animations / hover |
|-----------|-------------------|
| `HeroCarousel` | Auto-advance slides; dots; parallax-style subtle scale on active slide; CTA hover lift. |
| `CategoryCircles` | Circle images scale + shadow on hover; label underline animation. |
| `MarqueeBar` | Infinite horizontal scroll (CSS animation). |
| `vizupVideos.ts` | `VIZUP_VIDEO_IDS` + `vizupVideoUrl()` for `bbnfashion.com/?vizup_wid=11158&vizup_vid=…`. |
| `ProductSection` | Section title fade-in on scroll; “View all” button hover. |
| `ProductCard` | Image zoom, shadow lift, discount/sale badges; stars; price; quick “Add” on hover overlay. |
| `CouplePairsBanner` | Split layout; image subtle ken-burns; button arrow slide. |
| `ReviewsMarquee` | Horizontal scrolling review cards. |
| `BlogTeaser` | Card lift + image zoom on hover. |
| `InstagramRow` | Image zoom + overlay gradient on hover. |
| `SuccessStories` | Card scale on hover. |
| `TrustBadges` | Icon pulse on hover. |

## Global hover patterns

- **Links** — `color` + `translateX` for chevrons.
- **Buttons** — `scale(1.02)`, shadow, background shift.
- **Cards** — `translateY(-4px)`, stronger shadow, inner image `scale(1.06)`.
- **Nav dropdown** — Fade + slide down.

## Accessibility

- Focus-visible outlines on interactive elements.
- `prefers-reduced-motion`: disable or shorten marquee and heavy transitions where applied in CSS.
