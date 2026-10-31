# The Aman Life — HTML, CSS, JavaScript & Bootstrap

## What is included

This ZIP contains an independently rebuilt **static multi-page reference recreation** of https://theamanlife1.netlify.app/ . It recreates the main visual direction and interactive concepts observed on the public site, with a dark cinematic aesthetic, floating portraits, responsive layouts, scroll-reveal effects, a 3D-style portrait orbit, an animated starfield and functional navigation.

**This is not an extracted copy of the site's original source code. A pixel-perfect/100%-identical recreation cannot be verified without the original source and a full design/animation specification.**

### Technology
- HTML5 — eight independent pages
- CSS3 — original responsive design and animations
- Bootstrap 5.3.6 — bundled locally in `assets/vendor/`
- Vanilla JavaScript — menu, orbit, starfield, scroll effects, company search/filter and forms
- No React, Node, build commands, API keys, package installs or database

### Pages
- `index.html` — homepage, about, portrait journey, creative work, companies, collaboration
- `companies.html` — searchable and filterable directory
- `work.html` — creative work and portrait orbit
- `art.html` — Art & AI
- `music.html` — Music & Stories
- `invest.html` — investment interests
- `collaborate.html` — contact enquiry form
- `achievements.html` — milestones coming soon

### How to run
1. Extract the ZIP.
2. Double-click **index.html** in Chrome, Edge or Firefox.
3. Browse the pages using the top navigation.
4. For a local test server, run `python -m http.server 8000` in this folder and open `http://localhost:8000/`.

### Deploy to Netlify
Upload the extracted folder (not the enclosing ZIP) to Netlify Drop. The `_redirects` file handles clean URLs such as `/companies` and `/collaborate`.

## Important: original portraits and offline viewing
The site uses the six **original public portrait image URLs** from the reference website (`https://theamanlife1.netlify.app/assets/images/`). The code does not replace their content or alter their images. The image files could not be downloaded into the ZIP in this environment; **an internet connection is required to display them**. When offline, gradient backgrounds remain visible.

For a fully offline version, obtain the original image files with permission, place them in `assets/images/` and change the `const R` path near the top of `assets/js/site.js` to `./assets/images/`. Expected filenames are recorded in `IMAGE-SOURCES.md`. Fonts are requested from Google Fonts with built-in system font fallbacks.

Do not assume that hotlinking from a third-party website will remain available indefinitely.

## Contact forms
The collaboration and music forms are **frontend demos**. They open an email draft addressed to `contact@pinnacleelitecorp.com` through the visitor's local mail application; **nothing is sent automatically or stored in a database**. To receive messages through a web backend, integrate a form endpoint yourself.

## Company directory
The five entries in the directory are a starting set of publicly linked brands. The complete source site's backend or private company records were not accessible and have not been invented. Edit the `companiesData` array in `assets/js/site.js` to manage the directory.

## Footer
Includes clickable links to Absolute Advancement 100X Tech, CreatorMoves365.ai, CreatorMoves365.com and Peak Divine Productions, matching the footer partner design requested in the earlier website brief.

## Files
```
index.html
companies.html
work.html
art.html
music.html
invest.html
collaborate.html
achievements.html
_redirects
assets/
  css/style.css
  js/site.js
  vendor/bootstrap.min.css
  vendor/bootstrap.bundle.min.js
  favicon.svg
```

## Accessibility & performance
- Responsive at mobile, tablet and desktop widths
- Keyboard-visible focus states
- `prefers-reduced-motion` respected
- `IntersectionObserver` handles section reveals
- Stars pause when the tab is hidden
- Forms use required fields and clear mailto disclaimers

Bootstrap: © Bootstrap Authors, licensed under the MIT License. See `THIRD-PARTY-NOTICES.md`.
