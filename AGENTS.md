# Wolfsblvt Icons repository instructions

## Meaning

This file carries the repository-local command surface, asset boundaries, and durable-branch integration posture for `@wolfsblvt/icons`. It exists so contributors can verify the package without reconstructing its generated-file and licensing rules from the implementation.

## Commands

- Bootstrap: `npm install`
- Build: `npm run build`
- Canonical verification: `npm test`
- Safe no-credential smoke path: `npm run fixtures`, then open `fixtures/contact-sheet.html`
- Complete local guidance: [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md)

## Repository boundaries

Do not hand-edit `src/generated/custom-icons.ts`, `fixtures/contact-sheet.html`, or `docs/assets/readme/icon-pop.svg`; run `npm run generate`. Admit brands through metadata and current redistribution evidence before exposing them through `BrandIcon`. Works-authored SVGs must satisfy [`docs/ICON-STANDARD.md`](docs/ICON-STANDARD.md). Package publication, releases, and final diffdevil or Wolfsblvt Works glyph geometry remain separately authorized effects.

## Durable branch declaration

```text
main:
  maintainer integration: direct allowed
  external contributions: PR required
  required pre-integration evidence: Tests / verify
  required approval/review: none
  resolved conversations: no
  automatic CI: Tests
  automatic retained branch effects: none
  other pre-update evidence: none
```
