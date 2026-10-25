# House of Flavors — v3 redesign

A restaurant site and online store in plain **HTML, CSS and JavaScript** (no Bootstrap, no jQuery). The redesign keeps the original identity — teal-black rooms, neon green, the green→magenta gradient, Eagle Lake headings and the HOF chef-hat logo — and rebuilds every page and feature.

## Pages
| Page | What it does |
|---|---|
| `index.html` | Video hero, pinned **story-scroll** (Fire → Hands → Plate → Table), horizontal "seven kitchens" scroll, signature dishes with hover preview, first-order coupon, rooms, reviews |
| `menu.html` | 70 dishes in 8 sections, sticky category bar that follows the scroll, search, filters (spicy, veg, to share, under R80), sort |
| `dish.html#<id>` | Product page: quantity, add to order, pairings, reviews, more from the station |
| `about.html` | Pinned timeline story-scroll (2013 → 2026), houses, chefs, values, job / community forms with validation |
| `events.html` | Next event, filters (upcoming, new, seasonal, past), ticket dialog that adds tickets to the order, free RSVP |
| `cart.html` | Checkout: delivery or collection, delivery speeds, coupons (`YLJF37S05`, `HOUSE10`, `FREEDEL`), 15% VAT, order reference. `#book` tab: table booking with live time slots |

The cart lives in `localStorage`, so it follows the visitor across pages.

## Media
All photos are WebP in two sizes (`name.webp` 1600 px, `name-sm.webp` 720 px) used through `srcset`. The hero video is WebM (VP9) with an H.264 MP4 fallback for older Safari, plus a WebP poster.

## Structure
```
assets/css/system.css   tokens and components (the design system)
assets/css/pages.css    page compositions
assets/js/data.js       menu, events, coupons, delivery options
assets/js/core.js       shell (nav, cart drawer, footer), cart store, scroll scenes
assets/js/*.js          one script per page
```
Open `index.html` in a browser, or serve the folder with any static server.

Designed and built by Francisco Lourenço do Ó da Silva · OS.Design
