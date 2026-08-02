# heytrisha.github.io

Personal site built with Astro, React, MDX, and Tailwind CSS v4.

## Initial Setup

This project uses [pnpm](https://pnpm.io/) (pinned via Corepack in `package.json`).

```bash
corepack enable
make install
```

## Run Development Server

```bash
make dev
```

The site will be available at http://localhost:4321.

## ✨ Adding Projects

See [NEW_PROJECT_GUIDE.md](NEW_PROJECT_GUIDE.md) for step-by-step instructions on adding new case studies or coded projects.

## 🤖 AI Assisted Development

This project includes AI-assisted skills to help non-technical contributors work safely with the codebase. Invoke skills in opencode with `/<skill-name>`. Run `/skills` to see all available skills.

### `/git` — Safe Git Operations

Handles common Git workflows with safety checks at every step. You can save work, push changes, start new features, sync with the latest code, deploy, check status, or fix problems, just describe what you want to do in plain English.

Example: type `/git` and say "I want to build a new feature", "save my work" or "push to GitHub".

### `/impeccable` — Frontend Design & Craft

Design, redesign, critique, audit, or polish any frontend surface in this project. Covers UX, visual hierarchy, accessibility, typography, layout, motion, and design tokens. Describe what you want in plain English.

Example: type `/impeccable` and say "redesign the hero section", "audit the projects page for accessibility", or "make the home page more polished".

For a cheatsheet of available commands and what each one does, see the [language section of the impeccable site](https://impeccable.style/#language).

## 🎨 Designing with Figma

The following setup enables AI-assisted design creation, canvas editing, and design token extraction directly inside Figma.

### Prerequisites

* **Figma Desktop App** installed on macOS (Works on both Free and Paid accounts).

### Step 1: Initialize Local Server Directory (One-Time Setup)

Run the initialization command once in your terminal to ensure `figma-console-mcp` automatically generates the plugin manifest files inside your user home folder (`~/.figma-console-mcp`):

```bash
npx -y figma-console-mcp@latest
```

Once the terminal output shows the server start logs, press `Ctrl + C` to stop it.

### Step 2: Import the Desktop Bridge Plugin into Figma (One-Time Setup)

* Open the Figma Desktop App.
* Press `Cmd + P` to open Figma's Quick Actions bar.
* Type "Import plugin from manifest",  hit Enter.  
* When the macOS File Finder window opens, press `Cmd + Shift + G`, paste this in the path `~/.figma-console-mcp/plugin`, press Enter.
* Select the manifest.json file inside that folder and click Open.
* The plugin will now appear in your Figma menu as Figma Desktop Bridge.

### Step 3: Daily Workflow

* Open this project in OpenCode
* **Open Figma:** Open your target design file in Figma Desktop App.
* **Launch Plugin:** Right-click the canvas → Plugins → Development → Figma Desktop Bridge.
* **Verify Connection:** Ensure the plugin indicator turns Green / READY. Keep the small plugin window open while designing.

### Example OpenCode Prompts

* **Design Creation:** "Create a responsive 2-column hero card with Auto Layout in my active Figma document."
* **Design Token Management:** "In Figma, Create a color variable collection called Brand Colors with Primary (#0F172A) and Accent (#3B82F6)."
* **Token Extraction:** "Extract all variables from my Figma file and write them to tailwind.config.js."
