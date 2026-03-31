import { useMemo, useState } from "react";

type CarouselItem = {
  createdAt: string;
  imageSrc: string;
  lastResponded: string;
  title: string;
};

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    title: "Laboratory Reports",
    createdAt: "Created on 29/10/2024",
    lastResponded: "Last respondent 42 minutes ago",
    imageSrc: "https://c.animaapp.com/ViJx1BUZ/img/frame-2112@2x.png",
  },
  {
    title: "Visitor Check-in",
    createdAt: "Created on 02/09/2024",
    lastResponded: "Last respondent 1 hour ago",
    imageSrc: "https://c.animaapp.com/ViJx1BUZ/img/frame-2111-1@2x.png",
  },
  {
    title: "Equipment Safety Assessment Form",
    createdAt: "Created on 15/04/2024",
    lastResponded: "Last respondent 3 hours ago",
    imageSrc: "https://c.animaapp.com/ViJx1BUZ/img/frame-2111@2x.png",
  },
];

const wrapIndex = (value: number, length: number): number => {
  if (value < 0) {
    return length - 1;
  }
  if (value >= length) {
    return 0;
  }
  return value;
};

const CardMenuDots = (): JSX.Element => {
  return (
    <div className="absolute right-[5px] top-[70px] flex items-center gap-[1px]">
      <span className="h-px w-px rounded-full bg-[#9f9f9f]" />
      <span className="h-px w-px rounded-full bg-[#9f9f9f]" />
      <span className="h-px w-px rounded-full bg-[#9f9f9f]" />
    </div>
  );
};

const CardText = ({
  compact,
  createdAt,
  lastResponded,
  title,
}: {
  compact: boolean;
  createdAt: string;
  lastResponded: string;
  title: string;
}): JSX.Element => {
  const titleClasses = compact ? "text-[3.8px] tracking-[-0.15px] leading-[3.9px]" : "text-[4.4px] tracking-[-0.17px] leading-[4.5px]";
  const bodyClasses = compact ? "text-[3.2px] tracking-[-0.13px] leading-[3.3px]" : "text-[3.7px] tracking-[-0.15px] leading-[3.8px]";

  return (
    <div className="flex flex-col">
      <div
        className={`bg-blend-exclusion [font-family:'Aeonik_Pro-Bold',Helvetica] font-bold text-white ${titleClasses}`}
      >
        {title}
      </div>
      <div
        className={`bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] font-medium text-white ${bodyClasses}`}
      >
        {createdAt}
      </div>
      <div
        className={`bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] font-medium text-[#9e9e9e] ${bodyClasses}`}
      >
        {lastResponded}
      </div>
    </div>
  );
};

const InactiveCard = ({ item }: { item: CarouselItem }): JSX.Element => {
  return (
    <div className="relative h-[78.38px] w-[87.46px] rounded-[8px] border border-[rgba(255,255,255,0.18)] bg-[rgba(132,132,132,0.18)]">
      <div className="absolute left-[3px] top-1 h-[52px] w-[81px] overflow-hidden rounded-[4px]">
        <img className="h-full w-full object-cover" alt={item.title} src={item.imageSrc} />
      </div>
      <div className="absolute left-px top-14 w-[81px]">
        <CardText
          compact
          title={item.title}
          createdAt={item.createdAt}
          lastResponded={item.lastResponded}
        />
      </div>
      <CardMenuDots />
    </div>
  );
};

