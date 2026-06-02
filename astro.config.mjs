// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import moodboardPositionsPlugin from './src/plugins/moodboardPositions';

const basePath = process.env.BASE_PATH || '';

export default defineConfig({
  site: 'https://example.github.io',
  base: basePath,
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss(), moodboardPositionsPlugin()],
  },
});
