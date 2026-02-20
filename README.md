# StoryCast Microsite

**An accessible audio and video storytelling platform**  
Built with semantic HTML5, Sass, CSS Grid, Flexbox, and Container Queries — no frameworks.

---

## Project Structure

```
storycast/
│
├── index.html                        ← Home page
├── about.html                        ← About / Accessibility page
│
├── story/
│   └── the-silent-echo.html          ← Story Detail page
│
├── sass/                             ← Source Sass (compile → css/main.css)
│   ├── main.scss                     ← Entry point (imports all partials)
│   ├── tokens/
│   │   ├── _colors.scss              ← Color design tokens
│   │   ├── _typography.scss          ← Font & scale tokens
│   │   └── _spacing.scss             ← Spacing, breakpoints, z-index tokens
│   └── partials/
│       ├── _base.scss                ← Reset, accessibility utilities, container
│       ├── _nav.scss                 ← Shared navigation + footer
│       ├── _components.scss          ← Buttons, cards, media player, transcript
│       ├── _home.scss                ← Home page styles
│       ├── _story.scss               ← Story detail page styles
│       └── _about.scss               ← About / accessibility page styles
│
├── css/
│   └── main.css                      ← Compiled CSS (from sass/main.scss)
│
├── js/
│   └── main.js                       ← Vanilla JS: nav, player, filters, demo
│
└── assets/
    ├── images/                       ← Place story images here (.jpg/.webp)
    ├── audio/                        ← Place audio files here (.mp3/.ogg)
    └ transcripts/
        └── the-silent-echo-transcript.txt
```

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Featured story hero, category filters, 6-card story grid |
| Story Detail | `story/the-silent-echo.html` | Audio player, transcript panel, body text, related stories |
| About / Access | `about.html` | Mission, inclusive features, accessibility commitment, interactive demo |

---

## Running Locally

No build step required to view the site. Just open in a browser:

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a local server (recommended for audio/video)
npx serve .
# or
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Compiling Sass

If you want to edit styles and recompile:

```bash
# Install Sass globally
npm install -g sass

# Watch and compile
sass --watch sass/main.scss css/main.css

# One-time compile
sass sass/main.scss css/main.css --style=compressed
```

---

## Adding Your Own Media

1. **Images:** Drop `.jpg` or `.webp` files into `assets/images/`. Update `src` attributes in HTML.
2. **Audio:** Drop `.mp3` and `.ogg` files into `assets/audio/`. Update `<source src>` in `story/the-silent-echo.html`.
3. **Transcripts:** Add `.txt` files to `assets/transcripts/`. Update the download link in the story page.

---

## Accessibility Checklist (WCAG 2.1 AA)

### Semantic HTML
- [x] `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<aside>` used correctly
- [x] Heading hierarchy (h1 → h2 → h3) maintained on every page
- [x] `<time datetime>` for dates, `<address rel="author">` for bylines
- [x] `<ol>` for breadcrumb, `role="list"` on navigation lists
- [x] `<audio>` element with `<source>` fallback and descriptive text

### Keyboard Navigation
- [x] Skip-to-content link visible on focus at top of every page
- [x] All interactive elements reachable via Tab key
- [x] Custom audio player buttons are `<button>` elements with keyboard events
- [x] Mobile nav closes on Escape key with focus returned to hamburger
- [x] Range inputs (`<input type="range">`) for progress and volume are keyboard-navigable
- [x] Transcript toggle button uses `aria-expanded`

### Focus Management
- [x] Global `:focus-visible` rule — 3px amber outline, 3px offset (all pages)
- [x] No `outline: none` anywhere in CSS without a visible replacement
- [x] Focus returned to trigger element when modals/drawers close

### ARIA
- [x] `aria-label` on nav, search, social links, and media player buttons
- [x] `aria-current="page"` on active navigation link
- [x] `aria-expanded` on hamburger and transcript toggle buttons
- [x] `aria-controls` linking buttons to their controlled regions
- [x] `aria-live="off"` on time display (updated frequently, not announced)
- [x] `aria-pressed` on play button and category filter buttons
- [x] `role="region"` with `aria-labelledby` on transcript and player sections
- [x] `role="switch"` and `aria-checked` on caption toggle
- [x] `aria-hidden="true"` on all decorative icons and presentation images
- [x] `role="presentation"` on hero background image

### Color & Contrast
- [x] Primary text (#f0ede8) on dark background (#1e1c0f): ratio > 7:1 (AAA)
- [x] Secondary text (#a89f8c) on dark: ratio ≈ 4.6:1 (AA)
- [x] Accent amber (#f5a623) on dark: ratio ≈ 5.2:1 (AA for large text)
- [x] Dark text (#1a1500) on amber button: ratio > 7:1 (AAA)
- [x] High-contrast mode toggle available on About page

### Media Accessibility
- [x] `<audio>` element provided with native browser controls as fallback
- [x] Custom player controls include rewind (10s) and fast-forward (15s)
- [x] Volume control accessible via keyboard
- [x] Full transcript provided for every audio story
- [x] Transcript downloadable as `.txt` (Braille display compatible)
- [x] All images have meaningful `alt` text or `alt=""` for decorative images

### Responsive Design
- [x] Mobile-first responsive at 480px, 768px, 1024px breakpoints
- [x] Story grid: 3-col → 2-col → 1-col
- [x] Navigation collapses to hamburger below 768px
- [x] Container query on `.story-card` adapts card layout when container < 300px

### Motion & Preferences
- [x] `@media (prefers-reduced-motion: reduce)` disables all animations
- [x] `@media (prefers-contrast: high)` increases text contrast
- [x] No auto-playing media; user must click Play

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | `#f5a623` | Buttons, links, focus rings, icons |
| `--color-bg-surface` | `#1e1c0f` | Page background |
| `--color-bg-card` | `#1b2236` | Cards, panels |
| `--color-text-primary` | `#f0ede8` | Body text |
| `--color-text-secondary` | `#a89f8c` | Captions, metadata |
| `--font-display` | Playfair Display | Headlines |
| `--font-body` | DM Sans | Body text, UI |

---

*StoryCast — Every story deserves to be heard, seen, and felt.*
