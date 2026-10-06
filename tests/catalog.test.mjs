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

test("accepted product glyphs resolve while planned names remain unavailable", () => {
  const accepted = [
    ["borrowed-coast/at-war", /M4 18V6l5 2-5 2/],
    ["borrowed-coast/beacon", /M9 20h6l-1-9/],
    ["borrowed-coast/chart", /M4 3C4 5\.8/],
    ["borrowed-coast/control", /M7 19V5l8 3/],
    ["borrowed-coast/deep-hull-strait", /M3 4v5h5v6/],
    ["borrowed-coast/guest-mooring", /M3 7h5v4/],
    ["borrowed-coast/harbor", /M3 7h5v4/],
    ["borrowed-coast/nations", /M5 20V6l5 2/],
    ["borrowed-coast/no-accord", /M3 20h6/],
    ["borrowed-coast/protected-peace", /M8 14c2-2/],
    ["borrowed-coast/tide-phase", /M6 3v18/],
    ["borrowed-coast/watch", /M4 17c4-6/],
    ["diffdevil/bands", /<rect x="3" y="12"/],
    ["diffdevil/brand", /M4 4l3 2\.25/],
    ["diffdevil/changed", /M8 3H6/],
    ["diffdevil/raw-churn", /M4 7h6/],
  ];

  for (const [name, expectedBody] of accepted) {
    assert.equal(getProductIconMetadata(name).status, "available");
    const icon = resolveProductIcon(name);
    assert.equal(icon.id, `products/${name}`);
    assert.equal(icon.viewBox, "0 0 24 24");
    assert.match(icon.body, expectedBody);
  }

  assert.equal(getProductIconMetadata("wolfsblvt/works").status, "planned");
  assert.throws(
    () => resolveProductIcon("wolfsblvt/works"),
    /no approved geometry yet/,
  );
});

test("Astro integration options include catalogue icons and explicit Lucide extras", () => {
  const options = createAstroIconOptions({
    extraLucide: ["heart", "settings"],
  });
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
