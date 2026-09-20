import { readFile } from "node:fs/promises";

const output = new URL(
  "../tests/fixtures/astro-consumer/dist/index.html",
  import.meta.url,
);
const html = await readFile(output, "utf8");

for (const id of [
  "ui-settings",
  "ui-direct",
  "brand-github",
  "brand-discord",
  "product-diffdevil-brand",
  "product-diffdevil-changed",
  "product-diffdevil-raw-churn",
  "product-diffdevil-bands",
]) {
  if (!html.includes(`id="${id}"`)) {
    throw new Error(`Astro consumer output is missing #${id}.`);
  }
}

const svgCount = html.match(/<svg\b/g)?.length ?? 0;
if (svgCount < 8) {
  throw new Error(
    `Expected at least eight inline SVGs in the Astro consumer output; found ${svgCount}.`,
  );
}

for (const host of ["api.iconify.design", "unpkg.com", "cdn.jsdelivr.net"]) {
  if (html.includes(host)) {
    throw new Error(
      `Astro consumer output unexpectedly references remote icon host ${host}.`,
    );
  }
}

console.log(
  `Astro consumer emitted ${svgCount} inline SVGs with no runtime icon CDN references.`,
);
