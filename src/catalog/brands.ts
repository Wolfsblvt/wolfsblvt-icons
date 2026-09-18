import discordJson from "../metadata/brands/discord.json" with { type: "json" };
import githubJson from "../metadata/brands/github.json" with { type: "json" };
import type { BrandMetadata, IconColorMode } from "./types.js";

export type BrandName = "discord" | "github";

export const brandCatalog = Object.freeze({
  discord: discordJson as BrandMetadata,
  github: githubJson as BrandMetadata,
}) satisfies Readonly<Record<BrandName, BrandMetadata>>;

export const brandNames = Object.freeze(
  Object.keys(brandCatalog).sort() as BrandName[],
);

export const curatedSimpleIconNames = Object.freeze(
  brandNames.map((name) => brandCatalog[name].upstream.slug),
);

export function getBrand(name: BrandName | string): BrandMetadata {
  if (!Object.prototype.hasOwnProperty.call(brandCatalog, name)) {
    throw new Error(
      `Unknown brand icon "${name}". Brand marks must be admitted to the curated catalogue before use.`,
    );
  }

  return brandCatalog[name as BrandName];
}

export function assertBrandColorMode(
  brand: BrandMetadata,
  mode: IconColorMode,
): void {
  if (!brand.permittedColorModes.includes(mode)) {
    throw new Error(
      `Brand icon "${brand.id}" does not permit the "${mode}" colour mode.`,
    );
  }
}
