# Decisions

## Meaning

This record carries the durable product, package, licensing, and integration choices that shape `@wolfsblvt/icons`. It preserves why the repository has this boundary and which tempting alternatives were deliberately rejected, so later maintenance does not rediscover the current shape by accident.

## Reserve custom canaries without placeholder geometry

**Date:** 2026-09-19 · **Status:** Current

The package reserves `diffdevil/brand` and `wolfsblvt/works` as planned product icons, with complete metadata and authoring homes, while shipping no geometry for either.

**Why.** The two names qualify the namespace, provenance, validation, and adapter boundaries now. Their actual silhouettes require visual judgment and comparison work that should remain inspectable rather than be disguised as repository scaffolding.

**Rejected.** Temporary generic shapes or traced favicon approximations. Once consumed, placeholders become compatibility and brand debt with astonishing efficiency.

**Reopen if.** Accepted final geometry is available through bounded visual-authoring work.

## Use one package with a framework-neutral core and Astro adapter

**Date:** 2026-09-19 · **Status:** Current

The public package is `@wolfsblvt/icons`; typed catalogue and metadata APIs remain framework-neutral, while Astro components and an `astro-icon` configuration helper are exported as an adapter.

**Why.** The first consumer needs Astro now, but catalogue identity, brand admission, licence evidence, and custom source data should survive a future second adapter without duplication.

**Rejected.** Astro-only components as the repository’s sole contract, and separate packages for UI, brands, and each product before real independent release pressure exists.

**Reopen if.** A second consumer demonstrates incompatible release, dependency, or runtime boundaries that cannot be served coherently by subpath exports.

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
