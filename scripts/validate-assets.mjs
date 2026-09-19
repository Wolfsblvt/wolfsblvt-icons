import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { walkFiles } from "./lib/files.mjs";
import { validateWorksSvg } from "./lib/svg-contract.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    errors.push(`${path.relative(root, file)}: invalid JSON: ${error.message}`);
    return null;
  }
}

const fixtureManifestPath = path.join(
  root,
  "fixtures",
  "source-icons",
  "manifest.json",
);
const fixtureManifest = await readJson(fixtureManifestPath);
if (fixtureManifest) {
  if (
    fixtureManifest.schemaVersion !== 1 ||
    !Array.isArray(fixtureManifest.assets)
  ) {
    errors.push(
      "fixtures/source-icons/manifest.json: expected schemaVersion 1 and an assets array.",
    );
  } else {
    for (const asset of fixtureManifest.assets) {
      const required = [
        "id",
        "path",
        "sourceUrl",
        "sourceRevision",
        "retrievedAt",
        "license",
        "sha256",
      ];
      for (const field of required) {
        if (!asset[field]) {
          errors.push(
            `fixtures/source-icons/manifest.json: ${asset.id ?? "asset"} is missing ${field}.`,
          );
        }
      }

      if (!asset.path) continue;
      const fixturePath = path.join(root, asset.path);
      try {
        const bytes = await readFile(fixturePath);
        const actualHash = createHash("sha256").update(bytes).digest("hex");
        if (actualHash !== asset.sha256) {
          errors.push(
            `${asset.path}: SHA-256 does not match fixture manifest.`,
          );
        }
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
        errors.push(`${asset.path}: fixture declared in manifest is missing.`);
      }
    }
  }
}

const brandRoot = path.join(root, "src", "metadata", "brands");
for (const file of await walkFiles(brandRoot, (value) =>
  value.endsWith(".json"),
)) {
  const metadata = await readJson(file);
  if (!metadata) continue;
  const expectedId = path.basename(file, ".json");
  const required = [
    "id",
    "status",
    "selectedSourceType",
    "iconifyName",
    "sourceUrl",
    "retrievedAt",
    "upstream",
    "license",
    "trademarkNotes",
    "brandGuidelinesUrl",
    "permittedColorModes",
    "modifications",
    "redistribution",
  ];
  for (const field of required) {
    if (metadata[field] === undefined || metadata[field] === "") {
      errors.push(`${path.relative(root, file)}: missing ${field}.`);
    }
  }
  if (metadata.id !== expectedId) {
    errors.push(`${path.relative(root, file)}: id must be ${expectedId}.`);
  }
  if (metadata.status !== "available") {
    errors.push(
      `${path.relative(root, file)}: brand status must be available.`,
    );
  }
  if (metadata.selectedSourceType !== "simple-icons") {
    errors.push(
      `${path.relative(root, file)}: starter brands must use simple-icons.`,
    );
  }
  if (metadata.iconifyName !== `simple-icons:${metadata.id}`) {
    errors.push(
      `${path.relative(root, file)}: iconifyName must match the curated id.`,
    );
  }
  if (metadata.upstream?.slug !== metadata.id) {
    errors.push(`${path.relative(root, file)}: upstream.slug must match id.`);
  }
  if (metadata.redistribution?.vendoredBytes !== false) {
    errors.push(
      `${path.relative(root, file)}: catalogue brands must remain dependency references.`,
    );
  }
}

const productRoot = path.join(root, "src", "metadata", "products");
for (const file of await walkFiles(productRoot, (value) =>
  value.endsWith(".json"),
)) {
  const metadata = await readJson(file);
  if (!metadata) continue;
  const expectedId = `${metadata.namespace}/${metadata.name}`;
  if (metadata.id !== expectedId) {
    errors.push(`${path.relative(root, file)}: id must equal namespace/name.`);
  }
  if (
    !/^([a-z0-9]+(?:-[a-z0-9]+)*)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.test(
      metadata.id ?? "",
    )
  ) {
    errors.push(
      `${path.relative(root, file)}: id must be stable kebab-case product/name.`,
    );
  }
  if (!["planned", "available"].includes(metadata.status)) {
    errors.push(
      `${path.relative(root, file)}: status must be planned or available.`,
    );
  }
  if (metadata.selectedSourceType !== "works-provider-glyph") {
    errors.push(
      `${path.relative(root, file)}: product icons must declare works-provider-glyph.`,
    );
  }
  const asset = path.join(root, metadata.assetPath ?? "");
  try {
    const source = await readFile(asset, "utf8");
    if (metadata.status !== "available") {
      errors.push(
        `${path.relative(root, file)}: an authored asset must not remain planned.`,
      );
    }
    errors.push(...validateWorksSvg(source, path.relative(root, asset)));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    if (metadata.status === "available") {
      errors.push(`${path.relative(root, file)}: available asset is missing.`);
    }
  }
}

const iconRoot = path.join(root, "src", "icons");
for (const file of await walkFiles(iconRoot, (value) =>
  value.endsWith(".svg"),
)) {
  const source = await readFile(file, "utf8");
  errors.push(...validateWorksSvg(source, path.relative(root, file)));
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Asset metadata and authored SVG contracts are valid.");
}
