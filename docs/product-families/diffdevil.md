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

| Public name | Meaning | First useful surfaces | Why Lucide is insufficient |
| --- | --- | --- | --- |
| `diffdevil/brand` | Compact diffdevil identity | Extension `Changed` trigger, website/App product provenance, social or provider slots | This is product identity, not a generic interface action. |
| `diffdevil/changed` | Replacement-aware changed positions | Website metric cards, Playground summaries, report sections, dashboard analysis cards | `file-diff` says “a diff exists”; it does not distinguish replacement-aware `Changed` from raw churn. |
| `diffdevil/raw-churn` | Raw additions and deletions counted independently | Comparison cards, settings, reports, diagnostics, dashboard analysis detail | A generic plus/minus icon does not preserve the deliberate two-row “both sides count” meaning. |
| `diffdevil/bands` | Configured numeric band scale and selected position | Policy-band cards, band editor entry points, extension settings, dashboard policy summaries | A chart or gauge implies a measured trend or score; bands are declared ordinal policy ranges. |

### Geometry intent

**Changed** reuses the strongest concept from the original brand-glyph exploration: a scan frame containing separate `+` and `−` facts. Wolf explicitly recognized that geometry as meaning “Changed,” which was the correct semantic job even though it was the wrong brand icon.

**Raw churn** uses two independent evidence rows. The upper `+` and lower `−` remain visibly separate so the mark never suggests replacement pairing, cancellation, or a single modified-line count.

**Bands** uses a segmented neutral rail with a position marker. The source glyph represents the concept of a configured scale; the live component must still render the actual configured number of bands and selected or unresolved standing.

These three glyphs are a family of product meanings, not three alternatives for one slot.

## Existing information grammar stays textual

| Meaning | Selected grammar | Why it remains text/glyph rather than a product icon |
| --- | --- | --- |
| Exact evidence | `=` | Evidence status must remain visible beside its word and border, not become a decorative badge. |
| Bounded evidence | `≈` | The approximation mark is already compact, conventional, and semantically exact. |
| Unknown evidence | `?` | The word and context distinguish “unknown” from help or missing documentation. |
| Unmeasurable evidence | `∅` | This is an evidence result, not a disabled-state icon. |
| Added / deleted / modified | `+` / `−` / `~` | These are the canonical line-kind symbols across reports and controls. |
| Summary / detail / rule / effect / retry lanes | `■` / `▣` / `§` / `→` / `⟲` | These glyphs form an established compact presentation grammar and should not be replaced by pictograms. |

Every occurrence still pairs the glyph with a visible word and border where the Surface Grammar requires it. Color never carries the meaning alone.

## Public website, manual, and Playground map

| Surface meaning | Preferred source | Notes |
| --- | --- | --- |
| Home | `lucide:house` | Ordinary navigation. |
| Documentation | `lucide:book-open` | Starlight/manual entry. |
| Playground | `lucide:flask-conical` | Experiment and configuration workbench, not production status. |
| Examples | `lucide:library` | Curated reproducible examples, not a generic folder. |
| App / dashboard | `lucide:layout-dashboard` | Authenticated application entry. |
| Search | `lucide:search` | Shared header and docs search. |
| Settings | `lucide:settings` | Existing semantic alias may be used where appropriate. |
| Light / dark / automatic theme | `lucide:sun`, `lucide:moon`, `lucide:monitor` | The three-state control keeps visible labels or an accessible group name. |
| Menu | `lucide:menu` | Responsive shell only. |
| Copy | `lucide:copy` | Commands, links, reports, and configuration. |
| Download / export | `lucide:download` | Released assets, reports, plans, and history exports. |
| External destination | `lucide:external-link` | Use only when the destination actually leaves the current product surface. |
| GitHub / Discord | curated `github` / `discord` brands | Do not hardcode another local copy. |

## Product capability map

