import type { CSSProperties } from "react";

export type MainBackgroundRecipe = {
  baseColor: string;
  frameRadiusPx: number;
  glassBlurPx: number;
  glassTintColor: string;
  noiseBlendMode: CSSProperties["mixBlendMode"];
  noiseImageOpacity: number;
  noiseTintColor: string;
  noiseTopRadiusPx: number;
};

// Tuned to match Figma node 61:1854 (layers 61:1902 + 61:1904).
export const FIGMA_MAIN_BACKGROUND_RECIPE: MainBackgroundRecipe = {
  baseColor: "#ffffff",
  frameRadiusPx: 12,
  glassBlurPx: 5,
  glassTintColor: "rgba(0,0,0,0.004)",
  noiseBlendMode: "multiply",
  noiseImageOpacity: 1,
  noiseTintColor: "rgba(255,255,255,0.2)",
  noiseTopRadiusPx: 12,
};
