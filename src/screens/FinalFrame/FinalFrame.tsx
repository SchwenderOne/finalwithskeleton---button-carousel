import { useEffect, useRef, useState } from "react";
import { CharacterCreationSidebarSection } from "./sections/CharacterCreationSidebarSection";
import {
  type EditorStep,
  EditorStepNavigationSection,
} from "./sections/EditorStepNavigationSection";
import {
  type ModeType,
  TopModeSwitcher,
  type ViewType,
  ViewTypeToggle,
} from "./sections/PreviewStageSection/ControlGroups";
import { LeftCanvasRuler, TopCanvasRuler } from "./sections/PreviewStageSection/CanvasRulers";
import { MainBackgroundLayer } from "./sections/PreviewStageSection/MainBackgroundLayer";
import { BottomViewCarousel } from "./sections/PreviewStageSection/BottomViewCarousel";
import { CanvasDotGrid } from "./sections/PreviewStageSection/CanvasDotGrid";

const FRAME_WIDTH = 1720;
const FRAME_HEIGHT = 984;
const NOISE_BACKGROUND_URL =
  "https://c.animaapp.com/ViJx1BUZ/img/noise-texture-background-.png";
const PREVIEW_HEIGHT = 849;
const CANVAS_CONTENT_HEIGHT = 825;
const BASE_TOP_UNITS_PER_STEP = 100;
const BASE_LEFT_UNITS_PER_STEP = 200;
const TOP_MAJOR_STEP_PX = 60;
const LEFT_MAJOR_STEP_PX = 83;
const MIN_CANVAS_ZOOM = 0.5;
const MAX_CANVAS_ZOOM = 4;
const SIDEBAR_DEFAULT_WIDTH = 418;
const SIDEBAR_COLLAPSED_WIDTH = 76;
const SIDEBAR_LEFT = 28;
const PREVIEW_RIGHT_GUTTER = 24;
const PREVIEW_GAP = 32;
const MODE_SWITCHER_MAX_WIDTH = 371;
const MODE_SWITCHER_MIN_WIDTH = 235;

