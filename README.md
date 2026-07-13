# Dietrich Lab — website

Website of the **Laboratory of Physiology of Behavior** (Dietrich Lab), led by
Marcelo O. Dietrich, MD, PhD, in the Department of Comparative Medicine at Yale
School of Medicine.

Built with **[Astro](https://astro.build/)** — static output, zero client-side
JavaScript by default, with a little JS added only for scroll animation, the
mobile menu, and the publications filter. Content (publications, team) lives in
plain data files so it can be edited without touching layout code.

---

## Prerequisites

- **Node.js** 20.3+ or 22+ (LTS recommended).
- **npm** (ships with Node). `pnpm` or `yarn` work too.

Check with `node --version`.

## Quick start

```bash
npm install       # install dependencies
npm run dev       # start the dev server → http://localhost:4321
```

Other commands:

```bash
npm run build     # production build to ./dist
npm run preview   # preview the production build locally
```

The site is designed to look complete on first run: all imagery uses elegant,
labeled placeholders, and all copy is drafted. Swap in real assets and text as
you go (see `CONTENT-TODO.md`).

---

## Project structure

```
dietrich-lab-site/
├── astro.config.mjs        # Astro config (site URL, sitemap)
├── src/
│   ├── content.config.ts   # Content collection schemas (publications, team)
│   ├── data/
│   │   ├── site.ts         # Nav, identity, address, socials, pillar text
│   │   ├── publications.json # ← add papers here
│   │   └── team.json       # ← add lab members here
│   ├── styles/
│   │   └── global.css      # All design tokens + base/component styles
│   ├── scripts/
│   │   └── motion.ts       # Scroll-reveal + hero parallax (progressive)
│   ├── layouts/
│   │   └── BaseLayout.astro # Shared shell (head, header, footer, fonts)
│   ├── components/          # Reusable UI (Hero, PillarCard, PublicationItem, …)
│   └── pages/               # One file per route
│       ├── index.astro      # Home
│       ├── research.astro
│       ├── team.astro
│       ├── publications.astro
│       ├── vocalmat.astro
│       ├── join.astro
│       ├── funding.astro
│       ├── contact.astro
│       └── 404.astro
└── public/                  # Static files served as-is (favicon, og image, images)
```

---

## Editing the site

### Colors, fonts, and spacing (design tokens)

Everything visual is controlled by CSS custom properties at the top of
**`src/styles/global.css`** (the `:root` block). For example:

```css
:root {
  --yale-blue: #00356b;   /* primary navy */
  --accent-blue: #286dc0; /* lighter accent */
  --bg: #f7f4ee;          /* page background */
  --ink: #16202b;         /* body text */
  /* …type scale, spacing, radii, shadows, motion durations… */
}
```

Change a value once and it updates everywhere. No build step or class hunting.

**Fonts** are self-hosted via [Fontsource](https://fontsource.org/) and imported
in `src/layouts/BaseLayout.astro`:

```js
import '@fontsource-variable/fraunces'; // headings (serif)
import '@fontsource-variable/inter';    // body (sans)
```

To change a font: install another Fontsource package, swap the import, and update
`--font-serif` / `--font-sans` in `global.css`.

### Add a publication

Edit **`src/data/publications.json`** and add one object to the array:

```json
{
  "id": "unique-slug-2026",
  "title": "Your paper title",
  "authors": "Lastname AB, Dietrich MO",
  "journal": "Journal Name",
  "year": 2026,
  "citation": "12(3):123–130",
  "doi": "10.xxxx/xxxxx",
  "url": "https://doi.org/10.xxxx/xxxxx",
  "pillar": "developmental",
  "role": "senior",
  "section": "independent",
  "type": "article",
  "featured": false
}
```

- `id` must be unique. `pillar` is one of: `developmental`, `physiology`,
  `comparative`, `methods`, `review` — it drives the filter on the Publications
  page. `"Dietrich MO"` in `authors` is automatically emphasized.
- `featured: true` surfaces the paper in highlights. `type` is `article`,
  `review`, `commentary`, or `preprint`. `section` is `independent`, `earlier`,
  or `reviews`. Optional: `note`, `thumbnail`.
- The list sorts newest-first automatically.

### Add a team member

Edit **`src/data/team.json`**:

```json
{
  "id": "jane-doe",
  "name": "Jane Doe, PhD",
  "role": "Postdoctoral Associate",
  "group": "postdoc",
  "order": 12,
  "bio": "One or two sentences.",
  "photo": "/images/team/jane-doe.jpg",
  "email": "jane.doe@yale.edu",
  "links": { "scholar": "https://…", "orcid": "https://…" }
}
```

- `group` is one of `pi`, `postdoc`, `grad`, `staff`, `student`, `alumni` — it
  determines which section the card appears in. `order` sorts within a group
  (lower first). Leave `photo` empty to show a labeled placeholder.

### Images

Put files in `public/images/…` and reference them as `/images/...` (e.g. a team
`photo`). For content images you want Astro to optimize, place them in
`src/assets/` and use Astro’s `<Image />` component. The placeholder boxes show
the recommended dimensions for each slot.

---

## Deployment

The site is fully static (`output: 'static'`) and deploys anywhere. Set your real
domain in **`astro.config.mjs`** (`site`) first — it powers canonical URLs, the
sitemap, and Open Graph tags.

### Netlify
- New site → connect the repo.
- Build command: `npm run build` · Publish directory: `dist`
- (Or drag-and-drop the `dist/` folder after `npm run build`.)

### Cloudflare Pages
- Create a Pages project from the repo.
- Framework preset: **Astro** · Build command: `npm run build` · Output dir: `dist`

### GitHub Pages
- Easiest with a custom domain (e.g. `www.dietrich-lab.org`): build and publish
  `dist/` (the [`withastro/action`](https://github.com/withastro/action) handles
  this in a workflow), and set the domain in repo settings.
- If instead you host at `https://<user>.github.io/<repo>/`, add a matching
  `base` to `astro.config.mjs`:
  ```js
  export default defineConfig({ site: 'https://<user>.github.io', base: '/<repo>' });
  ```
  and ensure internal links respect the base.

---

## Accessibility & performance

- Semantic HTML, logical heading order, alt text / labels on imagery, visible
  focus states, a skip link, keyboard-navigable menu, and WCAG-AA-minded contrast.
- **`prefers-reduced-motion`** is honored — all animation degrades to no-motion.
- Animation is progressive enhancement: with JavaScript disabled, all content is
  still fully visible and the navigation still works.
- Minimal JS, lazy-loaded below-the-fold media, and static HTML for fast loads.

## Content still to add

See **`CONTENT-TODO.md`** for the full checklist of placeholders (real images,
emails, profile URLs, grants, open positions, team members, and more).
