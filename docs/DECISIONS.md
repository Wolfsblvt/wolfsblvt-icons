# Decisions

## Meaning

This record carries the durable product, package, licensing, and integration choices that shape `@wolfsblvt/icons`. It preserves why the repository has this boundary and which tempting alternatives were deliberately rejected, so later maintenance does not rediscover the current shape by accident.

## Admit custom glyphs only after visual selection

**Date:** 2026-09-19 · **Status:** Current

The package reserves custom product names without placeholder geometry. Wolf has selected and accepted the first complete family: `diffdevil/brand`, `diffdevil/changed`, `diffdevil/raw-churn`, and `diffdevil/bands` are available. `wolfsblvt/works` remains planned without geometry.

**Why.** Stable names, metadata, validation, and adapter boundaries may exist before a silhouette, but runtime geometry waits for actual visual judgment. The brand glyph preserves direct ancestry to the horned split `− / +` identity. The three capability glyphs exist only where an ordinary Lucide icon would blur a product-specific distinction: replacement-aware Changed, independent raw churn, and configured numeric bands.

**Rejected.** Temporary generic shapes, unrelated feature icons presented as brand identity, using `file-diff` as though it meant replacement-aware Changed, gauges or charts that turn bands into risk or trend, and a custom icon zoo for ordinary interface nouns. Once consumed, placeholders and blurred meanings become compatibility debt with astonishing efficiency.

**Reopen if.** A material change to an accepted diffdevil meaning, another genuinely product-specific recurring concept, or a selected final Wolfsblvt Works glyph earns bounded visual qualification and explicit product acceptance.

## Use one package with a framework-neutral core and Astro adapter

**Date:** 2026-09-19 · **Status:** Current

The public package is `@wolfsblvt/icons`; typed catalogue and metadata APIs remain framework-neutral, while Astro components and an `astro-icon` configuration helper are exported as an adapter.

**Why.** The first consumer needs Astro now, but catalogue identity, brand admission, licence evidence, and custom source data should survive a future second adapter without duplication.

**Rejected.** Astro-only components as the repository’s sole contract, and separate packages for UI, brands, and each product before real independent release pressure exists.

**Reopen if.** A second consumer demonstrates incompatible release, dependency, or runtime boundaries that cannot be served coherently by subpath exports.

## Publish packages only from the direct GitHub-hosted route

**Date:** 2026-09-22 · **Status:** Current

`@wolfsblvt/icons` publishes only through `.github/workflows/publish.yml`, triggered by a version-matching immutable tag. The steady route uses npm trusted publishing from a GitHub-hosted runner with OIDC and provenance. Because npm can configure trusted publishing only after a package exists, `0.1.0` has one CI-only bootstrap repository secret referenced only by its `v0.1.0` workflow path; that source/runtime condition is not provider-enforced tag confinement. Provider setup immediately replaces it with the trusted publisher and removes/restricts the bootstrap credential.

**Why.** Wolf selected CI-only publication. The route binds publication to inspectable source, the canonical suite, the package boundary and post-publication registry-package consumer/provenance proof while avoiding a standing local publish path or long-lived automation credential. Publication and registry verification remain independently runnable so a failed readback does not republish an immutable version.

**Rejected.** Local interactive publishing, reusable release-workflow indirection, a permanent bypass-2FA token, publishing merely because a workflow file exists, and a release controller or version-bot estate.

**Reopen if.** npm's trusted-publishing contract changes materially, or a later release needs a different concrete distribution boundary that still preserves CI-only publication and the source-to-registry evidence chain.

## Use Lucide for ordinary UI and curate brand sources

**Date:** 2026-09-19 · **Status:** Current

Shared UI aliases resolve to Lucide, with explicit `lucide:<name>` references as the escape route. Brand names resolve only through a curated catalogue, initially sourced from Simple Icons when its geometry and terms fit.

**Why.** Lucide provides a coherent ordinary interface language. Brand marks carry different provenance, trademark, and visual obligations, so unrestricted direct catalogue access would bypass the exact judgment this package exists to centralise.

**Rejected.** A closed alias for every Lucide icon, unrestricted `simple-icons:<name>` consumption through the public brand component, and a generic mirror of upstream icon collections.

**Reopen if.** A repeated real consumer need shows the direct Lucide route or curated brand boundary creates more drift than it prevents.

## Keep runtime assets local and build-time rendered

**Date:** 2026-09-19 · **Status:** Current

Consumers install icon collections locally and render SVG through `astro-icon` or generated custom icon data. The package introduces no runtime CDN, icon font, or network lookup.

**Why.** Local build inputs make output reproducible, private, cacheable, and available in static rendering without adding a client-side runtime or external availability boundary.

**Rejected.** Runtime Iconify API calls, remotely hosted SVGs, and icon-font delivery.

**Reopen if.** A future platform cannot consume static SVG data and supplies an equally private and reproducible distribution boundary.

## Separate original MIT work from third-party asset terms

**Date:** 2026-09-19 · **Status:** Current

Original code, documentation, and accepted Works-authored glyphs use MIT. Third-party icon data and marks retain their own terms, so package metadata declares `SEE LICENSE IN LICENSE.md`, with root notices and per-asset metadata.

**Why.** A single package-level MIT label would be misleading when the package deliberately selects external icon data and brand marks under different licences and trademark rules.

**Rejected.** Calling the complete package simply MIT, omitting source metadata because dependencies already contain licences, and copying full upstream collections into this repository.

**Reopen if.** Distribution changes eliminate third-party material or introduce a new asset whose terms require a different package boundary.
