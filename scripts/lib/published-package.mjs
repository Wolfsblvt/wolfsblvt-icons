const registryPackagePattern =
  /^(?<name>@[^/]+\/[^@/]+|[^@/]+)@(?<version>[^@]+)$/;

export function parseRegistryPackage(spec) {
  const match = registryPackagePattern.exec(spec);
  if (!match?.groups) {
    throw new Error(
      "--registry-package requires an exact name@version package specifier.",
    );
  }

  return {
    name: match.groups.name,
    spec,
    version: match.groups.version,
  };
}

export function assertPublishedPackage(
  metadata,
  expected,
  { requireRegistryMetadata = true } = {},
) {
  const published = Array.isArray(metadata)
    ? metadata.find(
        (candidate) =>
          candidate.name === expected.name &&
          candidate.version === expected.version,
      )
    : metadata;
  if (!published || published.name !== expected.name) {
    throw new Error(
      `Expected package ${expected.name}, received ${published?.name}.`,
    );
  }
  if (published.version !== expected.version) {
    throw new Error(
      `Expected package version ${expected.version}, received ${published.version}.`,
    );
  }
  if (!requireRegistryMetadata) return;

  if (published.repository?.url !== expected.repository) {
    throw new Error(
      `Expected repository ${expected.repository}, received ${published.repository?.url}.`,
    );
  }
  if (published.license !== expected.license) {
    throw new Error(
      `Expected license ${expected.license}, received ${published.license}.`,
    );
  }
  if (!published.dist?.tarball?.startsWith("https://registry.npmjs.org/")) {
    throw new Error(
      "Published package is missing a public registry tarball URL.",
    );
  }
}

export function assertPublishedProvenance(signatureResult, expected) {
  const verifiedPackage = signatureResult.verified?.find(
    (candidate) =>
      candidate.name === expected.name &&
      candidate.version === expected.version,
  );
  if (!verifiedPackage?.attestations?.provenance) {
    throw new Error(
      `npm audit signatures did not verify provenance for ${expected.spec}.`,
    );
  }
}
