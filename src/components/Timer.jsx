import { useEffect, useState } from "react";

export function QuestionTimer({ limitSec, running, onExpire }) {
  const [remaining, setRemaining] = useState(limitSec);

  useEffect(() => setRemaining(limitSec), [limitSec]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          onExpire?.();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, onExpire]);

  const pct = (remaining / limitSec) * 100;
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const low = remaining < 30;

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-10">
        <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-[var(--border)]" />
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${pct * 0.942} 100`}
            className={low ? "text-red-500" : "text-indigo-500"}
            stroke="currentColor"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[var(--muted)]" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </div>
      </div>
      <div>
        <div className={`font-mono text-lg font-bold tabular-nums ${low ? "text-red-500" : ""}`}>
          {mm}:{ss}
        </div>
        <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Time left</div>
      </div>
    </div>
  );
}

export function ElapsedTimer({ startedAt }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!startedAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  if (!startedAt) return <span className="text-[var(--muted)]">--:--</span>;
  const diff = Math.floor((now - startedAt) / 1000);
  const hh = String(Math.floor(diff / 3600)).padStart(2, "0");
  const mm = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
  const ss = String(diff % 60).padStart(2, "0");
  return <span className="font-mono text-sm tabular-nums">{hh}:{mm}:{ss}</span>;
}
