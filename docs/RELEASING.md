# Releasing @wolfsblvt/icons

## Meaning

This guide owns the deliberate first-package-release procedure for `@wolfsblvt/icons`: the exact package, npm, tag, GitHub Release, provenance, recovery, and readback boundaries. It keeps package distribution a projection of the public GitHub source and canonical icon standard, rather than a second source of product truth.

## Release unit and standing

The release unit is the `@wolfsblvt/icons` npm package for Node and Astro developers. Its public source remains [`Wolfsblvt/wolfsblvt-icons`](https://github.com/Wolfsblvt/wolfsblvt-icons); [`icon-standard.md`](icon-standard.md) remains the canonical visual and provenance contract.

`0.1.0` is the explicitly selected first package-release candidate. It exposes the existing framework-neutral catalogue, root exports, Astro adapter, curated GitHub and Discord entries, and accepted `diffdevil/*` family. It does not promise a stable API, npm availability before publication, or the still-unavailable `wolfsblvt/works` glyph.

The release body in [`release-notes/0.1.0.md`](release-notes/0.1.0.md) is the prepared leading GitHub Release account. It is a draft until the separately authorized publication succeeds and is read back; do not copy its availability wording to a public surface before then.

## Before a release

1. Re-resolve the intended `main` commit, package version, clean source state, and the current npm scope/package standing. A package name being configured locally does not prove the scope is usable or the version is available.
2. Confirm that this exact source candidate is accepted. Publication runs only through [the direct GitHub-hosted workflow](../.github/workflows/publish.yml): it requires an immutable `v<package-version>` tag whose commit is on `main`, checks out that tag, runs the canonical suite and package-boundary check, then publishes with provenance. A local shell is not a publication route. The same workflow also has a manually rerunnable registry-verification path for a named published version, so a failed readback never repeats an already-successful publish.
3. Run `npm ci` and `npm test`. The root proof includes the package boundary and a clean temporary Astro consumer that installs the packed tarball, builds through the installed root and Astro exports, and confirms no runtime icon CDN reference.
4. Inspect `npm pack --json --dry-run --ignore-scripts` for the exact contents. The package must include its built `dist/` output, source Astro components, `README.md`, `LICENSE.md`, `third-party-notices.md`, and `package.json`, while excluding fixtures, tests, local build caches, and release-only documentation.
5. Re-read the draft release account against the exact candidate. Keep its limitations, installation command, copyright/licence boundary, and contributor credit truthful.

## Publish and read back

After the above source boundary is accepted, its provider effects are separately authorized:

1. Re-read the accepted `main` commit and package version, then create and push the immutable matching tag, `v0.1.0`. The tag is the publication trigger and must never be moved to repair a failed release.
2. Observe the direct `Publish package` Actions run on that tag. It derives the package name/version from `package.json`, verifies the matching tag and `main` ancestry, runs `npm ci`, `npm test` and `npm run pack:check`, then invokes `npm publish --provenance --access public`. Its separate verification job reads the exact record through the public npm registry (name, version, repository, licence and tarball), installs that exact `name@version` from npm into the clean Astro consumer fixture, and asserts npm's verified provenance attestation. The workflow acknowledgement is not a substitute for those readbacks.
3. Read back `@wolfsblvt/icons@0.1.0` from npm: version, public access, repository, licence, provenance attestation, tarball contents, and installability. A publish acknowledgement alone is not package availability.
4. Create the GitHub Release from that immutable tag using the exact body in [`release-notes/0.1.0.md`](release-notes/0.1.0.md), then read back the release/tag/body association. GitHub Release is the leading public account; no separate changelog or announcement estate is created here.

## First-publication bootstrap and trusted publishing

npm can configure a trusted publisher only for a package that already exists in the registry. `@wolfsblvt/icons@0.1.0` therefore has one bounded CI-only bootstrap: before the `v0.1.0` tag is pushed, the separately authorized provider setup may place a bypass-2FA npm publish credential in the repository `NPM_PUBLISH_TOKEN` secret. The workflow references that secret only on the `v0.1.0` publication path; this is source/runtime scoping, not GitHub provider enforcement that confines a repository secret to one tag. It never enables local publication.

Immediately after the registry and consumer readbacks succeed, configure npm trusted publishing for `Wolfsblvt/wolfsblvt-icons` and the exact workflow filename `publish.yml`, allowing direct `npm publish`. Read that provider setting back, delete `NPM_PUBLISH_TOKEN`, and restrict traditional token publishing in npm's package settings. The next release must use GitHub-hosted OIDC with `id-token: write`; provenance is then automatic for this public package from this public repository. A workflow file alone does not prove the trusted publisher is configured.

## Correction and recovery

An incorrect release remains historical evidence. Do not overwrite a published version, move the tag, or silently rewrite a material release claim. For an emergency package problem, deprecate the exact affected version with a concise reason, publish a corrected new version only when separately selected, and visibly annotate the corresponding GitHub Release with the replacement or mitigation. Preserve source, rights notices, and the first release body while correcting the public route.

This source-preparation candidate adds the direct release workflow but performs no publication, credential, trusted-publisher, tag, GitHub Release, or package-access provider effect. It adds no version bot, release registry, or release-control surface.
