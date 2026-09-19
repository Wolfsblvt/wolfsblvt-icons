# `diffdevil/brand` candidate review

## Status

This directory is a bounded visual-authoring surface for the unresolved `diffdevil/brand` product glyph. It contains three original monochrome candidates and a self-contained three-panel comparison fixture.

None of these files is the accepted runtime asset. This tranche deliberately does **not** create `src/icons/products/diffdevil/brand.svg`, change the product metadata from `planned`, or expose any candidate through the package catalogue.

The immediate consumer is the compact `Changed` trigger selected for [diffdevil for GitHub](https://github.com/Wolfsblvt/emergency-meeting/issues/496). The eventual glyph must inherit `currentColor`, remain secondary to the visible `Changed` text, and survive a roughly 14–16 CSS pixel slot.

## Iteration 2: translate the identity, not a feature

Wolf's first review identified the actual miss: the original candidates explained diff inspection, guarded change, or code, but did not identify **diffdevil**.

This iteration supersedes those semantic concepts. Every current candidate is instead a Lucide-like stroke translation of the existing diffdevil symbol:

- the compact horned silhouette remains;
- the `−` and `+` eyes remain;
- the split/two-half construction is retained or deliberately simplified; and
- the monochrome result should read as the quieter sibling of the full-colour micro symbol.

The design question is now how much of the existing identity should survive at 14–16 px, not which product capability the glyph should explain.

## Review surface

The review fixture is a three-panel contact sheet so each concern stays legible in GitHub's Markdown renderer:

1. [Candidate matrix](candidate-matrix.svg)
2. [Target `Changed` context](target-context.svg)
3. [Neighbour and identity references](comparison-references.svg)

![Three brand-derived diffdevil glyph candidates at interface sizes on light and dark surfaces.](candidate-matrix.svg)

![The three candidates and the full-colour micro reference inside the target GitHub-style Changed trigger.](target-context.svg)

![Lucide, curated brand, and existing diffdevil identity references.](comparison-references.svg)

Together the panels render every candidate at 14, 16, 20, 24, and 32 pixels on light and dark surfaces, inside square and circular reference containers, in the target GitHub-style trigger, and beside relevant interface, brand, and existing diffdevil references.

## Candidates

- **A · Split outline:** Two independent outlined halves preserve the construction of the existing filled symbol most literally. The tradeoff is a tighter centre and slightly more visual fragmentation at 14–16 px.
- **B · Centre seam:** One horned outline plus an explicit centre division preserves the split identity while giving the small glyph a calmer silhouette. This is the strongest balance of recognisable diffdevil identity, Lucide-like weight, and first-consumer clarity.
- **C · Minimal face:** The same horned `− / +` face without the internal seam is the lightest and most subtle. The tradeoff is losing the two-half motif that links most directly to the current mono and full-colour symbols.

**Current recommendation: B · Centre seam.** It still reads as the same horned, split `− / +` face as the existing symbol, but avoids A's cramped centre at the smallest sizes. C is the cleaner fallback when subtlety matters more than preserving the split construction.

## Candidate source contract

Each candidate source SVG follows the intended original-glyph contract:

- `viewBox="0 0 24 24"`;
- `fill="none"` and `stroke="currentColor"`;
- two-pixel stroke weight;
- round caps and joins;
- no width, height, fixed colour, transform, mask, filter, gradient, embedded text, or accessibility metadata; and
- simple path geometry with practical breathing room.

## Comparison provenance

The comparison sheet is review evidence, not a second icon catalogue.

- Lucide `file-diff`, `shield-check`, `scan-line`, and `code-xml` geometry was retrieved from `lucide-icons/lucide` commit `ba6751ac45d379f6359d75ef2228cff6ba96c122` on 2026-09-19. Exact source blob identities are recorded in the repository's third-party notice.
- GitHub and Discord reuse the repository's existing Simple Icons fixture geometry.
- The existing diffdevil mono and micro references reproduce the current symbol geometry from `Wolfsblvt/diffdevil` for comparison only. They are the identity source being translated, not runtime candidates to copy wholesale into `diffdevil/brand`.

## Selection consequence

After Wolf selects a direction or asks for a focused iteration, the chosen geometry can be refined in this review lane. Acceptance is a separate explicit step: promote only the selected glyph into the product-icon source path, update its metadata and generated runtime data, regenerate the normal contact sheet, and run the full repository verification on that exact head.
