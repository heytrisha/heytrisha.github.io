// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import moodboardPositionsPlugin from './src/plugins/moodboardPositions.js';

const basePath = process.env.BASE_PATH || '';

/** @type {import('astro').AstroUserConfig} */
const config = {
  site: 'https://example.github.io',
  base: basePath,
  integrations: [react(), mdx()],
  vite: {
    // Cast to any: @tailwindcss/vite returns Plugin<any> with a name field that
    // doesn't strictly match Astro's PluginOption discriminated union. Runtime
    // is fine; this is purely a type-level mismatch.
    plugins: [/** @type {any} */ (tailwindcss()), /** @type {any} */ (moodboardPositionsPlugin())],
  },
};

export default defineConfig(config);
