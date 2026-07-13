// ---------------------------------------------------------------------------
// Central site configuration: identity, navigation, contact details, socials,
// and the metadata for the three research pillars. Edit values here rather than
// hunting through components. Placeholders are marked [PLACEHOLDER: ...].
// ---------------------------------------------------------------------------

export const SITE = {
  name: 'Dietrich Lab',
  shortName: 'Dietrich Lab',
  tagline: 'Laboratory of Physiology of Behavior',
  // Carried over from the current site:
  description:
    'Website of the laboratory of Marcelo Dietrich at Yale School of Medicine.',
  mission:
    'We study how the brain and body communicate to shape behavior and health — from the neural circuits that build social behavior in early life, to the crosstalk between the immune system and the brain, to what an extraordinary mammal reveals about reproduction and individuality.',
  pi: 'Marcelo O. Dietrich, MD, PhD',
  institution: 'Yale School of Medicine',
  department: 'Department of Comparative Medicine',
  // Production URL (also set in astro.config.mjs `site`).
  url: 'https://www.dietrich-lab.org',
} as const;

export const ADDRESS = {
  building: 'Brady Memorial Laboratory, Suite 330C',
  street: '310 Cedar Street',
  city: 'New Haven',
  state: 'Connecticut',
  zip: '06520',
  institution: 'Yale School of Medicine',
  mapQuery: '310 Cedar Street, New Haven, CT 06520',
} as const;

export const CONTACT = {
  email: 'marcelo.dietrich@yale.edu',
  phone: '+1-203-785-6695',
} as const;

export const SOCIAL = {
  scholar: 'https://scholar.google.com/citations?user=z3vKy74AAAAJ&hl=en',
  orcid: 'https://orcid.org/0000-0001-9781-2221',
  wti: 'https://wti.yale.edu/profile/marcelo-dietrich', // Wu Tsai Institute profile
  yale: 'https://medicine.yale.edu/profile/marcelo-dietrich/',
  linkedin: 'https://www.linkedin.com/in/marcelo-dietrich-a8a03328/',
} as const;

// Primary navigation (header) — kept intentionally calm. Routes are unchanged;
// only the visible labels differ (Team→People, Funding→Support).
export const NAV = [
  { href: '/research', label: 'Research' },
  { href: '/team', label: 'People' },
  { href: '/publications', label: 'Publications' },
  { href: '/vocalmat', label: 'VocalMat' },
  { href: '/join', label: 'Join' },
  { href: '/funding', label: 'Support' },
] as const;

// Footer navigation — the full site map, including secondary destinations kept
// out of the primary header (Home, VocalMat, Contact).
export const FOOTER_NAV = [
  { href: '/', label: 'Home' },
  { href: '/research', label: 'Research' },
  { href: '/team', label: 'People' },
  { href: '/publications', label: 'Publications' },
  { href: '/vocalmat', label: 'VocalMat' },
  { href: '/join', label: 'Join' },
  { href: '/funding', label: 'Support' },
  { href: '/contact', label: 'Contact' },
] as const;

// Research pillars. `key` must match the `pillar` enum in content.config.ts.
// `weight` (1 = highest) controls visual emphasis / ordering.
export const PILLARS = [
  {
    key: 'developmental',
    weight: 1,
    number: '01',
    title: 'Developmental Neuroscience',
    kicker: 'Primary focus',
    summary:
      'How the developing brain builds the circuits that generate social behavior — from an infant’s first bond with a parent to the social drives of adolescence.',
    accent: 'var(--pillar-1)',
  },
  {
    key: 'physiology',
    weight: 2,
    number: '02',
    title: 'Body–Brain Physiology & Neuroimmunology',
    kicker: 'Body–brain & immunity',
    summary:
      'How the body and immune system signal to the brain — and how the brain turns those signals into physiology and behavior, from food allergy to early-life stress.',
    accent: 'var(--pillar-2)',
  },
  {
    key: 'comparative',
    weight: 3,
    number: '03',
    title: 'Comparative Biology',
    kicker: 'Armadillo model',
    summary:
      'The nine-banded armadillo as a model for reproduction and individuality — embryonic diapause that pauses development, and polyembryony that yields identical quadruplets.',
    accent: 'var(--pillar-3)',
  },
] as const;

// Labels for every pillar key (including non-homepage categories) — used by the
// publications filter and citation tags.
export const PILLAR_LABELS: Record<string, string> = {
  developmental: 'Developmental Neuroscience',
  physiology: 'Body–Brain Physiology & Neuroimmunology',
  comparative: 'Comparative Biology',
  methods: 'Methods & Tools',
  review: 'Reviews & Commentaries',
};

// Short labels for compact chips/filters.
export const PILLAR_SHORT: Record<string, string> = {
  developmental: 'Developmental',
  physiology: 'Physiology & Neuroimmunology',
  comparative: 'Comparative',
  methods: 'Methods & Tools',
  review: 'Reviews',
};