const ActiveCard = ({ item }: { item: CarouselItem }): JSX.Element => {
  return (
    <div className="absolute left-[calc(50%_-_64px)] top-[-7px] flex h-[111px] w-[127px] rounded-[35.75px] border-[0.4px] border-solid border-[#ffffff4c] bg-[#84848433] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.11),inset_-1px_0_1px_rgba(0,0,0,0.08)] backdrop-blur-[1.6px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(1.6px)_brightness(100.0%)_saturate(100.0%)]">
      <div className="relative ml-[12.7px] mt-[10.3px] h-[90.49px] w-[100.98px] rounded-[10px] border border-[rgba(255,255,255,0.2)] bg-[rgba(132,132,132,0.2)]">
        <div className="absolute left-1 top-[5px] h-[61px] w-[93px] overflow-hidden rounded-[4px]">
          <img className="h-full w-full object-cover" alt={item.title} src={item.imageSrc} />
        </div>
        <div className="absolute left-1 top-[69px] w-[93px]">
          <CardText
            compact={false}
            title={item.title}
            createdAt={item.createdAt}
            lastResponded={item.lastResponded}
          />
        </div>
        <div className="absolute right-0 top-[84px]">
          <CardMenuDots />
        </div>
      </div>
    </div>
  );
};

const CarouselArrow = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}): JSX.Element => {
  return (
    <button
      className="relative h-[26px] w-[15px] rounded-[7px] border border-[rgba(220,220,220,0.8)] bg-[#0f0f0f] mix-blend-color-dodge"
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Previous card" : "Next card"}
    >
      <span className="absolute inset-0 rounded-[7px] bg-[rgba(0,0,0,0.01)]" />
      <svg
        className="absolute left-1/2 top-1/2 h-[8.1px] w-[4.9px] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 5 9"
        fill="none"
      >
        <path
          d="M0.24 3.52C0.08 3.68 0 3.84 0 4.03C0 4.23 0.08 4.39 0.24 4.55L3.77 7.89C3.9 8.01 4.05 8.07 4.22 8.07C4.58 8.07 4.88 7.79 4.88 7.44C4.88 7.27 4.8 7.11 4.67 6.98L1.53 4.04L4.67 1.09C4.81 0.96 4.88 0.8 4.88 0.63C4.88 0.28 4.58 0 4.22 0C4.04 0 3.89 0.06 3.77 0.18L0.24 3.52Z"
          fill="#999999"
          transform={direction === "left" ? undefined : "translate(5 9) rotate(180)"}
        />
      </svg>
    </button>
  );
};

export const SidebarCarousel = ({ width = 353 }: { width?: number }): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(1);
  const carouselScale = Math.min(1, width / 353);
  const scaledWidth = 353 * carouselScale;
  const scaledHeight = 111 * carouselScale;

  const previousIndex = useMemo(
    () => wrapIndex(activeIndex - 1, CAROUSEL_ITEMS.length),
    [activeIndex],
  );
  const nextIndex = useMemo(
    () => wrapIndex(activeIndex + 1, CAROUSEL_ITEMS.length),
    [activeIndex],
  );

  return (
    <div
      className="absolute left-1/2 top-[306px] -translate-x-1/2"
      style={{ width: scaledWidth, height: scaledHeight }}
    >
      <div
        className="absolute left-0 top-0 h-[99px] w-[353px]"
        style={{ transform: `scale(${carouselScale})`, transformOrigin: "top left" }}
      >
        <div className="absolute left-[calc(50.00%_-_170px)] top-0 h-[99px] w-[339px] rounded-[19.06px] bg-[#50505033] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.11),inset_-1px_0_1px_rgba(0,0,0,0.08)] backdrop-blur-[1.6px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(1.6px)_brightness(100.0%)_saturate(100.0%)]">
          <div className="absolute left-[15px] top-[6px]">
            <InactiveCard item={CAROUSEL_ITEMS[previousIndex]} />
          </div>
          <div className="absolute right-[10px] top-[10px]">
            <InactiveCard item={CAROUSEL_ITEMS[nextIndex]} />
          </div>
          <ActiveCard item={CAROUSEL_ITEMS[activeIndex]} />
        </div>

        <div className="absolute left-0 top-9">
          <CarouselArrow
            direction="left"
            onClick={() => setActiveIndex((current) => wrapIndex(current - 1, CAROUSEL_ITEMS.length))}
          />
        </div>
        <div className="absolute left-[338px] top-9">
          <CarouselArrow
            direction="right"
            onClick={() => setActiveIndex((current) => wrapIndex(current + 1, CAROUSEL_ITEMS.length))}
          />
        </div>
      </div>
    </div>
  );
};
