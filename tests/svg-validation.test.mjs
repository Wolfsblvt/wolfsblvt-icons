import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { validateWorksSvg } from "../scripts/lib/svg-contract.mjs";

async function fixture(name) {
  return readFile(new URL(`./fixtures/icons/${name}`, import.meta.url), "utf8");
}

function authored(body, rootExtra = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${rootExtra}>${body}</svg>`;
}

test("accepts the canonical Works-authored SVG structure", async () => {
  assert.deepEqual(
    validateWorksSvg(await fixture("valid.svg"), "valid.svg"),
    [],
  );
});

test("rejects transforms", async () => {
  assert.match(
    validateWorksSvg(
      await fixture("invalid-transform.svg"),
      "invalid.svg",
    ).join("\n"),
    /transform is forbidden/,
  );
});

test("rejects fixed fill colours", async () => {
  assert.match(
    validateWorksSvg(await fixture("invalid-fill.svg"), "invalid.svg").join(
      "\n",
    ),
    /fixed or non-none fill values are forbidden/,
  );
});

test("rejects event-handler attributes", () => {
  assert.match(
    validateWorksSvg(
      authored('<path onclick="alert(1)" d="M4 12h16"/>'),
      "event.svg",
    ).join("\n"),
    /event attribute onclick is forbidden/,
  );
});

test("rejects script elements", () => {
  assert.match(
    validateWorksSvg(authored("<script>alert(1)</script>"), "script.svg").join(
      "\n",
    ),
    /element <script> is forbidden/,
  );
});

test("rejects text content", () => {
  assert.match(
    validateWorksSvg(authored('<path d="M4 12h16"/>surprise'), "text.svg").join(
      "\n",
    ),
    /text content inside authored SVGs is forbidden/,
  );
});

test("rejects inline styles", () => {
  assert.match(
    validateWorksSvg(
      authored('<path style="stroke:red" d="M4 12h16"/>'),
      "style.svg",
    ).join("\n"),
    /attribute style is forbidden/,
  );
});

test("rejects external-reference attributes", () => {
  assert.match(
    validateWorksSvg(
      authored('<path href="https://example.invalid/icon" d="M4 12h16"/>'),
      "href.svg",
    ).join("\n"),
    /attribute href is forbidden/,
  );
});

test("rejects duplicate attributes", () => {
  assert.match(
    validateWorksSvg(
      authored('<path d="M4 12h16" d="M5 12h14"/>'),
      "duplicate.svg",
    ).join("\n"),
    /duplicate attribute d is forbidden/,
  );
});

test("rejects unquoted attributes", () => {
  const source =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox=0 0 24 24 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16"/></svg>';
  assert.match(
    validateWorksSvg(source, "unquoted.svg").join("\n"),
    /malformed or unquoted attribute/,
  );
});

test("rejects comments and declaration-like content", () => {
  assert.match(
    validateWorksSvg(
      authored('<!-- hidden --><path d="M4 12h16"/>'),
      "comment.svg",
    ).join("\n"),
    /Comments, declarations, entities, and processing instructions are forbidden/,
  );
});

test("rejects nested SVG roots", () => {
  assert.match(
    validateWorksSvg(
      authored('<svg viewBox="0 0 24 24"></svg>'),
      "nested.svg",
    ).join("\n"),
    /element <svg> is forbidden/,
  );
});

test("rejects mismatched geometry tags", () => {
  assert.match(
    validateWorksSvg(
      authored('<path d="M4 12h16"></circle>'),
      "mismatch.svg",
    ).join("\n"),
    /mismatched closing element/,
  );
});

test("rejects fixed stroke colours", () => {
  assert.match(
    validateWorksSvg(
      authored('<path stroke="#fff" d="M4 12h16"/>'),
      "stroke.svg",
    ).join("\n"),
    /fixed stroke values are forbidden/,
  );
});
