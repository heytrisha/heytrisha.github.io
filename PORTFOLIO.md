# Portfolio Website

This document is organized by concern, not by document type. Each section addresses one question: what this is, how it feels, how it looks, how content works, and how it is built.

---

## A. Product Definition

### A.1 Purpose

A UX/UI design portfolio that showcases projects without redirecting visitors to external platforms. It serves as both a presentation layer for design work and a host for design-engineering projects that visitors can interact with directly.

### A.2 Scope

**5–10 projects total**, a mix of:

- **UI/UX Case Studies** — Narrative, scroll-driven explorations of design process and outcomes
- **Coded Design-Engineering Projects** — Interactive experiences built with React/Astro islands

Both types are presented as routes within the portfolio. No external redirects.

### A.3 Hosting

- **Platform:** GitHub Pages
- **Cost:** Free
- **Deployment:** Automated via GitHub Actions on push to `main`
- **Custom domain:** Supported via `public/CNAME` file (optional)

---

## B. Experience Design

### B.1 Navigation Model

The portfolio's core experience is a **single, continuous page**. All primary content — introduction, work, skills, life, connect — lives on one scrollable surface. A fixed header contains anchor links to each section. Clicking a link triggers smooth scrolling to the corresponding section. No page reloads, no back-button traversal.

The only exception is **Project Detail** pages (`/projects/[slug]`). These are separate routes because they require their own composition, layout, and information architecture. A case study is a story, not a section — it needs room to breathe.

### B.2 The Primary Canvas

The single-page architecture serves two purposes:

1. **Cohesion** — Work, skills, and identity are experienced in context, not isolated on separate pages.
2. **Simplicity** — A visitor never has to "go back" to understand the full picture. The portfolio is a single surface to be explored, not a hierarchy to be navigated.

Subtle visual cues — slight background shifts, soft dividers, scroll-driven reveals — are permitted to distinguish sections, but they must not disrupt the "one continuous page" feeling.

### B.3 The Deep-Dive Layer

Individual projects have two possible formats, both sharing the same entry point (`/projects/[slug]`) and the same visual foundation (tokens, typography, spacing):

**Case studies** — Composed from a shared library of section components. Each case study picks and arranges these components to tell its specific story. The portfolio provides the pieces; the author provides the sequence.

**Coded projects** — Self-contained interactive experiences rendered within the portfolio's layout shell. These have their own internal structure, but navigation context is never lost.

### B.4 Mobile-First Philosophy

Mobile is not a breakpoint to be patched later — it is the default state of every design decision. Every layout, every animation, every interaction is conceived for a small viewport first, then expanded for larger ones.

- Layouts are fluid and stack vertically by default. Multi-column grids are an enhancement, not a starting point.
- Touch targets are minimum 44×44px. Hover effects are non-essential; they enhance but never replace tap interactions.
- Animations are subtle and do not assume cursor presence.
- Navigation adapts to small screens, but the same anchor-link behavior is preserved.

### B.5 Motion & Animation

- **Style:** Subtle and elegant — professional feel, not flashy
- **Types:** Fade-ins, slide-ups on scroll, smooth hover states
- **Easing:** `cubic-bezier(0.23, 1, 0.32, 1)` (ease-out, professional)
- **Implementation:** Motion One for scroll-triggered and choreographed animations; CSS transitions for hover states and simple reveals
- **Behavior:** Animations trigger once on scroll-in, then unobserved. Configurable delay per element for staggered reveals.
- **Available variants:** `fade-up`, `fade-in`, `slide-left`, `slide-right`, `scale-up`

### B.6 Calls to Action

Two mandatory CTAs:

1. **Download Resume** — Located in the fixed header, accessible from anywhere
2. **Contact Me** — Located in the footer. The footer should not be a conventional bulky section.

---

## C. Visual System

### C.1 Source of Truth

The visual system is specified in `DESIGN.md` at the project root and implemented in `src/styles/main.css`.

- `DESIGN.md` is the human-readable specification — design rationale, color values, typography choices, component definitions
- `main.css` contains the Tailwind v4 `@theme` block where tokens are defined as CSS custom properties
- There is no automated token pipeline. When the design system evolves, update `DESIGN.md` first, then manually update `@theme`. This keeps the token layer transparent and aligns with the "open code" principle.

### C.2 Design System Principles

These principles govern how styling decisions are made. They are drawn from mature Tailwind-based design systems (shadcn/ui, Radix, Headless UI, Catalyst).

