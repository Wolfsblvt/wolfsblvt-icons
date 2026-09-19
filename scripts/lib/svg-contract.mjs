const REQUIRED_ROOT_ATTRIBUTES = Object.freeze({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
});

const ROOT_ATTRIBUTES = new Set([
  ...Object.keys(REQUIRED_ROOT_ATTRIBUTES),
  "xmlns",
]);

const COMMON_GEOMETRY_ATTRIBUTES = new Set([
  "fill",
  "stroke",
  "stroke-width",
  "stroke-linecap",
  "stroke-linejoin",
]);

const ELEMENT_ATTRIBUTES = new Map([
  ["circle", new Set(["cx", "cy", "r", ...COMMON_GEOMETRY_ATTRIBUTES])],
  ["ellipse", new Set(["cx", "cy", "rx", "ry", ...COMMON_GEOMETRY_ATTRIBUTES])],
  ["line", new Set(["x1", "y1", "x2", "y2", ...COMMON_GEOMETRY_ATTRIBUTES])],
  ["path", new Set(["d", ...COMMON_GEOMETRY_ATTRIBUTES])],
  ["polygon", new Set(["points", ...COMMON_GEOMETRY_ATTRIBUTES])],
  ["polyline", new Set(["points", ...COMMON_GEOMETRY_ATTRIBUTES])],
  [
    "rect",
    new Set([
      "x",
      "y",
      "width",
      "height",
      "rx",
      "ry",
      ...COMMON_GEOMETRY_ATTRIBUTES,
    ]),
  ],
]);

