type MainBackgroundLayerProps = {
  noiseImageUrl: string;
};

export const MainBackgroundLayer = ({ noiseImageUrl }: MainBackgroundLayerProps): JSX.Element => {
  return (
    <div className="absolute left-0 top-[82px] h-[902px] w-full overflow-hidden rounded-xl">
      <div
        className="absolute inset-0 bg-[100%_100%]"
        style={{ backgroundImage: `url(${noiseImageUrl})` }}
      />
      <div className="absolute inset-0 bg-[#00000001] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] backdrop-blur-[2.5px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(2.5px)_brightness(100.0%)_saturate(100.0%)]" />
      <div className="pointer-events-none absolute left-0 top-[13px] h-[34px] w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_100%)]" />
    </div>
  );
};