1. **Open code — own the presentation layer.** Build and adapt UI primitives directly in the source tree. For complex, error-prone behavior — focus management, keyboard navigation, ARIA patterns — use proven headless primitives rather than reinventing. Style everything yourself.
2. **Headless behavior, styled presentation.** Separate what a component *does* from how it *looks*. Behavior is handled by structure and headless primitives; presentation is handled by Tailwind utilities and design tokens.
3. **Single source of truth.** The `@theme` block is the only place where colors, spacing, typography, radii, shadows, and motion are defined. No hardcoded values in scoped styles. No parallel token files.
4. **Utilities for layout, components for patterns.** One-off layout concerns are expressed with Tailwind utilities directly in markup. Recurring visual patterns are expressed as component-level classes in `@layer components`.
5. **Inheritance over restatement.** The base layer sets the foundation: font family, color, line-height, antialiasing. Components only override when they genuinely diverge. Restating is a code smell.
6. **Earned abstraction.** Every custom class, token, or component must justify its existence. If two values are identical, converge them. Abstraction should reduce cognitive load.
7. **Motion as a system.** Easing curves and durations are defined as theme tokens and referenced everywhere. Animation is part of the design system, not an ad-hoc decision.
8. **Composition over configuration.** Complex UI is built by composing simple, predictable primitives — not by adding props to a monolithic component.
9. **Layered composition.** Complex UI is built in layers: raw tokens and utilities at the base, general-purpose component patterns in the middle, and domain-specific compositions at the top. Each layer only depends on the layers beneath it.

### C.3 Theme

- **Mode:** Dark-only (opinionated)
- **Implementation:** CSS custom properties defined in the global `@theme` block
- **Rationale:** A single dark theme reduces token surface area and eliminates runtime theme switching, localStorage management, and FOUC prevention scripts
- **Contrast:** High-contrast dark base (`#0a0a0a`) with muted secondary surfaces (`#111111`) and a single accent color (`#2dd4bf`)

### C.4 Token Structure

```css
/* src/styles/main.css */
@import "tailwindcss";

@theme {
  /* Tokens: colors, spacing, typography, radius, shadows, motion */
}

@layer base {
  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-sans);
  }
}
```

All visual values are defined as CSS custom properties in `@theme`. The base layer applies them to `body` and heading elements. Components inherit these defaults and only override when they genuinely diverge.

Exact token definitions and the pattern library (`@layer components` and `@layer utilities`) are specified in `REQUIREMENTS.md`.

---

## D. Content Architecture

### D.1 Content Types

**Case studies** — Narrative content authored in MDX. Each case study imports and arranges reusable section components (HeroSection, StatsBar, Timeline, etc.) to tell its story. The author composes freely; the portfolio provides the building blocks.

**Coded projects** — Self-contained interactive experiences. These are not Content Collection entries; they are Astro components imported by the dynamic route. Each has its own internal structure and can be extracted to an independent repo in the future.

### D.2 Authoring Model

- **Project metadata:** Centralized in a TypeScript config file (title, description, tags, order, type, thumbnail)
- **Case study content:** MDX files in `src/content/projects/` with frontmatter for structured data and MDX body for narrative composition
- **Coded project content:** Self-contained Astro components in `src/projects/` directories

### D.3 Schema

Content Collections use Zod schemas for type safety. The exact schema and loader configuration are specified in `REQUIREMENTS.md`.

### D.4 Section Component Library

Reusable components for composing case studies in MDX. Each accepts props and renders styled HTML. They are imported into MDX files and arranged freely.

| Component | Purpose |
|---|---|
| **HeroSection** | Full-width hero image with title/subtitle overlay |
| **StatsBar** | Row of big-number metrics |
| **ProcessTimeline** | Vertical timeline with dates, titles, descriptions |
| **AlternatingCards** | Image-left/text-right, then swap, repeating |
| **ImageGallery** | Grid of images with captions |
| **Testimonial** | Quote card with author attribution |
| **PullQuote** | Large styled inline quote |
| **SideBySide** | Two-column comparison |
| **CodeShowcase** | Code block + live preview |
| **FigmaEmbed** | Responsive Figma iframe embed |

### D.5 Coded Project Structure

The portfolio infrastructure supports coded projects, though none are currently deployed. When added, each lives in `src/projects/<project-name>/`:

```
src/projects/<project-name>/
├── index.astro              # Entry point
├── components/              # Project-specific React components
│   └── SomeWidget.tsx
├── styles/                  # Project-specific styles
│   └── project.css
└── assets/                  # Project-specific images/fonts
    └── ...
```

The dynamic route detects if a project is coded (via `type: 'coded'` in frontmatter) and renders the corresponding entry component instead of MDX content.

---

## E. Technical Foundation

### E.1 Tech Stack

#### Baseline

