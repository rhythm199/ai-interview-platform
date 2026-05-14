export default function Waveform({ bars = 32, active = true }) {
  return (
    <div className="flex h-10 w-full items-center justify-center gap-[3px]">
      {Array.from({ length: bars }).map((_, i) => {
        const delay = (i * 0.08) % 1.2;
        const height = 20 + ((i * 13) % 40);
        return (
          <span
            key={i}
            className="wave-bar block w-[3px] rounded-full bg-gradient-to-t from-indigo-500 to-violet-400"
            style={{
              height: `${height}px`,
              animationDelay: `${delay}s`,
              animationPlayState: active ? "running" : "paused",
              transform: active ? undefined : "scaleY(0.25)",
            }}
          />
        );
      })}
    </div>
  );
}
