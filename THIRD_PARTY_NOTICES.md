# Third-party notices

## Meaning

This record identifies the upstream icon and framework material selected by `@wolfsblvt/icons`, the terms that accompany it, and the difference between dependency references and repository fixture copies. It exists to keep source provenance and trademark standing inspectable without pretending one package licence covers every mark rendered through the catalogue.

## Lucide

- **Use:** ordinary UI icon language and the `lucide:<name>` escape route
- **Dependency:** `@iconify-json/lucide` 1.2.131
- **Upstream:** [Lucide](https://lucide.dev/)
- **Licence:** ISC
- **Repository fixture copies:** `settings.svg` and `badge-check.svg`, retained only to generate visual qualification surfaces and excluded from the npm package; exact source revisions and SHA-256 hashes are recorded in [`fixtures/source-icons/manifest.json`](fixtures/source-icons/manifest.json)
- **Temporary custom-glyph review references:** Lucide `file-diff`, `shield-check`, `scan-line`, and `code-xml` geometry is embedded in the three SVG panels under `fixtures/reviews/diffdevil-brand/` solely for unresolved visual comparison and is excluded from the npm package. The fixture was retrieved from upstream commit `ba6751ac45d379f6359d75ef2228cff6ba96c122` on 2026-09-19; exact source blobs are `759e6b7cb8b71d1c62e76b610646fe913ee3772d`, `da48f664e51be4ceb800dbe4f6c10c5e7cfa800e`, `3e8da093643cb317d181a9975cdb47090f18c259`, and `74f2299eb3e31a2ea1ce971ae8b4c64bf00ede88` respectively.

## Simple Icons

- **Use:** curated third-party brand geometry for GitHub and Discord
- **Dependency:** `@iconify-json/simple-icons` 1.2.96
- **Upstream:** [Simple Icons](https://simpleicons.org/)
- **Licence:** CC0-1.0 for the icon data
- **Repository fixture copies:** `github.svg` and `discord.svg`, retained only to generate visual qualification surfaces and excluded from the npm package; exact source revisions and SHA-256 hashes are recorded in [`fixtures/source-icons/manifest.json`](fixtures/source-icons/manifest.json)

Brand names and marks remain subject to their owners’ trademark rights and current brand guidelines. Catalogue inclusion means only that this project selected a source and recorded its standing; it does not imply sponsorship, affiliation, or endorsement.

## Astro Icon and Astro

- **Astro Icon:** adapter and build-time rendering layer, MIT licence
- **Astro:** development and component-checking host, MIT licence

Neither framework is copied into this repository. Exact resolved dependency terms remain available in the package lock and each upstream distribution.
