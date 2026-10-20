# BRIEF v2 — Chiang Rai Coffee, "Kuro-style" rebuild (demo)

Demo/experiment only: there is no real café. No fake reviews, testimonials, ratings, customer counts or invented stats. Keep all placeholders ("[Your Café Name]", sample prices, map placeholder) and the "[Your Café Name]" auto-replace script behaviour.

Inspiration: https://kuro-coffee-template.modulify.website/ (commercial template). Recreate the *feel and structure* only with **original code** — do not copy its HTML, CSS, JS, text, SVGs or images.

## Tech
Plain static HTML/CSS/JS, no frameworks, no build step. Files: `index.html`, `assets/css/style.css`, `assets/js/main.js`. Keep `.nojekyll`, `SOURCES.md`, `reference/` (don't link it). Relative paths only (site is served from a subpath on GitHub Pages).

## Content (verbatim)
All visible text comes from the current `index.html` / `reference/old-index.html`: title, meta, nav, hero, highlights, Origin (Doi Chaang, Doi Tung, Wawee, hill-tribe farms, every "Sources:" link), Menu (all 10 drinks, descriptions, hot/iced prices, "Sample" note, หวานน้อย / ไม่หวาน), About, Visit (hours, address, contact, map placeholder), footer incl. the "Images are illustrative (AI-generated)" note. The highlights strip keeps only the existing factual items (altitudes, hot & iced) — nothing invented.
Images: only `assets/img/*.webp` with the existing alt text. No new images.

## Look
- Dark espresso-and-cream editorial look. Palette: espresso `#120B08` (dark sections bg), deep brown `#1E130D`/`#2A1C14` (cards), cream `#F3EBE0` (light sections bg / text on dark), warm cream `#F6EEE3`, caramel accent `#D9A066` (eyebrows, buttons, hover), muted text = cream at ~60% opacity.
- Sections alternate dark / cream.
- Fonts (Google Fonts, OFL): **Fraunces** for headings (medium weight, slight negative letter-spacing, `clamp(2.25rem,5vw,3.75rem)` for h2, much larger for hero h1), **Manrope** for body, **Geist Mono** (or JetBrains Mono) for small uppercase eyebrows/labels (≈0.7rem, letter-spacing .18em), plus Noto Sans Thai fallback for Thai words.
- Spacing: sections `py` ≈ 6rem mobile / 8rem desktop, max content width ~80rem, rounded corners ~1.25rem on cards/images/nav.

## Structure (order)
1. **Floating nav**: fixed pill bar, inset from the edges (12px), rounded, semi-transparent dark with blur and thin cream/10 border; logo left, links centre, "Visit us" button right (caramel). Mobile: hamburger opening a full-screen dark menu. Hides on scroll down, shows on scroll up.
2. **Hero**: full-viewport, hero-hills image with dark gradient overlay, huge centred Fraunces headline, small mono eyebrow, short intro, two buttons, animated "scroll" cue at the bottom.
3. **Marquee strip**: infinitely scrolling line of drink names from the menu (CSS animation, pauses on hover, respects reduced motion).
4. **Story/About** (cream bg): eyebrow + big headline, two-column text + image (cafe.webp), highlights shown as 2–3 large figure items using only the existing facts.
5. **Menu** (dark): eyebrow + headline, responsive grid of cards (1/2/3 cols): drink name in Fraunces, description, hot/iced prices in mono, subtle hover lift; sweetness note with Thai words and "Sample" note under the grid.
6. **Origin** (cream then dark): region blocks as large alternating image/text rows (plantation, farmworkers, hot-cup, espresso), big region names, "Sources:" links kept.
7. **Visit** (dark): rounded large card with hours, address, contact, map placeholder, CTA.
8. **Footer** (espresso): logo, small uppercase column headings (Explore / Visit), links, illustrative-images note, copyright with current year via JS.

## Motion
Scroll reveals (fade-up / fade / zoom with small staggered delays) via IntersectionObserver; marquee; gentle float on hero image; hover transitions ~300ms ease-out. Everything disabled under `prefers-reduced-motion`.

## Quality
Responsive 360px → 1440px with no horizontal scroll; semantic landmarks, alt text, visible focus styles, skip link; no console errors; all anchor links resolve.

## Fix list
