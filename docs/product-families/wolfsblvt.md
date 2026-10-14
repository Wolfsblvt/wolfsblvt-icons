# Wolfsblvt Works icon family

## Meaning

This document maps the Wolfsblvt Works umbrella identity to the shared icon system. It owns the meaning and boundary of
the `wolfsblvt/*` glyphs: where the compact Works mark replaces the formal lockup, where the sketched signpost carries
wayfinding, and which ordinary meanings stay with Lucide. The Works marks themselves (lockups, coloured icon, favicon,
motion) remain reserved identity owned by the Works website and its marks return, not this package.

## Standing

- `wolfsblvt/works` is accepted and available.
- `wolfsblvt/signpost` is accepted and available.

Both come from owner-selected identity work rather than a new design round. The [contact sheet](wolfsblvt-contact-sheet.svg)
shows them at 16, 20, 24 and 32 pixels on dark and light surfaces, in square and circle references, beside
`lucide:signpost` and `lucide:settings` for density.

## Accepted glyphs

### `wolfsblvt/works`

**Meaning:** compact Wolfsblvt Works identity.

**Useful surfaces:** footer and social icon rows, provider-style links to the Works site, the Works entry in the shared
contact form's project picker, and other slots where the formal `WOLFSBLVT / WORKS` lockup does not fit.

**Source:** the icon-slot translation drawn with the Works marks: the mark's two open corners (orange and magenta in
colour) and its offset dot, redrawn on the 24 grid with 2px round strokes. The package carries only the monochrome line
glyph; the coloured mark and lockups stay with the Works identity.

**Why custom:** this is the maker's identity, not an interface concept. A `WW` monogram was explicitly not the default
answer; the open corners and the off-centre dot are the mark's own construction.

### `wolfsblvt/signpost`

**Meaning:** wayfinding along a walk of sections on a Works-authored surface.

**Useful surfaces:** the Works website's personal header navigation (`Hi, What, Why, Who, Help, Whoa, Hello?`) and,
later, comparable Works wayfinding.

**Source:** option C, "Sketched", from the Works website finishing sheet, with the two upper boards narrowed and offset
so each reads on its own. Three boards (right, left, small right) on one post; the edges run slightly past their
corners like a quick pencil drawing. The hand-drawn feel lives entirely in the geometry, inside the standard's no
filter, no transform contract.

**Why custom:** the site's navigation is personal; a stock signpost would be the one generic thing in it.

## Usage rules

- Both glyphs inherit `currentColor`. Do not recolour them into the Works orange/magenta to imitate the full mark.
- Ordinary directional or route UI keeps `lucide:signpost`, `lucide:map` and friends. `wolfsblvt/signpost` is Works
  wayfinding, not a replacement signpost for every product.
- `wolfsblvt/works` beside a visible name is decorative; as the only content of a link it needs the link's accessible
  name ("Wolfsblvt Works").
- The glyph never stands in for the lockup in a page header, README title or social card.

## Runtime and consumer consequence

The accepted family is authoritative in:

```text
src/icons/products/wolfsblvt/
src/metadata/products/wolfsblvt/
src/generated/custom-icons.ts
src/catalog/products.ts
```

Consumers resolve the names through `resolveProductIcon(...)` or `<ProductIcon ... />`. Both names are now
compatibility-bearing package API.
