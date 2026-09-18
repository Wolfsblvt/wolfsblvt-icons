const REQUIRED_ROOT_ATTRIBUTES = Object.freeze({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
});

const ALLOWED_ELEMENTS = new Set([
  "circle",
  "ellipse",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "svg",
]);

const FORBIDDEN_ATTRIBUTES = new Set([
  "class",
  "filter",
  "height",
  "href",
  "id",
  "mask",
  "style",
  "transform",
  "width",
  "xlink:href",
]);

export function parseAttributes(source) {
  const attributes = new Map();
  const pattern = /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  for (const match of source.matchAll(pattern)) {
    attributes.set(match[1], match[2] ?? match[3] ?? "");
  }
  return attributes;
}

export function extractSvg(source) {
  const match = source.match(/^\s*<svg\b([^>]*)>([\s\S]*?)<\/svg>\s*$/i);
  if (!match) {
    throw new Error("Expected one complete <svg> root element.");
  }

  return {
    attributes: parseAttributes(match[1]),
    body: match[2].trim(),
  };
}

export function validateWorksSvg(source, fileName = "SVG") {
  const errors = [];
  let parsed;
  try {
    parsed = extractSvg(source);
  } catch (error) {
    return [`${fileName}: ${error.message}`];
  }

  for (const [name, expected] of Object.entries(REQUIRED_ROOT_ATTRIBUTES)) {
    const actual = parsed.attributes.get(name);
    if (actual !== expected) {
      errors.push(
        `${fileName}: root ${name} must be ${JSON.stringify(expected)}; received ${JSON.stringify(actual)}.`,
      );
    }
  }

  for (const attribute of parsed.attributes.keys()) {
    if (FORBIDDEN_ATTRIBUTES.has(attribute)) {
      errors.push(`${fileName}: root attribute ${attribute} is forbidden.`);
    }
  }

  const tags = [...source.matchAll(/<\/?\s*([a-zA-Z][\w:-]*)\b/g)].map(
    (match) => match[1].toLowerCase(),
  );
  for (const tag of tags) {
    if (!ALLOWED_ELEMENTS.has(tag)) {
      errors.push(`${fileName}: element <${tag}> is forbidden.`);
    }
  }

  if (!tags.some((tag) => tag !== "svg")) {
    errors.push(`${fileName}: icon contains no geometry.`);
  }

  for (const match of source.matchAll(/<([a-zA-Z][\w:-]*)\b([^>]*)>/g)) {
    const tag = match[1].toLowerCase();
    const attributes = parseAttributes(match[2]);
    for (const attribute of attributes.keys()) {
      if (FORBIDDEN_ATTRIBUTES.has(attribute)) {
        errors.push(`${fileName}: ${tag} attribute ${attribute} is forbidden.`);
      }
      if (attribute === "fill" && attributes.get(attribute) !== "none") {
        errors.push(`${fileName}: fixed or non-none fill values are forbidden.`);
      }
      if (attribute === "stroke" && attributes.get(attribute) !== "currentColor") {
        errors.push(`${fileName}: fixed stroke values are forbidden.`);
      }
    }
  }

  if (/url\s*\(/i.test(source)) {
    errors.push(`${fileName}: external or referenced paint servers are forbidden.`);
  }

  return [...new Set(errors)];
}

export function assertValidWorksSvg(source, fileName = "SVG") {
  const errors = validateWorksSvg(source, fileName);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
}
