export const EditorStepNavigationSection = (): JSX.Element => {
  const steps = ["Start", "Step 1", "Step 2", "Step 3", "Step 4"];
  const navBackgroundSrc =
    "https://www.figma.com/api/mcp/asset/d89c974d-4887-4e3a-ac59-a65fe60098b4";
  const playIconSrc =
    "https://www.figma.com/api/mcp/asset/49a3b2c0-e5e2-471e-bebd-c5675efee62d";
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
          <img
            className="absolute left-[10px] top-[10px] h-[15px] w-[15px]"
            alt="Play"
            src={playIconSrc}
          />
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
          <img
            className="relative h-[33.42px] w-[24.92px] shrink-0"
            alt="Home button"
            src="https://c.animaapp.com/ViJx1BUZ/img/home-button.svg"
          />
          <div className="relative flex h-[49px] items-center">
            <div className="whitespace-nowrap bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] text-[21.3px] font-medium leading-[22.6px] tracking-[-0.21px] text-[#272727]">
              Caesar 1
            </div>
          </div>
        </div>

        <div className="relative flex h-[49px] w-2.5 items-center">
          <img
            className="absolute left-1 top-[11px] h-[26px] w-[3px]"
            alt="Seperation line"
            src="https://c.animaapp.com/ViJx1BUZ/img/seperationline.svg"
          />
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
                <img
                  className="relative h-[17px] w-3.5"
                  alt="Frame"
                  src={
                    index === 0
                      ? "https://c.animaapp.com/ViJx1BUZ/img/frame-2147223109.svg"
                      : "https://c.animaapp.com/ViJx1BUZ/img/frame-2147223116.svg"
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