These are the proven defaults. Divergence is allowed when there is a reason, but the burden of proof is on the alternative.

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | Astro 5.x | Static output, file-based routing, Content Collections, Islands architecture, MDX support, zero JS by default |
| **Styling** | Tailwind CSS v4 | Utility-first CSS with `@theme` tokens. Single source of truth for all visual values |
| **Language** | TypeScript | Type safety for config, components, and content schema |
| **Content** | MDX | Enables importing and composing Astro components directly in case study files for flexible layouts |
| **Interactive islands** | React | Only for components that need client-side interactivity. Ships JS only for explicitly hydrated components |
| **Accessibility primitives** | Radix UI | Headless behavior for complex interactions: dialogs, dropdowns, tabs, focus trapping, keyboard navigation |
| **Animation** | Motion One (default); CSS + IntersectionObserver (minimalist option) | Motion One (~3 KB) for sequences, spring physics, and scroll-triggered reveals. CSS transitions for hover states and simple opacity/transform animations |
| **Icons** | Lucide React | Tree-shakeable, consistent weight, actively maintained. Replaces scattered inline SVGs |
| **Component patterns** | Shadcn UI | Copyable starting points for common patterns (Button, Card, Dialog). Uses Radix for behavior + Tailwind for styling. Not a package dependency |
| **Hosting** | GitHub Pages | Free, automated deployment via GitHub Actions |

### E.2 Animation Strategy

Animation is tiered by complexity and bundle cost:

| Tier | Tool | Use Case | Cost |
|---|---|---|---|
| **Default** | Motion One | Scroll-triggered reveals, choreographed sequences, spring physics | ~3 KB gzipped |
| **Minimalist** | CSS transitions + IntersectionObserver | Hover states, simple reveals, opacity/transform transitions | 0 KB |
| **Complex** | Framer Motion | Layout animations (shared element transitions), AnimatePresence | ~30 KB gzipped |

Start with Motion One for any animation beyond a simple hover state. Use CSS only when the project explicitly targets zero runtime dependencies. Reserve Framer Motion for projects that genuinely need layout animations — the bundle cost must be justified by the experience gain.

### E.3 Project Structure

```
portfolio/
├── DESIGN.md                              # Visual system specification
├── src/
│   ├── content.config.ts                  # Content Collections schema
│   ├── data/
│   │   └── projects.ts                    # Centralized project metadata
│   ├── content/
│   │   └── projects/                      # MDX case study files
│   ├── projects/                          # Coded projects (infrastructure ready)
│   │   └── <project-name>/
│   │       ├── index.astro
│   │       └── ...
│   ├── pages/
│   │   ├── index.astro                    # Single page (all primary sections)
│   │   └── projects/
│   │       └── [slug].astro               # Dynamic project detail route
│   ├── components/
│   │   ├── layout/                        # Header, Footer
│   │   ├── case-studies/                  # Section components for MDX
│   │   ├── projects/                      # ProjectCard, ProjectGrid
│   │   └── motion/                        # Animation primitives
│   ├── layouts/
│   │   └── Layout.astro                   # Base HTML layout
│   └── styles/
│       └── main.css                       # Tailwind v4 + @theme tokens
├── public/
│   ├── CNAME                              # Optional custom domain
│   └── images/
│       └── projects/                      # Thumbnails and case study images
├── .github/
│   └── workflows/
│       └── deploy.yml                     # GitHub Actions deployment
└── astro.config.mjs
```

### E.4 Configuration

Astro configuration includes framework integrations (React, MDX), site metadata for canonical URLs, and the Tailwind CSS Vite plugin. Exact configuration is specified in `REQUIREMENTS.md`.

Key considerations:
- `site` — required for canonical URLs and sitemaps
- `base` — prefixes all asset paths for GitHub Pages subdirectory hosting (omit if using a custom domain)

### E.5 Deployment

Automated deployment via GitHub Actions on push to `main`. The exact workflow configuration is specified in `REQUIREMENTS.md`.

### E.6 Key Constraints & Notes

1. **Content collection schema changes** require a dev server restart or `s + enter` sync.
2. **`getStaticPaths()` is mandatory** for static dynamic routes.
3. **`base` in config** must be prefixed on all internal links or they break on GitHub Pages.
4. **React children from Astro** are parsed as plain strings, not React nodes.
5. **Figma embed URLs** need the `embed?embed_host=share` format.
6. **MDX files in Content Collections** work alongside `.md` files.
7. **Coded projects** are not Content Collection entries — they are Astro components imported by the route.
8. **Astro Islands** ship JS only for explicitly hydrated components via `client:*` directives.

### E.7 Client Directive Reference

| Directive | Hydration Timing | Use Case |
|---|---|---|
| `client:load` | Immediately on page load | Critical interactive UI (navigation, text rotator) |
| `client:idle` | When browser is idle | Lower-priority interactive elements |
| `client:visible` | When element enters viewport | Scroll-triggered content, below-fold interactive sections |
| `client:media` | When CSS media query matches | Mobile-only or desktop-only interactivity |
| `client:only` | Skip SSR, render on client only | Components that depend on browser APIs |
