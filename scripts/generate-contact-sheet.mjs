import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractSvg } from "./lib/svg-contract.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checking = process.argv.includes("--check");

const icons = [
  { id: "settings", label: "settings", family: "Lucide", kind: "stroke", file: "fixtures/source-icons/lucide/settings.svg" },
  { id: "verified", label: "verified", family: "Lucide", kind: "stroke", file: "fixtures/source-icons/lucide/badge-check.svg" },
  { id: "github", label: "github", family: "Simple Icons", kind: "fill", file: "fixtures/source-icons/simple-icons/github.svg" },
  { id: "discord", label: "discord", family: "Simple Icons", kind: "fill", file: "fixtures/source-icons/simple-icons/discord.svg" },
];

function compact(body) {
  return body
    .replace(/<title>[\s\S]*?<\/title>/gi, "")
    .replace(/>\s+</g, "><")
    .replace(/\s+/g, " ")
    .trim();
}

for (const icon of icons) {
  const source = await readFile(path.join(root, icon.file), "utf8");
  icon.body = compact(extractSvg(source).body);
}

function iconMarkup(icon, size) {
  const className = icon.kind === "stroke" ? "stroke-icon" : "fill-icon";
  return `<svg class="${className}" aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24"><use href="#icon-${icon.id}"/></svg>`;
}

function renderContactSheet() {
  const symbols = icons
    .map(
      (icon) =>
        `<symbol id="icon-${icon.id}" viewBox="0 0 24 24">${icon.body}</symbol>`,
    )
    .join("");
  const cards = icons.map((icon) => `
      <article class="icon-card">
        <div class="identity"><strong>${icon.label}</strong><span>${icon.family}</span></div>
        <div class="sizes">${[16, 20, 24, 32].map((size) => `<span>${iconMarkup(icon, size)}<small>${size}</small></span>`).join("")}</div>
      </article>`).join("");
  const densityReferences = `
      <article class="icon-card reference-card">
        <div class="identity"><strong>density references</strong><span>basic geometry</span></div>
        <div class="sizes references">
          <span><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg><small>circle</small></span>
          <span><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg><small>square</small></span>
        </div>
      </article>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Wolfsblvt Icons contact sheet</title>
  <style>
    :root { color-scheme: light dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 32px; background: #ececf3; color: #18181f; }
    h1, p { margin: 0; }
    header { display: grid; gap: 8px; margin: 0 auto 24px; max-width: 1120px; }
    .themes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; max-width: 1120px; margin: 0 auto; }
    section { border-radius: 24px; padding: 24px; display: grid; gap: 14px; }
    .light { background: #ffffff; color: #171720; }
    .dark { background: #111119; color: #f6f3ff; }
    .icon-card { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; padding: 16px; border: 1px solid color-mix(in srgb, currentColor 15%, transparent); border-radius: 16px; }
    .identity { display: grid; gap: 4px; }
    .identity span, small { opacity: .62; }
    .sizes { display: flex; align-items: end; gap: 18px; }
    .sizes span { display: grid; justify-items: center; gap: 6px; min-width: 34px; }
    .reference-card { border-style: dashed; }
    .references { min-width: 190px; justify-content: end; }
    svg { display: block; }
    .stroke-icon { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .fill-icon { fill: currentColor; }
    @media (max-width: 800px) { .themes { grid-template-columns: 1fr; } .icon-card { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <svg aria-hidden="true" width="0" height="0" style="position:absolute">${symbols}</svg>
  <header>
    <h1>Wolfsblvt Icons contact sheet</h1>
    <p>Starter catalogue at 16, 20, 24, and 32 pixels. Product glyph canaries remain intentionally unrendered.</p>
  </header>
  <main class="themes">
    <section class="light" aria-label="Light presentation">${cards}${densityReferences}</section>
    <section class="dark" aria-label="Dark presentation">${cards}${densityReferences}</section>
  </main>
</body>
</html>
`;
}

function renderReadmePop() {
  const positions = [120, 330, 540, 750];
  const groups = icons.map((icon, index) => {
    const paint = icon.kind === "stroke"
      ? 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
      : 'fill="currentColor"';
    return `<g transform="translate(${positions[index]} 68)">
      <rect x="-58" y="-28" width="116" height="116" rx="26" fill="#ffffff" fill-opacity=".08" stroke="#ffffff" stroke-opacity=".12"/>
      <g transform="translate(-24 0) scale(2)" ${paint}>${icon.body}</g>
      <text x="0" y="114" text-anchor="middle" fill="#e9e4ff" font-size="16" font-family="Inter, ui-sans-serif, system-ui, sans-serif">${icon.label}</text>
    </g>`;
  }).join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="260" viewBox="0 0 960 260" role="img" aria-labelledby="title desc">
  <title id="title">Wolfsblvt Icons starter catalogue</title>
  <desc id="desc">Settings and verified Lucide icons beside curated GitHub and Discord brand marks.</desc>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#151226"/>
      <stop offset=".52" stop-color="#251a49"/>
      <stop offset="1" stop-color="#112a3e"/>
    </linearGradient>
    <radialGradient id="glow" cx=".5" cy="0" r=".9">
      <stop offset="0" stop-color="#b89cff" stop-opacity=".28"/>
      <stop offset="1" stop-color="#b89cff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="960" height="260" rx="28" fill="url(#background)"/>
  <rect width="960" height="260" rx="28" fill="url(#glow)"/>
  <g color="#f8f6ff">${groups}</g>
  <text x="900" y="232" text-anchor="end" fill="#c9bdf4" font-size="13" font-family="Inter, ui-sans-serif, system-ui, sans-serif">Lucide UI · curated brands · local assets</text>
</svg>
`;
}

async function writeOrCheck(relative, content) {
  const target = path.join(root, relative);
  if (checking) {
    const current = await readFile(target, "utf8");
    if (current !== content) {
      console.error(`${relative} is stale. Run npm run fixtures.`);
      process.exitCode = 1;
    }
  } else {
    await writeFile(target, content, "utf8");
    console.log(`Generated ${relative}.`);
  }
}

await writeOrCheck("fixtures/contact-sheet.html", renderContactSheet());
await writeOrCheck("docs/assets/readme/icon-pop.svg", renderReadmePop());

if (checking && !process.exitCode) {
  console.log("Visual fixtures are current.");
}
