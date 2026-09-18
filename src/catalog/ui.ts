const UI_ALIASES = {
  close: "lucide:x",
  copy: "lucide:copy",
  download: "lucide:download",
  "external-link": "lucide:external-link",
  info: "lucide:info",
  menu: "lucide:menu",
  search: "lucide:search",
  settings: "lucide:settings",
  success: "lucide:circle-check",
  upload: "lucide:upload",
  verified: "lucide:badge-check",
  warning: "lucide:triangle-alert",
} as const;

export type UiAlias = keyof typeof UI_ALIASES;
export type DirectLucideName = `lucide:${string}`;
export type UiIconName = UiAlias | DirectLucideName;

const LUCIDE_NAME = /^lucide:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const uiAliases: Readonly<Record<UiAlias, `lucide:${string}`>> =
  UI_ALIASES;

export const curatedLucideNames = Object.freeze(
  [...new Set(Object.values(UI_ALIASES).map((name) => name.slice("lucide:".length)))].sort(),
);

export function resolveUiIcon(name: UiIconName | string): `lucide:${string}` {
  if (Object.prototype.hasOwnProperty.call(UI_ALIASES, name)) {
    return UI_ALIASES[name as UiAlias];
  }

  if (LUCIDE_NAME.test(name)) {
    return name as `lucide:${string}`;
  }

  throw new Error(
    `Unknown UI icon "${name}". Use a shared alias or an explicit lucide:<name> reference.`,
  );
}
