import { spawnSync } from "node:child_process";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { npmInvocation, parsePackManifest } from "./lib/npm-pack.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const { command: npmCommand, prefixArguments: npmPrefixArguments } =
  npmInvocation();
const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), "wolfsblvt-icons-"));
const consumerRoot = path.join(temporaryRoot, "consumer");

function run(command, arguments_, options = {}) {
  const result = spawnSync(command, arguments_, {
    cwd: options.cwd ?? repositoryRoot,
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.status === 0) return result.stdout;

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  const detail = result.error?.message ?? `exit ${result.status ?? "unknown"}`;
  throw new Error(`${command} ${arguments_.join(" ")} failed: ${detail}`);
}

try {
  const packOutput = run(npmCommand, [
    ...npmPrefixArguments,
    "pack",
    "--json",
    "--ignore-scripts",
    "--pack-destination",
    temporaryRoot,
  ]);
  const manifest = parsePackManifest(packOutput);
  const tarballPath = path.join(temporaryRoot, manifest.filename);

  await cp(
    path.join(repositoryRoot, "tests", "fixtures", "astro-consumer", "src"),
    path.join(consumerRoot, "src"),
    { recursive: true },
  );
  await cp(
    path.join(
      repositoryRoot,
      "tests",
      "fixtures",
      "astro-consumer",
      "astro.config.mjs",
    ),
    path.join(consumerRoot, "astro.config.mjs"),
  );

  const rootPackage = JSON.parse(
    await readFile(path.join(repositoryRoot, "package.json"), "utf8"),
  );
  const consumerPackage = {
    name: "wolfsblvt-icons-packed-consumer",
    private: true,
    type: "module",
    dependencies: {
      "@iconify-json/lucide": rootPackage.dependencies["@iconify-json/lucide"],
      "@iconify-json/simple-icons":
        rootPackage.dependencies["@iconify-json/simple-icons"],
      "@wolfsblvt/icons": `file:${path.relative(consumerRoot, tarballPath)}`,
      astro: rootPackage.devDependencies.astro,
      "astro-icon": rootPackage.devDependencies["astro-icon"],
    },
  };
  await writeFile(
    path.join(consumerRoot, "package.json"),
    `${JSON.stringify(consumerPackage, null, 2)}\n`,
    "utf8",
  );

  run(
    npmCommand,
    [
      ...npmPrefixArguments,
      "install",
      "--ignore-scripts",
      "--no-audit",
      "--no-fund",
    ],
    { cwd: consumerRoot },
  );

  const astroEntrypoint = path.join(
    consumerRoot,
    "node_modules",
    "astro",
    "bin",
    "astro.mjs",
  );
  run(process.execPath, [astroEntrypoint, "check"], { cwd: consumerRoot });
  run(process.execPath, [astroEntrypoint, "build"], { cwd: consumerRoot });
  run(process.execPath, [
    path.join(repositoryRoot, "scripts", "verify-astro-consumer.mjs"),
    `--output=${path.join(consumerRoot, "dist", "index.html")}`,
  ]);

  console.log(
    `Packed ${manifest.filename} and built a clean Astro consumer from its installed exports.`,
  );
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
