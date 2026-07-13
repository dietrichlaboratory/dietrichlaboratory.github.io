# Static images

Drop real image files here and reference them from data files or pages as
`/images/<file>` (this folder maps to the site root).

Suggested layout:

```
public/images/
├── team/       # member portraits → team.json "photo": "/images/team/name.jpg"
├── funders/    # funder logos → funding.astro
├── research/   # figures for the Research page
└── hero/       # hero background(s)
```

For images you want Astro to optimize/resize at build time, put them in
`src/assets/` instead and use Astro's `<Image />` component.
