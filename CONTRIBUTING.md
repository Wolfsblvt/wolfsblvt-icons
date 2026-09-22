# Contributing

## Meaning

This guide explains how public contributions can improve `@wolfsblvt/icons` without bypassing its catalogue, visual, provenance, or licensing boundaries. It owns the ordinary fork-and-pull-request route and the evidence expected from a contribution; it does not promise that every proposed icon, source, or feature will be accepted.

## Before changing the package

Read the maintained source that owns the boundary you are changing:

- [`docs/icon-standard.md`](docs/icon-standard.md) for naming, SVG geometry, brand admission, and visual review;
- [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) for exact bootstrap and verification commands;
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for catalogue and adapter boundaries; and
- [`third-party-notices.md`](third-party-notices.md) for current upstream material.

A direct Lucide icon does not need a new shared alias merely because one consumer uses it. A brand cannot enter the curated catalogue without current source, licence, trademark, guideline, and redistribution metadata. Do not submit copied path data as original work.

## Development route

1. Fork the repository and create a focused branch.
2. Install dependencies with `npm ci` once the package lock is present.
3. Make the smallest coherent change that preserves the public naming and provenance contracts.
4. Run `npm test` from the repository root.
5. For visual changes, inspect `fixtures/contact-sheet.html` at every required size and surface mode.
6. Open a pull request against `main` with the changed behavior, evidence, and any remaining visual or legal uncertainty.

Pull requests should remain focused. Publication, releases, package ownership, repository settings, and final brand choices are maintainer effects rather than ordinary contribution cleanup.

## Original work and third-party material

By contributing original code, documentation, or glyph geometry, you agree that it may be distributed under the repository’s MIT licence. Identify any third-party source or inspiration that could affect copyright, trademark, redistribution, or originality standing. A dependency licence does not automatically permit every use of the brands represented by its icon data.

## Reporting sensitive problems

Do not place credentials, private data, or an exploitable unpublished vulnerability in a public issue. Until this repository exposes a verified private vulnerability-reporting route, contact the maintainer through the public Wolfsblvt profile without including sensitive details and wait for a private channel to be established.
