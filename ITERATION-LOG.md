# DAIODA — Iteration Log

Three structured review-and-fix passes were run after the initial build, per the brief. Each
pass reviewed a set of dimensions, implemented corrections, and retested the affected areas.

## Pass 1 — Accessibility & technical foundation

**Reviewed:** semantic structure, keyboard nav, focus, color contrast (WCAG 2.1 AA), broken links,
console errors, metadata, structured data, sitemap, robots, RSS.

**Method:** automated crawl of all internal links; axe-core WCAG 2.1 A/AA audit injected on
representative pages in both night and daylight themes; meta/canonical/title verification.

**Findings & fixes:**
- All 80 internal links resolved — no broken links.
- Color-contrast: the initial palette failed AA in many places. Root causes: `--ink-faint` too dim
  in both themes; the gold/ember wordmark and gold "data" numerals failing on the light theme;
  verdict badges (green/amber/slate/violet text on tinted backgrounds) failing, especially in
  daylight; category-hued label text too light on white.
- Fixes: raised `--ink-faint` in both themes; introduced theme-adaptive tokens
  (`--gold-ink`, `--wm-ai`, `--wm-o`, `--v-open/-amber/-slate/-violet`, `--cat-text-l`) so every
  data color has a night value and a darker daylight value; darkened the daylight accent; reworked
  the active filter-chip colors; replaced the inline-styled Model badge with a token-based class.
- **Result:** zero serious/critical WCAG color/structure violations across 12 pages × 2 themes,
  and verified against all 10 category hues.
- Confirmed: skip link is first in tab order; visible focus rings; reduced-motion hides the WebGL
  canvas and shows the static gradient; titles, descriptions, and canonicals present; JSON-LD
  `SoftwareSourceCode` on project pages; sitemap (79 URLs) and RSS (52 items) valid.

## Pass 2 — Performance & technical health

**Reviewed:** Core Web Vitals proxies, JS payload, CSS payload, image optimization, font loading,
request count, console errors, search/filter behavior, empty/loading states.

**Method:** measured navigation timing and transfer size via a headless Chromium run; inspected the
build output payloads; functionally tested search and category filtering.

**Findings & fixes:**
- Home page: First Contentful Paint ~370ms, DOMContentLoaded ~110ms, ~32KB transferred over 7
  requests. No blocking external JS (all scripts inlined by Astro).
- Total build 2.2MB; effectively zero external JavaScript files; CSS ~27KB across pages; fonts
  subset by `unicode-range` so only the Latin faces load for English readers.
- Verified the WebGL hero caps device-pixel-ratio, pauses when scrolled offscreen, and falls back
  to a CSS gradient without a GPU context.
- Search ("video" → 5 results) and category filter (audio-voice → 3) work; empty state renders when
  no results; result count is live (`aria-live`).
- No console errors on any tested page.
- Fixed a stale hard-coded "44 projects" placeholder to derive from the catalog count.

## Pass 3 — Content integrity & visual consistency

**Reviewed:** open-source license verification, accurate descriptions, valid repository links,
project-status accuracy, duplicate entries, unsupported claims; plus visual hierarchy, typography,
color, motion, consistency, and mobile presentation.

**Method:** programmatic validation of all 58 project records (repo URL shape, license/verdict
consistency, weights-license presence for partials, field completeness, related-reference
resolution); visual review of home sections, discovery, detail, fine-print, category, and mobile
layouts in both themes.

**Findings & fixes:**
- All records valid: every repo URL is a GitHub/GitLab link; every `partial` verdict carries a
  weights license; no field is under-length; no duplicate names.
- Verdict distribution at launch: 47 open, 5 partial (open code / restricted weights), 6 not-open
  (The Fine Print). Category coverage spans all 10 categories.
- Fixed one `related` reference that used a slug (`system-design-101`) instead of the display name;
  all related references now resolve within the catalog.
- Visual review confirmed consistent category-hued accents, readable verdict badges in both themes,
  a coherent night→daybreak palette, working responsive layouts down to 390px, and the intended
  editorial feel (the Tally panel, the Day-O closing moment) landing as designed.

## Standing verification note

Every featured project's license verdict was read from its actual repository during research (see
`/methodology`). Tally figures (stars, dates, status) are point-in-time snapshots as of the checked
date on each project and are expected to drift; the weekly Daybreak workflow re-checks them.
