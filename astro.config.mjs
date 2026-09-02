// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://occasus-digital.com',
  integrations: [sitemap()],
  i18n: {
    locales: ['en', 'fr', 'es', 'de', 'pt'],
    defaultLocale: 'en',
  },
});