export const FinalFrame = (): JSX.Element => {
  const previewViewportRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [activeTopMode, setActiveTopMode] = useState<ModeType>("create");
  const [activeViewType, setActiveViewType] = useState<ViewType>("360");
  const [projectName, setProjectName] = useState("Caesar 1");
  const [activeEditorStep, setActiveEditorStep] = useState<EditorStep>("start");
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT_WIDTH);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [uploadedCharacter, setUploadedCharacter] = useState<{
    baseHeight: number;
    baseWidth: number;
    centerX: number;
    centerY: number;
    name: string;
    src: string;
  } | null>(null);
  const [canvasViewport, setCanvasViewport] = useState({
    originX: 5200,
    originY: 2400,
    zoom: 1,
  });

  useEffect(() => {
    return () => {
      if (uploadedCharacter) {
        URL.revokeObjectURL(uploadedCharacter.src);
      }
    };
  }, [uploadedCharacter]);

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

  useEffect(() => {
    const previewViewport = previewViewportRef.current;
    if (!previewViewport) {
      return undefined;
    }

    const handlePreviewWheel = (event: WheelEvent) => {
      event.preventDefault();

      setCanvasViewport((prev) => {
        const hasZoomModifier = event.ctrlKey || event.metaKey;
        if (hasZoomModifier) {
          const nextZoom = Math.max(
            MIN_CANVAS_ZOOM,
            Math.min(MAX_CANVAS_ZOOM, prev.zoom * Math.exp(-event.deltaY * 0.002)),
          );

          return { ...prev, zoom: nextZoom };
        }

        const topUnitsPerPixel = (BASE_TOP_UNITS_PER_STEP / TOP_MAJOR_STEP_PX) / prev.zoom;
        const leftUnitsPerPixel = (BASE_LEFT_UNITS_PER_STEP / LEFT_MAJOR_STEP_PX) / prev.zoom;

        return {
          ...prev,
          originX: prev.originX + event.deltaX * topUnitsPerPixel,
          originY: prev.originY - event.deltaY * leftUnitsPerPixel,
        };
      });
    };

    const preventGestureZoom = (event: Event) => {
      event.preventDefault();
    };

    previewViewport.addEventListener("wheel", handlePreviewWheel, { passive: false });
    previewViewport.addEventListener("gesturestart", preventGestureZoom, { passive: false });
    previewViewport.addEventListener("gesturechange", preventGestureZoom, { passive: false });
    previewViewport.addEventListener("gestureend", preventGestureZoom, { passive: false });

    return () => {
      previewViewport.removeEventListener("wheel", handlePreviewWheel);
      previewViewport.removeEventListener("gesturestart", preventGestureZoom);
      previewViewport.removeEventListener("gesturechange", preventGestureZoom);
      previewViewport.removeEventListener("gestureend", preventGestureZoom);
    };
  }, []);

  const currentSidebarWidth = isSidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : sidebarWidth;
  const previewLeft = SIDEBAR_LEFT + currentSidebarWidth + PREVIEW_GAP;
  const previewWidth = FRAME_WIDTH - previewLeft - PREVIEW_RIGHT_GUTTER;
  const previewInnerWidth = previewWidth - 23;
  const modeSwitcherWidth = Math.max(
    MODE_SWITCHER_MIN_WIDTH,
    Math.min(MODE_SWITCHER_MAX_WIDTH, currentSidebarWidth - 47),
  );
  const uploadedCharacterScreenPosition = uploadedCharacter
    ? {
        height: uploadedCharacter.baseHeight * canvasViewport.zoom,
        left:
          ((uploadedCharacter.centerX - canvasViewport.originX) * TOP_MAJOR_STEP_PX * canvasViewport.zoom) /
          BASE_TOP_UNITS_PER_STEP,
        top:
          ((canvasViewport.originY - uploadedCharacter.centerY) * LEFT_MAJOR_STEP_PX * canvasViewport.zoom) /
          BASE_LEFT_UNITS_PER_STEP,
        width: uploadedCharacter.baseWidth * canvasViewport.zoom,
      }
    : null;

  const handleCharacterUpload = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const visibleWorldWidth =
        (previewInnerWidth * BASE_TOP_UNITS_PER_STEP) / (TOP_MAJOR_STEP_PX * canvasViewport.zoom);
      const visibleWorldHeight =
        (CANVAS_CONTENT_HEIGHT * BASE_LEFT_UNITS_PER_STEP) / (LEFT_MAJOR_STEP_PX * canvasViewport.zoom);
      const maxBaseWidth = Math.min(previewInnerWidth * 0.36, 320);
      const maxBaseHeight = CANVAS_CONTENT_HEIGHT * 0.52;
      let baseWidth = maxBaseWidth;
      let baseHeight = (image.naturalHeight / image.naturalWidth) * baseWidth;

      if (baseHeight > maxBaseHeight) {
        baseHeight = maxBaseHeight;
        baseWidth = (image.naturalWidth / image.naturalHeight) * baseHeight;
      }

      setUploadedCharacter((current) => {
        if (current) {
          URL.revokeObjectURL(current.src);
        }

        return {
          baseHeight,
          baseWidth,
          centerX: canvasViewport.originX + visibleWorldWidth / 2,
          centerY: canvasViewport.originY - visibleWorldHeight / 2,
          name: file.name,
          src: objectUrl,
        };
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
    };

    image.src = objectUrl;
  };

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
          <div className="absolute top-0 left-0 h-[95px] w-full bg-[#000103]" />
          <EditorStepNavigationSection
            projectName={projectName}
            activeStep={activeEditorStep}
            onProjectNameChange={setProjectName}
            onStepChange={setActiveEditorStep}
          />
          <MainBackgroundLayer noiseImageUrl={NOISE_BACKGROUND_URL} />

          <CharacterCreationSidebarSection
            width={currentSidebarWidth}
            collapsed={isSidebarCollapsed}
            uploadedCharacterName={uploadedCharacter?.name ?? null}
            promptText={promptText}
            onCharacterUpload={handleCharacterUpload}
            onPromptTextChange={setPromptText}
            onWidthChange={setSidebarWidth}
            onToggleCollapsed={() => setIsSidebarCollapsed((current) => !current)}
          />

          <div className="absolute left-[51px] top-28 transition-[width] duration-300 ease-out">
            <TopModeSwitcher
              mode={activeTopMode}
              onModeChange={setActiveTopMode}
              width={modeSwitcherWidth}
            />
          </div>

          <div
            className="absolute top-[116px] flex h-[849px] transition-[left,width] duration-300 ease-out"
            style={{ left: previewLeft, width: previewWidth }}
          >
            <div
              ref={previewViewportRef}
              className="relative h-[849px] overflow-hidden rounded-xl shadow-[4px_4px_4px_#00000040]"
              style={{ width: previewWidth }}
            >
              <div className="absolute top-0 left-0 h-6" style={{ width: previewWidth }}>
                <TopCanvasRuler
                  width={previewWidth}
                  zoom={canvasViewport.zoom}
                  originX={canvasViewport.originX}
                />
              </div>

              <div className="absolute top-0 left-0 flex h-[849px]">
                <LeftCanvasRuler
                  height={PREVIEW_HEIGHT}
                  zoom={canvasViewport.zoom}
                  originY={canvasViewport.originY}
                />
              </div>

              <div
                className="absolute top-6 left-[23px] h-[825px] rounded-[2px] border border-[#d8d8d8] bg-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.38)]"
                style={{
                  width: previewInnerWidth,
                }}
              >
                <CanvasDotGrid
                  width={previewInnerWidth}
                  height={CANVAS_CONTENT_HEIGHT}
                  zoom={canvasViewport.zoom}
                  originX={canvasViewport.originX}
                  originY={canvasViewport.originY}
                />
                {uploadedCharacterScreenPosition ? (
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <img
                      className="absolute -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0px_18px_28px_rgba(0,0,0,0.22)]"
                      alt={uploadedCharacter?.name ?? "Uploaded character"}
                      src={uploadedCharacter?.src}
                      style={{
                        left: uploadedCharacterScreenPosition.left,
                        top: uploadedCharacterScreenPosition.top,
                        width: uploadedCharacterScreenPosition.width,
                        height: uploadedCharacterScreenPosition.height,
                      }}
                    />
                  </div>
                ) : null}
                {activeViewType === "grid" ? (
                  <BottomViewCarousel availableWidth={previewInnerWidth - 24} />
                ) : null}
              </div>

              <div className="absolute left-[calc(50.00%_-_96px)] top-[43px]">
                <ViewTypeToggle view={activeViewType} onViewChange={setActiveViewType} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
