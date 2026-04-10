import { useEffect, useRef, useState } from "react";
import LiquidGlass from "liquid-glass-react";
import type { ModeType } from "../PreviewStageSection/ControlGroups";
import { SidebarCarousel } from "./SidebarCarousel";

type CharacterCreationSidebarSectionProps = {
  width: number;
  collapsed: boolean;
  mode: ModeType;
  promptText: string;
  uploadedCharacterName: string | null;
  onCharacterUpload: (file: File) => void;
  onPromptTextChange: (value: string) => void;
  onWidthChange: (width: number) => void;
  onToggleCollapsed: () => void;
};

const HANDLE_WIDTH = 38;
const HANDLE_OVERLAP = 23;
const COLLAPSED_HANDLE_LEFT_OFFSET = -11;
const SIDEBAR_HEIGHT = 799;
const MIN_SIDEBAR_WIDTH = 360;
const MAX_SIDEBAR_WIDTH = 520;
const AUTO_COLLAPSE_THRESHOLD = MIN_SIDEBAR_WIDTH - 28;
const CREATE_BUTTON_WIDTH = 154;
const EDIT_CONTROLS_WIDTH = 267;
const EDIT_LEFT_CONTROL_WIDTH = 87;
const EDIT_RIGHT_CONTROL_WIDTH = 132;
const EDIT_TYPE_SLOT_WIDTH = 65;
const EDIT_TYPE_SLOT_HEIGHT = 57;
const EDIT_CONTROL_HEIGHT = 63;
const EDIT_TYPE_SLOT_TOP = (EDIT_CONTROL_HEIGHT - EDIT_TYPE_SLOT_HEIGHT) / 2;
const EDIT_LEFT_INDICATOR_LEFT = (EDIT_LEFT_CONTROL_WIDTH - EDIT_TYPE_SLOT_WIDTH) / 2;
const EDIT_RIGHT_HALF_WIDTH = EDIT_RIGHT_CONTROL_WIDTH / 2;
const EDIT_TYPE_PERSON_LEFT = (EDIT_RIGHT_HALF_WIDTH - EDIT_TYPE_SLOT_WIDTH) / 2;
const EDIT_TYPE_SHIELD_LEFT = EDIT_RIGHT_HALF_WIDTH + EDIT_TYPE_PERSON_LEFT;
const EDIT_SHIELD_ICON_WIDTH = 35;
const EDIT_SHIELD_ICON_HEIGHT = 44;
const EDIT_SHIELD_ICON_LEFT =
  EDIT_TYPE_SHIELD_LEFT + (EDIT_TYPE_SLOT_WIDTH - EDIT_SHIELD_ICON_WIDTH) / 2;
const EDIT_SHIELD_ICON_TOP = (EDIT_CONTROL_HEIGHT - EDIT_SHIELD_ICON_HEIGHT) / 2;
const EDIT_HEADER_ICON_BASE_SRC = "https://www.figma.com/api/mcp/asset/571fa50d-42b4-4cea-a277-28e26b50153a";
const EDIT_HEADER_ICON_DETAIL_SRC = "https://www.figma.com/api/mcp/asset/cc1a3555-5f10-4e4b-a54f-c405a6641140";
const EDIT_FOCUS_ICON_SRC = "https://www.figma.com/api/mcp/asset/7589282f-6798-432a-825c-12a178b37ca1";
const EDIT_SHIELD_ICON_SRC = "https://www.figma.com/api/mcp/asset/36f00bb4-b4c6-4142-8a61-2555ed6e3d13";
const EDIT_ASSET_URLS = [
  EDIT_HEADER_ICON_BASE_SRC,
  EDIT_HEADER_ICON_DETAIL_SRC,
  EDIT_FOCUS_ICON_SRC,
  EDIT_SHIELD_ICON_SRC,
];

