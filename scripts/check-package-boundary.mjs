import { readFileSync } from "node:fs";
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
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const packageLock = JSON.parse(readFileSync("package-lock.json", "utf8"));
const notices = readFileSync("third-party-notices.md", "utf8");
const required = new Set([
  "LICENSE.md",
  "README.md",
  "third-party-notices.md",
  "package.json",
]);
const errors = [];
const dependencyClaims = [
  ...notices.matchAll(/^- \*\*Dependency:\*\* `([^`]+)` (\S+)$/gm),
];

if (dependencyClaims.length === 0) {
  errors.push("third-party notices contain no dependency-version claims");
}

for (const [, name, claimedVersion] of dependencyClaims) {
  const declaredVersion =
    packageJson.dependencies?.[name] ?? packageJson.devDependencies?.[name];
  const lockedDeclaration =
    packageLock.packages?.[""]?.dependencies?.[name] ??
    packageLock.packages?.[""]?.devDependencies?.[name];
  const resolvedVersion =
    packageLock.packages?.[`node_modules/${name}`]?.version;

  if (declaredVersion === undefined) {
    errors.push(`notice dependency ${name} is not declared in package.json`);
    continue;
  }

  if (claimedVersion !== declaredVersion) {
    errors.push(
      `notice dependency ${name} claims ${claimedVersion}, but package.json declares ${declaredVersion}`,
    );
  }

  if (lockedDeclaration !== declaredVersion) {
    errors.push(
      `package-lock.json root declaration for ${name} does not match package.json`,
    );
  }

  if (resolvedVersion !== declaredVersion) {
    errors.push(
      `package-lock.json resolved version for ${name} does not match package.json`,
    );
  }
}

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
