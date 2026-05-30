# Requirements

This document specifies exact implementation requirements. It is paired with `PORTFOLIO.md`, which defines overarching principles. When in doubt, prefer framework defaults. Only add custom abstractions when they serve a general purpose across multiple components.

---

## R.1 Dependencies & Version Policy

### R.1.1 Version Selection Criteria

All dependencies must satisfy:
- **Latest major version** — stay current with the latest stable release
- **At least one month old** — avoid freshly published packages that may have undiscovered issues
- **No known security advisories** — check `npm audit` and GitHub security advisories before adding

Once dependencies are selected and verified, **pin exact versions in `package.json`** (no `^` or `~` prefixes). This prevents unexpected updates from breaking the build and ensures reproducibility across environments.

### R.1.2 Production Dependencies

```json
{
  "astro": "^5.x",
  "@astrojs/react": "^4.x",
  "@astrojs/mdx": "^4.x",
  "react": "^19.x",
  "react-dom": "^19.x",
  "tailwindcss": "^4.x",
  "@tailwindcss/vite": "^4.x",
  "@tailwindcss/typography": "^0.5.x"
}
```

### R.1.3 Dev Dependencies

```json
{
  "@types/react": "^19.x",
  "@types/react-dom": "^19.x",
  "typescript": "^5.x"
}
```

### R.1.4 Future-Ready Dependencies

The following are reserved for enhancement and should be installed only when their specific capability is needed:

- **Motion One** — for choreographed animations, spring physics, scroll-triggered reveals
- **Radix UI** — for complex accessibility primitives (dialogs, dropdowns, tabs)
- **Lucide React** — for consistent, tree-shakeable icons
- **Shadcn UI** — for copyable component pattern starting points

---

## R.2 Astro Configuration

### R.2.1 Main Config

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://<username>.github.io',
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- `site` — required for canonical URLs and sitemaps
- The `@tailwindcss/vite` plugin is required for Tailwind CSS v4 integration with Astro

### R.2.2 TypeScript Configuration

Enable strict mode and configure path aliases for clean imports:

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## R.3 Design Tokens & Abstraction Strategy

### R.3.1 Principle: Framework Defaults First

Start with what the framework provides. Tailwind CSS v4 includes a comprehensive default theme. Only add custom tokens when the defaults genuinely do not fit the design intent.

When paired design frameworks (Shadcn, Radix Themes, etc.) provide tokens built to work with Tailwind, use those as the foundation before adding custom ones.

### R.3.2 Abstraction Layers

Build CSS in three layers, from framework to custom:

1. **Framework utilities** — Tailwind utilities for one-off layout concerns (padding, gaps, flex, grid)
2. **General-purpose component classes** — `@layer components` classes for patterns that recur across multiple pages (cards, buttons, navigation links). Each class must serve a general purpose, not a single-use case
3. **Page-specific compositions** — Tailwind utility combinations in markup for situational layouts that won't recur

---

## R.4 Data Contracts

### R.4.1 Site Metadata

```ts
// src/data/site.ts
export const site = {
  name: string,           // Display name, used in Header, Footer, page titles
  email: string,          // Used for mailto: link in Connect section
  resumeUrl: string,      // Path to resume PDF for download CTA
  socials: {
    github?: string,
    linkedin?: string,
    behance?: string,
  },
};
```

### R.4.2 Content Collections Schema

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['case-study', 'coded']),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    thumbnail: z.string(),
    figmaUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    client: z.string().optional(),
    year: z.number(),
    hideDefaultHeader: z.boolean().default(false),
  }),
});

export const collections = { projects };
```

---

## R.5 Font Loading

Load fonts via Google Fonts CDN with preconnect for performance:

```html
<!-- In Layout.astro <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

- **Inter**: Weights 400, 500, 600, 700 for body and headings
- **JetBrains Mono**: Weights 400, 500 for code and monospace contexts
- Always use `display=swap` to prevent FOIT

---

## R.6 Page Composition

### R.6.1 Single Page Section Order

The `index.astro` page renders sections in this order:

1. **Hero** — Full-viewport centered introduction. Uses `.display-1` for the name, `.lead` for the tagline, and a brief description paragraph
2. **Work** (`#work`) — Project grid listing. Uses `section-alt` background. Falls back to "Work coming soon" when empty
3. **Skills** (`#skills`) — Card grid of skill categories. Self-contained component
4. **Life** (`#life`) — Personal section. Uses `section-alt` background
5. **Connect** (`#connect`) — CTA and social links. Centered layout with social link icons

### R.6.2 Dynamic Route

`/projects/[slug].astro` renders project detail pages:
- Case studies: renders MDX content with prose styling
- Coded projects: dynamically imports from `src/projects/[slug]/index.astro`
- Includes back navigation to home

