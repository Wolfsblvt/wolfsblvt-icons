import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

import {
  assertPublishedPackage,
  assertTargetProvenanceAttestation,
  parseRegistryPackage,
} from "../scripts/lib/published-package.mjs";

const workflow = await readFile(
  new URL("../.github/workflows/publish.yml", import.meta.url),
  "utf8",
);
const consumerVerifier = await readFile(
  new URL("../scripts/check-packed-consumer.mjs", import.meta.url),
  "utf8",
);
const manifest = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

test("registry verification keeps exact package identity and target attestation", () => {
  const expected = {
    ...parseRegistryPackage(`${manifest.name}@${manifest.version}`),
    license: manifest.license,
    repository: manifest.repository.url,
  };

  assert.doesNotThrow(() =>
    assertPublishedPackage(
      [
        {
          name: manifest.name,
          version: manifest.version,
          repository: { url: manifest.repository.url },
          license: manifest.license,
          dist: {
            tarball: "https://registry.npmjs.org/example.tgz",
            integrity: "sha512-example",
          },
        },
      ],
      expected,
    ),
  );
  assert.throws(
    () =>
      assertPublishedPackage(
        { name: manifest.name, version: "0.0.0" },
        expected,
        { requireRegistryMetadata: false },
      ),
    /Expected package version/,
  );
  assert.throws(
    () =>
      assertPublishedPackage(
        {
          name: manifest.name,
          version: manifest.version,
          repository: { url: manifest.repository.url },
          license: manifest.license,
          dist: { tarball: "https://registry.npmjs.org/example.tgz" },
        },
        expected,
      ),
    /missing its registry integrity/,
  );
  assert.throws(
    () => assertTargetProvenanceAttestation({ verified: [] }, expected),
    /did not verify a target attestation/,
  );
  assert.doesNotThrow(() =>
    assertTargetProvenanceAttestation(
      {
        verified: [
          {
            name: manifest.name,
            version: manifest.version,
            attestations: { provenance: { predicateType: "slsa" } },
          },
        ],
      },
      expected,
    ),
  );
});

test("first publication is verification-only and later tags publish through OIDC", () => {
  assert.match(workflow, /^  workflow_dispatch:\n    inputs:\n      version:/m);
  assert.match(workflow, /^  publish:\n    if: >-/m);
  assert.match(workflow, /github\.ref_name != 'v0\.1\.0'/);
  assert.match(workflow, /npm publish --provenance --access public/);
  assert.doesNotMatch(workflow, /NPM_PUBLISH_TOKEN|NODE_AUTH_TOKEN/);

  assert.match(workflow, /^  verify-published-package:\n    needs: publish/m);
  assert.match(
    workflow,
    /github\.ref_name == 'v0\.1\.0' && needs\.publish\.result == 'skipped'/,
  );
  assert.match(workflow, /github\.event_name == 'workflow_dispatch'/);
  assert.match(workflow, /expect_provenance=false/);
  assert.match(workflow, /npm run pack:consumer --/);
  assert.match(
    workflow,
    /--registry-package="\$package_name@\$package_version"/,
  );
  assert.match(workflow, /--expect-provenance="\$expect_provenance"/);
  assert.doesNotMatch(workflow, /github\.event\.repository\.name/);
  assert.doesNotMatch(workflow, /workflow_call/);

  assert.match(consumerVerifier, /expectProvenanceValue !== "false"/);
  assert.match(
    consumerVerifier,
    /"audit",\s*"signatures",\s*"--json",\s*"--include-attestations"/,
  );
});
