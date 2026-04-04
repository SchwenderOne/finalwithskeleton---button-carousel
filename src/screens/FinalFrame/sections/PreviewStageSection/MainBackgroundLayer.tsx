import type { CSSProperties } from "react";
import {
  FIGMA_MAIN_BACKGROUND_RECIPE,
  type MainBackgroundRecipe,
} from "./MainBackgroundRecipe";

type MainBackgroundLayerProps = {
  noiseImageUrl: string;
  recipe?: Partial<MainBackgroundRecipe>;
};

export const MainBackgroundLayer = ({
  noiseImageUrl,
  recipe,
}: MainBackgroundLayerProps): JSX.Element => {
  const resolvedRecipe: MainBackgroundRecipe = {
    ...FIGMA_MAIN_BACKGROUND_RECIPE,
    ...recipe,
  };
  const frameRadius = `${resolvedRecipe.frameRadiusPx}px`;
  const noiseTopRadius = `${resolvedRecipe.noiseTopRadiusPx}px`;
  const glassLayerStyle: CSSProperties = {
    backgroundColor: resolvedRecipe.glassTintColor,
    borderRadius: frameRadius,
    backdropFilter: `blur(${resolvedRecipe.glassBlurPx}px)`,
    WebkitBackdropFilter: `blur(${resolvedRecipe.glassBlurPx}px)`,
  };
  const noiseTextureStyle: CSSProperties = {
    backgroundImage: `url(${noiseImageUrl})`,
    backgroundSize: "100% 100%",
    mixBlendMode: resolvedRecipe.noiseBlendMode,
    opacity: resolvedRecipe.noiseImageOpacity,
  };

  return (
    <div className="absolute left-0 top-[82px] h-[902px] w-full">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: resolvedRecipe.baseColor, borderRadius: frameRadius }}
      />
      <div className="absolute inset-0" style={glassLayerStyle} />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundColor: resolvedRecipe.noiseTintColor,
          borderTopLeftRadius: noiseTopRadius,
          borderTopRightRadius: noiseTopRadius,
        }}
      >
        <div className="absolute inset-0" style={noiseTextureStyle} />
      </div>
    </div>
  );
};
