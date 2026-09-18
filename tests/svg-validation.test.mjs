import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { validateWorksSvg } from "../scripts/lib/svg-contract.mjs";

async function fixture(name) {
  return readFile(new URL(`./fixtures/icons/${name}`, import.meta.url), "utf8");
}

test("accepts the canonical Works-authored SVG structure", async () => {
  assert.deepEqual(validateWorksSvg(await fixture("valid.svg"), "valid.svg"), []);
});

test("rejects transforms", async () => {
  assert.match(
    validateWorksSvg(await fixture("invalid-transform.svg"), "invalid.svg").join("\n"),
    /transform is forbidden/,
  );
});

test("rejects fixed fill colours", async () => {
  assert.match(
    validateWorksSvg(await fixture("invalid-fill.svg"), "invalid.svg").join("\n"),
    /fixed or non-none fill values are forbidden/,
  );
});
