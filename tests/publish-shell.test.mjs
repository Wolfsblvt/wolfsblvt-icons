import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile, mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const workflow = await readFile(
  new URL("../.github/workflows/publish.yml", import.meta.url),
  "utf8",
);
const bashAvailable =
  process.platform === "linux" && spawnSync("bash", ["--version"]).status === 0;
const shellOptions = {
  skip: bashAvailable ? false : "Bash is exercised on the hosted Linux runner",
};

// Extract the actual literal run blocks, not a second copy of their commands.
const blocks = new Map();
let stepName;
const lines = workflow.split("\n");
for (let index = 0; index < lines.length; index += 1) {
  const name = /^      - name: (.+)$/.exec(lines[index]);
  if (name) stepName = name[1];
  if (lines[index] !== "        run: |") continue;
  const body = [];
  while (++index < lines.length) {
    const line = lines[index];
    if (line !== "" && !line.startsWith("          ")) {
      index -= 1;
      break;
    }
    body.push(line.slice(10));
  }
  blocks.set(stepName, body.join("\n"));
}

function runBlock(name, cwd, environment = {}) {
  assert.ok(blocks.has(name), `Missing workflow step: ${name}`);
  return spawnSync("bash", ["-e", "-o", "pipefail"], {
    cwd,
    input: blocks.get(name),
    encoding: "utf8",
    env: { ...process.env, ...environment },
    timeout: 10_000,
  });
}

function assertSuccess(result) {
  assert.equal(result.status, 0, result.stderr || result.error?.message);
}

test("every literal publication run block parses as Bash", shellOptions, () => {
  assert.ok(blocks.size >= 3, "No publication run blocks were extracted");
  for (const [name, input] of blocks) {
    const result = spawnSync("bash", ["-n"], { input, encoding: "utf8" });
    assert.equal(result.status, 0, `${name}: ${result.stderr}`);
  }
});

test(
  "the actual release guard accepts main history and rejects the wrong tag or source",
  shellOptions,
  async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "icons-release-guard-"));
    const git = (...arguments_) => {
      const result = spawnSync("git", arguments_, { cwd: root, encoding: "utf8" });
      assertSuccess(result);
      return result.stdout.trim();
    };
    try {
      git("init", "--initial-branch=main");
      git("config", "user.name", "Release fixture");
      git("config", "user.email", "fixture@example.invalid");
      git("config", "commit.gpgsign", "false");
      await writeFile(
        path.join(root, "package.json"),
        JSON.stringify({ name: "@wolfsblvt/icons", version: "0.1.0" }),
      );
      git("add", ".");
      git("commit", "-m", "release candidate");
      const release = git("rev-parse", "HEAD");
      git("commit", "--allow-empty", "-m", "later main work");
      git("remote", "add", "origin", root);
      const environment = { EXPECTED_TAG: "v0.1.0", GITHUB_SHA: release };
      assertSuccess(
        runBlock("Verify the tagged release source", root, environment),
      );
      assert.notEqual(
        runBlock("Verify the tagged release source", root, {
          ...environment,
          EXPECTED_TAG: "v0.2.0",
        }).status,
        0,
      );
      const outsideMain = git("commit-tree", "HEAD^{tree}", "-m", "unaccepted root");
      assert.notEqual(
        runBlock("Verify the tagged release source", root, {
          ...environment,
          GITHUB_SHA: outsideMain,
        }).status,
        0,
      );
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  },
);

for (const failures of [0, 2, 100]) {
  test(
    `registry readback is bounded after ${failures} unavailable reads`,
    shellOptions,
    async () => {
      const root = await mkdtemp(path.join(os.tmpdir(), "icons-registry-wait-"));
      try {
        const bin = path.join(root, "bin");
        await mkdir(bin);
        await mkdir(path.join(root, "scripts"));
        await writeFile(
          path.join(root, "package.json"),
          JSON.stringify({ name: "@wolfsblvt/icons", version: "0.1.0" }),
        );
        await writeFile(
          path.join(bin, "npm"),
          `#!/bin/bash
set -eu
test "$1" = view
count=0
if [ -f "$FIXTURE_COUNT" ]; then count=$(cat "$FIXTURE_COUNT"); fi
count=$((count + 1))
printf '%s' "$count" > "$FIXTURE_COUNT"
if [ "$count" -le "$FIXTURE_FAILURES" ]; then exit 1; fi
printf '0.1.0\\n'
`,
          { mode: 0o755 },
        );
        await writeFile(path.join(bin, "sleep"), "#!/bin/bash\nexit 0\n", {
          mode: 0o755,
        });
        await writeFile(
          path.join(root, "scripts", "check-packed-consumer.mjs"),
          'import { writeFileSync } from "node:fs";\n' +
            'writeFileSync("consumer-argument", process.argv[2]);\n',
        );
        const countPath = path.join(root, "attempts");
        const result = runBlock(
          "Verify the registry package and provenance",
          root,
          {
            PATH: `${bin}${path.delimiter}${process.env.PATH}`,
            PACKAGE_VERSION: "v0.1.0",
            FIXTURE_COUNT: countPath,
            FIXTURE_FAILURES: String(failures),
          },
        );
        const count = Number(await readFile(countPath, "utf8"));
        if (failures < 31) {
          assertSuccess(result);
          assert.equal(count, failures + 1);
          assert.equal(
            await readFile(path.join(root, "consumer-argument"), "utf8"),
            "--registry-package=@wolfsblvt/icons@0.1.0",
          );
        } else {
          assert.notEqual(result.status, 0);
          assert.equal(count, 31);
          await assert.rejects(readFile(path.join(root, "consumer-argument")), {
            code: "ENOENT",
          });
        }
      } finally {
        await rm(root, { recursive: true, force: true });
      }
    },
  );
}
