# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: hiring managers and recruiters.** They are scanning for fit in 60–90 seconds. They arrive from a link in an application, a referral, or a sourcing search. They need: a fast read on who Trisha is, evidence of relevant work, a downloadable resume, and a low-friction way to make contact. They skim before they read.

## Product Purpose

A UX/UI design portfolio that showcases Trisha Agarwal's product design work in place, without redirecting visitors to external platforms. The site serves two purposes at once: it is the presentation layer for case-study work, and it is the host for design-engineering projects visitors can interact with directly. Success means a hiring manager leaves with a clear read on Trisha's reasoning, the calibre of her work, and how to start a conversation — without ever clicking away.

## Positioning

**Decisions before deliverables.** Every case study on this site leads with the *why* — the problem framing, the constraints, the trade-offs considered — and only then shows what shipped. A neighbouring portfolio can truthfully copy the deliverables; it cannot copy the discipline of putting the decision in front of the artifact. That ordering is the product's honest differentiator and is reflected in case-study structure (problem → reasoning → outcome) and in the prose voice (observational, not promotional).

## Operating Context

- **Surface:** A single, continuous page anchored by `index.astro`. Project detail routes (`/projects/[slug]`) are the only exception, because a case study needs room to breathe.
- **Hosting:** GitHub Pages, static build, automated deploy on `main`. Free tier; no server runtime.
- **Device priority:** Mobile-first. Every layout, animation, and interaction is conceived for a small viewport first, then expanded.
- **Discovery paths:** Visitors arrive from job applications, recruiter outreach, referrals, and (less commonly) search. They do not arrive to browse for long; the first viewport must orient them fast.
- **Content updates:** Projects are added by dropping a new MDX file in `src/content/projects/`. Adding a case study must not require touching infrastructure.
- **Asset pipeline:** Astro's `<Image />` optimizes thumbnails at build time; project assets live in `src/assets/images/`.

## Capabilities and Constraints

**Capabilities (confirmed by repo and docs):**
- Case studies authored as MDX, composed from a shared section-component library.
- Coded design-engineering projects rendered as Astro routes under the same layout shell (infrastructure ready; no coded projects currently deployed).
- GitHub Actions deploy pipeline with staging and production environments on GitHub Pages.

**Constraints:**
- GitHub Pages static output — no server, no DB, no edge functions.
- Astro `base` must be prefixed on all internal links for subdirectory hosting (or set via `BASE_PATH` env var).
- Content Collection schema is the contract for case-study frontmatter; changes require a dev server restart.
- React 19 + Astro Islands: keep hydrated islands small; default to `.astro` for everything without state, effects, or event handlers.
- **Undecided (recorded, not invented):** the portfolio currently has no testimonials, no press coverage, and no external case-study links. Future work must not fabricate these.

**Current visual implementation (provisional, not a binding commitment):**
- Dark-only theme — chosen during the build phase to reduce token surface area and remove theme-switching concerns. The owner has indicated this may be replaced by a deliberate visual world once the presentation layer is finalized. Visual-world decisions are owned by `new-work`, not `init`.
- Type families currently in use: Inter (400/500/600/700), JetBrains Mono (400/500), with Geist Sans also installed via `@fontsource-variable/geist`. Reconciliation between Inter and Geist is undecided and is part of the visual-world review, not product truth.
- Accent colour and token definitions live in `src/styles/main.css` `@theme` block (per `PORTFOLIO.md` C.3 / C.4). These tokens describe the *current* implementation; they are not recorded as product commitments in this file.

## Brand Commitments

- **Designer name:** Trisha Agarwal. Display name: `Trisha Agarwal`. Title: `UX/UI Designer`. Email: `designwithtrisha@gmail.com`. Socials: GitHub (`heytrisha`), LinkedIn (`trishaaga`), Behance (`trishaagarwal4`). Source of truth: `src/data/site.ts`.
- **Display domain:** `heytrisha.github.io` (per `README.md`). Custom domain supported via `public/CNAME`.
- **Voice:** Observational, not promotional. Plain language. The portfolio does not sell; it shows. Voice is product truth and persists across any future visual-world change.

## Evidence on Hand

**Case studies (real client work, in `src/content/projects/`):**
- `sumpatti.mdx` — Fintech, India market, designing for the first-time investor. Featured.
- `gurukool.mdx` — Education product case study.
- `evently.mdx` — Event platform case study.
- `demo-motion.mdx` — Motion demonstration, not a client project.

**Structural evidence:** The four case studies confirm the "decisions before deliverables" positioning is real, not aspirational — `sumpatti.mdx` opens with a pull quote and a problem frame before any artifact is shown.

**Assets present:** `src/assets/images/` (project thumbnails, including `sumpatti.png`); resume PDF at `public/resume.pdf` (path per `site.ts`); moodboard assets in `src/data/moodboard/` and `src/components/moodboard/`.

**Assets absent (must not be fabricated):** client logos, testimonials, press mentions, third-party case-study writeups, awards, speaking engagements, employer names. Any of these added later must come from Trisha, not be invented to fill a section.

## Product Principles

1. **The reasoning leads.** Every artifact on the site is preceded by the problem, the constraints, and the trade-offs considered. Showing a deliverable without the decision it was responding to is a defect.
2. **One continuous page, then deep dives.** The home surface is a single scroll; project detail is its own composition because stories need room. No competing navigation patterns between the two.
3. **Mobile is the default state.** Every layout, animation, and interaction is conceived for a small viewport first. Multi-column grids and hover effects are enhancements layered on top, not the starting point.
4. **Show, don't claim.** No invented metrics, testimonials, or case studies. If the evidence isn't real, the section is empty.
5. **Open code, owned presentation.** Build the visual layer in the source tree using design tokens; reach for headless primitives only when behaviour is genuinely complex. No parallel token files, no hardcoded values outside `@theme`.

## Accessibility & Inclusion

**Binding standard: WCAG 2.1 AA.** Future design and code work must satisfy AA across contrast, keyboard operability, semantic structure, focus visibility, alternative text, and `prefers-reduced-motion` respect. Motion remains part of the design system (per `PORTFOLIO.md` B.5) but must gracefully disable or reduce under the user's reduced-motion preference.
