export type BrandSourceType =
  | "simple-icons"
  | "official-vendor"
  | "works-provider-glyph";

export type IconAvailability = "available" | "planned";
export type IconColorMode = "monochrome" | "brand";

export interface RedistributionStanding {
  standing: "dependency-reference" | "vendored" | "original-mit-when-authored";
  vendoredBytes: boolean;
  notes: string;
}

export interface BrandMetadata {
  id: string;
  status: "available";
  selectedSourceType: BrandSourceType;
  iconifyName: `simple-icons:${string}`;
  sourceUrl: string;
  retrievedAt: string;
  upstream: {
    package: "@iconify-json/simple-icons";
    version: string;
    slug: string;
    assetRevision: string;
  };
  license: {
    spdx: string;
    notes: string;
  };
  trademarkNotes: string;
  brandGuidelinesUrl: string;
  permittedColorModes: readonly IconColorMode[];
  brandColor: string | null;
  modifications: string;
  redistribution: RedistributionStanding;
  contentHash: string | null;
}

export interface ProductIconMetadata {
  id: string;
  namespace: string;
  name: string;
  status: IconAvailability;
  selectedSourceType: "works-provider-glyph";
  assetPath: string;
  intendedUse: string;
  license: {
    spdx: "MIT";
    notes: string;
  };
  permittedColorModes: readonly ["monochrome"];
  modifications: string;
  redistribution: RedistributionStanding;
  contentHash: string | null;
  authoringNotes: string;
}

export interface ResolvedCustomIcon {
  id: string;
  viewBox: "0 0 24 24";
  body: string;
}
