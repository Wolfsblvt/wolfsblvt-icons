# Development

## Meaning

This guide explains how to develop, validate, and package `@wolfsblvt/icons` from a clean checkout. It owns the reproducible Node/npm bootstrap, the canonical verification command, generated-file handling, and the ordinary paths for changing aliases, brands, and custom SVGs without confusing runtime sources with review fixtures.

## Prerequisites

- **Node.js 22.12 or newer.** The package keeps that consumer floor; repository CI uses Node 24 so the current development dependency graph runs without older-22.x engine warnings.
- **npm 10 or newer.** The committed npm lockfile is the reproducible dependency authority for repository verification.

No credentials, local services, browser runtime, or global package installation is required.

## Bootstrap

```bash
npm install
```

For ordinary development after the first resolution, prefer the reproducible route:

```bash
npm ci
```

## Run and test

| Task                                             | Command                               |
| ------------------------------------------------ | ------------------------------------- |
| Canonical repository verification                | `npm test`                            |
| Build TypeScript declarations and JavaScript     | `npm run build`                       |
| Check Astro components                           | `npm run astro:check`                 |
| Build the real Astro consumer fixture            | `npm run astro:consumer`              |
| Check repository-local documentation links       | `npm run docs:check`                  |
| Run focused behavior tests after a build         | `npm run build && npm run test:unit`  |
| Validate metadata and authored SVGs              | `npm run validate`                    |
| Regenerate all committed artifacts               | `npm run generate`                    |
| Verify generated artifacts without changing them | `npm run generate:check`              |
| Generate the visual fixture                      | `npm run fixtures`                    |
| Inspect npm package contents                     | `npm run build && npm run pack:check` |
| Apply formatting                                 | `npm run format`                      |
| Remove build output                              | `npm run clean`                       |

`npm test` is the root proof surface. It checks formatting, builds TypeScript, checks the package Astro components, builds a real static consumer through the public package exports, verifies that consumer emits local inline SVG rather than runtime CDN references, runs deterministic contract tests, validates asset metadata and authored SVG rules, compares generated artifacts, checks repository-local documentation links, and validates the npm package boundary.

## Visual review

Run:

```bash
npm run fixtures
```

Then open `fixtures/contact-sheet.html`. It renders the starter catalogue at 16, 20, 24, and 32 pixels on light and dark surfaces. The generated file is review evidence, not a hosted application.

Custom icon families require additional human comparison described in [`icon-standard.md`](icon-standard.md). Passing the structural validator is necessary and deliberately insufficient.

## Generated artifacts

| Path                              | Source                           | Rule                                                      |
| --------------------------------- | -------------------------------- | --------------------------------------------------------- |
| `dist/`                           | `src/**/*.ts` via TypeScript     | Never commit; publication builds it                       |
| `src/generated/custom-icons.ts`   | `src/icons/**/*.svg`             | Commit; never hand-edit                                   |
| `fixtures/contact-sheet.html`     | `fixtures/source-icons/**/*.svg` | Commit; never hand-edit                                   |
| `docs/assets/readme/icon-pop.svg` | Same visual fixture sources      | Commit; never hand-edit                                   |
| `package-lock.json`               | npm resolution                   | Commit and update through npm, never reconstruct manually |

## Add a UI alias

1. Add one semantic alias to `src/catalog/ui.ts`.
2. Prefer an existing Lucide glyph whose meaning is already conventional.
3. Add or update a behavior test when the alias carries shared meaning worth preserving.
4. Run `npm test`.

A one-off Lucide glyph does not need a central alias. Consumers can use `lucide:<name>` and add the slug through `createAstroIconOptions`.

## Admit a brand

1. Confirm the product genuinely needs a shared brand icon rather than unrestricted upstream access.
2. Evaluate Simple Icons first, then an official vendor source when geometry or terms require it.
3. Add complete metadata under `src/metadata/brands/`.
4. Add the typed catalogue entry and `astro-icon` include slug.
5. Add a visual fixture only when it materially improves review; do not grow a second vendored brand catalogue under `fixtures/`.
6. Update `third-party-notices.md` when distributed terms or copied material change.
7. Run `npm test` and inspect the contact sheet.

## Add a Works-authored product icon

1. Read [`icon-standard.md`](icon-standard.md).
2. Author `src/icons/products/<product>/<name>.svg` without width, height, fixed colour, transforms, or embedded accessibility text.
3. Add matching metadata and set its status to `available` only when the geometry is accepted.
4. Run `npm run generate`.
5. Add behavior coverage where availability or naming changes.
6. Inspect the icon beside Lucide references at all required sizes and both surface modes.
7. Run `npm test`.

## Safe reset

```bash
npm run clean
```

This removes only build caches and package archives. It does not remove dependencies, the package lock, authored SVGs, metadata, or committed visual fixtures.

## Release boundary

The source candidate is `0.1.0`, but it is not npm-published. Publication, scope verification, provenance, tag creation, and GitHub Release creation are separate provider effects. [`RELEASING.md`](RELEASING.md) owns the exact procedure, post-publication readback, and draft release account; do not perform those effects as ordinary development cleanup.
