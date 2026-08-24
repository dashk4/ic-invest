/**
 * The red checkmark swash from the IC logo (the "V" in InVesCore), isolated
 * from public/brand/logo_mn.svg. That file is the full wordmark with every
 * letterform as its own path; this is just the one red path, with its own
 * bounding box computed from its coordinates so it can be scaled and
 * centered independently of the rest of the logo.
 */
export const BRAND_CHECKMARK_PATH =
  "M53.2004 32.1538C61.5182 42.6097 67.5378 54.4365 70.9267 66.9808C71.3345 68.4261 72.1943 69.732 73.4012 70.7392C74.6081 71.7466 76.1103 72.4117 77.7243 72.6538C77.9252 72.6883 78.1328 72.6505 78.3038 72.5484C78.4748 72.4462 78.5958 72.2875 78.6412 72.1057C85.8402 43.3992 103.813 17.8923 129.449 0C105.458 13.763 86.6577 33.8953 75.5745 57.6922C69.6823 48.1296 62.1257 39.5043 53.2004 32.1538Z";

export const BRAND_CHECKMARK_VIEWBOX = { x: 53.2, y: 0, w: 76.2, h: 72.7 };

export const BRAND_RED = "#DA2128";
