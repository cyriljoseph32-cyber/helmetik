# Graph Report - helmetik  (2026-08-31)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 344 nodes · 862 edges · 16 communities (12 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `279e8b3c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13

## God Nodes (most connected - your core abstractions)
1. `isLocale()` - 37 edges
2. `getDictionary()` - 32 edges
3. `Dictionary` - 31 edges
4. `Locale` - 23 edges
5. `href()` - 23 edges
6. `buildMetadata()` - 21 edges
7. `compilerOptions` - 19 edges
8. `Container()` - 16 edges
9. `Section()` - 12 edges
10. `siteUrl()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `pathFor()` --calls--> `isLocale()`  [EXTRACTED]
  src/components/layout/LanguageSwitcher.tsx → src/i18n/config.ts
- `NotFound()` --calls--> `isLocale()`  [EXTRACTED]
  src/app/[locale]/not-found.tsx → src/i18n/config.ts
- `NotFound()` --calls--> `getDictionary()`  [EXTRACTED]
  src/app/[locale]/not-found.tsx → src/i18n/index.ts
- `robots()` --calls--> `siteUrl()`  [EXTRACTED]
  src/app/robots.ts → src/lib/seo.ts
- `PricingPage()` --calls--> `href()`  [EXTRACTED]
  src/app/[locale]/pricing/page.tsx → src/i18n/routes.ts

## Import Cycles
- None detected.

## Communities (16 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (26): metadata, viewport, NotFound(), robots(), sitemap(), BrandMark(), Logo(), Footer() (+18 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (27): ContactMethods(), ContactForm(), onSubmit(), Status, Field(), Honeypot(), Select(), TextArea() (+19 more)

### Community 2 - "Community 2"
Cohesion: 0.13
Nodes (22): HowItWorksPage(), Faq(), FullCycleStrip(), cleanScope, compatibility, FullCycleStep, fullCycleSteps, HelmetType (+14 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (20): contentType, size, contentType, size, alt, contentType, size, ComparisonTable() (+12 more)

### Community 4 - "Community 4"
Cohesion: 0.20
Nodes (12): PageHeader(), PlanCards(), ConversionBlock(), HostBlock(), Reassurance(), ReviewsPlaceholder(), Cta(), Reveal() (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.14
Nodes (29): AboutPage(), generateMetadata(), ContactPage(), generateMetadata(), generateMetadata(), PartnersPage(), generateMetadata(), LocaleLayout() (+21 more)

### Community 6 - "Community 6"
Cohesion: 0.07
Nodes (29): dom, dom.iterable, esnext, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx (+21 more)

### Community 7 - "Community 7"
Cohesion: 0.15
Nodes (16): GeoState, LocationsExplorer(), requestNearest(), LocationsMap, DARK_STYLE, loadGoogleMaps(), LocationsMap(), pinIcon() (+8 more)

### Community 8 - "Community 8"
Cohesion: 0.09
Nodes (22): leaflet, next, dependencies, leaflet, next, react, react-dom, react-leaflet (+14 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (21): eslint, eslint-config-next, @eslint/eslintrc, devDependencies, eslint, eslint-config-next, @eslint/eslintrc, tailwindcss (+13 more)

### Community 10 - "Community 10"
Cohesion: 0.43
Nodes (6): clientIp(), hits, POST(), rateLimited(), runtime, sendEmail()

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (4): compat, __dirname, eslintConfig, __filename

## Knowledge Gaps
- **85 isolated node(s):** `Status`, `Status`, `Variant`, `ContactInput`, `HostInput` (+80 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 125 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Dictionary` connect `Community 2` to `Community 0`, `Community 1`, `Community 3`, `Community 4`, `Community 7`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `isLocale()` connect `Community 5` to `Community 0`, `Community 2`, `Community 4`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `getDictionary()` connect `Community 5` to `Community 0`, `Community 2`, `Community 4`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `Status`, `Status`, `Variant` to the rest of the system?**
  _85 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09343200740055504 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08637873754152824 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1253968253968254 - nodes in this community are weakly interconnected._