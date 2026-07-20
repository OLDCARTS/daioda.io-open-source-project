# DAIODA — daioda.io

**Open-source AI, brought ashore.** A curated, license-verified digest of genuinely open-source AI projects. Every featured project is checked against its source: the license read from the repository, code and weights licenses separated, activity tallied, and given original editorial context.

Designed, researched, built, and maintained autonomously by **Fable 5** (Anthropic) — an OLDCARTS experiment. See the live [`/about`](https://www.daioda.io/about) and [`/guide`](https://www.daioda.io/guide) pages for the full story and a reproducible build guide.

## What makes it different

- **The License Lens.** Nothing is called open source without a license read from the source. Famous repos that *look* open but aren't (n8n, Dify, Open WebUI, Claude Code, …) live in [`/fine-print`](https://www.daioda.io/fine-print), clearly explained.
- **Code vs weights.** Models get two verdicts — an MIT codebase with non-commercial weights is marked *partial*, not *open*.
- **The Tally.** Every project page carries a data panel: license, verdict, stars, status, last activity, and the date checked.

## Stack

Astro 5 (static output) · TypeScript · hand-written CSS design tokens · Zod-validated JSON content collections · a hand-written WebGL daybreak shader (no 3D library) · client-side search/filter · RSS + sitemap at build · GoatCounter (privacy-first, cookieless) · Netlify hosting.

The guiding principle is *ship as little JavaScript as possible*: static HTML by default, small dependency-free islands only where interactivity earns its weight.

## Local development

```bash
# prerequisites: Node 22+
npm install      # install dependencies
npm run dev      # dev server with hot reload  → http://localhost:4321
npm run build    # static build → dist/
npm run preview  # serve the built site locally
```

## Repository structure

```
src/
├─ data/projects/      one JSON record per project (the catalog)
├─ data/taxonomy.json  categories + collections
├─ components/         Header, Footer, ProjectCard, DaybreakHero, Wordmark
├─ layouts/Base.astro  head, meta, theme, skip link
├─ lib/                taxonomy helpers, verdict labels
├─ pages/              home, discovery, detail, categories, collections,
│                      fine-print, about, guide, methodology, credits, rss, 404
├─ styles/global.css   design tokens + primitives
└─ content.config.ts   Zod schema for the projects collection
public/                favicon, OG image, robots.txt
netlify.toml           headers, redirects, build config
```

## Adding or updating a project

1. Create `src/data/projects/<slug>.json` and fill every schema field — including the `license` object (code license, weights license, verdict, notes) and the `tally` object (stars, last activity, status, checked date).
2. Run `npm run dev` and confirm the card and detail page render.
3. Open a pull request. The Zod schema validates the record at build; a malformed entry fails the build rather than shipping broken. Merging publishes it and regenerates the RSS feed and sitemap.

Verification standards (what counts as open source, how licenses are read, how corrections work) are documented on [`/methodology`](https://www.daioda.io/methodology).

## Deployment

Connected to Netlify from GitHub. Build command `npm run build`, publish directory `dist`. Headers, caching, and the apex→www redirect are in `netlify.toml`. The `daioda.io` domain is connected in Netlify with automatic HTTPS.

**No secrets in the repo.** Any keys (e.g. the analytics endpoint) are set as Netlify environment variables and referenced at build time.

## Content cadence

New projects come ashore weekly — the **Daybreak** edition. Automation assists with discovery and activity re-checks; license verdicts and editorial writing stay under review. No auto-generated claim is published without source verification.

## License

Site code: MIT (see `LICENSE`). Editorial content © the DAIODA experiment. Each featured project is the property of its respective maintainers under its own license; DAIODA links to every source for verification.

---

🤖 Built autonomously by Fable 5 · https://claude.com/claude-code
