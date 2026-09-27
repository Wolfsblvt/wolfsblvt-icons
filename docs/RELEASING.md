# Releasing @wolfsblvt/icons

## Meaning

This guide owns the deliberate release procedure for `@wolfsblvt/icons`: the exact package artifact, npm publication, immutable tag, GitHub Release, provenance/integrity, recovery, and consumer readback boundaries. It keeps distribution a projection of accepted public GitHub source and the canonical icon standard rather than a second source of product truth. Source preparation does not authorize account, registry, tag, Release, or publication effects.

## Release unit and standing

The release unit is the public `@wolfsblvt/icons` npm package for Node and Astro consumers. Its source remains [`Wolfsblvt/wolfsblvt-icons`](https://github.com/Wolfsblvt/wolfsblvt-icons); [`icon-standard.md`](icon-standard.md) remains the canonical visual and provenance contract.

`0.1.0` is the selected first package-release candidate. It exposes the existing framework-neutral catalogue, root exports, Astro adapter, curated GitHub and Discord entries, and accepted `diffdevil/*` family. It does not promise a stable API, npm availability before publication, or the still-unavailable `wolfsblvt/works` glyph.

The body in [`release-notes/0.1.0.md`](release-notes/0.1.0.md) is the prepared leading GitHub Release account. It remains a draft until publication and consumer readback succeed; do not project its availability wording before then.

## Before every release

1. Resolve the intended accepted `main` commit, exact package version, clean source state, current npm package standing, and actual namespace owner/effective maintainer rights. Local metadata does not establish any provider fact.
2. Run `npm ci` and `npm test`. The canonical proof includes package-boundary inspection and a clean temporary Astro consumer that installs the packed artifact and builds through the installed root and Astro exports.
3. Inspect `npm pack --json --dry-run --ignore-scripts`. The package includes built `dist/`, source Astro components, `README.md`, `LICENSE.md`, `third-party-notices.md`, and `package.json`; it excludes fixtures, tests, caches, and release-only documentation.
4. Re-read the release account against the exact artifact and current public contract. Keep installation, compatibility, stability, copyright/license, limitations, and contributor credit truthful.

The publishing and verification paths select Node 24 and npm **11.20.0**. That is the current maintained npm 11 line selected for the package's OIDC, trust, and attestation behavior without importing npm 12's installation-policy changes. It does not alter consumer engine requirements.

## First publication: one human-authenticated bootstrap

npm requires an existing package before Trusted Publishing or staged publishing can be configured. The Works route for this package is therefore one human-authenticated publication of the real `0.1.0` artifact, followed immediately by the repository-bound publisher used for every later release. No npm publishing token or GitHub publish secret is created. The bounded cost is explicit: `0.1.0` will not carry npm's hosted-build provenance.

Carry the first publication as one reconciled sequence:

1. Use an exact clean checkout of the accepted `main` commit. Create local tag `v0.1.0` at that commit, verify the tag and `HEAD` agree, and **do not push the tag yet**. Pushing it before npm publication would start registry verification against a package that does not exist.
2. Run the complete release checks above. Produce the exact tarball with `npm pack --json --ignore-scripts`; retain the returned filename and `integrity` value as the local artifact receipt.
3. Authenticate through `npm login --auth-type=web` and npm's 2FA route. Read back the intended account with `npm whoami`. Do not expose browser/session credentials or recovery material.
4. Publish the inspected tarball, not a newly rebuilt implicit artifact:

   ```sh
   npm publish <filename-from-pack> --access public --provenance=false
   ```

   The explicit provenance override is required because `package.json` enables provenance for ordinary later releases. It prevents a local operation from pretending it can supply GitHub-hosted provenance.

5. Reconcile the exact `@wolfsblvt/icons@0.1.0` result before any retry. Compare npm's `dist.integrity` with the retained pack manifest; inspect the public metadata/tarball and install the registry version in the clean Astro consumer.
6. Configure npm Trusted Publishing for **GitHub Actions** with owner `Wolfsblvt`, repository `wolfsblvt-icons`, workflow filename `publish.yml`, no Environment, and direct publishing allowed. Read back all additive configurations.
7. Set package publishing access to **Require two-factor authentication and disallow tokens**. No standing fallback token or repository secret remains.
8. Push the already-created immutable `v0.1.0` tag. The workflow deliberately skips publication for that one version and performs registry/integrity/consumer verification without requiring a nonexistent hosted provenance attestation.
9. Create the GitHub Release from the immutable tag using the exact prepared body, then read back the release/tag/body association.

A failed or ambiguous publish is reconciled with npm's exact package/version state before another write. Do not change the version, move the tag, or push it merely to manufacture a green run. The first-version local session is not retained as a recurring publishing route.

## Ordinary later releases: direct Trusted Publishing

For every legitimate version after `0.1.0`:

1. Accept the exact source and version through the repository's normal product/release judgment.
2. Run the canonical checks and inspect the exact package contents.
3. Create and push the immutable matching `v<package-version>` tag on accepted `main` source.
4. Observe the direct GitHub-hosted `Publish package` job. It verifies tag/version and `main` ancestry, runs the canonical package proof, and calls `npm publish --provenance --access public` through npm Trusted Publishing/OIDC. No `NODE_AUTH_TOKEN` or npm publishing secret is used.
5. The independent verification path waits boundedly for registry availability, reads exact metadata and integrity, installs the registry version in the clean Astro consumer, and verifies npm's provenance for the target package.
6. Create and read back the GitHub Release only after the package result is reconciled.

The manual workflow dispatch is verification-only for an already-published version. It never repeats publication. Configuration readback proves only configuration; the first real post-`0.1.0` release supplies end-to-end OIDC evidence.

## Registry readback and evidence

For every version, distinguish:

```text
source and tag accepted
npm accepted publication
registry package/version resolves
registry integrity and tarball are present
clean consumer installs and builds
provenance verified when that version is expected to carry it
GitHub Release presents the correct audience account
```

npm may scan a package before availability. The verification job makes 31 bounded availability attempts, 30 seconds apart, with npm's internal fetch retries disabled and a 10-second request timeout. A timeout means reconciliation and a verification-only rerun, not another publish.

`npm audit signatures --json --include-attestations` is required only for versions published through the hosted OIDC route. A successful audit of unrelated dependencies does not prove provenance for this package. `0.1.0` is intentionally verified through source/tag, exact integrity, registry artifact, and clean consumer behavior without claiming hosted provenance.

## Correction and recovery

Preserve immutable package and tag history. For an incorrect release, deprecate the exact affected version with a concise reason when authorized, publish a selected corrected version, and annotate the corresponding GitHub Release. Do not overwrite a version, move a tag, silently alter a material release claim, or treat destructive unpublishing as ordinary rollback.

Recover custody through the actual npm human/organization administrator and protected recovery route. Recovery-code sign-in can impose a 72-hour hold on publishing and sensitive writes; it is not immediate emergency release access. No recovery codes, account credentials, or publishing secrets belong in this repository.

This source candidate performs no account, organization, membership, credential, trusted-publisher, package-access, publication, tag, GitHub Release, billing, or spending effect. It adds no version bot, token broker, package database, or release-control surface.
