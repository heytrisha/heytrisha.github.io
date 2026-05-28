# AGENTS.md

Conventions, structure, and decision rules for this Astro + React + Tailwind portfolio project.

---

## 1. Overview

- **Framework**: Astro 5.x
- **UI Islands**: React (hydrated with `client:*` directives)
- **Styling**: Tailwind CSS v4
- **Content**: MDX via Astro Content Collections
- **Animation**: Motion One
- **Type**: Single-page portfolio with project detail routes
- **Hosting**: GitHub Pages (static build)

---

## 2. Directory Structure & Decision Rules

| Directory | Purpose | If the file is... |
|-----------|---------|-------------------|
| `src/pages/` | Astro routes (URL entry points) | A route that maps to a URL |
| `src/layouts/` | Page shell wrappers (head, header, footer) | A page shell with `<html>`/`<head>` |
| `src/sections/` | Page-level sections. **Not reusable across pages.** | A large block of a single page |
| `src/components/ui/` | Design-system primitives. Presentation + behavior only. | A design-system primitive |
| `src/components/layout/` | Shared structural pieces | A shared structural piece |
| `src/components/motion/` | Generic animation wrappers | A generic animation wrapper |
| `src/components/projects/` | Feature-specific project components | A component tied to a domain/feature |
| `src/components/case-studies/` | Reusable MDX composition blocks | A reusable block for MDX case studies |
| `src/projects/` | Self-contained coded design-engineering projects | A self-contained coded project |
| `src/content/` | MDX case study files for Content Collections | MDX/markdown content |
| `src/content.config.ts` | Zod schemas for content collections | A content-collection schema |
| `src/data/` | Site metadata and constants | Site config or constants |
| `src/config/` | Feature flags and toggles | A feature flag or toggle |
| `src/lib/` | Pure utility functions. No framework imports. | A pure helper function |
| `src/styles/` | Global CSS and Tailwind v4 `@theme` tokens | Global CSS or Tailwind tokens |
| `public/` | Static assets served at root | A static asset |

---

## 3. Astro vs React Convention

**Default to `.astro`.**

Use `.tsx` only when required:

- Client-side interactivity (hooks, state, effects)
- Astro `client:*` hydration directives
- Complex event handlers

Keep React islands as small as possible.

---

## 4. Content Architecture

Two content types coexist under `/projects/`:

1. **Case studies** — Content-driven. MDX files in `src/content/projects/`, rendered by `/projects/[slug].astro`.
2. **Coded projects** — Code-driven. Self-contained in `src/projects/<name>/`, rendered inside the layout shell.

Coded projects can live at `/projects/<name>` without being Content Collection entries.

---

## 5. Design System

Visual tokens live in `src/styles/main.css` inside the `@theme` block. The design language is intentionally minimal and dark-only. Update `main.css` directly when the system evolves.

---

## 6. Path Aliases

`@/*` maps to `src/*`. Use it for all internal imports.
