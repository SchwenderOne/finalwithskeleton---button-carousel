type TopCanvasRulerProps = {
  originX: number;
  width: number;
  zoom: number;
};

type LeftCanvasRulerProps = {
  height: number;
  originY: number;
  zoom: number;
};

const TOP_MAJOR_STEP_PX = 60;
const LEFT_MAJOR_STEP_PX = 83;
const BASE_TOP_UNITS_PER_STEP = 100;
const BASE_LEFT_UNITS_PER_STEP = 200;

const formatRulerValue = (value: number): string => `${Math.round(value)}`;

export const TopCanvasRuler = ({ width, originX, zoom }: TopCanvasRulerProps): JSX.Element => {
  const topTickCount = Math.max(2, Math.floor((width - 36) / TOP_MAJOR_STEP_PX) + 1);
  const topUnitsPerStep = BASE_TOP_UNITS_PER_STEP / zoom;
  const topValues = Array.from({ length: topTickCount }, (_, index) =>
    formatRulerValue(originX + index * topUnitsPerStep),
  );

  return (
    <div
      className="relative h-6 overflow-hidden rounded-t-[2px] border-b border-[rgba(255,255,255,0.35)] bg-[linear-gradient(180deg,#a6a6a4_0%,#9f9f9d_100%)]"
      style={{ width }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0)_65%)]" />

      <div className="absolute inset-x-[18px] top-[3px] flex items-center justify-between">
        {topValues.map((value, index) => (
          <div
            key={`${value}-${index}`}
            className="whitespace-nowrap [font-family:'Aeonik_Pro-Medium',Helvetica] text-[12px] font-medium leading-[12px] tracking-[-0.12px] text-[rgba(245,245,245,0.95)]"
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export const LeftCanvasRuler = ({ height, originY, zoom }: LeftCanvasRulerProps): JSX.Element => {
  const leftTickCount = Math.max(2, Math.floor((height - 16) / LEFT_MAJOR_STEP_PX) + 1);
  const leftUnitsPerStep = BASE_LEFT_UNITS_PER_STEP / zoom;
  const leftValues = Array.from({ length: leftTickCount }, (_, index) =>
    formatRulerValue(originY - index * leftUnitsPerStep),
  );

  return (
    <div
      className="relative w-[23px] overflow-hidden rounded-l-[2px] border-r border-[rgba(255,255,255,0.35)] bg-[linear-gradient(180deg,#a8a8a6_0%,#9f9f9d_100%)]"
      style={{ height }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_75%)]" />

      <div className="absolute inset-y-[8px] left-1/2 flex -translate-x-1/2 flex-col items-center justify-between">
        {leftValues.map((value, index) => (
          <div
            key={`${value}-${index}`}
            className="rotate-90 whitespace-nowrap [font-family:'Aeonik_Pro-Medium',Helvetica] text-[12px] font-medium leading-[12px] tracking-[-0.12px] text-[rgba(245,245,245,0.95)]"
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};
