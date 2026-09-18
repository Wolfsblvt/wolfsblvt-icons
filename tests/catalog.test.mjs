import assert from "node:assert/strict";
import test from "node:test";
import {
  createAstroIconOptions,
  getBrand,
  getProductIconMetadata,
  resolveProductIcon,
  resolveUiIcon,
} from "../dist/index.js";

test("shared UI aliases resolve to curated Lucide names", () => {
  assert.equal(resolveUiIcon("settings"), "lucide:settings");
  assert.equal(resolveUiIcon("verified"), "lucide:badge-check");
});

test("explicit Lucide names remain available without a central alias", () => {
  assert.equal(resolveUiIcon("lucide:heart"), "lucide:heart");
  assert.throws(() => resolveUiIcon("heroicons:heart"), /shared alias/);
  assert.throws(() => resolveUiIcon("lucide:Heart"), /shared alias/);
});

test("brands resolve only through the curated catalogue", () => {
  assert.equal(getBrand("github").iconifyName, "simple-icons:github");
  assert.throws(() => getBrand("npm"), /admitted to the curated catalogue/);
});

test("planned custom glyphs reserve names without pretending geometry exists", () => {
  assert.equal(getProductIconMetadata("diffdevil/brand").status, "planned");
  assert.throws(
    () => resolveProductIcon("diffdevil/brand"),
    /no approved geometry yet/,
  );
});

test("Astro integration options include catalogue icons and explicit Lucide extras", () => {
  const options = createAstroIconOptions({ extraLucide: ["heart", "settings"] });
  assert.deepEqual(options.include["simple-icons"], ["discord", "github"]);
  assert.ok(options.include.lucide.includes("heart"));
  assert.equal(
    options.include.lucide.filter((name) => name === "settings").length,
    1,
  );
  assert.throws(
    () => createAstroIconOptions({ extraLucide: ["lucide:heart"] }),
    /part after lucide/,
  );
});
