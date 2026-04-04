import { useEffect, useRef, useState } from "react";
import { SidebarCarousel } from "./SidebarCarousel";

type CharacterCreationSidebarSectionProps = {
  width: number;
  collapsed: boolean;
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

export const CharacterCreationSidebarSection = ({
  width,
  collapsed,
  promptText,
  uploadedCharacterName,
  onCharacterUpload,
  onPromptTextChange,
  onWidthChange,
  onToggleCollapsed,
}: CharacterCreationSidebarSectionProps): JSX.Element => {
  const resizeHandleButtonSrc = "https://c.animaapp.com/ViJx1BUZ/img/button-1.svg";
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadDragOver, setIsUploadDragOver] = useState(false);
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
  const lineGap = 16;
  const promptInnerWidth = Math.max(200, promptCardWidth - 24);
  const lineWidth = Math.max(120, contentWidth - 145 - lineGap);
  const referenceLineWidth = Math.max(120, contentWidth - 73 - lineGap);
  const finishLineWidth = Math.max(120, contentWidth - 43 - 11);
  const carouselWidth = Math.max(280, width - 65);
  const uploadFrameWidth = 163;

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
  const createButtonWidth = Math.max(120, effectiveWidth - 264);
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
              <img
                className="relative z-10 -my-px -ml-px -mr-px h-[22px] w-[21px] shrink-0"
                alt="Container"
                src="https://c.animaapp.com/ViJx1BUZ/img/container.svg"
              />

              <div className="absolute left-0 top-0 h-[49px] w-full">
                <div className="absolute left-0 top-0 flex h-[49px] w-full items-center justify-center overflow-hidden pl-[58px] pr-6 text-ellipsis bg-blend-exclusion [font-family:'Aeonik_Pro-Medium',Helvetica] text-center text-[17.7px] font-medium leading-[18.8px] tracking-[-0.18px] text-[#1f1f1f]">
                  Create your Character
                </div>
              </div>
            </div>
          </div>

          <SidebarCarousel width={carouselWidth} />

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
            <div className="relative h-[15px] w-[145px]">
              <p className="absolute left-0 top-0 h-[15px] w-[145px] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap bg-blend-exclusion [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:0] [font-family:'Aeonik_Pro-Medium',Helvetica] text-center text-[15px] font-medium leading-[15.9px] tracking-[-0.45px] text-[#202020]">
                What do you think of?
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

              <img
                className="absolute left-[95px] top-[41px] h-14 w-14 aspect-[1]"
                alt="Featured icon"
                src="https://c.animaapp.com/ViJx1BUZ/img/featured-icon.svg"
              />

              <div className="absolute left-5 top-[104px] flex h-[15px] w-[202px] justify-center">
                <p className="h-[15px] w-[202px] items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap bg-blend-exclusion [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [font-family:'Aeonik_Pro-Medium',Helvetica] text-center text-sm font-medium leading-[14.8px] tracking-[-0.42px] text-white">
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
            className="all-[unset] box-border absolute top-[calc(50.00%_+_318px)] flex flex-col items-start gap-2.5 rounded-[27.87px] border-[0.4px] border-solid border-[#0004ff4c] bg-[#50505033] px-[25px] py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.11),inset_-1px_0_1px_rgba(0,0,0,0.08)] backdrop-blur-[1.6px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(1.6px)_brightness(100.0%)_saturate(100.0%)]"
            style={{ left: centerLeft(createButtonWidth), width: createButtonWidth }}
          >
            <div className="relative h-[31px] w-full self-stretch">
              <div className="absolute left-[calc(50.00%_-_52px)] top-[calc(50.00%_-_16px)] flex h-[31px] w-[104px] items-center justify-center [font-family:'Aeonik_Pro-Medium',Helvetica] text-center text-2xl font-medium leading-[25.4px] tracking-[-0.72px] text-[#226ab3]">
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
          <img
            className={`h-[58px] w-[33px] mix-blend-color-dodge transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
            alt="Resize sidebar"
            src={resizeHandleButtonSrc}
            draggable={false}
          />
        )}
      </button>
    </div>
  );
};
