import { useMemo, useState } from "react";

const VIEW_CAROUSEL_IMAGES = [
  "https://www.figma.com/api/mcp/asset/eba163f0-51b0-4f6d-a332-609bfd8b90a0",
  "https://www.figma.com/api/mcp/asset/ba133057-ac45-4ace-9186-cfbbb1b08e00",
  "https://www.figma.com/api/mcp/asset/3d15f5d4-0afc-4b12-942c-7adcbf65f560",
  "https://www.figma.com/api/mcp/asset/b0b096db-097f-47cc-ac74-f33207da9f4a",
  "https://www.figma.com/api/mcp/asset/12248fef-9fd4-42f1-936f-4e3a3d8fccab",
  "https://www.figma.com/api/mcp/asset/a44e54a0-e53b-4324-9cab-018c413aa5e3",
  "https://www.figma.com/api/mcp/asset/5e9750ac-f415-4c0b-b0ee-3bfc84c4353e",
] as const;

type BottomViewCarouselProps = {
  availableWidth: number;
};

const BASE_WIDTH = 901;
const BASE_HEIGHT = 106;
const CONTENT_WIDTH = 880;
const CONTENT_HEIGHT = 130;
const OUTER_HEIGHT = 183;
const SIDE_THUMB_SIZE = 83;
const CENTER_THUMB_SIZE = 130;
const CAROUSEL_GAP = 42;
const SELECTED_CARD_WIDTH = 120;
const SELECTED_CARD_HEIGHT = 157;

const getItemSize = (index: number, selectedIndex: number): number =>
  index === selectedIndex ? CENTER_THUMB_SIZE : SIDE_THUMB_SIZE;

export const BottomViewCarousel = ({
  availableWidth,
}: BottomViewCarouselProps): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const scale = Math.min(1, Math.max(0.74, availableWidth / BASE_WIDTH));
  const scaledWidth = BASE_WIDTH * scale;
  const scaledHeight = OUTER_HEIGHT * scale;
  const selectionLeft = useMemo(() => {
    let offset = 0;

    for (let index = 0; index < selectedIndex; index += 1) {
      offset += getItemSize(index, selectedIndex) + CAROUSEL_GAP;
    }

    return offset + (getItemSize(selectedIndex, selectedIndex) - SELECTED_CARD_WIDTH) / 2;
  }, [selectedIndex]);

  return (
    <div
      className="absolute left-1/2 bottom-6 -translate-x-1/2"
      style={{ width: scaledWidth, height: scaledHeight }}
    >
      <div
        className="absolute left-0 top-[26px]"
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[34px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)]">
          <div className="absolute inset-0 rounded-[34px] bg-[rgba(178,176,173,0.43)]" />
        </div>

        <div className="absolute left-[calc(50%_+_0.5px)] top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex items-center" style={{ gap: CAROUSEL_GAP, width: CONTENT_WIDTH, height: CONTENT_HEIGHT }}>
            <div
              className="absolute top-1/2 z-0 -translate-y-1/2 overflow-hidden rounded-[39px] border border-[rgba(255,255,255,0.58)] bg-[rgba(255,255,255,0.18)] shadow-[0px_5px_4px_rgba(0,0,0,0.25),0px_8px_40px_rgba(0,0,0,0.12)] backdrop-blur-[16px] backdrop-brightness-[106%] backdrop-saturate-[115%] transition-[left] duration-300 ease-out [-webkit-backdrop-filter:blur(16px)_brightness(106%)_saturate(115%)]"
              style={{
                left: selectionLeft,
                width: SELECTED_CARD_WIDTH,
                height: SELECTED_CARD_HEIGHT,
              }}
            >
              <div className="absolute inset-0 rounded-[50px] bg-[linear-gradient(180deg,rgba(255,255,255,0.78)_0%,rgba(232,232,232,0.62)_52%,rgba(214,214,214,0.56)_100%)]" />
              <div className="absolute inset-x-[10px] top-0 h-[26px] rounded-b-[32px] bg-[linear-gradient(180deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 h-[34px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.06)_100%)]" />
            </div>

            {VIEW_CAROUSEL_IMAGES.map((imageSrc, index) => {
              const isSelected = index === selectedIndex;
              const size = getItemSize(index, selectedIndex);

              return (
                <button
                  key={imageSrc}
                  className="relative z-10 shrink-0 cursor-pointer transition-[width,height,transform] duration-300 ease-out"
                  style={{
                    width: size,
                    height: size,
                    transform: isSelected ? "translateY(0)" : "translateY(0)",
                  }}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-pressed={isSelected}
                  aria-label={`Select view ${index + 1}`}
                >
                  <img
                    className="absolute inset-0 h-full w-full object-contain drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                    alt=""
                    src={imageSrc}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
