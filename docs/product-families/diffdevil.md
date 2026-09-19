# diffdevil icon family

## Meaning

This document maps diffdevil's real product surfaces to the shared icon system. It owns the boundary between namespaced diffdevil glyphs, curated provider brands, direct Lucide references, and the compact textual glyph grammar already selected by the product.

It does not freeze the future dashboard information architecture, turn every noun into a package API, or admit unresolved candidate geometry as runtime source.

## Standing

- `diffdevil/brand` is accepted and available.
- `diffdevil/changed`, `diffdevil/raw-churn`, and `diffdevil/bands` are the first proposed product-family additions.
- The Lucide choices below are direct product-local starting points, not new shared aliases by default.
- The exact, bounded, unknown, unmeasurable, line-kind, and result-lane glyphs remain part of diffdevil's established information grammar rather than becoming decorative product icons.

The proposed family and its visual evidence live in [`fixtures/reviews/diffdevil-family/`](../../fixtures/reviews/diffdevil-family/).

## Product grounding

The map follows current product sources rather than guessing from a generic dashboard kit:

- [diffdevil branding](https://github.com/Wolfsblvt/diffdevil/blob/main/docs/BRANDING.md) defines the product as composable diff analysis and policy, not a PR-size labeler.
- [Identity and Surface Grammar](https://github.com/Wolfsblvt/diffdevil/blob/main/design/README.md) establishes the `=`, `≈`, `?`, `∅`, `+`, `−`, `~`, `■`, `▣`, `§`, `→`, and `⟲` information language.
- [The public website room](https://github.com/Wolfsblvt/emergency-meeting/issues/475) owns the website, manual, Playground, shared shell, and reusable icon seam.
- [The dashboard room](https://github.com/Wolfsblvt/emergency-meeting/issues/476) owns installation, repository, effective-policy, check-detail, history, usage, export, deletion, and operating-state journeys.
- [The browser-extension room](https://github.com/Wolfsblvt/emergency-meeting/issues/496) owns the compact GitHub projection, report popover, settings application, policy provenance, App standing, and cache/diagnostic surfaces.
- [The App contract](https://github.com/Wolfsblvt/diffdevil/blob/main/docs/integration/github-app.md) preserves the shared engine and policy meaning behind the later authenticated application.

## Selection rule

Use the narrowest source that tells the truth:

1. Use `diffdevil/brand` for product identity.
2. Author a namespaced diffdevil glyph only when the meaning is genuinely product-specific and an ordinary Lucide icon would blur or replace that meaning.
3. Use a curated brand entry for a provider identity such as GitHub or Discord.
4. Use a direct `lucide:<slug>` reference for ordinary interface actions, navigation, objects, and status concepts.
5. Keep established textual evidence glyphs as text-plus-word-plus-border components. Do not redraw them as little logos.

A repeated icon in diffdevil does not automatically deserve a shared UI alias. Promote it only when several Works products use the same meaning and centralizing it prevents drift.

## Proposed custom product family

### `diffdevil/brand`

**Meaning:** compact diffdevil identity.

**Useful surfaces:** the extension's `Changed` trigger, website or App product provenance, and compact social or provider slots.

**Why custom:** this is product identity, not a generic interface action. The accepted centre-seam glyph preserves the established horned split face and `− / +` eyes.

### `diffdevil/changed`

**Meaning:** replacement-aware changed positions.

**Useful surfaces:** website metric cards, Playground summaries, report sections, extension report content, and dashboard analysis cards.

**Why custom:** `file-diff` says that a diff exists. It does not distinguish replacement-aware `Changed` from raw churn.

**Geometry intent:** a scan frame contains separate `+` and `−` facts. Wolf already recognized this silhouette during the brand-glyph exploration as meaning “Changed.” That was the correct semantic job even though it was the wrong brand icon.

### `diffdevil/raw-churn`

**Meaning:** raw additions and deletions counted independently.

**Useful surfaces:** comparison cards, settings, reports, diagnostics, and dashboard analysis detail.

**Why custom:** a generic plus/minus icon does not preserve the deliberate two-row “both sides count” meaning.

**Geometry intent:** two independent evidence rows keep the upper `+` and lower `−` visibly separate. The mark must not suggest replacement pairing, cancellation, or one modified-line count.

### `diffdevil/bands`

**Meaning:** a configured numeric band scale and selected position.

**Useful surfaces:** policy-band cards, band-editor entry points, extension settings, and dashboard policy summaries.

**Why custom:** a chart implies an observed trend and a gauge implies a score or health. Bands are declared ordinal policy ranges.

**Geometry intent:** a segmented neutral rail carries a position marker. The source glyph represents the configured-scale concept; the live component still renders the actual number of bands and selected or unresolved standing.

These three proposed glyphs are a family of product meanings, not three alternatives for one slot.

## Existing information grammar stays textual

The accepted Surface Grammar already carries these meanings more precisely than another pictogram would:

- **Exact evidence:** `=` beside the visible word and border.
- **Bounded evidence:** `≈`, already compact, conventional, and semantically exact.
- **Unknown evidence:** `?`, with visible context distinguishing unknown evidence from help.
- **Unmeasurable evidence:** `∅`, an evidence result rather than a disabled-state icon.
- **Added, deleted, and modified lines:** `+`, `−`, and `~` across reports and controls.
- **Summary, detail, rule, effect, and retry lanes:** `■`, `▣`, `§`, `→`, and `⟲` as the established compact presentation grammar.

Every occurrence still pairs the glyph with a visible word and border where the Surface Grammar requires it. Color never carries the meaning alone.

## Public website, manual, and Playground map

Use direct Lucide references for ordinary shell and navigation concepts:

- **Home:** `lucide:house`.
- **Documentation:** `lucide:book-open`.
- **Playground:** `lucide:flask-conical`, because this is an experiment and configuration workbench rather than production status.
- **Examples:** `lucide:library`, for the curated reproducible catalogue rather than a generic folder.
- **App or dashboard:** `lucide:layout-dashboard`.
- **Search:** `lucide:search`.
- **Settings:** `lucide:settings`; the existing semantic alias may be used where appropriate.
- **Light, dark, and automatic theme:** `lucide:sun`, `lucide:moon`, and `lucide:monitor`.
- **Responsive menu:** `lucide:menu`.
- **Copy commands, links, reports, or configuration:** `lucide:copy`.
- **Download or export:** `lucide:download`.
- **External destination:** `lucide:external-link`, only when the destination leaves the current product surface.
- **GitHub and Discord:** the curated `github` and `discord` brand entries rather than another hardcoded local copy.

The three-state theme control keeps visible labels or an accessible group name. Icon-only shell controls retain accessible names on the controls themselves.

## Product capability map

Use ordinary Lucide icons where the concept is not unique to diffdevil:

- **Diff source or comparison:** `lucide:file-diff`. Use `diffdevil/changed` only for the replacement-aware metric.
- **CLI or terminal view:** `lucide:terminal`.
- **TypeScript package or library:** `lucide:package`.
- **Coding-agent view or Skill:** `lucide:bot`, keeping agent identity separate from diffdevil product identity.
- **GitHub Action or effect pipeline:** `lucide:workflow`.
- **Structured JSON report or contract:** `lucide:file-json`.
- **Checks and rule results:** `lucide:list-checks`.
- **Plan or effect sequence:** `lucide:workflow`; the visible word still distinguishes plan from apply.
- **Labels and label definitions:** `lucide:tag`.
- **Owned comments and templates:** `lucide:message-square-text`.
- **General policy configuration:** `lucide:sliders-horizontal`. Use `diffdevil/bands` only for the band-scale concept.
- **Base/head or policy-origin comparison:** `lucide:git-compare-arrows`.

## Browser-extension map

The compact GitHub projection keeps `diffdevil/brand` immediately before visible `Changed` text. It does not replace that brand glyph with `diffdevil/changed`; identity and metric meaning are separate jobs.

Use:

- `diffdevil/brand` for compact product provenance.
- `diffdevil/changed` for replacement-aware metric cards or report sections.
- `diffdevil/raw-churn` for raw churn display and its setting.
- `diffdevil/bands` for band policy and editor entry points.
- `lucide:settings` for the options application.
- `lucide:file-text` for the persistent report popover.
- `lucide:badge-check` plus visible `App` text for an exact current App result.
- `lucide:timeline` plus visible standing for a stale or past result.
- `lucide:laptop` plus visible `local` text for local-only analysis.
- `lucide:database` for rebuildable cache data.
- `lucide:triangle-alert` plus actionable text for errors or invalid repository policy.

## Dashboard and managed-App map

The authenticated application should use familiar interface icons for its journeys:

- **Overview:** `lucide:layout-dashboard`.
- **Installation:** `lucide:plug`.
- **Repository:** `lucide:folder-git-2`.
- **Organization:** `lucide:building-2`.
- **Effective policy:** `lucide:sliders-horizontal`.
- **Origin, inheritance, and override provenance:** `lucide:git-compare-arrows`.
- **Current and past analyses:** `lucide:list-checks`.
- **Quantitative history:** `lucide:timeline`.
- **Usage or entitlement:** `lucide:gauge`.
- **Privacy and protected data:** `lucide:shield-check`.
- **Export:** `lucide:download`.
- **Delete, offboard, or reset:** `lucide:trash-2`.
- **Operating warning:** `lucide:triangle-alert` plus explicit standing.

Charts, rails, tables, coverage gaps, ranges, and exact or bounded evidence remain typed components. A static icon must not become the only carrier of those semantics.

## Usage rules

- Product glyphs inherit `currentColor`; magenta remains interaction and identity emphasis, not evidence status.
- Keep visible labels beside navigation and product meanings at ordinary density. Icon-only controls require an accessible name on the control.
- Do not use `diffdevil/brand` as a generic “run,” “analyze,” or “success” icon.
- Do not use `diffdevil/changed` for raw additions or deletions.
- Do not use `diffdevil/bands` as the live rail. It is the entry-point or concept glyph; the real rail reflects configured bands.
- Do not infer risk, importance, quality, or merge readiness from any metric icon.
- Direct Lucide references may change during product-local design before release. Namespaced product icons become compatibility-bearing package API once admitted.
- GitHub Marketplace Action branding remains limited to GitHub's supported icon vocabulary. A custom package glyph cannot be placed there merely because the package owns one.

## Admission consequence

After Wolf accepts or revises the three proposed glyphs, promote only accepted geometry into:

```text
src/icons/products/diffdevil/
src/metadata/products/diffdevil/
src/generated/custom-icons.ts
```

Then add the names to the product catalogue, regenerate runtime data, extend the real Astro consumer, and inspect the normal package contact sheet. Until that explicit selection, the review candidates remain outside runtime source.
