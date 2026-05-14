import { useEffect, useState } from "react";
import { useInterview } from "../context/InterviewContext";
import Button from "../components/Button";
import CandidatePreview from "../components/CandidatePreview";

export default function SetupScreen() {
  const { setScreen, startInterview } = useInterview();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [internetOk, setInternetOk] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    // Simulate connectivity check
    const t = setTimeout(() => setInternetOk(navigator.onLine), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!micOn) {
      setAudioLevel(0);
      return;
    }
    const id = setInterval(() => {
      setAudioLevel(Math.random() * 100);
    }, 140);
    return () => clearInterval(id);
  }, [micOn]);

  const allReady = micOn && videoOn && internetOk === true;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="fade-in-up text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1 text-xs text-[var(--muted)]">
          Step 2 of 3
        </div>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Check your setup</h1>
        <p className="mt-2 text-[var(--muted)]">Let's make sure everything is ready.</p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        {/* Camera preview */}
        <div className="fade-in-up rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-indigo-500/15 text-indigo-500">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </span>
              Camera & microphone
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${allReady ? "bg-emerald-500/15 text-emerald-500" : "bg-amber-500/15 text-amber-500"}`}>
              {allReady ? "Ready" : "Check needed"}
            </span>
          </div>
          <CandidatePreview
            muted={!micOn}
            videoOn={videoOn}
            onToggleMic={() => setMicOn((v) => !v)}
            onToggleVideo={() => setVideoOn((v) => !v)}
          />
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-[var(--muted)]">Microphone level</span>
              <span className={micOn ? "text-emerald-500" : "text-[var(--muted)]"}>
                {micOn ? "Active" : "Muted"}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--border)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
                style={{ width: `${micOn ? Math.max(6, audioLevel) : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="fade-in-up space-y-5" style={{ animationDelay: "0.1s" }}>
          <CheckItem
            title="Internet connection"
            desc={internetOk === null ? "Checking…" : internetOk ? "Connection is stable" : "Connection is weak"}
            status={internetOk === null ? "loading" : internetOk ? "ok" : "error"}
            action={
              internetOk === false
                ? <Button variant="secondary" onClick={() => setInternetOk(true)}>Retry</Button>
                : null
            }
          />
          <CheckItem
            title="Camera"
            desc={videoOn ? "Camera is on and working" : "Camera is disabled"}
            status={videoOn ? "ok" : "warn"}
            action={<Button variant="ghost" onClick={() => setVideoOn((v) => !v)}>{videoOn ? "Turn off" : "Turn on"}</Button>}
          />
          <CheckItem
            title="Microphone"
            desc={micOn ? "Audio input detected" : "Microphone is muted"}
            status={micOn ? "ok" : "warn"}
            action={<Button variant="ghost" onClick={() => setMicOn((v) => !v)}>{micOn ? "Mute" : "Unmute"}</Button>}
          />

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              Interview guidelines
            </div>
            <ul className="space-y-2 text-xs text-[var(--muted)]">
              <Guideline>Find a quiet, well-lit space.</Guideline>
              <Guideline>Keep your camera on throughout.</Guideline>
              <Guideline>Speak clearly — AI listens for context.</Guideline>
              <Guideline>You can skip or revisit questions.</Guideline>
              <Guideline>Stay on the tab — we track focus.</Guideline>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" onClick={() => setScreen("details")}>Back</Button>
            <Button
              variant="primary"
              disabled={!allReady}
              onClick={() => {
                startInterview();
                setScreen("interview");
              }}
              icon={<PlayIcon />}
            >
              Start interview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckItem({
  title, desc, status, action,
}) {
  const color = {
    ok: "text-emerald-500 bg-emerald-500/15",
    warn: "text-amber-500 bg-amber-500/15",
    error: "text-red-500 bg-red-500/15",
    loading: "text-[var(--muted)] bg-[var(--border)]",
  }[status];

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4">
      <div className="flex items-center gap-3">
        <div className={`grid h-9 w-9 place-items-center rounded-xl ${color}`}>
          {status === "ok" && (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {status === "warn" && (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          )}
          {status === "error" && (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          )}
          {status === "loading" && (
            <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs text-[var(--muted)]">{desc}</div>
        </div>
      </div>
      <div>{action}</div>
    </div>
  );
}

function Guideline({ children }) {
  return (
    <li className="flex items-start gap-2">
      <svg viewBox="0 0 24 24" className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
