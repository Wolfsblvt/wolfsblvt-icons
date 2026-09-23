# Releasing @wolfsblvt/icons

## Meaning

This guide owns the deliberate release procedure for `@wolfsblvt/icons`: the exact package, npm, tag, GitHub Release, provenance, recovery, and readback boundaries. It keeps package distribution a projection of the public GitHub source and canonical icon standard, rather than a second source of product truth. Source preparation does not authorize provider configuration or publication.

## Release unit and standing

The release unit is the `@wolfsblvt/icons` npm package for Node and Astro developers. Its public source remains [`Wolfsblvt/wolfsblvt-icons`](https://github.com/Wolfsblvt/wolfsblvt-icons); [`icon-standard.md`](icon-standard.md) remains the canonical visual and provenance contract.

`0.1.0` is the explicitly selected first package-release candidate. It exposes the existing framework-neutral catalogue, root exports, Astro adapter, curated GitHub and Discord entries, and accepted `diffdevil/*` family. It does not promise a stable API, npm availability before publication, or the still-unavailable `wolfsblvt/works` glyph.

The release body in [`release-notes/0.1.0.md`](release-notes/0.1.0.md) is the prepared leading GitHub Release account. It is a draft until the separately authorized publication succeeds and is read back; do not copy its availability wording to a public surface before then.

## Before a release

1. Re-resolve the intended `main` commit, package version, clean source state, and current npm scope/package standing. Verify the actual owner, effective package rights, and version availability; local package metadata does not establish them. Resolve any scope-ownership conversion before creating the first package.
2. Confirm that this exact source candidate is accepted. Publication runs through [the direct GitHub-hosted workflow](../.github/workflows/publish.yml). It requires an immutable `v<package-version>` tag whose commit is on `main`, checks out that tag, and runs the canonical suite and package-boundary check. A local shell is not the selected publication route. Manual workflow dispatch verifies a named published version only; it never repeats publication.
3. Run `npm ci` and `npm test`. The root proof includes the package boundary and a clean temporary Astro consumer that installs the packed tarball, builds through installed root and Astro exports, and confirms no runtime icon CDN reference. The workflow's release shell is also exercised by focused tests; source string matching alone is not shell execution proof.
4. Inspect `npm pack --json --dry-run --ignore-scripts` for exact contents. Include built `dist/`, source Astro components, `README.md`, `LICENSE.md`, `third-party-notices.md`, and `package.json`; exclude fixtures, tests, build caches, and release-only documentation.
5. Re-read the draft release account against the exact candidate. Keep its limitations, installation command, copyright/license boundary, and contributor credit truthful.

The publishing and verification jobs select Node 24 and npm **11.19.1** explicitly. That publishing-tool choice supplies current OIDC and attestation-output support without silently upgrading this release to npm 12. It does not change the package's consumer engine requirements. Verify the selected toolchain with the real canonical CI suite before release.

## First publication: a bounded current exception

The destination is **direct Trusted Publishing/OIDC with no persistent npm write secret**, not token-based publishing as an ordinary service. Current npm requires an existing package for both trusted-publisher setup and staged publishing. A stage-only token therefore cannot create this first package. There is no current documented pending-publisher or reservation route comparable to PyPI. An interactive 2FA publish is provider-supported but is not the selected CI-only experience. [Trusted publishers](https://docs.npmjs.com/trusted-publishers/) · [Staging prerequisites](https://docs.npmjs.com/staged-publishing/)

As of **2026-09-23**, retaining CI execution and hosted provenance for the real `0.1.0` package requires a bounded first-publish credential exception. It must be separately authorized after scope ownership is resolved. Use a regular granular write credential with the required bypass-2FA capability for this noninteractive operation, restricted to the `@wolfsblvt` scope when the actual provider selector supports it. A nonexistent package cannot be selected as an existing package; scope access is broader than one package. Do not silently choose All Packages or organization-administration privileges. Use the shortest practical one-operation window, respecting npm's one-day minimum, and protected human-controlled credential handling.

The existing `NPM_PUBLISH_TOKEN` repository-secret reference is consulted only on `v0.1.0`. This is source/runtime scoping, **not** GitHub provider enforcement that restricts the secret to that tag. Its presence is not evidence that npm actually used that authentication path: a configured matching OIDC route takes precedence. Never print the value, pass it through workflow inputs, or retain it as a later fallback.

npm targets **January 2027** for removing direct publish through bypass-2FA tokens. Recheck this first-package exception before execution rather than assuming that date is an exact guaranteed cutoff or that a future alternative already exists. Bypass-2FA tokens already cannot administer npm trust, package access, or organization membership. [Current transition](https://github.blog/changelog/2026-09-18-stage-only-npm-tokens-for-safer-automation/) · [Administrative restriction](https://github.blog/changelog/2026-07-31-restricting-npm-bypass-2fa-granular-access-tokens/)

## Publish and read back

After source acceptance and the exact provider-effect authorization:

1. Re-read the accepted `main` commit and version, then create and push matching immutable tag `v0.1.0`. Tag creation is the publication trigger. Never move it to repair a release.
2. Observe the direct `Publish package` run. It derives identity/version from `package.json`, verifies the tag and full-history `main` ancestry, runs `npm ci`, `npm test`, and `npm run pack:check`, then performs `npm publish --provenance --access public`.
3. Reconcile the actual registry outcome. The separate verification job waits at most 31 availability attempts, 30 seconds between attempts, with each npm request configured for no internal retries and a 10-second fetch timeout. This is bounded waiting, not a promise that registry scanning finishes within it. It then reads the exact package metadata, installs that registry version into the clean Astro consumer, and checks npm's verified target attestation using `npm audit signatures --json --include-attestations`. A timeout or downstream failure does not authorize another publish.
4. Read back exact version, public access, repository, license, tarball contents, installability, and the verified provenance association with the intended source/workflow. The native audit result must cover this target, not just other installed dependencies. A token-authenticated GitHub-hosted publish can carry provenance when the job has OIDC permission and requests it; publishing authentication and provenance generation are distinct.
5. Create the GitHub Release from that immutable tag using the exact body in [`release-notes/0.1.0.md`](release-notes/0.1.0.md), then read back the release/tag/body association. The Release remains the leading public account; no second changelog or announcement estate is introduced.

npm scans newly published versions before availability. A publish acknowledgement can therefore precede an installable version. Re-run the workflow's **verification-only** dispatch for the exact version after reconciling an incomplete readback. Do not change the version to make a rerun green. [Publish-time scanning](https://github.blog/changelog/2026-07-28-npm-publish-time-malware-scanning-and-dual-use-metadata/) · [Provenance generation](https://docs.npmjs.com/generating-provenance-statements/)

## Configure ordinary trust and remove bootstrap capability

Once the real package exists, use the authorized human-authenticated npm administration route to register **GitHub Actions** with owner `Wolfsblvt`, repository `wolfsblvt-icons`, and workflow filename `publish.yml`. Enter no `.github/workflows/` prefix and no Environment: this source does not select one. Explicitly allow **direct publishing** and read back the complete configuration.

npm now supports multiple independent additive configurations. Every configuration can stage by default; direct publication is opt-in per configuration. Inspect all existing configurations, since one narrow binding does not constrain another broad binding. One direct local publisher is sufficient for this package. Staged releases with recurring human approval are not selected. [Current configuration behavior](https://github.blog/changelog/2026-09-03-multiple-trusted-publishing-configurations-for-npm/)

As soon as the bootstrap credential is no longer needed, **revoke the npm token and delete `NPM_PUBLISH_TOKEN` separately**, including when publication succeeded but later readback failed. Do not hold the credential open until scanning, consumer verification, or a later release succeeds. Reconcile an ambiguous attempt first; return any cleanup that could not be completed and its custodian.

Set npm publishing access to **Require two-factor authentication and disallow tokens** after the intended trust is configured. That setting permits Trusted Publishing. Subsequent real releases use GitHub-hosted OIDC with job-level `id-token: write` and no standing write token. Public-source/public-package provenance is automatic on this route. Configuration readback is not end-to-end publish proof; qualify it at the next legitimately selected version, never a placeholder. [Native trust and access behavior](https://docs.npmjs.com/trusted-publishers/)

## Correction and recovery

Preserve immutable package and tag history. Deprecate the exact affected version with a concise reason when authorized, publish a selected corrected version, and visibly annotate the corresponding GitHub Release. Do not overwrite a version, move a tag, silently alter a material release claim, or treat destructive unpublishing as normal rollback. Preserve source, rights notices, and the original audience history while correcting the public route.

Recover custody through the actual npm account/organization administrator and protected recovery route. Since September 9, 2026, recovery-code sign-in causes a 72-hour security hold on publishing and sensitive writes; it is not immediate release access. No recovery codes or credentials belong in this repository. [Recovery hold](https://github.blog/changelog/2026-09-09-npm-extends-recovery-code-security-holds-to-all-accounts/)

This source candidate performs no account, membership, credential, trusted-publisher, package-access, publication, tag, GitHub Release, or billing effect. It adds no version bot, release registry, token broker, or release-control surface.
