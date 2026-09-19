# Third-party notices

## Meaning

This record identifies the upstream icon and framework material selected by `@wolfsblvt/icons`, the terms that accompany it, and the difference between dependency references and repository fixture copies. It exists to keep source provenance and trademark standing inspectable without pretending one package licence covers every mark rendered through the catalogue.

## Lucide

- **Use:** ordinary UI icon language and the `lucide:<name>` escape route
- **Dependency:** `@iconify-json/lucide` 1.2.131
- **Upstream:** [Lucide](https://lucide.dev/)
- **Licence:** ISC
- **Repository fixture copies:** `settings.svg` and `badge-check.svg`, retained only to generate visual qualification surfaces and excluded from the npm package; exact source revisions and SHA-256 hashes are recorded in [`fixtures/source-icons/manifest.json`](fixtures/source-icons/manifest.json)
- **Temporary diffdevil-family review references:** `file-diff`, `workflow`, `list-checks`, `layout-dashboard`, and `folder-git-2` geometry is embedded only in [`fixtures/reviews/diffdevil-family/surface-context.svg`](fixtures/reviews/diffdevil-family/surface-context.svg) to judge the proposed product family beside ordinary Lucide controls. All were retrieved from upstream commit `ba6751ac45d379f6359d75ef2228cff6ba96c122` on 2026-09-19. Exact source blobs are `759e6b7cb8b71d1c62e76b610646fe913ee3772d`, `20784a2ab7cedbf81fc5f8a6a8f6fcdc5d6552ea`, `602734bab9f0c9938f0e99c209ac6e7bec695810`, `8d6065453975433d10ea8b87d38b6ce8bf360dea`, and `590f06ec6c0fa36722943d4b85d2adf9d15600cf` respectively. The existing `settings` fixture is already covered above.

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
