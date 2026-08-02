// Prettier config for Astro 6 + Tailwind v4
// https://prettier.io/docs/configuration

import astroPlugin from 'prettier-plugin-astro';
import tailwindPlugin from 'prettier-plugin-tailwindcss';

/** @type {import('prettier').Config} */
export default {
  printWidth: 100,
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  bracketSpacing: true,
  plugins: [astroPlugin, tailwindPlugin],
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
};
