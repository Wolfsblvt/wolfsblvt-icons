import { customIconData } from "../generated/custom-icons.js";
import diffdevilBrandJson from "../metadata/products/diffdevil/brand.json" with {
  type: "json",
};
import wolfsblvtWorksJson from "../metadata/products/wolfsblvt/works.json" with {
  type: "json",
};
import type { ProductIconMetadata, ResolvedCustomIcon } from "./types.js";

export type ProductIconName = "diffdevil/brand" | "wolfsblvt/works";

export const productIconCatalog = Object.freeze({
  "diffdevil/brand": diffdevilBrandJson as ProductIconMetadata,
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
