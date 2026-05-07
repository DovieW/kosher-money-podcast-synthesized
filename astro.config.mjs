import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://doview.github.io',
  base: '/kosher-money-podcast-synthesized',
  integrations: [sitemap()],
  output: 'static'
});
