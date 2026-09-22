import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

import {
  assertPublishedPackage,
  assertPublishedProvenance,
  parseRegistryPackage,
} from "../scripts/lib/published-package.mjs";

const workflow = await readFile(
  new URL("../.github/workflows/publish.yml", import.meta.url),
  "utf8",
);
const manifest = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

test("registry verification keeps the exact published package identity", () => {
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
          dist: { tarball: "https://registry.npmjs.org/example.tgz" },
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
    () => assertPublishedProvenance({ verified: [] }, expected),
    /did not verify provenance/,
  );
  assert.doesNotThrow(() =>
    assertPublishedProvenance(
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

test("publish and registry verification have separate runnable paths", () => {
  assert.match(workflow, /^  workflow_dispatch:\n    inputs:\n      version:/m);
  assert.match(workflow, /^  publish:\n    if: github\.event_name == 'push'/m);
  assert.match(workflow, /^  verify-published-package:\n    needs: publish/m);
  assert.match(workflow, /github\.event_name == 'workflow_dispatch'/);
  assert.match(workflow, /npm publish --provenance --access public/);
  assert.match(
    workflow,
    /--registry-package="\$package_name@\$package_version"/,
  );
  assert.doesNotMatch(workflow, /github\.event\.repository\.name/);
  assert.doesNotMatch(workflow, /workflow_call/);
});
