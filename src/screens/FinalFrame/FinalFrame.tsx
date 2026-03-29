import { useEffect, useState } from "react";
import { CharacterCreationSidebarSection } from "./sections/CharacterCreationSidebarSection";
import { EditorStepNavigationSection } from "./sections/EditorStepNavigationSection";

const FRAME_WIDTH = 1720;
const FRAME_HEIGHT = 984;
const NAV_BACKGROUND_URL =
  "https://www.figma.com/api/mcp/asset/d89c974d-4887-4e3a-ac59-a65fe60098b4";
const NOISE_BACKGROUND_URL =
  "https://c.animaapp.com/ViJx1BUZ/img/noise-texture-background-.png";
const PREVIEW_LEFT = 478;
const PREVIEW_WIDTH = FRAME_WIDTH - PREVIEW_LEFT - 24;
const PREVIEW_INNER_WIDTH = PREVIEW_WIDTH - 23;
const PREVIEW_DOT_PATTERN = "radial-gradient(circle, #dcdcdc 1.6px, transparent 1.6px)";

export const FinalFrame = (): JSX.Element => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const widthScale = window.innerWidth / FRAME_WIDTH;
      const heightScale = window.innerHeight / FRAME_HEIGHT;

      setScale(Math.min(widthScale, heightScale));
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="relative flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-[#000103]">
      <div className="absolute inset-0 bg-[#000103]" />

      <div
        className="relative z-10 shrink-0"
        style={{
          width: FRAME_WIDTH * scale,
          height: FRAME_HEIGHT * scale,
        }}
      >
        <div
          className="relative bg-white"
          data-model-id="52:399"
          style={{
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <EditorStepNavigationSection />
          <div
            className="absolute top-[82px] left-0 h-[902px] w-full rounded-xl bg-[#00000001] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] backdrop-blur-[2.5px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(2.5px)_brightness(100.0%)_saturate(100.0%)]"
            style={{ backgroundImage: `url(${NOISE_BACKGROUND_URL})`, backgroundSize: "100% 100%" }}
          />

          <div
            className="absolute top-[82px] left-0 h-[902px] w-full rounded-xl bg-[100%_100%]"
            style={{ backgroundImage: `url(${NOISE_BACKGROUND_URL})` }}
          />

          <div
            className="pointer-events-none absolute top-[95px] left-0 h-[34px] w-full bg-[100%_100%] opacity-100"
            style={{ backgroundImage: `url(${NOISE_BACKGROUND_URL})` }}
          />

          <CharacterCreationSidebarSection />

          <div className="absolute top-28 left-[51px] w-[371px] h-[33px] flex">
            <div className="w-[371px] h-[33px] flex bg-[#c3c2c280] rounded-[19.06px] border-[0.5px] border-solid border-white backdrop-blur-[1.6px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(1.6px)_brightness(100.0%)_saturate(100.0%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.11),inset_-1px_0_1px_rgba(0,0,0,0.08)]">
              <div className="-mt-1 w-[332.82px] ml-5 flex justify-center">
                <div className="flex w-[371px] h-[39px] ml-[-1.8px] relative items-center gap-4 px-[23px] py-0">
                  <button className="all-[unset] box-border inline-flex items-start gap-[3px] relative flex-[0_0_auto]">
                    <img
                      className="relative w-[20.4px] h-[17.4px] mt-[-0.70px] ml-[-0.70px]"
                      alt="Frame"
                      src="https://c.animaapp.com/ViJx1BUZ/img/frame-2147223123.svg"
                    />

                    <div className="relative w-[68px] h-[19px]">
                      <div className="absolute top-0 left-0 w-[68px] bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] font-medium text-[#464545] text-base text-center tracking-[-0.16px] leading-[17.0px] whitespace-nowrap">
                        {" "}
                        Variation
                      </div>
                    </div>
                  </button>

                  <button className="all-[unset] box-border relative flex h-[33px] w-[129px] items-center self-center px-6 py-0 bg-[#85848433] rounded-[35.75px] border-[0.4px] border-solid border-[#ffffff4c] shadow-[0px_4px_4px_#00000040,inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.11),inset_-1px_0_1px_rgba(0,0,0,0.08)] backdrop-blur-[1.6px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(1.6px)_brightness(100.0%)_saturate(100.0%)]">
                    <div className="flex items-center gap-[5px] relative self-stretch w-full flex-[0_0_auto]">
                      <img
                        className="relative w-[21px] h-[22px] ml-[-1.00px]"
                        alt="Container"
                        src="https://c.animaapp.com/ViJx1BUZ/img/container-4.svg"
                      />

                      <div className="relative w-14 h-[25px]">
                        <div className="absolute top-[calc(50.00%_-_12px)] left-[calc(50.00%_-_28px)] w-14 h-[25px] items-center justify-center text-white text-[17.7px] text-center tracking-[-0.18px] leading-[18.8px] [-webkit-line-clamp:1] bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] font-medium overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-box-orient:vertical]">
                          Create
                        </div>
                      </div>
                    </div>
                  </button>

                  <button className="all-[unset] box-border flex w-[90px] items-end gap-[3px] relative mr-[-16.00px]">
                    <img
                      className="relative w-[21.82px] h-[21px]"
                      alt="Container"
                      src="https://c.animaapp.com/ViJx1BUZ/img/container-5.svg"
                    />

                    <div className="relative w-11 h-[19px]">
                      <div className="absolute top-0 left-0 w-11 bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] font-medium text-[#464545] text-base text-center tracking-[-0.16px] leading-[17.0px] whitespace-nowrap">
                        Edit
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute top-[116px] h-[849px] flex"
            style={{ left: PREVIEW_LEFT, width: PREVIEW_WIDTH }}
          >
            <div
              className="relative h-[849px] rounded-xl overflow-hidden shadow-[4px_4px_4px_#00000040]"
              style={{ width: PREVIEW_WIDTH }}
            >
              <div className="absolute top-0 left-0 h-6" style={{ width: PREVIEW_WIDTH }}>
                <img
                  className="h-6 w-full object-cover"
                  alt="Zoombar"
                  src="https://c.animaapp.com/ViJx1BUZ/img/zoombar.png"
                />
              </div>

              <div className="absolute top-[-143px] -left-px w-6 h-[1069px] flex">
                <img
                  className="mt-[143px] w-[23px] h-[849px] ml-px aspect-[44] object-cover"
                  alt="Zoombar"
                  src="https://c.animaapp.com/ViJx1BUZ/img/zoombar-1.png"
                />
              </div>

              <div
                className="absolute top-6 left-[23px] h-[825px] rounded-[2px] border border-[#d8d8d8] bg-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.38)]"
                style={{
                  width: PREVIEW_INNER_WIDTH,
                  backgroundImage: PREVIEW_DOT_PATTERN,
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="absolute top-[43px] left-[calc(50.00%_-_96px)] w-[193px] h-[33px] bg-[#11111152] rounded-[19.06px] backdrop-blur-[1.6px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(1.6px)_brightness(100.0%)_saturate(100.0%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.11),inset_-1px_0_1px_rgba(0,0,0,0.08)]">
                <div className="absolute top-px left-px w-[67px] h-[31px] bg-[#8a8a8a] rounded-[58.27px] backdrop-blur-[29.5px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(29.5px)_brightness(100.0%)_saturate(100.0%)]" />

                <div className="inline-flex items-center gap-6 absolute top-[3px] left-[15px]">
                  <button className="all-[unset] box-border relative w-9 h-[21px]">
                    <div className="absolute top-[calc(50.00%_-_10px)] left-[calc(50.00%_-_19px)] w-[38px] h-[21px] flex items-center justify-center [font-family:'Aeonik_Pro-Medium',Helvetica] font-medium text-white text-[15px] text-center tracking-[-0.15px] leading-[15.9px]">
                      360°
                    </div>
                  </button>

                  <img
                    className="relative w-[22.4px] h-[22.4px] aspect-[1]"
                    alt="Button"
                    src="https://c.animaapp.com/ViJx1BUZ/img/button-3.svg"
                  />

                  <img
                    className="relative w-[19.5px] h-[23.5px]"
                    alt="Button"
                    src="https://c.animaapp.com/ViJx1BUZ/img/button-4.svg"
                  />

                  <img
                    className="relative w-[15.55px] h-[27px]"
                    alt="Button"
                    src="https://c.animaapp.com/ViJx1BUZ/img/button-5.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
