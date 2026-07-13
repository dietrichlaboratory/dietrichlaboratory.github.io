// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The public URL of the deployed site. Used for canonical links, the sitemap,
// and Open Graph tags. Change this to your production domain before deploying.
const SITE = 'https://www.dietrich-lab.org';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  // Static output — no server, no database. Deploys to any static host.
  output: 'static',
  build: {
    // Keep clean, trailing-slash-free URLs where possible.
    format: 'directory',
  },
  image: {
    // Allow local image optimization when you add real assets to src/assets.
    // (Placeholder graphics used on first run are pure CSS/SVG, so nothing to
    // optimize yet.)
  },
});
