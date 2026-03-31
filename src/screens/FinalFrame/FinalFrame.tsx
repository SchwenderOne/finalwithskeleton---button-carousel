import { type WheelEventHandler, useEffect, useState } from "react";
import { CharacterCreationSidebarSection } from "./sections/CharacterCreationSidebarSection";
import {
  type EditorStep,
  EditorStepNavigationSection,
} from "./sections/EditorStepNavigationSection";
import {
  type ModeType,
  TopModeSwitcher,
  ViewTypeToggle,
} from "./sections/PreviewStageSection/ControlGroups";
import { LeftCanvasRuler, TopCanvasRuler } from "./sections/PreviewStageSection/CanvasRulers";
import { MainBackgroundLayer } from "./sections/PreviewStageSection/MainBackgroundLayer";

const FRAME_WIDTH = 1720;
const FRAME_HEIGHT = 984;
const NOISE_BACKGROUND_URL =
  "https://c.animaapp.com/ViJx1BUZ/img/noise-texture-background-.png";
const PREVIEW_HEIGHT = 849;
const PREVIEW_DOT_PATTERN = "radial-gradient(circle, #dcdcdc 1.6px, transparent 1.6px)";
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
  const [scale, setScale] = useState(1);
  const [activeTopMode, setActiveTopMode] = useState<ModeType>("create");
  const [projectName, setProjectName] = useState("Caesar 1");
  const [activeEditorStep, setActiveEditorStep] = useState<EditorStep>("start");
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT_WIDTH);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [canvasViewport, setCanvasViewport] = useState({
    originX: 5200,
    originY: 2400,
    zoom: 1,
  });

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

  const handlePreviewWheel: WheelEventHandler<HTMLDivElement> = (event) => {
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

  const currentSidebarWidth = isSidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : sidebarWidth;
  const previewLeft = SIDEBAR_LEFT + currentSidebarWidth + PREVIEW_GAP;
  const previewWidth = FRAME_WIDTH - previewLeft - PREVIEW_RIGHT_GUTTER;
  const previewInnerWidth = previewWidth - 23;
  const modeSwitcherWidth = Math.max(
    MODE_SWITCHER_MIN_WIDTH,
    Math.min(MODE_SWITCHER_MAX_WIDTH, currentSidebarWidth - 47),
  );

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
            promptText={promptText}
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
              className="relative h-[849px] overflow-hidden rounded-xl shadow-[4px_4px_4px_#00000040]"
              style={{ width: previewWidth }}
              onWheel={handlePreviewWheel}
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
                  backgroundImage: PREVIEW_DOT_PATTERN,
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="absolute left-[calc(50.00%_-_96px)] top-[43px]">
                <ViewTypeToggle view="360" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
