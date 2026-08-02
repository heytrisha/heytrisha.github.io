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
| `src/components/sections/` | Page-level section components. **Not reusable across pages.** | A large block of a single page |
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
| `src/assets/` | Images optimized by Astro's `<Image />` component | An image that needs build-time optimization |
| `src/plugins/` | Vite / build tooling plugins | A custom Vite plugin or build-time tool |
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

## 7. Tooling Conventions

### Playwright MCP screenshots

The `@playwright/mcp` server writes screenshots to `.playwright-mcp/screenshots/` (configured via `--output-dir` in `.opencode/opencode.jsonc`). The directory is gitignored.

**Lifecycle:** screenshots are transient. After reading or interpreting a screenshot, delete it. If the directory is empty after cleanup, remove the empty directory too. Do not leave screenshots behind in the working tree once they have served their purpose.

---

## 8. Quality Gates

The repo enforces a quality pipeline at three levels. **Never skip them** unless the user explicitly asks you to.

### Local — pre-commit (lefthook, `.lefthook.yml`)

Runs on `git commit` against staged files only (fast, ~1-3s):

- `pnpm exec eslint --fix` (auto-fixes + re-stages)
- `pnpm exec prettier --write` (formats + re-stages)
- `pnpm dlx gitleaks protect --staged` (scans staged hunks for secrets)

### Local — pre-push (lefthook)

Runs on `git push` against the full project (slower, catches what pre-commit can't see):

- `pnpm run check` — `astro check` (TS + `.astro` validation)
- `pnpm run lint` — full eslint
- `pnpm run format` — full prettier check

### Remote — CI (`.github/workflows/quality.yml`)

Re-runs the same gates as reusable workflows:

- `reusable-lint.yml` — format + lint
- `reusable-check.yml` — `astro check`
- `reusable-audit.yml` — `pnpm audit`
- `reusable-secrets.yml` — gitleaks full-history scan

`deploy.yml` requires the `lint`, `check`, `audit`, `secrets` jobs to pass before building, so a failing quality check blocks deployment.

### Manual commands (Make or pnpm)

| Task | Make | pnpm |
|---|---|---|
| Install | `make install` | `pnpm install` |
| Lint | `make lint` | `pnpm run lint` |
| Lint (auto-fix) | `pnpm run lint:fix` | `pnpm run lint:fix` |
| Format check | `make format` | `pnpm run format` |
| Format (write) | `make format-fix` | `pnpm run format:fix` |
| Type + .astro check | `make check` | `pnpm run check` |

### Hooks lifecycle

- `pnpm install` auto-runs `prepare` → `lefthook install`, which writes the hook scripts into `.git/hooks/`.
- If hooks ever go missing (e.g. after `corepack` shenanigans), re-run `pnpm run prepare`.
- To bypass hooks in an emergency: `LEFTHOOK=0 git commit ...` (or `--no-verify`). Use sparingly.

### Adding new tools that need postinstall

pnpm 11+ blocks postinstall scripts by default. If you add a new dev dependency that needs to run a postinstall (binary download, native build), append it to `pnpm-workspace.yaml` under `allowBuilds`. Existing entries: `esbuild`, `sharp`, `lefthook`.

