# Project map

## Meaning

This repository packages a framework-neutral icon catalogue, Astro presentation adapters, source and licence metadata, authored SVG validation, and generated visual evidence. This map owns where those concerns live and which entry points a contributor should use before changing catalogue or geometry behavior.

## Layout

| Path                     | Holds                                                               | Why it is separate                                                                              |
| ------------------------ | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `src/catalog/`           | Typed UI, brand, and product catalogues plus resolvers              | Public names and selection policy remain independent from rendering components                  |
| `src/integration/`       | Consumer configuration helpers                                      | Framework integration policy can evolve without becoming catalogue data                         |
| `src/astro/`             | `UiIcon`, `BrandIcon`, and `ProductIcon` Astro components           | Astro is an adapter over the shared catalogue, not its owner                                    |
| `src/metadata/`          | Machine-readable brand and product provenance                       | Licence, trademark, source, and availability truth stays inspectable beside code                |
| `src/icons/`             | Original or lawfully vendored custom SVG sources                    | Authored geometry has one controlled home and is not mixed with dependency-provided collections |
| `src/generated/`         | Generated runtime data for custom SVGs                              | Consumers receive compact data while source SVGs remain the editable authority                  |
| `scripts/`               | Validation and deterministic generators                             | Repository qualification is executable and repeatable rather than hidden in contributor memory  |
| `tests/`                 | Catalogue and SVG-contract behavior tests                           | Stable public behavior and rejected asset forms are preserved cheaply                           |
| `fixtures/`              | Generated contact sheet and small pinned upstream visual references | Optical review evidence remains outside the distributed npm package                             |
| `fixtures/reviews/`      | Bounded unresolved visual-authoring candidates and review surfaces  | Candidate geometry can be judged without pretending it is accepted runtime source               |
| `docs/product-families/` | Product-specific icon maps and custom-versus-upstream boundaries    | Designers receive a reusable plan without turning product-local Lucide choices into package API  |
| `docs/`                  | Product, architecture, development, and icon-standard truth         | Durable explanation stays distinct from implementation and active Work                          |

## Entry points

- **Use the package:** `src/index.ts` and the exports declared in `package.json`
- **Use Astro components:** `src/astro/index.ts`
- **Understand icon admission and geometry:** `docs/ICON-STANDARD.md`
- **Understand diffdevil's family and ordinary icon map:** `docs/product-families/diffdevil.md`
- **Add or change catalogue behavior:** `src/catalog/`
- **Qualify the repository:** `npm test`
- **Exercise the real Astro consumer boundary:** `npm run astro:consumer`
- **Inspect the accepted catalogue fixture:** `npm run fixtures`, then open `fixtures/contact-sheet.html`
- **Inspect unresolved product-family work:** open the applicable directory under `fixtures/reviews/`

## Layout decisions worth keeping

- Upstream Lucide and Simple Icons collections stay dependencies rather than copied source estates.
- Curated selection metadata and visual fixture copies are distinct: fixture SVGs prove presentation and never become the runtime brand source.
- Product icon names use `<product>/<icon>` while generated source keys retain the `products/` storage prefix.
- Generated files are committed when they are human review surfaces or distributed runtime data, but their source and regeneration command remain explicit.
- Unresolved geometry stays outside `src/icons/` until visual selection. A branch may carry review fixtures without making them package truth.
- Product-local Lucide choices stay direct references unless several Works products establish one shared semantic meaning.

## Related repositories

- [`Wolfsblvt/diffdevil`](https://github.com/Wolfsblvt/diffdevil) is the first intended consumer.
- [`Wolfsblvt/Wolfsblvt`](https://github.com/Wolfsblvt/Wolfsblvt) is the planned public home for the Wolfsblvt Works umbrella identity.
