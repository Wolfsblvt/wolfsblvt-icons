import { readdir } from "node:fs/promises";
import path from "node:path";

export async function walkFiles(directory, predicate = () => true) {
  const found = [];

  async function visit(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await visit(absolute);
      } else if (predicate(absolute)) {
        found.push(absolute);
      }
    }
  }

  await visit(directory);
  return found.sort();
}