const ATTRIBUTE =
  /\s*([A-Za-z_][A-Za-z0-9_.:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/y;
const UNSAFE_VALUE = /(?:javascript\s*:|data\s*:|url\s*\()/i;

export function parseAttributes(source, context = "element") {
  const attributes = new Map();
  let cursor = 0;

  while (cursor < source.length) {
    if (/^\s*$/.test(source.slice(cursor))) break;

    ATTRIBUTE.lastIndex = cursor;
    const match = ATTRIBUTE.exec(source);
    if (!match || match.index !== cursor) {
      throw new Error(
        `${context}: malformed or unquoted attribute near ${JSON.stringify(
          source.slice(cursor, cursor + 32),
        )}.`,
      );
    }

    const name = match[1];
    const value = match[2] ?? match[3] ?? "";
    if (attributes.has(name)) {
      throw new Error(`${context}: duplicate attribute ${name} is forbidden.`);
    }

    attributes.set(name, value);
    cursor = ATTRIBUTE.lastIndex;
  }

  return attributes;
}

export function extractSvg(source) {
  if (/<!--|<!DOCTYPE|<!ENTITY|<\?/i.test(source)) {
    throw new Error(
      "Comments, declarations, entities, and processing instructions are forbidden.",
    );
  }

  const match = source.match(/^\s*<svg\b([^>]*)>([\s\S]*?)<\/svg>\s*$/i);
  if (!match) {
    throw new Error("Expected one complete <svg> root element.");
  }

  return {
    attributes: parseAttributes(match[1], "<svg>"),
    body: match[2].trim(),
  };
}

function validatePaintAttribute(name, value, fileName, tag, errors) {
  if (UNSAFE_VALUE.test(value)) {
    errors.push(
      `${fileName}: <${tag}> attribute ${name} contains an unsafe value.`,
    );
  }

  if (name === "fill" && value !== "none") {
    errors.push(`${fileName}: fixed or non-none fill values are forbidden.`);
  }

  if (name === "stroke" && value !== "currentColor") {
    errors.push(`${fileName}: fixed stroke values are forbidden.`);
  }

  if (name === "stroke-width" && value !== "2") {
    errors.push(`${fileName}: stroke-width must remain 2.`);
  }

  if (
    (name === "stroke-linecap" || name === "stroke-linejoin") &&
    value !== "round"
  ) {
    errors.push(`${fileName}: ${name} must remain round.`);
  }
}

function validateBody(body, fileName, errors) {
  if (/<!--|<!DOCTYPE|<!ENTITY|<\?/i.test(body)) {
    errors.push(
      `${fileName}: comments, declarations, entities, and processing instructions are forbidden.`,
    );
    return;
  }

  const token = /<[^>]+>/g;
  const stack = [];
  let cursor = 0;
  let geometryCount = 0;

  for (const match of body.matchAll(token)) {
    const text = body.slice(cursor, match.index);
    if (text.trim()) {
      errors.push(
        `${fileName}: text content inside authored SVGs is forbidden.`,
      );
    }
    cursor = match.index + match[0].length;

    const raw = match[0];
    const closing = raw.match(/^<\/\s*([A-Za-z][A-Za-z0-9:-]*)\s*>$/);
    if (closing) {
      const tag = closing[1].toLowerCase();
      const expected = stack.pop();
      if (expected !== tag) {
        errors.push(
          `${fileName}: mismatched closing element </${tag}>; expected ${
            expected ? `</${expected}>` : "no closing element"
          }.`,
        );
      }
      continue;
    }

    const opening = raw.match(/^<\s*([A-Za-z][A-Za-z0-9:-]*)([\s\S]*?)(\/?)>$/);
    if (!opening) {
      errors.push(`${fileName}: malformed SVG element ${JSON.stringify(raw)}.`);
      continue;
    }

    const tag = opening[1].toLowerCase();
    const selfClosing = opening[3] === "/";
    const allowedAttributes = ELEMENT_ATTRIBUTES.get(tag);

    if (!allowedAttributes) {
      errors.push(`${fileName}: element <${tag}> is forbidden.`);
      continue;
    }

    geometryCount += 1;

    let attributes;
    try {
      attributes = parseAttributes(opening[2], `<${tag}>`);
    } catch (error) {
      errors.push(`${fileName}: ${error.message}`);
      continue;
    }

    for (const [name, value] of attributes) {
      if (name.toLowerCase().startsWith("on")) {
        errors.push(`${fileName}: event attribute ${name} is forbidden.`);
        continue;
      }

      if (!allowedAttributes.has(name)) {
        errors.push(`${fileName}: <${tag}> attribute ${name} is forbidden.`);
        continue;
      }

      validatePaintAttribute(name, value, fileName, tag, errors);
    }

    if (!selfClosing) stack.push(tag);
  }

  if (body.slice(cursor).trim()) {
    errors.push(`${fileName}: text content inside authored SVGs is forbidden.`);
  }

  while (stack.length > 0) {
    errors.push(`${fileName}: unclosed <${stack.pop()}> element.`);
  }

  if (geometryCount === 0) {
    errors.push(`${fileName}: icon contains no geometry.`);
  }
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
        `${fileName}: root ${name} must be ${JSON.stringify(
          expected,
        )}; received ${JSON.stringify(actual)}.`,
      );
    }
  }

  for (const [name, value] of parsed.attributes) {
    if (name.toLowerCase().startsWith("on")) {
      errors.push(`${fileName}: root event attribute ${name} is forbidden.`);
      continue;
    }

    if (!ROOT_ATTRIBUTES.has(name)) {
      errors.push(`${fileName}: root attribute ${name} is forbidden.`);
      continue;
    }

    if (UNSAFE_VALUE.test(value)) {
      errors.push(
        `${fileName}: root attribute ${name} contains an unsafe value.`,
      );
    }
  }

  if (
    parsed.attributes.has("xmlns") &&
    parsed.attributes.get("xmlns") !== "http://www.w3.org/2000/svg"
  ) {
    errors.push(
      `${fileName}: xmlns must be "http://www.w3.org/2000/svg" when present.`,
    );
  }

  validateBody(parsed.body, fileName, errors);
  return [...new Set(errors)];
}

export function assertValidWorksSvg(source, fileName = "SVG") {
  const errors = validateWorksSvg(source, fileName);
  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }
}
