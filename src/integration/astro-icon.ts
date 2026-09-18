import {
  curatedLucideNames,
  curatedSimpleIconNames,
} from "../catalog/index.js";

export interface CreateAstroIconOptionsInput {
  /** Additional direct lucide:<name> references used by this consumer. */
  extraLucide?: readonly string[];
}

export interface AstroIconOptions {
  include: {
    lucide: string[];
    "simple-icons": string[];
  };
}

const SLUG = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

function uniqueSorted(values: readonly string[]): string[] {
  return [...new Set(values)].sort();
}

export function createAstroIconOptions(
  input: CreateAstroIconOptionsInput = {},
): AstroIconOptions {
  const extras = input.extraLucide ?? [];
  for (const slug of extras) {
    if (!SLUG.test(slug)) {
      throw new Error(
        `Invalid Lucide icon slug "${slug}". Pass the part after lucide:.`,
      );
    }
  }

  return {
    include: {
      lucide: uniqueSorted([...curatedLucideNames, ...extras]),
      "simple-icons": [...curatedSimpleIconNames],
    },
  };
}