| Product concept | Preferred source | Notes |
| --- | --- | --- |
| Diff source or comparison | `lucide:file-diff` | Generic source/input concept. Use `diffdevil/changed` only for the replacement-aware metric. |
| CLI / terminal view | `lucide:terminal` | Human or scalar shell use. |
| TypeScript package / library | `lucide:package` | Package and API entry points. |
| Coding-agent view or Skill | `lucide:bot` | Keep agent identity separate from diffdevil product identity. |
| GitHub Action / effect pipeline | `lucide:workflow` | Generic automation route. |
| Structured report / data | `lucide:file-json` | JSON report or contract, not a human report heading. |
| Checks and rule results | `lucide:list-checks` | Ordinary result list. |
| Plan or effect sequence | `lucide:workflow` | The visible word must still distinguish plan from apply. |
| Labels | `lucide:tag` | Label assignment or definition. |
| Owned comments | `lucide:message-square-text` | Comment lifecycle and templates. |
| Policy configuration | `lucide:sliders-horizontal` | General policy settings; use `diffdevil/bands` for the band-scale concept. |
| Source or policy comparison | `lucide:git-compare-arrows` | Base/head or origin comparison. |

## Browser-extension map

| Extension surface | Preferred source |
| --- | --- |
| Compact product provenance | `diffdevil/brand` |
| Replacement-aware metric cards or report sections | `diffdevil/changed` |
| Raw churn display or setting | `diffdevil/raw-churn` |
| Band policy and editor entry | `diffdevil/bands` |
| Options application | `lucide:settings` |
| Persistent report popover | `lucide:file-text` |
| Exact current App result | `lucide:badge-check` plus visible `App` text |
| Stale or past result | `lucide:timeline` plus visible standing |
| Local-only analysis | `lucide:laptop` plus visible `local` text |
| Cache and stored rebuildable data | `lucide:database` |
| Error or invalid repository policy | `lucide:triangle-alert` plus actionable text |

The compact GitHub projection keeps `diffdevil/brand` immediately before visible `Changed` text. It does not replace that brand glyph with `diffdevil/changed`; identity and metric meaning are separate jobs.

## Dashboard and managed-App map

| Dashboard journey | Preferred source |
| --- | --- |
| Overview | `lucide:layout-dashboard` |
| Installation | `lucide:plug` |
| Repository | `lucide:folder-git-2` |
| Organization | `lucide:building-2` |
| Effective policy | `lucide:sliders-horizontal` |
| Origin / inheritance / override provenance | `lucide:git-compare-arrows` |
| Current and past analyses | `lucide:list-checks` |
| Quantitative history | `lucide:timeline` |
| Usage / entitlement | `lucide:gauge` |
| Privacy and protected data | `lucide:shield-check` |
| Export | `lucide:download` |
| Delete / offboard / reset | `lucide:trash-2` |
| Operating warning | `lucide:triangle-alert` plus explicit standing |

Charts, rails, tables, coverage gaps, ranges, and exact/bounded evidence remain typed components. A static icon must not become the only carrier of those semantics.

## Usage rules

- Product glyphs inherit `currentColor`; magenta remains interaction and identity emphasis, not evidence status.
- Keep visible labels beside navigation and product meanings at ordinary density. Icon-only controls require an accessible name on the control.
- Do not use `diffdevil/brand` as a generic “run,” “analyze,” or “success” icon.
- Do not use `diffdevil/changed` for raw additions/deletions.
- Do not use `diffdevil/bands` as the live rail. It is the entry-point or concept glyph; the real rail reflects configured bands.
- Do not infer risk, importance, quality, or merge readiness from any metric icon.
- Direct Lucide references may change during product-local design before release. Namespaced product icons are compatibility-bearing package API once admitted.

## Admission consequence

After Wolf accepts or revises the three proposed glyphs, promote only the accepted geometry into:

```text
src/icons/products/diffdevil/
src/metadata/products/diffdevil/
src/generated/custom-icons.ts
```

Then add the names to the product catalogue, regenerate runtime data, extend the real Astro consumer, and inspect the normal package contact sheet. Until that explicit selection, the review candidates remain outside runtime source.
