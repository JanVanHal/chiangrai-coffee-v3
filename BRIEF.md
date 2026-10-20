# BRIEF v3 — Chiang Rai Coffee, "Blitz-style" rebuild (demo)

Demo/experiment only: there is no real café. This version tests a **generic modern business** look that could later suit any small business.

## Example / design reference
https://blitz-template.modulify.website/ (Modulify "Blitz", commercial template). Recreate the *feel and structure* only with **original code** — do not copy its HTML, CSS, JS, text, SVGs, logos or images.

Observed Blitz traits to reproduce:
- Warm off-white base `#F5F0E6`, secondary sand `#E7DECD`, borders `#D7D2C8`, near-black `#171717`/`#0A0A0A` dark sections, single hot accent coral `#FF6545` (darker `#A3311B` for text on light for contrast).
- Typography: **Archivo** (heavy, tight, uppercase-ish huge display headlines), **Inter** body, **IBM Plex Mono** small uppercase labels with index numbers like `/ 01`, `01`, `02`.
- Fixed top nav: wordmark left, links with numbered labels (Work 01 …), "Let's talk"-style CTA button; buttons with doubled-text roll-over hover (text slides up and is replaced by a copy). Mobile: full-screen menu with big numbered links.
- Hero: massive display headline, short intro, two buttons, a stacked tag list (e.g. "Origin / 001", "Menu / 002"), "Scroll" cue.
- Infinite marquee strip of words.
- Big-stat row with count-up animation (`data-count`) — **only real facts from v2** (e.g. altitudes, number of drinks on the menu = 10). No invented figures.
- Numbered services list (01–06 rows with title + text, hairline dividers, hover accent) → use for the menu.
- "Selected work" style large image cards with category label → use for the origin regions.
- Motion: clip-up / line-up headline reveals, fade-up, draw-x hairlines, image parallax/settle, marquee. All off under `prefers-reduced-motion`.
- Big dark footer/CTA with huge wordmark.

## Tech
Plain static HTML/CSS/JS, no frameworks, no build step. Files: `index.html`, `assets/css/style.css`, `assets/js/main.js`. Keep `.nojekyll`, `SOURCES.md`, `reference/` (don't link it). Relative paths only (served from `/chiangrai-coffee-v3/` on GitHub Pages). Google Fonts (OFL) Archivo, Inter, IBM Plex Mono, Noto Sans Thai fallback.

## Content (verbatim from v2)
All visible text comes from `reference/v2-index.html`: title, meta, nav, hero, highlights, Origin (Doi Chaang, Doi Tung, Wawee, hill-tribe farms, every "Sources:" link), Menu (all 10 drinks, descriptions, hot/iced prices, "Sample" note, หวานน้อย / ไม่หวาน), About, Visit (hours, address, contact, map placeholder), footer incl. "Images are illustrative (AI-generated)". Keep all placeholders ("[Your Café Name]", sample prices, map placeholder) and the "[Your Café Name]" auto-replace behaviour if present.
Images: only `assets/img/*.webp` with existing alt text. No new images.

## Structure (order)
1. Nav (as above, links: Story 01, Menu 02, Origin 03, Visit 04, CTA "Get in touch" → #contact).
2. Hero. 3. Marquee of drink names. 4. Story/About + fact stats. 5. Menu as numbered list rows with prices in mono. 6. Origin as large image cards with Sources links. 7. Visit (hours, address, map placeholder). 8. Contact form section (dark). 9. Footer with giant wordmark, copyright year via JS.

## Contact form (Web3Forms, required)
- `<form>` POSTs via fetch to `https://api.web3forms.com/submit`; hidden `access_key` value is the literal token `WEB3FORMS_ACCESS_KEY_PLACEHOLDER` (the agent injects the real key after the build — never print or hardcode it in the brief).
- Hidden `subject` = `Chiang Rai Coffee contact form`, `from_name` = `Chiang Rai Coffee website`, honeypot `botcheck` checkbox (hidden).
- Fields: name, email, message (required, labelled). Inline success/error message (aria-live), button disabled while sending.
- Fallback line under the form with the plain contact email from v2 (until the café has its own domain; then use contact@<domain>).
- **No mailto: forms.**

## Guardrails / Must NOT do
- No fake reviews, testimonials, ratings, client logos, customer counts or invented stats/numbers.
- No copied template assets, text, SVGs, or licensed images; no AI likenesses of real people.
- No frameworks, trackers, or paid APIs. Don't change Thai spellings or source links.
- Don't modify `reference/` or `SOURCES.md`.

## Quality
Responsive 360px → 1440px, no horizontal scroll; semantic landmarks, skip link, focus styles, alt text; no console errors; all anchors resolve.

## Fix list
(empty — filled after review)
