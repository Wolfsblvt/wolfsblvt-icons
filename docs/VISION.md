# Product vision

## Meaning

`@wolfsblvt/icons` is the shared visual-language package for Wolfsblvt Works products. This Vision preserves the destination: one trustworthy place where ordinary interface icons, third-party brands, and original product glyphs become coherent, reviewable choices instead of repeated one-off SVG decisions. The current document is **Provisional** until Wolf approves this exact canonical wording; the selected product direction and package boundary are already established.

## The experience

A product author should be able to ask for `settings`, `github`, or `karaokebarr/disc-burned` and receive the intended icon without knowing which file, upstream library, legal source, or optical correction sits underneath it. The name should express product meaning. The package should carry the rest.

The result should feel quietly deliberate:

- ordinary interface icons speak the familiar Lucide language;
- brand marks are curated rather than scraped from an effectively infinite catalogue;
- Wolfsblvt Works and product families have one durable home for original glyphs;
- small icon slots look related across websites and applications without flattening each product’s identity; and
- consumers receive local, build-time assets with no runtime icon CDN, font, tracking surface, or surprise network dependency.

## What this repository becomes

This repository should grow into the source of truth for:

- stable semantic UI aliases and direct Lucide references;
- admitted third-party brand marks with explicit provenance and redistribution standing;
- namespaced original icon families for individual products;
- framework-neutral catalogue and metadata APIs;
- first-class Astro components and integration helpers;
- automated structural qualification for authored SVGs; and
- visual qualification surfaces that make optical problems visible before an icon becomes shared infrastructure.

Astro is the first adapter because it is the first real consumer boundary, not because the icon catalogue should become inseparable from Astro. Future adapters should consume the same catalogue and generated icon data rather than create parallel truths.

## Product character

The system is small, precise, and opinionated. It should make the right shared choice easy while preserving an explicit escape route for product-local needs. It should prefer a few understood icons over a vast catalogue that quietly turns every consumer into its own art director.

Original glyphs should be recognisable at interface size, not miniature logos forced through a 24-pixel keyhole. Brand handling should be respectful without becoming ceremonial bureaucracy. Generated machinery should remain subordinate to the visual and product judgment it protects.

## Boundaries worth protecting

This is not:

- a generic design system;
- a mirror of Lucide, Simple Icons, or every vendor logo on the internet;
- a replacement for full product marks, favicons, or formal brand lockups;
- a licence laundering layer for third-party assets;
- a promise that every icon family will share identical geometry; or
- a reason to centralise product-specific art before a real consumer earns it.

The diffdevil and Wolfsblvt Works compact glyphs are the first custom canaries. Their namespace, metadata contract, and authoring home belong here; their final geometry remains visual-authoring work and must not be inferred from placeholders.

## Long horizon

As real consumers accumulate, the package may earn additional adapters, richer catalogue tooling, visual regression support, and stronger release compatibility promises. Those should arrive from repeated product use. The durable destination remains one coherent icon language with inspectable provenance and a low-friction path from deliberate design to ordinary product use.