const CollapsedResizeSidebarHandleIcon = (): JSX.Element => (
  <div className="relative h-[54.875px] w-[27px]">
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-[-1px] right-[-1.13px] top-[-1px] rounded-[15px] border-2 border-[rgba(220,220,220,0.8)] bg-[#0f0f0f] [mix-blend-mode:color-dodge]"
    />
    <div
      aria-hidden="true"
      className="absolute bottom-0 left-[-1px] right-[-1.13px] top-[-1px] rounded-[16px] bg-[rgba(0,0,0,0)]"
    />
    <div
      className="absolute left-1/2 top-1/2 h-[10.125px] w-[18.176px]"
      style={{ transform: "translate(-50%, -50%) rotate(-90deg) scaleY(-1)" }}
    >
      <svg
        className="block h-full w-full max-w-none"
        preserveAspectRatio="none"
        viewBox="0 0 18.1755 10.125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0.403902 7.83703C0.141169 8.09331 0 8.40534 0 8.76932C0 9.51958 0.631341 10.125 1.41562 10.125C1.80775 10.125 2.17636 9.97644 2.45478 9.69415L9.08977 3.17902L15.7208 9.69415C16.0032 9.98017 16.3756 10.125 16.7599 10.125C17.5403 10.125 18.1755 9.51958 18.1755 8.76932C18.1755 8.39788 18.0422 8.08965 17.7677 7.83703L10.2505 0.501423C9.90146 0.167141 9.53678 0.00742849 9.08977 0C8.65056 0 8.28194 0.159713 7.92902 0.501423L0.403902 7.83703Z"
          fill="#4A82BA"
        />
      </svg>
    </div>
  </div>
);

const ExpandedResizeSidebarHandleIcon = (): JSX.Element => (
  <div className="relative h-[58px] w-[33px]">
    <div className="absolute left-1/2 top-1/2 h-[54.875px] w-[27px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[15px] [clip-path:inset(0_round_15px)]">
      <LiquidGlass
        className="h-[54.875px] w-[27px] overflow-hidden rounded-[15px]"
        style={{ position: "absolute", top: "50%", left: "50%" }}
        mode="shader"
        displacementScale={20}
        blurAmount={0.035}
        saturation={132}
        aberrationIntensity={1.2}
        elasticity={0}
        cornerRadius={15}
        padding="0px"
      >
        <div className="relative flex h-[54.875px] w-[27px] items-center justify-center overflow-hidden rounded-[15px] border-[0.5px] border-[rgba(130,130,130,0.18)] bg-[rgba(255,255,255,0.22)]">
          <div className="pointer-events-none absolute inset-0 rounded-[15px] bg-[rgba(255,255,255,0.5)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[15px] bg-[radial-gradient(120%_90%_at_20%_10%,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0)_68%)]" />
          <div
            className="absolute left-1/2 top-1/2 h-[11.226px] w-[18.176px]"
            style={{ transform: "translate(-50%, -50%) rotate(-90deg)" }}
          >
            <svg
              className="block h-full w-full max-w-none"
              preserveAspectRatio="none"
              viewBox="0 0 18.1755 10.125"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M0.403902 7.83703C0.141169 8.09331 0 8.40534 0 8.76932C0 9.51958 0.631341 10.125 1.41562 10.125C1.80775 10.125 2.17636 9.97644 2.45478 9.69415L9.08977 3.17902L15.7208 9.69415C16.0032 9.98017 16.3756 10.125 16.7599 10.125C17.5403 10.125 18.1755 9.51958 18.1755 8.76932C18.1755 8.39788 18.0422 8.08965 17.7677 7.83703L10.2505 0.501423C9.90146 0.167141 9.53678 0.00742849 9.08977 0C8.65056 0 8.28194 0.159713 7.92902 0.501423L0.403902 7.83703Z"
                fill="#999999"
              />
            </svg>
          </div>
        </div>
      </LiquidGlass>
    </div>
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[56.48px] w-[28.6px] -translate-x-1/2 -translate-y-1/2 rounded-[15.8px] border-[1.8px] border-[rgba(220,220,220,0.8)]" />
  </div>
);

const ActiveButtonGlass = ({
  className,
  style,
}: {
  className: string;
  style?: React.CSSProperties;
}): JSX.Element => (
  <div className={`${className} pointer-events-none overflow-hidden rounded-[20px]`} style={style}>
    <div className="absolute inset-0 overflow-hidden rounded-[20px] [clip-path:inset(0_round_20px)]">
      <LiquidGlass
        className="h-full w-full overflow-hidden rounded-[20px]"
        style={{ position: "absolute", top: "50%", left: "50%" }}
        mode="shader"
        displacementScale={11}
        blurAmount={0.015}
        saturation={108}
        aberrationIntensity={0}
        elasticity={0}
        cornerRadius={20}
        padding="0px"
      >
        <div className="relative h-full w-full rounded-[20px]">
          <div className="absolute inset-0 rounded-[20px] bg-[rgba(255,255,255,0.04)]" />
          <div
            className="absolute inset-0 rounded-[20px] bg-[rgba(30,30,30,0.25)]"
            style={{ mixBlendMode: "plus-lighter" }}
          />
        </div>
      </LiquidGlass>
    </div>
  </div>
);

const EditPersonIcon = ({
  className,
  style,
}: {
  className: string;
  style?: React.CSSProperties;
}): JSX.Element => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 65 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M50.7061 48C50.7061 44.8987 50.7061 43.3481 50.3185 42.0863C49.446 39.2454 47.195 37.0223 44.3186 36.1605C43.0411 35.7778 41.4711 35.7778 38.331 35.7778H27.0811C23.941 35.7778 22.371 35.7778 21.0935 36.1605C18.2171 37.0223 15.9661 39.2454 15.0936 42.0863C14.7061 43.3481 14.7061 44.8987 14.7061 48M42.8311 18C42.8311 23.5228 38.2979 28 32.7061 28C27.1142 28 22.5811 23.5228 22.5811 18C22.5811 12.4772 27.1142 8 32.7061 8C38.2979 8 42.8311 12.4772 42.8311 18Z"
      stroke="#226AB3"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UploadCloudIcon = (): JSX.Element => (
  <svg viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M19.6211 0C25.1668 0 29.4577 4.10591 29.4375 9.78906C32.064 10.8119 33.627 13.2287 33.627 15.9014C33.6269 19.5581 30.3298 22.4765 26.1758 22.4766L8.18262 22.4717C3.55967 22.4717 0.000178712 19.2592 0 15.3467C0 12.1771 1.86081 9.59593 4.85547 9.05078C5.03696 5.52903 8.47964 3.15552 11.8574 3.9707C13.5462 1.62133 16.2132 0.000153006 19.6211 0ZM19.5859 2.85645C16.4806 2.85656 14.6252 4.45319 13.3145 6.62891C13.2237 6.77346 13.1125 6.80701 12.9463 6.75879C10.0123 5.88583 7.33557 7.3187 7.50684 10.8691C7.51691 11.0524 7.42579 11.1543 7.23926 11.1543C4.67837 11.1545 3.04004 12.8719 3.04004 15.3467C3.04023 17.6719 5.24842 19.6211 8.1875 19.6211L26.1758 19.626C28.656 19.6259 30.582 17.9757 30.582 15.9014C30.582 13.7545 29.084 12.2101 26.7246 11.8242C26.5485 11.8 26.4729 11.6939 26.4932 11.5205C26.5587 10.9078 26.6194 10.1404 26.5791 9.40234C26.3773 5.81799 23.5082 2.85645 19.5859 2.85645Z"
      fill="white"
    />
  </svg>
);

export const CharacterCreationSidebarSection = ({
  width,
  collapsed,
  mode,
  promptText,
  uploadedCharacterName,
  onCharacterUpload,
  onPromptTextChange,
  onWidthChange,
  onToggleCollapsed,
}: CharacterCreationSidebarSectionProps): JSX.Element => {
  const createHeaderIconSrc = "https://c.animaapp.com/ViJx1BUZ/img/container.svg";
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadDragOver, setIsUploadDragOver] = useState(false);
  const [isEditFocusSelected, setIsEditFocusSelected] = useState(false);
  const [selectedEditType, setSelectedEditType] = useState<"person" | "shield">("person");
  const dragStateRef = useRef({
    moved: false,
    shouldCollapse: false,
    toggledFromCollapsedDrag: false,
    startWidth: width,
    startX: 0,
  });
  const contentWidth = Math.max(0, width - 42);
  const headerWidth = Math.max(250, width - 79);
  const promptCardWidth = Math.max(260, width - 72);
  const isEditMode = mode === "edit";
  const promptSectionLabel = isEditMode ? "What do you want to change?" : "What do you think of?";
  const promptSectionLabelWidth = isEditMode ? 204 : 145;
  const headerLabel = isEditMode ? "Edit your Character" : "Create your Character";
  const lineGap = 16;
  const promptInnerWidth = Math.max(200, promptCardWidth - 24);
  const lineWidth = Math.max(120, contentWidth - promptSectionLabelWidth - lineGap);
  const referenceLineWidth = Math.max(120, contentWidth - 73 - lineGap);
  const finishLineWidth = Math.max(120, contentWidth - 43 - 11);
  const carouselWidth = Math.max(280, width - 65);
  const uploadFrameWidth = 163;

  useEffect(() => {
    // Preload edit-mode remote assets so mode switches feel immediate.
    EDIT_ASSET_URLS.forEach((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (!isDragging) {
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const deltaX = event.clientX - dragStateRef.current.startX;

      if (Math.abs(deltaX) > 3) {
        dragStateRef.current.moved = true;
      }

      if (collapsed) {
        if (deltaX <= 3) {
          return;
        }

        const expandedDragWidth = Math.max(
          MIN_SIDEBAR_WIDTH,
          Math.min(MAX_SIDEBAR_WIDTH, MIN_SIDEBAR_WIDTH + deltaX),
        );
        onWidthChange(expandedDragWidth);

        if (!dragStateRef.current.toggledFromCollapsedDrag) {
          dragStateRef.current.toggledFromCollapsedDrag = true;
          onToggleCollapsed();
        }
        return;
      }

      const rawWidth = dragStateRef.current.startWidth + deltaX;
      dragStateRef.current.shouldCollapse = rawWidth < AUTO_COLLAPSE_THRESHOLD;
      if (dragStateRef.current.shouldCollapse) {
        setIsDragging(false);
        onToggleCollapsed();
        return;
      }

      const nextWidth = Math.max(
        MIN_SIDEBAR_WIDTH,
        Math.min(MAX_SIDEBAR_WIDTH, rawWidth),
      );
      onWidthChange(nextWidth);
    };

    const stopDragging = () => {
      setIsDragging(false);
      dragStateRef.current.shouldCollapse = false;
      dragStateRef.current.toggledFromCollapsedDrag = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDragging);
    };
  }, [collapsed, isDragging, onToggleCollapsed, onWidthChange]);

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();

    dragStateRef.current = {
      moved: false,
      shouldCollapse: false,
      toggledFromCollapsedDrag: false,
      startWidth: collapsed ? MIN_SIDEBAR_WIDTH : width,
      startX: event.clientX,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    setIsDragging(true);
  };

  useEffect(() => {
    if (isDragging) {
      return undefined;
    }

    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    return undefined;
  }, [isDragging]);

  const effectiveWidth = collapsed ? width : width;
  const wrapperWidth = effectiveWidth + HANDLE_WIDTH - HANDLE_OVERLAP;
  const handleLeft = collapsed ? COLLAPSED_HANDLE_LEFT_OFFSET : effectiveWidth - HANDLE_OVERLAP;
  const centerLeft = (itemWidth: number) => Math.max(0, (effectiveWidth - itemWidth) / 2);
  const handleUploadFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    onCharacterUpload(file);
  };

  return (
    <div className="absolute left-7 top-[161px]" style={{ width: wrapperWidth, height: SIDEBAR_HEIGHT }}>
      {!collapsed ? (
      <div
        className={`absolute left-0 top-0 h-[799px] rounded-xl shadow-[0px_8px_40px_#0000001f] bg-[linear-gradient(0deg,rgba(207,207,207,1)_0%,rgba(207,207,207,1)_100%)] ${
          isDragging ? "" : "transition-[width] duration-300 ease-out"
        }`}
        style={{ width: effectiveWidth }}
      >
        <div className="absolute left-0 top-0 h-full w-full rounded-xl bg-[#00000001] backdrop-blur-[6.0px] backdrop-brightness-[92.0%] backdrop-saturate-[105.0%] [-webkit-backdrop-filter:blur(6.0px)_brightness(92.0%)_saturate(105.0%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.30),inset_1px_0_0_rgba(255,255,255,0.24),inset_0_-1px_4px_rgba(0,0,0,0.11),inset_-1px_0_4px_rgba(0,0,0,0.09)]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl [clip-path:inset(0_round_12px)]">
          <LiquidGlass
            className="h-full w-full overflow-hidden rounded-xl"
            style={{ position: "absolute", top: "50%", left: "50%" }}
            mode="shader"
            displacementScale={12}
            blurAmount={0.012}
            saturation={108}
            aberrationIntensity={0}
            elasticity={0}
            cornerRadius={12}
            padding="0px"
          >
            <div className="h-full w-full rounded-xl bg-[rgba(255,255,255,0.06)]" />
          </LiquidGlass>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.05)_34%,rgba(0,0,0,0.09)_100%)] opacity-60" />

        <div
          className={`absolute inset-0 ${
            isDragging ? "" : "transition-opacity duration-200"
          } ${collapsed ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <div
            className="absolute top-[25px] flex h-[50px] items-start gap-2.5 rounded-[41.92px] border border-solid border-white bg-[#f3f4f6a1] px-[23px] py-px shadow-[0px_0px_42.73px_1.68px_#0000000d]"
            style={{ left: centerLeft(headerWidth), width: headerWidth }}
          >
            <div className="relative inline-flex w-full flex-[0_0_auto] items-center gap-2.5 px-[30px] py-3.5">
              {isEditMode ? (
                <div className="relative z-10 h-5 w-5 shrink-0 overflow-hidden">
                  <img
                    className="absolute inset-0 h-full w-full max-w-none"
                    alt="Edit mode"
                    src={EDIT_HEADER_ICON_BASE_SRC}
                  />
                  <img
                    className="absolute inset-[0_0_0_0.2px] h-full w-full max-w-none"
                    alt=""
                    src={EDIT_HEADER_ICON_DETAIL_SRC}
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <img
                  className="relative z-10 -my-px -ml-px -mr-px h-[22px] w-[21px] shrink-0"
                  alt="Create mode"
                  src={createHeaderIconSrc}
                />
              )}

              <div className="absolute left-0 top-0 h-[49px] w-full">
                <div className="absolute left-0 top-0 flex h-[49px] w-full items-center justify-center overflow-hidden pl-[58px] pr-6 text-ellipsis bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] text-center text-[17.7px] font-medium leading-[18.8px] tracking-[-0.18px] text-[#343434]">
                  {headerLabel}
                </div>
              </div>
            </div>
          </div>

          {isEditMode ? (
            <div
              className="absolute top-[309px] h-[63px]"
              style={{ left: centerLeft(EDIT_CONTROLS_WIDTH), width: EDIT_CONTROLS_WIDTH }}
            >
              <button
                className="absolute left-0 top-0 h-[63px] rounded-[16px] border-[0.4px] border-solid border-[#ededec]"
                style={{ width: EDIT_LEFT_CONTROL_WIDTH }}
                type="button"
                aria-label="Edit focus mode"
                aria-pressed={isEditFocusSelected}
                onClick={() => setIsEditFocusSelected((current) => !current)}
              >
                <div className="absolute inset-0 rounded-[16px] bg-[#0f0f0f] [mix-blend-mode:color-dodge]" />
                <div className="absolute inset-0 rounded-[16px] bg-[rgba(245,245,245,0.4)]" />
                {isEditFocusSelected ? (
                  <ActiveButtonGlass
                    className="absolute"
                    style={{
                      left: EDIT_LEFT_INDICATOR_LEFT,
                      top: EDIT_TYPE_SLOT_TOP,
                      width: EDIT_TYPE_SLOT_WIDTH,
                      height: EDIT_TYPE_SLOT_HEIGHT,
                    }}
                  />
                ) : null}
                <img
                  className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2"
                  alt="Focus"
                  src={EDIT_FOCUS_ICON_SRC}
                />
              </button>

              <div
                className="absolute top-0 h-[63px] rounded-[16px] border-[0.4px] border-solid border-[#ededec]"
                style={{ left: 135, width: EDIT_RIGHT_CONTROL_WIDTH }}
                role="group"
                aria-label="Edit type selector"
              >
                <div className="absolute inset-0 rounded-[16px] bg-[#0f0f0f] [mix-blend-mode:color-dodge]" />
                <div className="absolute inset-0 rounded-[16px] bg-[rgba(245,245,245,0.4)]" />
                {selectedEditType === "person" ? (
                  <div
                    className="absolute"
                    style={{
                      left: EDIT_TYPE_PERSON_LEFT,
                      top: EDIT_TYPE_SLOT_TOP,
                      width: EDIT_TYPE_SLOT_WIDTH,
                      height: EDIT_TYPE_SLOT_HEIGHT,
                    }}
                  >
                    <ActiveButtonGlass className="absolute inset-0" />
                  </div>
                ) : null}
                {selectedEditType === "shield" ? (
                  <div
                    className="absolute"
                    style={{
                      left: EDIT_TYPE_SHIELD_LEFT,
                      top: EDIT_TYPE_SLOT_TOP,
                      width: EDIT_TYPE_SLOT_WIDTH,
                      height: EDIT_TYPE_SLOT_HEIGHT,
                    }}
                  >
                    <ActiveButtonGlass className="absolute inset-0" />
                  </div>
                ) : null}
                <button
                  className="all-[unset] box-border absolute cursor-pointer rounded-[20px]"
                  style={{
                    left: EDIT_TYPE_PERSON_LEFT,
                    top: EDIT_TYPE_SLOT_TOP,
                    width: EDIT_TYPE_SLOT_WIDTH,
                    height: EDIT_TYPE_SLOT_HEIGHT,
                  }}
                  type="button"
                  aria-label="Person edit type"
                  aria-pressed={selectedEditType === "person"}
                  onClick={() => setSelectedEditType("person")}
                />
                <button
                  className="all-[unset] box-border absolute cursor-pointer rounded-[20px]"
                  style={{
                    left: EDIT_TYPE_SHIELD_LEFT,
                    top: EDIT_TYPE_SLOT_TOP,
                    width: EDIT_TYPE_SLOT_WIDTH,
                    height: EDIT_TYPE_SLOT_HEIGHT,
                  }}
                  type="button"
                  aria-label="Shield edit type"
                  aria-pressed={selectedEditType === "shield"}
                  onClick={() => setSelectedEditType("shield")}
                />
                <EditPersonIcon
                  className="pointer-events-none absolute h-[57px] w-[65px]"
                  style={{
                    left: EDIT_TYPE_PERSON_LEFT,
                    top: EDIT_TYPE_SLOT_TOP,
                  }}
                />
                <img
                  className="pointer-events-none absolute h-[44px] w-[35px]"
                  alt="Shield option"
                  src={EDIT_SHIELD_ICON_SRC}
                  style={{
                    left: EDIT_SHIELD_ICON_LEFT,
                    top: EDIT_SHIELD_ICON_TOP,
                  }}
                />
              </div>
            </div>
          ) : (
            <SidebarCarousel width={carouselWidth} />
          )}

          <div
            className="absolute top-[152px] flex h-[111px] rounded-[15.45px] border-[0.5px] border-solid border-white bg-[#ffffff4a] shadow-[0px_0px_41.27px_1.62px_#0000000d]"
            style={{ left: centerLeft(promptCardWidth), width: promptCardWidth }}
          >
            <textarea
              className="mt-[9.7px] ml-[10.6px] h-[85px] resize-none bg-transparent text-[14.5px] font-medium leading-[15.4px] tracking-[-0.14px] text-[#343434e0] outline-none placeholder:text-[#34343499] [font-family:'Aeonik_Pro-Medium',Helvetica]"
              style={{ width: promptInnerWidth }}
              placeholder="Write your prompt..."
              value={promptText}
              onChange={(event) => onPromptTextChange(event.target.value)}
            />
          </div>

          <div
            className="absolute top-[108px] flex items-center"
            style={{ left: centerLeft(contentWidth), width: contentWidth }}
          >
            <div className="relative h-[15px]" style={{ width: promptSectionLabelWidth }}>
              <p className="absolute left-0 top-0 h-[15px] w-full overflow-hidden text-ellipsis whitespace-nowrap bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] text-[15px] font-medium leading-[15.9px] tracking-[-0.45px] text-[#202020]">
                {promptSectionLabel}
              </p>
            </div>

            <div className="ml-4 h-[4px] rounded-full bg-[#656565]" style={{ width: lineWidth }} />
          </div>

          <div
            className="absolute top-[429px] flex h-[15px] items-center"
            style={{ left: centerLeft(contentWidth), width: contentWidth }}
          >
            <div className="relative h-[13px] w-[73px]">
              <div className="absolute left-0 top-0 h-[13px] w-[73px] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap bg-blend-exclusion [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:0] [font-family:'Aeonik_Pro-Medium',Helvetica] text-center text-[15px] font-medium leading-[15.9px] tracking-[-0.45px] text-[#202020]">
                Reference
              </div>
            </div>

            <div className="ml-4 h-[4px] rounded-full bg-[#656565]" style={{ width: referenceLineWidth }} />
          </div>

          <div
            className="absolute top-[463px] h-40"
            style={{ left: centerLeft(uploadFrameWidth), width: uploadFrameWidth }}
          >
            <button
              className={`relative left-[-22.62%] top-[16.88%] h-[89.38%] w-[148.82%] rounded-[16.75px] border-[0.4px] border-solid border-[#ffffff4c] bg-[#84848433] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.11),inset_-1px_0_1px_rgba(0,0,0,0.08)] backdrop-blur-[1.6px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(1.6px)_brightness(100.0%)_saturate(100.0%)] ${
                isUploadDragOver ? "ring-2 ring-[#226ab3]" : ""
              }`}
              type="button"
              onClick={() => uploadInputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault();
                setIsUploadDragOver(true);
              }}
              onDragLeave={() => setIsUploadDragOver(false)}
              onDrop={(event) => {
                event.preventDefault();
                setIsUploadDragOver(false);
                handleUploadFiles(event.dataTransfer.files);
              }}
              aria-label="Upload character image"
            >
              <img
                className="absolute left-[29px] top-[-18px] h-[127px] w-[184px]"
                alt="Paper"
                src="https://c.animaapp.com/ViJx1BUZ/img/paper.svg"
              />

              <div className="absolute left-[95px] top-[41px] h-14 w-14">
                <div
                  className="absolute inset-0 rounded-[36px] bg-[rgba(0,0,0,0.2)] backdrop-blur-[4px] [-webkit-backdrop-filter:blur(4px)]"
                  aria-hidden="true"
                />
                <div className="absolute left-1/2 top-1/2 h-[25px] w-[34px] -translate-x-1/2 -translate-y-1/2">
                  <UploadCloudIcon />
                </div>
              </div>

              <div className="absolute left-5 top-[104px] flex h-[15px] w-[202px] justify-center">
                <p
                  className={`h-[15px] w-[202px] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap bg-blend-exclusion [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [font-family:'Aeonik_Pro-Medium',Helvetica] text-center text-sm font-medium leading-[14.8px] tracking-[-0.42px] ${
                    isEditMode ? "text-[rgba(52,52,52,0.62)]" : "text-white"
                  }`}
                >
                  {uploadedCharacterName ?? "Drag and drop media below 15MB"}
                </p>
              </div>
            </button>
          </div>

          <input
            ref={uploadInputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={(event) => {
              handleUploadFiles(event.target.files);
              event.currentTarget.value = "";
            }}
          />

          <div
            className="absolute top-[676px] inline-flex h-[15px] items-center gap-[11px]"
            style={{ left: centerLeft(contentWidth), width: contentWidth }}
          >
            <div className="relative h-[13px] w-[43.26px]">
              <div className="absolute left-0 top-0 w-[43px] overflow-hidden text-ellipsis whitespace-nowrap bg-blend-exclusion [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:0] [font-family:'Aeonik_Pro-Medium',Helvetica] text-[15px] font-medium leading-[15.9px] tracking-[-0.45px] text-[#202020]">
                Finish
              </div>
            </div>

            <div className="h-[4px] rounded-full bg-[#656565]" style={{ width: finishLineWidth }} />
          </div>

          <button
            className={`all-[unset] box-border absolute top-[calc(50.00%_+_318px)] isolate flex flex-col items-start rounded-[27.87px] border-[0.4px] border-solid bg-[#50505033] px-[25px] py-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.11),inset_-1px_0_1px_rgba(0,0,0,0.08)] backdrop-blur-[1.6px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(1.6px)_brightness(100.0%)_saturate(100.0%)] [mix-blend-mode:normal] ${
              isEditMode ? "border-[rgba(0,4,255,0.3)]" : "border-transparent"
            }`}
            style={{ left: centerLeft(CREATE_BUTTON_WIDTH), width: CREATE_BUTTON_WIDTH }}
          >
            <div className="relative h-[31px] w-full self-stretch">
              <div className="absolute left-[calc(50.00%_-_52px)] top-[calc(50.00%_-_16px)] flex h-[31px] w-[104px] items-center justify-center [font-family:'Aeonik_Pro-Medium',Helvetica] text-center text-2xl font-medium leading-[25.44px] tracking-[-0.72px] text-white">
                Create
              </div>
            </div>
          </button>
        </div>
      </div>
      ) : null}

      <button
        className={`all-[unset] box-border absolute top-[342px] flex h-[60px] w-[38px] items-center justify-center ${
          isDragging ? "" : "transition-[left] duration-300 ease-out"
        }`}
        style={{ left: handleLeft, touchAction: "none", cursor: "col-resize" }}
        type="button"
        onPointerDown={handlePointerDown}
        onDragStart={(event) => event.preventDefault()}
        onClick={() => {
          if (dragStateRef.current.moved) {
            dragStateRef.current.moved = false;
            return;
          }

          onToggleCollapsed();
        }}
        aria-label={collapsed ? "Expand sidebar" : "Resize or collapse sidebar"}
      >
        {collapsed ? (
          <CollapsedResizeSidebarHandleIcon />
        ) : (
          <ExpandedResizeSidebarHandleIcon />
        )}
      </button>
    </div>
  );
};
