# The Aman Life

Premium charcoal and gold UI with original reference portraits, responsive layouts and accessible motion. The existing HTML, CSS, Bootstrap and vanilla JavaScript stack is preserved. No production JavaScript framework or server runtime is required.

## Open the finished website

Open **dist/index.html** in your browser. This folder contains the complete, pre-rendered website and local images. Navigation works when opened directly from disk. Google Fonts use system fallbacks when offline.

For a local HTTP preview, run in this project directory:

```sh
npm ci
npm run build
npm run dev
```

Then open http://localhost:8000. The preview serves `dist/` when available; rebuild after editing source files. Press Ctrl+C to stop it. Node.js 20 or later is recommended for the development scripts.

## UI and motion

- Nine pages: Home, Creative Work, Tech Launch, Companies, Invest, Collaborate, Art, Music and Achievements.
- Editorial typography, warm gold accents, framed portrait composition and subtle grain.
- Hero entrance, nine-image 3D scroll carousel, scroll reveals, card hover effects, moving orbit gallery and keyboard-accessible portrait viewer.
- Sticky navigation, active links, mobile drawer with focus wrapping, Escape dismissal and focus restoration.
- Eleven companies and platforms, combined category/search filters and empty-state reset.
- Four live tech platforms and two explicitly planned launches.
- Eleven expandable venture sections with mission, upcoming plans and unpublished financial fields.
- Reduced-motion support, descriptive labels, visible focus indicators and lazy-loaded media.
- Page metadata, social tags, sitemap, robots.txt and a custom 404 page.

## Forms and backend scope

This update covers the UI and animation request. Collaboration and release-update forms validate fields and compose an email in the visitor's email application. The visitor must review and send the draft. **There is no database, newsletter service, automated email delivery, authentication or admin CMS.** No submission is represented as saved or sent.

## Cinematic opening and motion upgrade

The animation layer preserves the existing theme, images, layout, page text, links, directory and forms. GSAP 3.15.0 and ScrollTrigger are served locally, without a CDN dependency.

- First homepage visit in a tab: black screen, gold beam, staggered metallic title, shimmer, decorative progress sweep, tagline and vertical curtain reveal. Normal timing is approximately 2.75 seconds. No percentage claims are displayed.
- Critical boot code runs in the head before body paint. A 4.2-second watchdog exposes the content even if the animation engine fails to load; readiness waits for the hero image and fonts are capped at 1.5 seconds. Internal visits use session storage and a same-origin referrer fallback to avoid replaying the full intro.
- Hero words rise through a mask with blur-to-clear motion, followed by text, individual buttons and a subtle portrait zoom-out. Other headings, paragraphs, card groups and selected images animate when entering the viewport.
- Fine mouse pointers get bounded magnetic button motion and a small portrait parallax. Touch interactions retain their existing behavior.
- Internal links fade out for 180ms before navigating. Modifier clicks, external targets, downloads, hash links, forms and mail links retain normal browser behavior.
- Reduced motion skips the loader and split-text animation. A live preference change reverts animation styles and text wrappers. Tab, Escape or a pointer press skips an active intro. Pagehide clears timelines, triggers, timers, observers and delegated motion listeners; Back/Forward restoration restores visible content and never replays the full loader.

Animation sources: `assets/js/intro-boot.js`, `assets/js/motion.js`, `assets/css/motion.css`. Shared early markup and critical CSS: `scripts/motion-markup.mjs`. Only the added loader uses its own cinematic typography; existing page typography stays intact.

The latest UI refinement is in `assets/css/polish.css`: floating glass navigation, clearer type hierarchy, larger body text, deeper card surfaces, consistent rounded panels, more comfortable form controls and scrollable portrait thumbnails with larger hit areas. Gold hero words now reveal individual letters; section accents draw on entry, cards enter individually in the viewport, and mouse entry gives card titles a short word stagger. The directory applies the same title treatment after filtering and removes obsolete animation triggers. Existing content, image assets and page functions are preserved. The visual refinement stylesheet loads between the base design and motion styles.

## Edit and verify

Shared templates, content and interactions: `assets/js/site.js`.
Design and responsive breakpoints: `assets/css/style.css`.
Metadata: `scripts/page-meta.mjs`.

```sh
npm run check
npm run build
```

The checks cover page rendering, local links/media, IDs, headings, field labels, company filtering, reset, menu state, portrait switching, gallery navigation, form handlers and stylesheet syntax. The hero orbit checks verify scroll pin configuration, a full 360-degree turn, reverse progress, scroll-linked controls, resize handling, reduced motion, failure fallback and lifecycle cleanup. Build produces meaningful HTML for all nine pages, including the directory, so content remains available without JavaScript.

The homepage carousel uses GSAP ScrollTrigger with `pin: true`, `start: 'top top'` and `scrub: true`. The hero stays in place from the first scroll, including on tall layouts. Native scroll progress controls one complete turn across 1,800–3,000 pixels, depending on viewport height; only then does the pin release and the next section scroll into view. Previous/next and restart controls seek the page scroll position. Reduced motion and missing animation libraries leave normal scrolling and manual image selection available. The larger gold-framed portraits are styled in `assets/css/hero-orbit.css`; there is no timed carousel autoplay or bottom thumbnail strip.

Verification includes DOM/content/interaction checks, loader orchestration checks and the static build. Motion checks exercise first/repeat visits, unavailable engines, blocked storage, hung fonts/images, watchdog expiry, reduced motion, keyboard skip, history restoration, original text preservation and navigation behavior. The motion tests use a deterministic GSAP adapter; they do not simulate rendered frames. Browser automation could not initialize in the development environment (`Cannot redefine property: process`); visual desktop/mobile rendering, native focus behavior and browser form validation still need a manual browser review. DOM checks do not establish visual responsiveness or Lighthouse scores.

Manual motion QA: open a fresh tab at the homepage, observe the beam/title/shimmer/curtain sequence, and navigate to all nine pages. Verify 320px, 375px, 768px and desktop widths; keyboard navigation; filters and reset; portrait selection and viewer; email forms; Back/Forward; reduced-motion settings; and refresh with GSAP, fonts or the hero image blocked. To deliberately replay the full intro during development, clear the `aman-cinematic-intro-v1` session storage entry and open the homepage directly in a fresh tab.

## Deploy

Upload **the contents of `dist/`** to a static host. For Netlify, use `npm run build` as the build command and `dist` as the publish directory. `_redirects` includes the nine-page site's clean URLs. On other hosts, configure extensionless routes to serve the corresponding `.html` files and serve `404.html` for missing paths.

Canonical and sitemap URLs use `https://theamanlife.com/`. If deploying under another production domain, update `scripts/page-meta.mjs`, `sitemap.xml` and `robots.txt`, then rebuild. No hosting or deployment was performed as part of this local workspace update.

## Content and media

Reference: [theamanlife.com](https://theamanlife.com/), with all nine public routes inspected on 2 November 2026. Company descriptions, product states and venture plans follow the reference and supplied brief. No awards, investment totals, profit figures or release dates have been invented.

Original public reference images are stored locally; provenance is in `IMAGE-SOURCES.md`. These are existing creative brand portraits, not new images generated by this project. The company directory uses text initials where a logo is not supplied.

Bootstrap licensing is recorded in `THIRD-PARTY-NOTICES.md`. LinkeDOM and PostCSS are development-only dependencies used for rendering and verification; visitors do not download them.
