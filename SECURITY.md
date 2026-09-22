# Security

## Supported surface

The repository currently carries the unpublished `0.1.0` package candidate. No npm release or support window exists yet. Security fixes therefore target the current maintained source rather than a published version matrix.

## Report a vulnerability

Please do not open a public Issue with working exploit details, credentials, private data, or a weaponized SVG specimen.

If GitHub offers **Report a vulnerability** for this repository, use that private route. Otherwise contact the repository owner privately through the GitHub account before public disclosure. A report should include the affected surface, reproduction conditions, impact, and the smallest safe specimen that demonstrates the problem.

There is no promised response-time SLA. That avoids turning an open-source side project into a fake 24/7 security desk staffed by one developer and optimism~

## Relevant trust boundaries

The package treats Works-authored SVG geometry as input that must satisfy the repository's strict structural allow-list before generated geometry can reach Astro's `set:html` rendering path. Curated third-party brands are dependency-backed catalogue entries rather than arbitrary caller-supplied SVG.

Never include secrets or unrelated personal data in a reproduction.
