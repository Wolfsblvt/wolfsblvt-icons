import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { assertValidWorksSvg } from "../scripts/lib/svg-contract.mjs";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const candidates = ["changed", "raw-churn", "bands"];

for (const candidate of candidates) {
  test(`diffdevil/${candidate} review candidate follows the authored SVG contract`, async () => {
    const file = path.join(
      root,
      "fixtures",
      "reviews",
      "diffdevil-family",
      "candidates",
      `${candidate}.svg`,
    );
    const source = await readFile(file, "utf8");
    assertValidWorksSvg(source, path.relative(root, file));
  });
}
