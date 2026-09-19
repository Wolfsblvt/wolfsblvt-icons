import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docsRoot = path.join(root, "docs");
const errors = [];

async function markdownFiles(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...(await markdownFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      result.push(fullPath);
    }
  }
  return result;
}

const rootMarkdown = (await readdir(root, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
  .map((entry) => path.join(root, entry.name));

const files = [...rootMarkdown, ...(await markdownFiles(docsRoot))];

function localTarget(raw) {
  const value = raw.trim().replace(/^<|>$/g, "");
  if (
    !value ||
    value.startsWith("#") ||
    /^(?:https?:|mailto:|data:|javascript:|\/\/)/i.test(value)
  ) {
    return null;
  }

  const withoutFragment = value.split("#", 1)[0].split("?", 1)[0];
  return withoutFragment ? decodeURIComponent(withoutFragment) : null;
}

for (const file of files) {
  const source = await readFile(file, "utf8");
  const visibleSource = source.replace(/```[\s\S]*?```/g, "");
  const references = new Set();

  for (const match of visibleSource.matchAll(
    /!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
  )) {
    references.add(match[1]);
  }

  for (const match of visibleSource.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    references.add(match[1]);
  }

  for (const reference of references) {
    const target = localTarget(reference);
    if (!target) continue;

    const resolved = target.startsWith("/")
      ? path.join(root, target.slice(1))
      : path.resolve(path.dirname(file), target);

    try {
      await stat(resolved);
    } catch {
      errors.push(
        `${path.relative(root, file)}: missing local link target ${reference}`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Documentation links are valid across ${files.length} Markdown files.`,
  );
}
