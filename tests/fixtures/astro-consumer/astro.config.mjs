import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { createAstroIconOptions } from "@wolfsblvt/icons";

const fixtureRoot = new URL("./", import.meta.url);

export default defineConfig({
  srcDir: fileURLToPath(new URL("src", fixtureRoot)),
  outDir: fileURLToPath(new URL("dist", fixtureRoot)),
  cacheDir: fileURLToPath(new URL(".astro", fixtureRoot)),
  integrations: [icon(createAstroIconOptions())],
});
