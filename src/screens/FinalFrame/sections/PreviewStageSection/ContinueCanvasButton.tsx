import LiquidGlass from "liquid-glass-react";

const ContinueArrowIcon = (): JSX.Element => {
  return (
    <svg className="h-[11px] w-[14px]" viewBox="0 0 14 11" fill="none" aria-hidden="true">
      <path
        d="M1 5.5H12.2M8.2 1L12.5 5.5L8.2 10"
        stroke="#494949"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ContinueCanvasButton = (): JSX.Element => {
  return (
    <div className="relative h-[50px] w-[129px] shrink-0 rounded-[35.747px]">
      <div className="absolute inset-[1.12px] overflow-hidden rounded-[34.627px] [clip-path:inset(0_round_34.627px)]">
        <LiquidGlass
          className="h-[47.76px] w-[126.76px] overflow-hidden rounded-[34.627px]"
          style={{ position: "absolute", top: "50%", left: "50%" }}
          mode="shader"
          displacementScale={20}
          blurAmount={0.032}
          saturation={132}
          aberrationIntensity={1.3}
          elasticity={0}
          cornerRadius={34.627}
          padding="0px"
        >
          <button
            type="button"
            className="relative flex h-[47.76px] w-[126.76px] items-center justify-between rounded-[34.627px] border-[0.45px] border-solid border-[rgba(255,255,255,0.34)] bg-[rgba(196,196,196,0.34)] pl-[11.6px] pr-[11.8px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
          >
            <span className="pointer-events-none absolute inset-0 rounded-[34.627px] bg-[rgba(139,153,173,0.3)]" />
            <span className="pointer-events-none absolute inset-0 rounded-[34.627px] bg-[rgba(245,245,245,0.2)]" />
            <span className="pointer-events-none absolute inset-x-[1.2px] top-[1px] h-[46%] rounded-t-[34.627px] bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.06)_62%,rgba(255,255,255,0)_100%)]" />
            <span className="relative z-10 [font-family:'Aeonik_Pro-Medium',Helvetica] text-[17.745px] font-medium leading-[1.06] tracking-[-0.1774px] text-[#343434]">
              Continue
            </span>
            <span className="relative z-10">
              <ContinueArrowIcon />
            </span>
          </button>
        </LiquidGlass>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[35.747px] border-[1.6px] border-[rgba(255,255,255,0.9)] shadow-[inset_0_0_0_0.7px_rgba(96,106,121,0.42)]" />
    </div>
  );
};
