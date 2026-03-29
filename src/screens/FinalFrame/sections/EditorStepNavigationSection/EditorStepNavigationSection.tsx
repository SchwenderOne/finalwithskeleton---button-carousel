const HomeIcon = (): JSX.Element => {
  return (
    <svg className="h-[33.42px] w-[24.92px] shrink-0" viewBox="0 0 25 34" fill="none">
      <path
        d="M8.47 17.87V17.62H8.47C8.58 13.45 11.88 10.13 15.93 10.13L15.95 1.86C15.95 0.3 14.4 -0.54 13.26 0.39L2.26 9.28C1.46 9.98 1 11.01 1 12.09V31.89C1 33.22 2.53 33.92 3.47 33.02L8.47 29.15V17.87Z"
        fill="#282727"
      />
      <path
        d="M19.62 22.66L23.92 18.78V17.28C23.92 12.89 20.37 9.34 15.98 9.34H15.95V22.56C15.95 23.83 17.33 24.54 18.28 23.76L19.62 22.66Z"
        fill="#282727"
      />
    </svg>
  );
};

const PlayIcon = (): JSX.Element => {
  return (
    <svg className="h-[15px] w-[15px]" viewBox="0 0 15 15" fill="none">
      <path
        d="M1.57 13.27C1.57 14.25 2.18 14.74 2.91 14.74C3.21 14.74 3.54 14.65 3.85 14.47L13.89 8.72C14.6 8.31 14.95 7.94 14.95 7.37C14.95 6.79 14.6 6.42 13.89 6.02L3.85 0.26C3.54 0.09 3.21 0 2.91 0C2.18 0 1.57 0.48 1.57 1.46V13.27Z"
        fill="#343434"
      />
    </svg>
  );
};

const StepArrow = ({ active }: { active: boolean }): JSX.Element => {
  return (
    <svg className="relative h-[17px] w-3.5" viewBox="0 0 14 17" fill="none">
      <path
        d="M5 4L10 9L5 14"
        stroke={active ? "#4D4D4D" : "#C9C9C9"}
        strokeWidth="2.1886"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EditorStepNavigationSection = (): JSX.Element => {
  const steps = ["Start", "Step 1", "Step 2", "Step 3", "Step 4"];
  const navBackgroundSrc =
    "https://www.figma.com/api/mcp/asset/d89c974d-4887-4e3a-ac59-a65fe60098b4";
  const gearIconSrc =
    "https://www.figma.com/api/mcp/asset/975d2646-f647-4a3f-a7d3-0c5fe6a3a6e9";

  return (
    <div className="absolute top-0 left-0 h-[95px] w-full overflow-hidden rounded-t-[27.87px] bg-[#505050]">
      <div className="absolute inset-0 overflow-hidden rounded-t-[27.87px]">
        <img className="absolute inset-0 h-[95px] w-full max-w-none" alt="Navbar background" src={navBackgroundSrc} />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" />
        <div className="absolute inset-0 bg-[#0f0f0f] mix-blend-color-dodge" />
        <div className="absolute inset-0 bg-[rgba(245,245,245,0.4)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-t-[27.87px] border-2 border-solid border-[rgba(220,220,220,0.33)]" />

      <div className="absolute right-8 top-[23px] inline-flex items-center gap-[29px]">
        <div className="relative h-[49px] w-[86px]">
          <img
            className="absolute -left-px -top-px h-[51px] w-[88px]"
            alt="Rectangle"
            src="https://c.animaapp.com/ViJx1BUZ/img/rectangle-107.svg"
          />
          <div className="absolute -left-px top-2.5 flex h-[26px] w-[86px] items-center justify-center [-webkit-text-stroke:0.61px_transparent] bg-[linear-gradient(0deg,rgba(85,85,85,0.15)_0%,rgba(255,255,255,0.15)_100%)] bg-blend-exclusion [-webkit-background-clip:text] [font-family:'Aeonik_Pro-Medium',Helvetica] text-center text-[19px] font-medium leading-[20.1px] tracking-[-0.19px] text-white">
            Save
          </div>
        </div>

        <div className="relative h-[34.42px] w-[34.42px] shrink-0 rounded-[24.62px] border border-[rgba(130,130,130,0.15)] bg-[rgba(255,255,255,0.25)] shadow-[0px_0px_25.097px_0.988px_rgba(0,0,0,0.05)]">
          <div className="absolute left-[10px] top-[10px]">
            <PlayIcon />
          </div>
        </div>

        <div className="relative h-[34px] w-[34px] shrink-0 rounded-[24.62px] border border-[rgba(130,130,130,0.15)] bg-[rgba(255,255,255,0.25)] shadow-[0px_0px_25.097px_0.988px_rgba(0,0,0,0.05)]">
          <img
            className="absolute left-[7px] top-[7.5px] h-[19px] w-5"
            alt="Settings"
            src={gearIconSrc}
          />
        </div>
      </div>

      <div className="absolute left-8 top-[23px] flex h-[49px] items-center gap-[35px]">
        <div className="relative flex h-[49px] items-center gap-3.5">
          <HomeIcon />
          <div className="relative flex h-[49px] items-center">
            <div className="whitespace-nowrap bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] text-[21.3px] font-medium leading-[22.6px] tracking-[-0.21px] text-[#272727]">
              Caesar 1
            </div>
          </div>
        </div>

        <div className="relative flex h-[49px] w-2.5 items-center">
          <div className="absolute left-1 top-[11px] h-[26px] w-[3px] rounded-full bg-[#4d4d4d]" />
        </div>

        <div className="relative inline-flex h-[49px] items-center gap-6">
          {steps.map((step, index) => (
            <div key={step} className="inline-flex h-[49px] items-center gap-6">
              {index === 0 ? (
                <div className="relative flex h-[49px] w-[51px] items-center">
                  <div className="ml-[3px] flex h-5 w-[45px] items-center whitespace-nowrap bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] text-xl font-medium leading-[21.2px] tracking-[-0.2px] text-[#4c4c4c]">
                    Start
                  </div>
                </div>
              ) : (
                <div className="relative flex h-[49px] w-[62px] items-center">
                  <p className="ml-0.5 flex h-5 w-[60px] items-center justify-center whitespace-nowrap bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] text-center text-xl font-medium leading-[21.2px] tracking-[-0.2px] text-white opacity-[0.76]">
                    <span className="tracking-[-0.04px]">Step</span>
                    <span className="text-base leading-[17px] tracking-[-0.03px]">
                      &nbsp;
                    </span>
                    <span className="tracking-[-0.04px]">{index}</span>
                  </p>
                </div>
              )}
              {index < steps.length - 1 && (
                <StepArrow active={index === 0} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
