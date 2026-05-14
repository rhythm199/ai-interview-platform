import { useInterview } from "../context/InterviewContext";

export default function CandidatePreview({ muted = false, videoOn = true, onToggleMic, onToggleVideo }) {
  const { candidate } = useInterview();
  const initials = candidate.name
    ? candidate.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()
    : "YO";

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-slate-900 shadow-xl">
      {videoOn ? (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-indigo-900/50 to-slate-900">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-bold text-white shadow-xl">
              {initials}
            </div>
          </div>
          {/* Scan line */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent animate-[float_3s_ease-in-out_infinite]" style={{ top: "40%" }} />
        </div>
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-slate-900">
          <div className="text-center">
            <div className="mx-auto mb-2 grid h-16 w-16 place-items-center rounded-full bg-slate-800 text-slate-400">
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            </div>
            <div className="text-xs text-slate-400">Camera is off</div>
          </div>
        </div>
      )}

      {/* Live badge */}
      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1 backdrop-blur">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white">Recording</span>
      </div>

      {/* Name plate */}
      <div className="absolute bottom-3 left-3 rounded-lg bg-black/50 px-2.5 py-1 backdrop-blur">
        <div className="text-xs font-medium text-white">{candidate.name || "You"}</div>
        <div className="text-[10px] text-slate-300">Candidate</div>
      </div>

      {/* Controls */}
      <div className="absolute right-3 bottom-3 flex gap-2">
        <button
          onClick={onToggleMic}
          className={`grid h-9 w-9 place-items-center rounded-full backdrop-blur transition ${
            muted ? "bg-red-500/90 text-white" : "bg-black/50 text-white hover:bg-black/70"
          }`}
          aria-label="Toggle mic"
        >
          {muted ? <MicOffIcon /> : <MicIcon />}
        </button>
        <button
          onClick={onToggleVideo}
          className={`grid h-9 w-9 place-items-center rounded-full backdrop-blur transition ${
            !videoOn ? "bg-red-500/90 text-white" : "bg-black/50 text-white hover:bg-black/70"
          }`}
          aria-label="Toggle video"
        >
          {videoOn ? <VideoIcon /> : <VideoOffIcon />}
        </button>
      </div>
    </div>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
    </svg>
  );
}
function MicOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23M12 19v4M8 23h8" />
    </svg>
  );
}
function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}
function VideoOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
