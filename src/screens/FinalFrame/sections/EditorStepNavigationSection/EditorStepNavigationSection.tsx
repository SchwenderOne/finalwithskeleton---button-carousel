export const EditorStepNavigationSection = (): JSX.Element => {
  const steps = ["Start", "Step 1", "Step 2", "Step 3", "Step 4"];

  return (
    <div className="absolute top-0 left-0 w-[1512px] h-[93px] flex bg-[#505050] overflow-hidden">
      <div className="w-[1512px] h-[95px] relative overflow-hidden bg-[url(https://c.animaapp.com/ViJx1BUZ/img/blue@4x.png)] bg-cover bg-[50%_50%]">
        <div className="flex flex-col w-[1512px] items-start gap-2.5 rounded-[0px_0px_27.87px_27.87px] border-2 border-solid border-[#dbdbdb54] rotate-180 bg-blend-color-dodge bg-[linear-gradient(0deg,rgba(245,245,245,0.4)_0%,rgba(245,245,245,0.4)_100%),linear-gradient(0deg,rgba(15,15,15,1)_0%,rgba(15,15,15,1)_100%)] absolute top-0 left-0">
          <div className="relative self-stretch w-full h-[116px] bg-[#00000001]" />
        </div>

        <div className="inline-flex items-center gap-[29px] absolute top-[18px] left-[1252px]">
          <div className="relative w-[86px] h-[49px]">
            <img
              className="absolute -top-px -left-px w-[88px] h-[51px]"
              alt="Rectangle"
              src="https://c.animaapp.com/ViJx1BUZ/img/rectangle-107.svg"
            />
            <div className="absolute top-2.5 -left-px w-[86px] h-[26px] flex items-center justify-center [-webkit-text-stroke:0.61px_transparent] bg-blend-exclusion bg-[linear-gradient(0deg,rgba(85,85,85,0.15)_0%,rgba(255,255,255,0.15)_100%)_1] [-webkit-background-clip:text] [font-family:'Aeonik_Pro-Medium',Helvetica] font-medium text-white text-[19px] text-center tracking-[-0.19px] leading-[20.1px]">
              Save
            </div>
          </div>

          <img
            className="relative w-[86.59px] h-[85.79px] mt-[-18.00px] mb-[-18.79px]"
            alt="Frame"
            src="https://c.animaapp.com/ViJx1BUZ/img/frame-2147223119.svg"
          />

          <img
            className="relative w-[86.17px] h-[85.58px] mt-[-18.00px] mb-[-18.58px] mr-[-26.08px]"
            alt="Frame"
            src="https://c.animaapp.com/ViJx1BUZ/img/frame-2147223120.svg"
          />
        </div>

        <div className="inline-flex items-center gap-[35px] absolute top-[23px] left-8">
          <div className="inline-flex items-center gap-3.5 relative flex-[0_0_auto]">
            <img
              className="relative flex-[0_0_auto]"
              alt="Home button"
              src="https://c.animaapp.com/ViJx1BUZ/img/home-button.svg"
            />
            <div className="relative w-[89px] h-[21px] overflow-hidden">
              <div className="absolute top-0 left-0 w-[91px] bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] font-medium text-[#272727] text-[21.3px] tracking-[-0.21px] leading-[22.6px] whitespace-nowrap">
                Caesar 1
              </div>
            </div>
          </div>

          <div className="relative w-2.5 h-[30px]">
            <img
              className="absolute top-[3px] left-1 w-[3px] h-[26px]"
              alt="Seperation line"
              src="https://c.animaapp.com/ViJx1BUZ/img/seperationline.svg"
            />
          </div>

          <div className="inline-flex items-center gap-6 relative flex-[0_0_auto]">
            {steps.map((step, index) => (
              <div key={step} className="inline-flex items-center gap-6">
                {index === 0 ? (
                  <div className="relative w-[51px] h-[21px]">
                    <div className="absolute top-px left-[3px] w-[45px] h-5 flex items-center bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] font-medium text-[#4c4c4c] text-xl tracking-[-0.20px] leading-[21.2px] whitespace-nowrap">
                      Start
                    </div>
                  </div>
                ) : (
                  <div className="relative w-[62px] h-[23px]">
                    <p className="absolute top-0 left-0.5 w-[60px] h-5 flex items-center justify-center bg-blend-exclusion opacity-[0.76] [font-family:'Aeonik_Pro-Medium',Helvetica] font-medium text-white text-xl text-center tracking-[-0.20px] leading-[21.2px] whitespace-nowrap">
                      <span className="tracking-[-0.04px]">Step</span>
                      <span className="text-base tracking-[-0.03px] leading-[17.0px]">
                        &nbsp;
                      </span>
                      <span className="tracking-[-0.04px]">{index}</span>
                    </p>
                  </div>
                )}
                {index < steps.length - 1 && (
                  <img
                    className="relative w-3.5 h-[17px]"
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
    </div>
  );
};
