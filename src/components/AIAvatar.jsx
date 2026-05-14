export default function AIAvatar({ speaking = true, size = "lg", label = "Platform-Hire AI" }) {
  const dim = size === "sm" ? "h-24 w-24" : size === "md" ? "h-40 w-40" : "h-56 w-56 sm:h-64 sm:w-64";
  const inner = size === "sm" ? "h-16 w-16" : size === "md" ? "h-28 w-28" : "h-40 w-40 sm:h-44 sm:w-44";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative ${dim}`}>
        {/* Pulsing rings */}
        {speaking && (
          <>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/40 to-violet-500/40 ring-pulse" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 ring-pulse" style={{ animationDelay: "0.7s" }} />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400/20 to-pink-400/20 ring-pulse" style={{ animationDelay: "1.4s" }} />
          </>
        )}
        {/* Main orb */}
        <div className={`relative grid ${inner} place-items-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-2xl glow mx-auto`}>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
          <div className="relative flex items-center gap-1">
            <WaveformBar delay={0} active={speaking} />
            <WaveformBar delay={0.15} active={speaking} />
            <WaveformBar delay={0.3} active={speaking} />
            <WaveformBar delay={0.15} active={speaking} />
            <WaveformBar delay={0} active={speaking} />
          </div>
        </div>
        {/* Status dot */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-[var(--panel)] px-2 py-1 shadow-md ring-1 ring-[var(--border)]">
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full ${speaking ? "bg-emerald-400 opacity-75 animate-ping" : "bg-slate-400"}`} />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${speaking ? "bg-emerald-500" : "bg-slate-400"}`} />
          </span>
          <span className="text-[10px] font-medium text-[var(--ink)]">{speaking ? "Live" : "Idle"}</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-[var(--muted)]">Your AI interviewer</div>
      </div>
    </div>
  );
}

function WaveformBar({ delay, active }) {
  return (
    <span
      className="wave-bar block h-8 w-1 rounded-full bg-white/90"
      style={{ animationDelay: `${delay}s`, animationPlayState: active ? "running" : "paused", transform: active ? undefined : "scaleY(0.3)" }}
    />
  );
}
