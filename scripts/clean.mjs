import { readdir, rm } from "node:fs/promises";
import path from "node:path";

for (const directory of [
  "dist",
  ".astro",
  "tests/fixtures/astro-consumer/dist",
  "tests/fixtures/astro-consumer/.astro",
]) {
  await rm(directory, { recursive: true, force: true });
}

for (const entry of await readdir(".")) {
  if (entry.endsWith(".tgz")) {
    await rm(path.join(".", entry), { force: true });
  }
}

console.log("Removed generated build, fixture, and package output.");
