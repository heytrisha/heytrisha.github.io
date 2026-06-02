// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import lifePositionsPlugin from './src/plugins/lifePositionsPlugin';

const basePath = process.env.BASE_PATH || '';

export default defineConfig({
  site: 'https://example.github.io',
  base: basePath,
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss(), lifePositionsPlugin()],
  },
});
