# Icon standard

## Meaning

This standard defines how `@wolfsblvt/icons` selects, names, authors, validates, reviews, and presents icons. It owns the visual contract for Works-authored geometry, the admission evidence for third-party brands, the accessibility boundary of package components, and the human qualification that automation cannot replace. `diffdevil/brand` is the first accepted product glyph; the Wolfsblvt Works canary remains reserved metadata rather than implied geometry.

## Source hierarchy

Use the narrowest source that preserves both visual coherence and truthful rights:

1. **Lucide** for ordinary interface meaning.
2. **Simple Icons** for a curated brand when its geometry and standing fit.
3. **Official vendor assets** when the vendor source is materially better or required by current guidelines and redistribution is lawful.
4. **Wolfsblvt Works-authored geometry** for products, umbrella identity, missing interface concepts, or an intentional provider-style glyph.

Do not copy another library’s path and call the result original. Do not expose a whole upstream brand catalogue merely because the dependency makes that technically cheap.

## Public naming

Names are API:

- shared semantic UI alias: `settings`, `verified`, `warning`;
- direct ordinary glyph: `lucide:badge-check`;
- curated brand: `github`, `discord`;
- original product glyph: `diffdevil/brand`, `karaokebarr/disc-burned`.

Consumers never address repository file paths. Product names use `<product>/<icon>` with stable lowercase kebab-case segments. Renaming or repurposing an admitted name is a compatibility change, not file tidying.

## Works-authored SVG contract

Every original source SVG uses:

- `viewBox="0 0 24 24"`;
- one pixel of practical breathing room around the meaningful silhouette;
- two-pixel strokes centred on the path;
- `stroke="currentColor"`;
- `stroke-linecap="round"` and `stroke-linejoin="round"`;
- `fill="none"` unless a future family explicitly establishes a reviewed fill-based contract; and
- simple path, circle, ellipse, line, polygon, polyline, or rectangle geometry.

Source SVGs do not contain:

- fixed width or height;
- fixed colours, CSS classes, inline styles, or CSS variables;
- transforms;
- filters, masks, clipping paths, gradients, patterns, or paint-server references;
- raster images, scripts, external references, or animation;
- embedded text, fonts, titles, or descriptions;
- unexplained IDs; or
- decorative micro-detail that disappears at 16 or 20 pixels.

Accessibility belongs to the consuming component and surrounding interface, not the reusable source path.

## Visual language

Original line icons should look at home beside Lucide without pretending to be upstream Lucide assets. Use Lucide as the reference for:

- optical weight and apparent rather than merely mathematical centring;
- round terminals and joins;
- restrained corner radii;
- spacing rhythm and negative space;
- silhouette density at 20 and 24 pixels; and
- the amount of detail a small interface glyph can honestly carry.

A custom product glyph may be more distinctive than a generic UI icon, but it still has to survive the same slot. Prefer one recognisable idea over a compressed logo composition. Test circles and squares around it; the mark should not appear oddly starved in one and clipped in the other.

## Visual-authoring brief for custom canaries

### diffdevil

The accepted compact glyph translates the established horned, split `− / +` identity into a monochrome Lucide-like interface mark. Its centre seam preserves the two-half construction while keeping the silhouette readable at approximately 14–16 pixels. Material revisions must retain recognisable brand ancestry, compare cleanly beside ordinary interface icons, and undergo the same bounded visual qualification as the accepted source.

### Wolfsblvt Works

The compact glyph should act as a provider or social identity for Wolfsblvt Works without replacing the formal `WOLFSBLVT / WORKS` lockup. A `WW` monogram is not automatically the answer. The shape should feel like an umbrella maker mark, remain legible beside GitHub and Discord, and avoid drifting into animal-food or pet-product imagery.

The Wolfsblvt Works constraints are not accepted geometry. Its final path requires its own bounded visual contribution.

## Brand admission metadata

Every curated brand entry records:

- stable package ID;
- selected source type;
- source and brand-guideline URLs;
- retrieval date;
- upstream package, slug, version, and exact asset revision when available;
- licence and trademark notes;
- permitted colour modes and any approved brand colour;
- modifications;
- redistribution standing and whether bytes are vendored; and
- content hash for any vendored asset bytes.

A dependency reference has no local content hash because the lockfile and upstream package own the bytes. A vendored override must record the exact bytes and evidence that redistribution is permitted.

## Human visual qualification

Before admitting an original family or a materially changed glyph, review a generated contact sheet containing:

- 16, 20, 24, and 32-pixel renderings;
- light and dark surfaces;
- square and circular reference containers when the use case includes either;
- neighbouring Lucide references with comparable density and meaning;
- the prior accepted version when changing an existing icon; and
- a short note for any intentional optical deviation.

Inspect recognisability, optical centring, stroke weight, negative space, silhouette collisions, and loss of meaning at the smallest size. A green validator cannot see that the icon looks like a distressed paperclip.

The committed contact sheet qualifies the current curated catalogue, including accepted product glyphs. Reserved product names remain unrendered until their geometry is selected.

## Accessibility

Package components default to decorative output with `aria-hidden="true"`. Use an explicit `label` only when the standalone icon itself conveys information that surrounding text or control labelling does not already provide.

- Icon-only controls need an accessible name on the control. Their icon usually remains decorative.
- Do not rely on colour or icon shape alone for state that users must understand.
- Brand marks need a label when they are the only content of a link or informative surface.
- Source SVGs contain no title or description; components create those only from consumer-provided text.

## Presentation modes

All UI and current product icons inherit `currentColor`. A brand entry may permit `monochrome`, `brand`, or both, but the component rejects modes absent from metadata. The starter GitHub and Discord entries deliberately permit monochrome only; exact official colour presentation can be added later with current brand evidence rather than remembered hex folklore.

## Validation and generation

`scripts/validate-assets.mjs` checks metadata completeness, namespace shape, availability truth, and authored SVG structure. `scripts/generate-custom-icons.mjs` validates accepted SVGs again before producing runtime data. Tests preserve known rejected forms such as transforms and fixed colours.

Automation must stay diagnostic. It should reject concrete machine-readable violations, not pretend to score visual quality, similarity, brand appropriateness, or taste.
