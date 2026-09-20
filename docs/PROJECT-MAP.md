# Project map

## Meaning

This repository packages a framework-neutral icon catalogue, Astro presentation adapters, source and licence metadata, authored SVG validation, and generated visual evidence. This map owns where those concerns live and which entry points a contributor should use before changing catalogue or geometry behavior.

## Source layout

### Catalogue and consumer integration

- `src/catalog/` holds typed UI, brand, and product catalogues plus resolvers. Public names and selection policy remain independent from rendering components.
- `src/integration/` holds consumer configuration helpers. Framework integration policy can evolve without becoming catalogue data.
- `src/astro/` holds `UiIcon`, `BrandIcon`, and `ProductIcon`. Astro is an adapter over the shared catalogue, not its owner.

### Geometry, metadata, and generated runtime data

- `src/metadata/` holds machine-readable brand and product provenance. Licence, trademark, source, and availability truth stays inspectable beside code.
- `src/icons/` holds original or lawfully vendored custom SVG sources. Authored geometry has one controlled home and is not mixed with dependency-provided collections.
- `src/generated/` holds generated runtime data for accepted custom SVGs. Consumers receive compact data while source SVGs remain the editable authority.

### Qualification and visual evidence

- `scripts/` holds validation and deterministic generators. Repository qualification is executable and repeatable rather than hidden in contributor memory.
- `tests/` holds catalogue and SVG-contract behavior tests. Stable public behavior and rejected asset forms are preserved cheaply.
- `fixtures/` holds the generated contact sheet and small pinned upstream visual references. Optical review evidence remains outside the distributed npm package.

### Durable product guidance

- `docs/product-families/` holds product-specific icon maps and custom-versus-upstream boundaries. Designers receive reusable decisions without turning product-local Lucide choices into package API.
- `docs/` holds product, architecture, development, and icon-standard truth. Durable explanation stays distinct from implementation and active Work.

## Entry points

- **Use the package:** `src/index.ts` and the exports declared in `package.json`.
- **Use Astro components:** `src/astro/index.ts`.
- **Understand icon admission and geometry:** `docs/ICON-STANDARD.md`.
- **Understand diffdevil's family and ordinary icon map:** `docs/product-families/diffdevil.md`.
- **Add or change catalogue behavior:** `src/catalog/`.
- **Qualify the repository:** `npm test`.
- **Exercise the real Astro consumer boundary:** `npm run astro:consumer`.
- **Inspect the accepted catalogue fixture:** run `npm run fixtures`, then open `fixtures/contact-sheet.html`.

## Layout decisions worth keeping

- Upstream Lucide and Simple Icons collections stay dependencies rather than copied source estates.
- Curated selection metadata and visual fixture copies are distinct. Fixture SVGs prove presentation and never become the runtime brand source.
- Product icon names use `<product>/<icon>` while generated source keys retain the `products/` storage prefix.
- Generated files are committed when they are human review surfaces or distributed runtime data, but their source and regeneration command remain explicit.
- Unresolved geometry stays outside `src/icons/` until visual selection. Bounded review evidence belongs to the contribution that seeks admission, not the runtime package.
- Product-local Lucide choices stay direct references unless several Works products establish one shared semantic meaning.

## Related repositories

- [`Wolfsblvt/diffdevil`](https://github.com/Wolfsblvt/diffdevil) is the first intended consumer.
- [`Wolfsblvt/Wolfsblvt`](https://github.com/Wolfsblvt/Wolfsblvt) is the planned public home for the Wolfsblvt Works umbrella identity.
