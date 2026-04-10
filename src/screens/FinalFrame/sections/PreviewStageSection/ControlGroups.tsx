export type ModeType = "variation" | "create" | "edit";
export type ViewType = "360" | "grid" | "shield" | "skeleton";

type TopModeSwitcherProps = {
  mode: ModeType;
  onModeChange: (mode: ModeType) => void;
  collapsed?: boolean;
  width?: number;
};

type ViewTypeToggleProps = {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
};

const VariationIcon = (): JSX.Element => {
  return (
    <svg className="h-[17.4px] w-[20.4px] shrink-0" viewBox="0 0 21 18" fill="none">
      <path
        d="M16.85 6.35V0.7M14 3.52H19.7M14 16.7V15.57C14 13.99 14 13.2 13.69 12.59C13.42 12.06 12.98 11.63 12.44 11.36C11.83 11.05 11.04 11.05 9.44 11.05H5.26C3.66 11.05 2.87 11.05 2.26 11.36C1.72 11.63 1.28 12.06 1.01 12.59C0.7 13.2 0.7 13.99 0.7 15.57V16.7M10.68 3.99C10.68 5.81 9.19 7.29 7.35 7.29C5.51 7.29 4.03 5.81 4.03 3.99C4.03 2.18 5.51 0.7 7.35 0.7C9.19 0.7 10.68 2.18 10.68 3.99Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CreateIcon = (): JSX.Element => {
  return (
    <svg className="h-[22px] w-[21px] shrink-0" viewBox="0 0 21 22" fill="none">
      <path
        d="M13 3.11V1M13 15.74V13.63M6 8.37H8M18 8.37H20M15.8 11.32L17 12.58M15.8 5.42L17 4.16M1 21L10 11.53M10.2 5.42L9 4.16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const EditIcon = (): JSX.Element => {
  return (
    <svg className="h-[21px] w-[21.82px] shrink-0" viewBox="0 0 22 21" fill="none">
      <path
        d="M5.42 21H6.86C7.56 21 8.02 20.54 8.02 19.86V18.51C8.02 17.82 7.56 17.36 6.86 17.36H5.42C4.71 17.36 4.25 17.82 4.25 18.51V19.86C4.25 20.54 4.71 21 5.42 21ZM5.78 19.74C5.64 19.74 5.55 19.66 5.55 19.52V18.85C5.55 18.71 5.64 18.62 5.78 18.62H6.5C6.63 18.62 6.72 18.71 6.72 18.85V19.52C6.72 19.66 6.63 19.74 6.5 19.74H5.78ZM5.19 17.96H7.06C7.11 15.17 8.09 12.7 9.86 10.71L8.47 9.56C6.39 11.91 5.23 14.74 5.19 17.96ZM19.21 7.65H20.66C21.36 7.65 21.82 7.2 21.82 6.51V5.16C21.82 4.47 21.36 4.02 20.66 4.02H19.21C18.52 4.02 18.05 4.47 18.05 5.16V6.51C18.05 7.2 18.52 7.65 19.21 7.65ZM19.58 6.39C19.44 6.39 19.36 6.31 19.36 6.18V5.5C19.36 5.37 19.44 5.27 19.58 5.27H20.3C20.44 5.27 20.52 5.37 20.52 5.5V6.18C20.52 6.31 20.44 6.39 20.3 6.39H19.58ZM10.39 7.76L11.33 9.31C13.37 7.67 15.84 6.78 18.68 6.76V4.96C15.52 4.98 12.75 5.96 10.39 7.76ZM8.84 10.38L7.72 9.36L1.02 15.8L2.12 16.86L8.84 10.38ZM9.95 7.21L11.07 8.22L17.42 2.12L16.32 1.06L9.95 7.21ZM17 2.78C17.79 2.78 18.44 2.16 18.44 1.39C18.44 0.62 17.79 0 17 0C16.2 0 15.55 0.62 15.55 1.39C15.55 2.16 16.2 2.78 17 2.78ZM1.44 17.92C2.24 17.92 2.89 17.3 2.89 16.53C2.89 15.77 2.24 15.14 1.44 15.14C0.65 15.14 0 15.77 0 16.53C0 17.3 0.65 17.92 1.44 17.92ZM9.67 11.5C11.06 11.5 12.19 10.42 12.19 9.08C12.19 7.75 11.06 6.66 9.67 6.66C8.28 6.66 7.16 7.75 7.16 9.08C7.16 10.42 8.28 11.5 9.67 11.5ZM9.67 10.02C9.13 10.02 8.7 9.6 8.7 9.08C8.7 8.56 9.13 8.15 9.67 8.15C10.21 8.15 10.64 8.56 10.64 9.08C10.64 9.6 10.21 10.02 9.67 10.02Z"
        fill="currentColor"
      />
    </svg>
  );
};

const GridIcon = (): JSX.Element => {
  return (
    <svg className="h-[22.4px] w-[22.4px]" viewBox="0 0 22.4 22.4" fill="none">
      <path
        d="M14.68 22.4H19.28C21.16 22.4 22.07 21.49 22.07 19.54V14.93C22.07 12.98 21.16 12.07 19.28 12.07H14.68C12.79 12.07 11.89 12.98 11.89 14.93V19.54C11.89 21.49 12.79 22.4 14.68 22.4ZM14.69 20.2C14.25 20.2 14.05 20 14.05 19.55V14.92C14.05 14.48 14.25 14.27 14.69 14.27H19.28C19.7 14.27 19.9 14.48 19.9 14.92V19.55C19.9 20 19.7 20.2 19.28 20.2H14.69ZM2.79 22.4H7.39C9.27 22.4 10.18 21.49 10.18 19.54V14.93C10.18 12.98 9.27 12.07 7.39 12.07H2.79C0.9 12.07 0 12.98 0 14.93V19.54C0 21.49 0.9 22.4 2.79 22.4ZM2.79 20.2C2.37 20.2 2.17 20 2.17 19.55V14.92C2.17 14.48 2.37 14.27 2.79 14.27H7.38C7.81 14.27 8.01 14.48 8.01 14.92V19.55C8.01 20 7.81 20.2 7.38 20.2H2.79ZM14.68 10.33H19.28C21.16 10.33 22.07 9.43 22.07 7.48V2.86C22.07 0.91 21.16 0.01 19.28 0.01H14.68C12.79 0.01 11.89 0.91 11.89 2.86V7.48C11.89 9.43 12.79 10.33 14.68 10.33ZM14.69 8.14C14.25 8.14 14.05 7.94 14.05 7.48V2.85C14.05 2.41 14.25 2.2 14.69 2.2H19.28C19.7 2.2 19.9 2.41 19.9 2.85V7.48C19.9 7.94 19.7 8.14 19.28 8.14H14.69ZM2.79 10.33H7.39C9.27 10.33 10.18 9.43 10.18 7.48V2.86C10.18 0.91 9.27 0.01 7.39 0.01H2.79C0.9 0.01 0 0.91 0 2.86V7.48C0 9.43 0.9 10.33 2.79 10.33ZM2.79 8.14C2.37 8.14 2.17 7.94 2.17 7.48V2.85C2.17 2.41 2.37 2.2 2.79 2.2H7.38C7.81 2.2 8.01 2.41 8.01 2.85V7.48C8.01 7.94 7.81 8.14 7.38 8.14H2.79Z"
        fill="white"
      />
    </svg>
  );
};

const ShieldIcon = (): JSX.Element => {
  return (
    <svg className="h-[23.5px] w-[19.5px]" viewBox="0 0 20 24" fill="none">
      <path
        d="M9.75 1.23V22.35M18.75 11.79C18.75 17.24 12.73 21.21 10.54 22.48C10.29 22.62 10.16 22.69 9.99 22.73C9.85 22.76 9.65 22.76 9.51 22.73C9.34 22.69 9.21 22.62 8.96 22.48C6.77 21.21 0.75 17.24 0.75 11.79V6.47C0.75 5.58 0.75 5.14 0.9 4.76C1.03 4.42 1.24 4.12 1.51 3.88C1.82 3.61 2.24 3.46 3.09 3.14L9.12 0.91C9.35 0.82 9.47 0.78 9.59 0.76C9.7 0.75 9.8 0.75 9.91 0.76C10.03 0.78 10.15 0.82 10.38 0.91L16.41 3.14C17.26 3.46 17.68 3.61 17.99 3.88C18.26 4.12 18.47 4.42 18.6 4.76C18.75 5.14 18.75 5.58 18.75 6.47V11.79Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SkeletonIcon = (): JSX.Element => {
  return (
    <svg className="h-[27px] w-[15.55px]" viewBox="0 0 16 27" fill="none">
      <circle cx="7.77" cy="2.86" r="2.25" fill="#ACACAC" stroke="white" strokeWidth="1.23" />
      <line x1="7.77" y1="4.91" x2="7.77" y2="17.18" stroke="white" strokeWidth="0.82" />
      <path d="M14.67 14.06L7.89 8.37L7.63 8.69L14.41 14.38L14.67 14.06Z" fill="white" />
      <path d="M8.1 17.18L3.47 26.29" stroke="white" strokeWidth="0.82" strokeLinecap="round" />
      <path d="M0.56 14.38L7.34 8.69L7.6 9L0.82 14.69L0.56 14.38Z" fill="white" />
      <path d="M7.91 17.36L12.36 26.11" stroke="white" strokeWidth="0.82" strokeLinecap="round" />
      <circle cx="3.68" cy="25.77" r="1.02" fill="#ACACAC" stroke="white" strokeWidth="0.41" />
      <circle cx="11.86" cy="25.77" r="1.02" fill="#ACACAC" stroke="white" strokeWidth="0.41" />
      <circle cx="7.77" cy="17.59" r="1.02" fill="#ACACAC" stroke="white" strokeWidth="0.41" />
      <circle cx="14.32" cy="14.32" r="1.02" fill="#ACACAC" stroke="white" strokeWidth="0.41" />
      <circle cx="1.23" cy="14.32" r="1.02" fill="#ACACAC" stroke="white" strokeWidth="0.41" />
      <circle cx="7.77" cy="9.41" r="1.02" fill="#ACACAC" stroke="white" strokeWidth="0.41" />
    </svg>
  );
};

const buttonBaseClasses =
  "all-[unset] box-border inline-flex h-[31px] min-w-0 items-center justify-center gap-[6px] rounded-[35.75px] px-3 transition-[background-color,color,border-color,box-shadow] duration-200";

const modeIndicatorLeft: Record<ModeType, string> = {
  variation: "0.5px",
  create: "129px",
  edit: "266.5px",
};

const modeIndicatorWidth: Record<ModeType, string> = {
  variation: "135px",
  create: "129px",
  edit: "105px",
};

export const TopModeSwitcher = ({
  mode,
  onModeChange,
  collapsed = false,
  width = 371,
}: TopModeSwitcherProps): JSX.Element => {
  const containerWidth = collapsed ? 37 : width;
  const containerHeight = collapsed ? 107 : 33;
  const collapsedButtonClasses = "h-[31px] w-[31px] shrink-0 px-0";
  const collapsedActiveClasses =
    "border-[0.4px] border-solid border-[#ffffff4c] bg-[#85848433] text-white shadow-[0px_4px_4px_#00000040,inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.11),inset_-1px_0_1px_rgba(0,0,0,0.08)]";
  const collapsedInactiveClasses = "border-[0.4px] border-transparent text-[#474646]";

  return (
    <div
      className="relative h-[33px] rounded-[19.06px] border-[0.5px] border-solid border-white bg-[#c3c2c280] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.11),inset_-1px_0_1px_rgba(0,0,0,0.08)] backdrop-blur-[1.6px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(1.6px)_brightness(100.0%)_saturate(100.0%)]"
      style={{ width: containerWidth, height: containerHeight }}
    >
      {!collapsed ? (
        <>
          <div
            className="pointer-events-none absolute z-0 h-[39px] rounded-[35.747px] bg-[rgba(133,132,132,0.3)] transition-[left,width] duration-200"
            style={{ left: modeIndicatorLeft[mode], top: "-4px", width: modeIndicatorWidth[mode] }}
          />
          <div
            className="pointer-events-none absolute z-[1] h-[39px] rounded-[35.747px] border-[0.397px] border-solid border-[rgba(255,255,255,0.3)] bg-[rgba(133,132,132,0.2)] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] backdrop-blur-[12px] backdrop-saturate-[108%] transition-[left,width] duration-200 [-webkit-backdrop-filter:blur(12px)_saturate(108%)]"
            style={{ left: modeIndicatorLeft[mode], top: "-4px", width: modeIndicatorWidth[mode] }}
          >
            <span className="pointer-events-none absolute inset-0 rounded-[35.747px] bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_48%,rgba(0,0,0,0.08)_100%)]" />
          </div>
        </>
      ) : null}

      <div className={`relative z-10 flex h-full ${collapsed ? "flex-col items-center gap-[4px] px-[3px] py-[3px]" : "items-center gap-[8px] px-[23px]"}`}>
        <button
          className={`${buttonBaseClasses} ${
            collapsed ? collapsedButtonClasses : "h-[31px] w-[110px] shrink-0 gap-[3px] px-0"
          } ${
            collapsed
              ? mode === "variation"
                ? collapsedActiveClasses
                : collapsedInactiveClasses
              : mode === "variation"
                ? "text-white"
                : "text-[#474646]"
          }`}
          type="button"
          onClick={() => onModeChange("variation")}
          aria-pressed={mode === "variation"}
        >
          <VariationIcon />
          {collapsed ? null : (
            <span className="shrink-0 [font-family:'Aeonik_Pro-Medium',Helvetica] text-base font-medium leading-[17px] tracking-[-0.16px] text-current">
              Variation
            </span>
          )}
        </button>

        <button
          className={`${buttonBaseClasses} ${
            collapsed ? collapsedButtonClasses : "h-[31px] w-[129px] shrink-0 gap-[5px] px-0"
          } ${
            collapsed
              ? mode === "create"
                ? collapsedActiveClasses
                : collapsedInactiveClasses
              : mode === "create"
                ? "text-white"
                : "text-[#474646]"
          }`}
          type="button"
          onClick={() => onModeChange("create")}
          aria-pressed={mode === "create"}
        >
          <CreateIcon />
          {collapsed ? null : (
            <span className="shrink-0 [font-family:'Aeonik_Pro-Medium',Helvetica] text-[17.7px] font-medium leading-[18.8px] tracking-[-0.18px] text-current">
              Create
            </span>
          )}
        </button>

        <button
          className={`${buttonBaseClasses} ${
            collapsed ? collapsedButtonClasses : "h-[31px] w-[70px] shrink-0 gap-[3px] px-0"
          } ${
            collapsed
              ? mode === "edit"
                ? collapsedActiveClasses
                : collapsedInactiveClasses
              : mode === "edit"
                ? "text-white"
                : "text-[#474646]"
          }`}
          type="button"
          onClick={() => onModeChange("edit")}
          aria-pressed={mode === "edit"}
        >
          <EditIcon />
          {collapsed ? null : (
            <span className="shrink-0 [font-family:'Aeonik_Pro-Medium',Helvetica] text-base font-medium leading-[17px] tracking-[-0.16px] text-current">
              Edit
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

const viewIndicatorLeft: Record<ViewType, string> = {
  "360": "1px",
  grid: "63px",
  shield: "111px",
  skeleton: "149px",
};

const viewIndicatorWidth: Record<ViewType, string> = {
  "360": "67px",
  grid: "45px",
  shield: "41px",
  skeleton: "43px",
};

export const ViewTypeToggle = ({ view, onViewChange }: ViewTypeToggleProps): JSX.Element => {
  return (
    <div className="relative h-[33px] w-[193px] rounded-[19.06px] bg-[#11111152] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.11),inset_-1px_0_1px_rgba(0,0,0,0.08)] backdrop-blur-[1.6px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(1.6px)_brightness(100.0%)_saturate(100.0%)]">
      <div
        className="absolute top-px h-[31px] rounded-[58.27px] bg-[#8a8a8a] shadow-[inset_0_1px_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.1)] backdrop-blur-[29.5px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] transition-[left,width] duration-200 [-webkit-backdrop-filter:blur(29.5px)_brightness(100.0%)_saturate(100.0%)]"
        style={{ left: viewIndicatorLeft[view], width: viewIndicatorWidth[view] }}
      />
      <div className="absolute left-[15px] top-[3px] inline-flex items-center gap-6">
        <button
          className="all-[unset] box-border relative h-[21px] w-9 cursor-pointer"
          type="button"
          onClick={() => onViewChange("360")}
          aria-pressed={view === "360"}
          aria-label="360 degree view"
        >
          <div className="absolute left-[calc(50.00%_-_19px)] top-[calc(50.00%_-_10px)] flex h-[21px] w-[38px] items-center justify-center [font-family:'Aeonik_Pro-Medium',Helvetica] text-[15px] font-medium leading-[15.9px] tracking-[-0.15px] text-white">
            360°
          </div>
        </button>
        <button
          className={`all-[unset] box-border relative h-[22.4px] w-[22.4px] cursor-pointer ${
            view === "grid" ? "opacity-100" : "opacity-[0.9]"
          }`}
          type="button"
          onClick={() => onViewChange("grid")}
          aria-pressed={view === "grid"}
          aria-label="Grid view"
        >
          <GridIcon />
        </button>
        <button
          className={`all-[unset] box-border relative h-[23.5px] w-[19.5px] cursor-pointer ${
            view === "shield" ? "opacity-100" : "opacity-[0.9]"
          }`}
          type="button"
          onClick={() => onViewChange("shield")}
          aria-pressed={view === "shield"}
          aria-label="Shield view"
        >
          <ShieldIcon />
        </button>
        <button
          className={`all-[unset] box-border relative h-[27px] w-[15.55px] cursor-pointer ${
            view === "skeleton" ? "opacity-100" : "opacity-[0.9]"
          }`}
          type="button"
          onClick={() => onViewChange("skeleton")}
          aria-pressed={view === "skeleton"}
          aria-label="Skeleton view"
        >
          <SkeletonIcon />
        </button>
      </div>
    </div>
  );
};
