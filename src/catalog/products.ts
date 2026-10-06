import { customIconData } from "../generated/custom-icons.js";
import borrowedCoastAtWarJson from "../metadata/products/borrowed-coast/at-war.json" with { type: "json" };
import borrowedCoastBeaconJson from "../metadata/products/borrowed-coast/beacon.json" with { type: "json" };
import borrowedCoastChartJson from "../metadata/products/borrowed-coast/chart.json" with { type: "json" };
import borrowedCoastControlJson from "../metadata/products/borrowed-coast/control.json" with { type: "json" };
import borrowedCoastDeepHullStraitJson from "../metadata/products/borrowed-coast/deep-hull-strait.json" with { type: "json" };
import borrowedCoastGuestMooringJson from "../metadata/products/borrowed-coast/guest-mooring.json" with { type: "json" };
import borrowedCoastHarborJson from "../metadata/products/borrowed-coast/harbor.json" with { type: "json" };
import borrowedCoastNationsJson from "../metadata/products/borrowed-coast/nations.json" with { type: "json" };
import borrowedCoastNoAccordJson from "../metadata/products/borrowed-coast/no-accord.json" with { type: "json" };
import borrowedCoastProtectedPeaceJson from "../metadata/products/borrowed-coast/protected-peace.json" with { type: "json" };
import borrowedCoastTidePhaseJson from "../metadata/products/borrowed-coast/tide-phase.json" with { type: "json" };
import borrowedCoastWatchJson from "../metadata/products/borrowed-coast/watch.json" with { type: "json" };
import diffdevilBandsJson from "../metadata/products/diffdevil/bands.json" with { type: "json" };
import diffdevilBrandJson from "../metadata/products/diffdevil/brand.json" with { type: "json" };
import diffdevilChangedJson from "../metadata/products/diffdevil/changed.json" with { type: "json" };
import diffdevilRawChurnJson from "../metadata/products/diffdevil/raw-churn.json" with { type: "json" };
import wolfsblvtWorksJson from "../metadata/products/wolfsblvt/works.json" with { type: "json" };
import type { ProductIconMetadata, ResolvedCustomIcon } from "./types.js";

export type ProductIconName =
  | "borrowed-coast/at-war"
  | "borrowed-coast/beacon"
  | "borrowed-coast/chart"
  | "borrowed-coast/control"
  | "borrowed-coast/deep-hull-strait"
  | "borrowed-coast/guest-mooring"
  | "borrowed-coast/harbor"
  | "borrowed-coast/nations"
  | "borrowed-coast/no-accord"
  | "borrowed-coast/protected-peace"
  | "borrowed-coast/tide-phase"
  | "borrowed-coast/watch"
  | "diffdevil/bands"
  | "diffdevil/brand"
  | "diffdevil/changed"
  | "diffdevil/raw-churn"
  | "wolfsblvt/works";

export const productIconCatalog = Object.freeze({
  "borrowed-coast/at-war": borrowedCoastAtWarJson as ProductIconMetadata,
  "borrowed-coast/beacon": borrowedCoastBeaconJson as ProductIconMetadata,
  "borrowed-coast/chart": borrowedCoastChartJson as ProductIconMetadata,
  "borrowed-coast/control": borrowedCoastControlJson as ProductIconMetadata,
  "borrowed-coast/deep-hull-strait":
    borrowedCoastDeepHullStraitJson as ProductIconMetadata,
  "borrowed-coast/guest-mooring":
    borrowedCoastGuestMooringJson as ProductIconMetadata,
  "borrowed-coast/harbor": borrowedCoastHarborJson as ProductIconMetadata,
  "borrowed-coast/nations": borrowedCoastNationsJson as ProductIconMetadata,
  "borrowed-coast/no-accord": borrowedCoastNoAccordJson as ProductIconMetadata,
  "borrowed-coast/protected-peace":
    borrowedCoastProtectedPeaceJson as ProductIconMetadata,
  "borrowed-coast/tide-phase":
    borrowedCoastTidePhaseJson as ProductIconMetadata,
  "borrowed-coast/watch": borrowedCoastWatchJson as ProductIconMetadata,
  "diffdevil/bands": diffdevilBandsJson as ProductIconMetadata,
  "diffdevil/brand": diffdevilBrandJson as ProductIconMetadata,
  "diffdevil/changed": diffdevilChangedJson as ProductIconMetadata,
  "diffdevil/raw-churn": diffdevilRawChurnJson as ProductIconMetadata,
  "wolfsblvt/works": wolfsblvtWorksJson as ProductIconMetadata,
}) satisfies Readonly<Record<ProductIconName, ProductIconMetadata>>;

export const productIconNames = Object.freeze(
  Object.keys(productIconCatalog).sort() as ProductIconName[],
);

export const availableProductIconNames = Object.freeze(
  productIconNames.filter(
    (name) => productIconCatalog[name].status === "available",
  ),
);

export function getProductIconMetadata(
  name: ProductIconName | string,
): ProductIconMetadata {
  if (!Object.prototype.hasOwnProperty.call(productIconCatalog, name)) {
    throw new Error(
      `Unknown product icon "${name}". Use a stable <product>/<icon> catalogue name.`,
    );
  }

  return productIconCatalog[name as ProductIconName];
}

export function resolveProductIcon(
  name: ProductIconName | string,
): ResolvedCustomIcon {
  const metadata = getProductIconMetadata(name);
  if (metadata.status !== "available") {
    throw new Error(
      `Product icon "${name}" is planned but has no approved geometry yet.`,
    );
  }

  const key = `products/${metadata.id}`;
  const generatedIcons: Readonly<Record<string, ResolvedCustomIcon>> =
    customIconData;
  const icon = generatedIcons[key];
  if (!icon) {
    throw new Error(
      `Product icon "${name}" is marked available but its generated geometry is missing.`,
    );
  }

  return icon;
}
