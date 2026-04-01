import { useId } from "react";

type CanvasDotGridProps = {
  height: number;
  originX: number;
  originY: number;
  width: number;
  zoom: number;
};

const BASE_TOP_UNITS_PER_STEP = 100;
const BASE_LEFT_UNITS_PER_STEP = 200;
const TOP_MAJOR_STEP_PX = 60;
const LEFT_MAJOR_STEP_PX = 83;
const DOT_SPACING_PX = 32;
const DOT_RADIUS = 1.6;

export const CanvasDotGrid = ({
  height,
  originX,
  originY,
  width,
  zoom,
}: CanvasDotGridProps): JSX.Element => {
  const patternId = useId();
  const scaledSpacing = DOT_SPACING_PX * zoom;
  const overscan = Math.max(128, scaledSpacing * 2);
  const svgWidth = width + overscan * 2 + scaledSpacing;
  const svgHeight = height + overscan * 2 + scaledSpacing;
  const offsetX =
    ((-(originX * TOP_MAJOR_STEP_PX * zoom) / BASE_TOP_UNITS_PER_STEP) % scaledSpacing +
      scaledSpacing) %
    scaledSpacing;
  const offsetY =
    (((originY * LEFT_MAJOR_STEP_PX * zoom) / BASE_LEFT_UNITS_PER_STEP) % scaledSpacing +
      scaledSpacing) %
    scaledSpacing;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ width, height }}
      aria-hidden="true"
    >
      <svg
        className="absolute"
        style={{
          left: -overscan + offsetX - scaledSpacing,
          top: -overscan + offsetY - scaledSpacing,
          willChange: "left, top",
        }}
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        fill="none"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width={DOT_SPACING_PX}
            height={DOT_SPACING_PX}
            patternUnits="userSpaceOnUse"
            patternTransform={`scale(${zoom})`}
          >
            <circle cx={DOT_RADIUS} cy={DOT_RADIUS} r={DOT_RADIUS} fill="#dcdcdc" />
          </pattern>
        </defs>
        <rect width={svgWidth} height={svgHeight} fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};
