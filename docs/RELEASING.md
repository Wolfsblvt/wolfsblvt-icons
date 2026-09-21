# Releasing @wolfsblvt/icons

## Meaning

This guide owns the deliberate first-package-release procedure for `@wolfsblvt/icons`: the exact package, npm, tag, GitHub Release, provenance, recovery, and readback boundaries. It keeps package distribution a projection of the public GitHub source and canonical icon standard, rather than a second source of product truth.

## Release unit and standing

The release unit is the `@wolfsblvt/icons` npm package for Node and Astro developers. Its public source remains [`Wolfsblvt/wolfsblvt-icons`](https://github.com/Wolfsblvt/wolfsblvt-icons); [`ICON-STANDARD.md`](ICON-STANDARD.md) remains the canonical visual and provenance contract.

`0.1.0` is the explicitly selected first package-release candidate. It exposes the existing framework-neutral catalogue, root exports, Astro adapter, curated GitHub and Discord entries, and accepted `diffdevil/*` family. It does not promise a stable API, npm availability before publication, or the still-unavailable `wolfsblvt/works` glyph.

The release body in [`release-notes/0.1.0.md`](release-notes/0.1.0.md) is the prepared leading GitHub Release account. It is a draft until the separately authorized publication succeeds and is read back; do not copy its availability wording to a public surface before then.

## Before a release

1. Re-resolve the intended `main` commit, package version, clean source state, and the current npm scope/package standing. A package name being configured locally does not prove the scope is usable or the version is available.
2. Confirm that this exact source candidate is accepted. Later provider-effect Work must first establish and qualify one bounded GitHub-hosted publication route, including its npm trusted-publishing/OIDC boundary, before it can claim public provenance. A local source candidate does not authorize that route, npm, tag, or GitHub provider effects.
3. Run `npm ci` and `npm test`. The root proof includes the package boundary and a clean temporary Astro consumer that installs the packed tarball, builds through the installed root and Astro exports, and confirms no runtime icon CDN reference.
4. Inspect `npm pack --json --dry-run --ignore-scripts` for the exact contents. The package must include its built `dist/` output, source Astro components, `README.md`, `LICENSE.md`, `THIRD_PARTY_NOTICES.md`, and `package.json`, while excluding fixtures, tests, local build caches, and release-only documentation.
5. Re-read the draft release account against the exact candidate. Keep its limitations, installation command, copyright/licence boundary, and contributor credit truthful.

## Publish and read back

After the above source boundary is accepted, the bounded GitHub-hosted publication route is qualified, and its provider effect is separately authorized:

1. Publish the exact candidate on that qualified route using `npm publish --provenance --access public`. A local interactive 2FA publish is a different route: record provenance as absent rather than claiming that the flag supplies it.
2. Read back `@wolfsblvt/icons@0.1.0` from npm: version, public access, repository, licence, provenance attestation, tarball contents, and installability. A publish acknowledgement alone is not package availability.
3. Tag the same accepted source as `v0.1.0`, push that immutable tag, and read the remote tag back. Do not move a release tag to repair a later problem.
4. Create the GitHub Release from that tag using the exact body in [`release-notes/0.1.0.md`](release-notes/0.1.0.md), then read back the release/tag/body association. GitHub Release is the leading public account; no separate changelog or announcement estate is created here.
5. Install the published package into a fresh consumer and build the documented Astro route. This is consumer evidence after publication, distinct from the packed-tarball proof performed before it.

## Correction and recovery

An incorrect release remains historical evidence. Do not overwrite a published version, move the tag, or silently rewrite a material release claim. For an emergency package problem, deprecate the exact affected version with a concise reason, publish a corrected new version only when separately selected, and visibly annotate the corresponding GitHub Release with the replacement or mitigation. Preserve source, rights notices, and the first release body while correcting the public route.

This source-preparation candidate adds or activates no release workflow, version bot, release registry, or automatic publication. The later bounded publication Work owns its selected hosted route and qualification.