### R.6.3 Layout Shell

`Layout.astro` wraps all pages:
- Loads `main.css` (Tailwind + tokens)
- Loads Google Fonts with preconnect
- Renders Header and Footer around `<main>` content
- Sets page title: `{title} | {site.name}`

---

## R.7 Component APIs

### R.7.1 Header

**Desktop:** Fixed header with logo (left) and anchor navigation links (right)
**Mobile:** Hamburger menu
- Three bars that animate to an X when checked
- Clicking a nav link auto-closes the menu
- Gradient fade overlay at the top of the page behind the header

---

## R.8 Animation Specifications

### R.8.1 Default Approach: Motion One

For new projects following this spec, use Motion One as the default animation library. It handles:
- Scroll-triggered entrance animations
- Spring physics for natural motion
- Choreographed sequences with staggered delays
- Gesture-based interactions

### R.8.2 Minimalist Fallback: CSS + IntersectionObserver

When zero runtime dependencies are preferred, use this exact pattern:

**Timing:**
- Duration: 0.7s
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)`
- Properties: `opacity` and `transform` only

**Variants:**
- `fade-up`: `translateY(30px)` → `translateY(0)`
- `fade-in`: opacity only
- `slide-left`: `translateX(-40px)` → `translateX(0)`
- `slide-right`: `translateX(40px)` → `translateX(0)`
- `scale-up`: `scale(0.95)` → `scale(1)`

**Observer config:**
- `threshold`: 0.1 (configurable per element)
- `rootMargin`: `'0px 0px -40px 0px'`
- Trigger once, then unobserve

### R.8.3 Hover States

- Default transition: `opacity` and `color` over 0.15s with ease-out
- Card hover: `border-color` and `box-shadow` over 0.4s with ease-out
- Image zoom on hover: `transform: scale(1.05)` over 0.6s with ease-out
- All hover effects must be wrapped in `@media (hover: hover)` to prevent broken states on touch devices

---

## R.9 Deployment Pipeline

### R.9.1 Makefile

```makefile
.PHONY: help install dev build preview clean deploy-staging deploy-production promote

help:
	@echo "Available targets:"
	@echo "  make install           Install dependencies"
	@echo "  make dev               Start local dev server"
	@echo "  make build             Build for production"
	@echo "  make preview           Preview production build locally"
	@echo "  make clean             Remove dist/ and .astro/"
	@echo "  make deploy-staging    Trigger staging deployment"
	@echo "  make deploy-production Trigger production deployment"
	@echo "  make promote           Promote staging to production"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

clean:
	rm -rf dist/ .astro/

deploy-staging:
	gh workflow run deploy.yml -f environment=staging

deploy-production:
	gh workflow run deploy.yml -f environment=production

promote:
	gh workflow run promote.yml
```

### R.9.2 GitHub Actions: Deploy Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy Portfolio

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        description: Environment to deploy to
        required: true
        type: choice
        options:
          - staging
          - production

concurrency:
  group: deploy-${{ github.event.inputs.environment || (github.event_name == 'push' && 'production' || 'staging') }}
  cancel-in-progress: true

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v6
      - uses: actions/upload-pages-artifact@v4
        with:
          path: dist/

  deploy-staging:
    if: >
      github.event_name == 'pull_request' ||
      (github.event_name == 'workflow_dispatch' && github.event.inputs.environment == 'staging')
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: ${{ vars.STAGING_URL }}
    steps:
      - uses: actions/deploy-pages@v5
        with:
          artifact_name: github-pages

  deploy-production:
    if: >
      (github.event_name == 'push' && github.ref == 'refs/heads/main') ||
      (github.event_name == 'workflow_dispatch' && github.event.inputs.environment == 'production')
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: production
      url: ${{ vars.PRODUCTION_URL }}
    steps:
      - uses: actions/deploy-pages@v5
        with:
          artifact_name: github-pages
```

### R.9.3 GitHub Actions: Promote Workflow

```yaml
# .github/workflows/promote.yml
name: Promote Staging to Production

on:
  workflow_dispatch:

concurrency:
  group: deploy-production
  cancel-in-progress: true

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  promote:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: ${{ vars.PRODUCTION_URL }}
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v6
      - uses: actions/upload-pages-artifact@v4
        with:
          path: dist/
      - uses: actions/deploy-pages@v5
        with:
          artifact_name: github-pages
```

### R.9.4 Environment Configuration

- **Staging URL**: Set as `STAGING_URL` repository variable
- **Production URL**: Set as `PRODUCTION_URL` repository variable
- Both environments are protected and require manual approval if configured
