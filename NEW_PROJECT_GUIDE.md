# Adding New Projects to the Portfolio

Quick reference for adding new work to the site.

---

## Decision Tree

Is the project a narrative design case study?
- YES → Follow the [Case Study Workflow](#1-case-study-workflow)
- NO → Follow the [Coded Project Workflow](#2-coded-project-workflow)

---

## 1. Case Study Workflow

**Goal:** Add a design case study written in MDX.

### Step 1: Create the content entry

Create `src/content/projects/<slug>.mdx` with this frontmatter:

```mdx
---
title: "Project Name"
description: "One-line summary shown in the Work grid"
type: "case-study"
pubDate: 2025-06-15
thumbnail: "../../assets/images/<slug>.png"
heroImage: "../../assets/images/<slug>-hero.png"
figmaUrl: "https://www.figma.com/file/..."
tags: ["Fintech", "Mobile App"]
featured: true
order: 1
client: "Client Name"
year: 2025
---
```

### Step 2: Add the thumbnail

Add an image at `src/assets/images/<slug>.png` (or `.jpg`, `.webp`).

### Step 3: Write the case study

Write the MDX body below the frontmatter using standard Markdown. Use Tailwind utility classes on container `<div>` elements when you need layout control.

---

## 2. Coded Project Workflow

**Goal:** Add an interactive design-engineering project.

### Step 1: Create the project folder

```
src/projects/<slug>/
├── index.astro
├── components/
│   └── MainWidget.tsx
├── styles/
│   └── project.css
└── assets/
    └── ...
```

### Step 2: Write the entry component

In `src/projects/<slug>/index.astro`:

```astro
---
import MainWidget from './components/MainWidget.tsx';
import './styles/project.css';
---

<MainWidget client:visible />
```

**Rules:**
- Do **not** import `<Layout>` here. The route already wraps everything in the layout shell.
- Import scoped CSS if needed. It will only load for this project.
- Use `client:*` directives on React islands. Prefer `client:visible` for below-fold content.

### Step 3: Create the MDX entry

Create `src/content/projects/<slug>.mdx` with this frontmatter:

```mdx
---
title: "Project Name"
description: "One-line summary shown in the Work grid"
type: "coded"
pubDate: 2025-06-15
thumbnail: "../../assets/images/<slug>.png"
tags: ["Generative Art", "Canvas"]
featured: false
order: 2
year: 2025
hideDefaultHeader: false
---
```

### Step 4: Add the thumbnail

Add `src/assets/images/<slug>.png` (or `.jpg`, `.webp`).

---

## Shared Rules

| Rule | Details |
|------|---------|
| **`<slug>` must match** | The MDX filename (`src/content/projects/<slug>.mdx`) and coded project folder (`src/projects/<slug>/`) must use the same slug. |
| **`order` controls position** | Lower numbers appear first in the Work grid. |
| **`thumbnail` is required** | Both types need a thumbnail image. |
| **No route file edits** | Never edit `src/pages/projects/[slug].astro` to add a project. The route auto-discovers everything. |

---

## Frontmatter Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | `string` | Yes | Project name. |
| `description` | `string` | Yes | Short summary for the Work grid. |
| `type` | `"case-study" \| "coded"` | Yes | Determines rendering mode. |
| `pubDate` | `date` | Yes | Publication date. |
| `thumbnail` | `string` | Yes | Path to thumbnail image. |
| `heroImage` | `string` | No | Full-width hero image on detail page. |
| `figmaUrl` | `string` | No | Figma embed URL. |
| `tags` | `string[]` | No | Tags shown on detail page and grid. |
| `featured` | `boolean` | No | Controls homepage visibility. Only `featured: true` projects appear in the Work grid. Default `false`. |
| `order` | `number` | No | Position in Work grid. Lower = earlier. Default `0`. |
| `client` | `string` | No | Client name for case studies. |
| `year` | `number` | Yes | Project year. |
| `hideDefaultHeader` | `boolean` | No | Coded projects only. Hides back link + title block. Default `false`. |
