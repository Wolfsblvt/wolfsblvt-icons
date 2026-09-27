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

npm requires an existing package before Trusted Publishing or staged publishing can be configured. The Works route for this package is therefore one human-authenticated publication of the real `0.1.0` artifact, followed immediately by the repository-bound publisher used for every later release. No separate CI publishing token or GitHub publish secret is created. `npm login` creates a local authenticated credential with publishing rights; its custody is part of this first operation. The bounded cost is explicit: `0.1.0` will not carry npm's hosted-build provenance.

Carry the first publication as one reconciled sequence:

1. Use an exact clean checkout of the accepted `main` commit. Create local tag `v0.1.0` at that commit, verify the tag and `HEAD` agree, and **do not push the tag yet**. Pushing it before npm publication would start registry verification against a package that does not exist.
2. Run the complete release checks above. Produce the exact tarball with `npm pack --json --ignore-scripts`; retain the returned filename and `integrity` value as the local artifact receipt.
3. Select a protected, separate npm user configuration path outside the repository for this bounded operation. Set `NPM_CONFIG_USERCONFIG` to that path in the operator shell before `npm login --auth-type=web`, and keep it selected for `npm whoami`, publication, and trust setup. This preserves any pre-existing workstation configuration, including the currently rejected CLI credential. Authenticate through npm's browser and 2FA route, then read back the intended account with `npm whoami`. Do not display the configuration, session credential, or recovery material.
4. Publish the inspected tarball, not a newly rebuilt implicit artifact:

   ```sh
   npm publish <filename-from-pack> --access public --provenance=false
   ```

   The explicit provenance override is required because `package.json` enables provenance for ordinary later releases. It prevents a local operation from pretending it can supply GitHub-hosted provenance.

5. Reconcile the exact `@wolfsblvt/icons@0.1.0` result before any retry. Compare npm's `dist.integrity` with the retained pack manifest; inspect the public metadata/tarball and install the registry version in the clean Astro consumer.
6. Configure npm Trusted Publishing for **GitHub Actions** with owner `Wolfsblvt`, repository `wolfsblvt-icons`, workflow filename `publish.yml`, no Environment, and direct publishing allowed. Read back all additive configurations.
7. Set package publishing access to **Require two-factor authentication and disallow tokens**. No standing fallback CI token or repository secret remains.
8. After trust and access readback, end the bounded local login with `npm logout` under the same `NPM_CONFIG_USERCONFIG`. Confirm `npm whoami` no longer authenticates there. npm logout invalidates the token-backed session; removing a local file alone would not revoke it. If a human administration session is deliberately retained instead, name its custodian, rights, and recovery posture in the [icons publication Return](https://github.com/Wolfsblvt/emergency-meeting/issues/529). It is not the recurring release publisher.
9. Push the already-created immutable `v0.1.0` tag. The workflow deliberately skips publication for that one version and performs registry/integrity/consumer verification without requiring a nonexistent hosted provenance attestation.
10. Create the GitHub Release from the immutable tag using the exact prepared body, then read back the release/tag/body association.

A failed or ambiguous publish is reconciled with npm's exact package/version state before another write. Do not change the version, move the tag, or push it merely to manufacture a green run. Preserve the isolated login's custody until the authorized attempt and trust setup are reconciled, then carry step 8; do not silently leave a local publishing capability behind.

## Ordinary later releases: direct Trusted Publishing

For every legitimate version after `0.1.0`:

1. Accept the exact source and version through the repository's normal product/release judgment.
2. Run the canonical checks and inspect the exact package contents.
3. Create and push the immutable matching `v<package-version>` tag on accepted `main` source.
4. Observe the direct GitHub-hosted `Publish package` job. It verifies tag/version and `main` ancestry, runs the canonical package proof, and calls `npm publish --provenance --access public` through npm Trusted Publishing/OIDC. No `NODE_AUTH_TOKEN` or npm publishing secret is used.
5. The independent verification path waits boundedly for registry availability, reads exact metadata and integrity, installs the registry version in the clean Astro consumer, and verifies that npm supplied a valid provenance attestation for the target package. Its green result does not compare the attestation's source identity with this release.
6. Before claiming source association or creating the GitHub Release, inspect [npm's verified provenance view](https://docs.npmjs.com/viewing-package-provenance/) for this exact version. Compare its repository with `Wolfsblvt/wolfsblvt-icons`, its source commit with the accepted immutable `v<package-version>` tag, and its calling build file with `.github/workflows/publish.yml`. Record those three readbacks in the release Return. A mismatch stops the source-association and Release claim for judgment; a visible provenance badge alone is insufficient.
7. Create and read back the GitHub Release only after the package result and source association are reconciled.

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

`npm audit signatures --json --include-attestations` is required only for versions published through the hosted OIDC route. The verification job checks a valid target-package attestation, while the release operator checks its repository, source commit, and calling workflow as step 6 requires. A successful audit of unrelated dependencies or a target attestation without that comparison does not prove this release's source association. `0.1.0` is intentionally verified through source/tag, exact integrity, registry artifact, and clean consumer behavior without claiming hosted provenance.

## Correction and recovery

Preserve immutable package and tag history. For an incorrect release, deprecate the exact affected version with a concise reason when authorized, publish a selected corrected version, and annotate the corresponding GitHub Release. Do not overwrite a version, move a tag, silently alter a material release claim, or treat destructive unpublishing as ordinary rollback.

Recover custody through the actual npm human/organization administrator and protected recovery route. Recovery-code sign-in can impose a 72-hour hold on publishing and sensitive writes; it is not immediate emergency release access. No recovery codes, account credentials, or publishing secrets belong in this repository.

This source candidate performs no account, organization, membership, credential, trusted-publisher, package-access, publication, tag, GitHub Release, billing, or spending effect. It adds no version bot, token broker, package database, or release-control surface.
