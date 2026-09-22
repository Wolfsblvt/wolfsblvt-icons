import { spawnSync } from "node:child_process";
import { npmInvocation, parsePackManifest } from "./lib/npm-pack.mjs";

const { command, prefixArguments } = npmInvocation();
const result = spawnSync(
  command,
  [...prefixArguments, "pack", "--dry-run", "--json", "--ignore-scripts"],
  {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  },
);

if (result.status !== 0) {
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.stdout) process.stdout.write(result.stdout);
  process.exit(result.status ?? 1);
}

const manifest = parsePackManifest(result.stdout);
const paths = manifest.files.map((file) => file.path).sort();
const required = new Set([
  "LICENSE.md",
  "README.md",
  "THIRD_PARTY_NOTICES.md",
  "package.json",
]);
const errors = [];

for (const path of required) {
  if (!paths.includes(path)) {
    errors.push(`required package file ${path} is missing`);
  }
}

for (const path of paths) {
  if (
    !required.has(path) &&
    !path.startsWith("dist/") &&
    !path.startsWith("src/")
  ) {
    errors.push(`unexpected package file ${path}`);
  }
}

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Package boundary is valid (${paths.length} files, ${manifest.size} bytes packed, ${manifest.unpackedSize} bytes unpacked).`,
  );
}
