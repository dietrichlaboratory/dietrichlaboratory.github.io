// Astro Content Collections (Content Layer API).
// ---------------------------------------------------------------------------
// Publications and team members are defined as plain data files so they can be
// edited without ever touching layout code. To add a paper or a lab member,
// edit the JSON files in `src/data/` — see README.md for step-by-step notes.
// ---------------------------------------------------------------------------
import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

/**
 * Research pillars used to tag and filter publications.
 * Keep these keys in sync with `PILLARS` in `src/data/site.ts`.
 */
const pillar = z.enum([
  'developmental', // Pillar 1 — Developmental Neuroscience (primary focus)
  'physiology',    // Pillar 2 — Body–Brain Physiology & Neuroimmunology
  'comparative',   // Pillar 3 — Comparative Biology (armadillo)
  'methods',       // Methods & Tools (VocalMat, SqueakOut, ...)
  'review',        // Reviews & commentaries
]);

const publications = defineCollection({
  // A single JSON file: an array of objects, each with a unique `id`.
  loader: file('src/data/publications.json'),
  schema: z.object({
    title: z.string(),
    authors: z.string(), // full author string; "Dietrich MO" is highlighted at render time
    journal: z.string(),
    year: z.number().int(),
    citation: z.string().optional(), // volume(issue):pages, e.g. "178(1):44–59.e7"
    doi: z.string().optional(),      // bare DOI, e.g. "10.1126/science.adk7411"
    url: z.string().url().optional(), // canonical link (defaults to the DOI URL if omitted)
    pillar,
    role: z.enum(['first', 'senior', 'co-senior', 'co-author']).optional(),
    section: z.enum(['independent', 'earlier', 'reviews']).default('independent'),
    type: z.enum(['article', 'review', 'commentary', 'preprint']).default('article'),
    featured: z.boolean().default(false), // surfaced on Home / Research highlights
    thumbnail: z.string().optional(),     // optional path under /public or src/assets
    note: z.string().optional(),          // free-text note (e.g. placeholder markers)
  }),
});

const team = defineCollection({
  loader: file('src/data/team.json'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    group: z
      .enum(['pi', 'postdoc', 'grad', 'staff', 'student', 'alumni'])
      .default('staff'),
    bio: z.string().optional(),
    photo: z.string().optional(), // path under /public (e.g. "/images/team/name.jpg")
    email: z.string().optional(),
    links: z
      .object({
        // Plain strings (not strict URLs) so empty placeholders don't break the
        // build; fill with full URLs when known.
        scholar: z.string().optional(),
        orcid: z.string().optional(),
        linkedin: z.string().optional(),
        yale: z.string().optional(),
        twitter: z.string().optional(),
        bluesky: z.string().optional(),
        github: z.string().optional(),
        website: z.string().optional(),
      })
      .partial()
      .optional(),
    order: z.number().default(99), // lower sorts first within a group
  }),
});

export const collections = { publications, team };
