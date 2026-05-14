import { useEffect, useRef, useState } from "react";
import { useInterview } from "../context/InterviewContext";
import { QUESTIONS } from "../data/questions";
import AIAvatar from "../components/AIAvatar";
import CandidatePreview from "../components/CandidatePreview";
import Waveform from "../components/Waveform";
import { QuestionTimer, ElapsedTimer } from "../components/Timer";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";

export default function InterviewScreen() {
  const {
    currentQuestionIdx,
    setCurrentQuestion,
    recordAnswer,
    answers,
    setScreen,
    endInterview,
    startedAt,
  } = useInterview();

  const question = QUESTIONS[currentQuestionIdx];
  const [recording, setRecording] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [aiSpeaking, setAiSpeaking] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [showEndModal, setShowEndModal] = useState(false);
  const [tabFocused, setTabFocused] = useState(true);
  const [warnings, setWarnings] = useState(0);
  const total = QUESTIONS.length;

  // AI speaking intro animation
  useEffect(() => {
    setAiSpeaking(true);
    const t = setTimeout(() => setAiSpeaking(false), 3000);
    return () => clearTimeout(t);
  }, [currentQuestionIdx]);

  // Tab visibility — warn if user leaves
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) {
        setTabFocused(false);
        setWarnings((w) => w + 1);
      } else {
        setTabFocused(true);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Fake transcript generation while recording
  const transcriptRef = useRef(null);
  useEffect(() => {
    if (!recording) {
      if (transcriptRef.current) window.clearInterval(transcriptRef.current);
      return;
    }
    setTranscript("");
    const words = [
      "I", "think", "the", "best", "approach", "here", "would", "be", "to",
      "consider", "performance", "and", "readability.", "Using", "React",
      "memo", "helps", "avoid", "unnecessary", "re-renders", "while",
      "keeping", "the", "component", "tree", "clean.",
    ];
    let i = 0;
    transcriptRef.current = window.setInterval(() => {
      if (i >= words.length) {
        if (transcriptRef.current) window.clearInterval(transcriptRef.current);
        return;
      }
      setTranscript((t) => (t ? t + " " + words[i] : words[i]));
      i++;
    }, 320);
    return () => {
      if (transcriptRef.current) window.clearInterval(transcriptRef.current);
    };
  }, [recording]);

  const handleNext = (status) => {
    recordAnswer(question.id, status, Math.round(60 + Math.random() * 35));
    setRecording(false);
    setTranscript("");
    if (currentQuestionIdx + 1 >= total) {
      endInterview();
      setScreen("summary");
    } else {
      // if next is coding, go to coding screen
      const next = QUESTIONS[currentQuestionIdx + 1];
      setCurrentQuestion(currentQuestionIdx + 1);
      if (next.type === "coding") setScreen("coding");
    }
  };

  const progressPct = ((currentQuestionIdx) / total) * 100;

  const difficultyColor = {
    Easy: "bg-emerald-500/15 text-emerald-500",
    Medium: "bg-amber-500/15 text-amber-500",
    Hard: "bg-red-500/15 text-red-500",
  }[question.difficulty];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Top bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-3 sm:p-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
              Session
            </div>
            <ElapsedTimer startedAt={startedAt} />
          </div>
          <div className="hidden h-8 w-px bg-[var(--border)] sm:block" />
          <div className="hidden sm:block">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
              Progress
            </div>
            <div className="text-sm font-semibold">
              Question {currentQuestionIdx + 1} of {total}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${tabFocused ? "bg-emerald-500/15 text-emerald-500" : "bg-red-500/15 text-red-500"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${tabFocused ? "bg-emerald-500" : "bg-red-500"}`} />
            {tabFocused ? "Focused" : "Return to tab"}
          </div>
          {warnings > 0 && (
            <div className="hidden items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-500 sm:flex">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              {warnings} warning{warnings > 1 ? "s" : ""}
            </div>
          )}
          <Button variant="danger" onClick={() => setShowEndModal(true)}>
            End Interview
          </Button>
        </div>
      </div>

      <div className="mb-4"><ProgressBar value={progressPct} label="Interview progress" /></div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr_1fr]">
        {/* AI panel */}
        <div className="fade-in-up rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--panel)] to-[color-mix(in_srgb,var(--panel)_60%,var(--bg))] p-6 shadow-xl">
          <div className="grid place-items-center py-4">
            <AIAvatar speaking={aiSpeaking || recording} size="md" />
          </div>
          <div className="mt-2 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--panel)_70%,var(--bg))] p-4">
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-indigo-500">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
              </svg>
              Platform-Hire AI
            </div>
            <p className="text-sm leading-relaxed text-[var(--ink)]">{question.prompt}</p>
            {aiSpeaking && (
              <div className="mt-3 flex items-center gap-1">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--muted)]" style={{ animationDelay: "0.2s" }} />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--muted)]" style={{ animationDelay: "0.4s" }} />
              </div>
            )}
          </div>
        </div>

        {/* Question & controls */}
        <div className="fade-in-up space-y-4" style={{ animationDelay: "0.05s" }}>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${difficultyColor}`}>
                  {question.difficulty}
                </span>
                <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] font-semibold uppercase text-[var(--muted)]">
                  {question.type}
                </span>
              </div>
              <QuestionTimer
                limitSec={question.timeLimitSec}
                running={!recording || question.type !== "coding"}
                onExpire={() => handleNext("skipped")}
              />
            </div>
            <h3 className="mt-3 text-lg font-bold">{question.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{question.prompt}</p>
          </div>

          {/* Waveform */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold">
                {recording ? "Recording your answer…" : "Ready when you are"}
              </span>
              <span className={recording ? "text-red-500" : "text-[var(--muted)]"}>
                {recording ? "● LIVE" : "Idle"}
              </span>
            </div>
            <Waveform active={recording} />
          </div>

          {/* Transcript */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold">Live transcript</span>
              <span className="text-[var(--muted)]">Auto-saved</span>
            </div>
            <div className="min-h-[60px] rounded-xl bg-[color-mix(in_srgb,var(--panel)_60%,var(--bg))] p-3 text-sm text-[var(--ink)]">
              {transcript ? (
                <>
                  {transcript}
                  <span className="caret ml-0.5 inline-block h-4 w-px bg-[var(--ink)] align-middle" />
                </>
              ) : (
                <span className="text-[var(--muted)]">Start speaking to see your transcript…</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Button
              variant={recording ? "secondary" : "primary"}
              onClick={() => setRecording((r) => !r)}
              icon={recording ? <StopIcon /> : <MicIcon />}
            >
              {recording ? "Stop" : "Start Answer"}
            </Button>
            <Button
              variant="success"
              disabled={!recording && !transcript}
              onClick={() => handleNext("answered")}
              icon={<CheckIcon />}
            >
              Submit
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleNext("skipped")}
              icon={<SkipIcon />}
            >
              Skip
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowEndModal(true)}
              icon={<ExitIcon />}
            >
              End
            </Button>
          </div>
        </div>

        {/* Candidate preview + insights */}
        <div className="fade-in-up space-y-4" style={{ animationDelay: "0.1s" }}>
          <CandidatePreview
            muted={!micOn}
            videoOn={videoOn}
            onToggleMic={() => setMicOn((v) => !v)}
            onToggleVideo={() => setVideoOn((v) => !v)}
          />
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold">Confidence score</span>
              <span className="rounded-full bg-gradient-to-r from-indigo-500/15 to-violet-500/15 px-2 py-0.5 text-xs font-semibold text-indigo-500">
                AI estimate
              </span>
            </div>
            <div className="mb-2 flex items-end gap-2">
              <div className="text-3xl font-bold">
                {answers.length ? answers[answers.length - 1].confidence : 78}
              </div>
              <div className="mb-1 text-xs text-[var(--muted)]">/ 100</div>
            </div>
            <ProgressBar value={answers.length ? answers[answers.length - 1].confidence : 78} color="violet" />
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <MiniStat label="Clarity" value={82} />
              <MiniStat label="Depth" value={74} />
              <MiniStat label="Pace" value={88} />
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
            <div className="mb-2 text-sm font-semibold">Question tracker</div>
            <div className="grid grid-cols-6 gap-1.5">
              {QUESTIONS.map((q, i) => {
                const ans = answers.find((a) => a.qid === q.id);
                const current = i === currentQuestionIdx;
                let bg = "bg-[var(--border)]";
                if (ans?.status === "answered") bg = "bg-gradient-to-br from-emerald-500 to-teal-500";
                else if (ans?.status === "skipped") bg = "bg-slate-400";
                return (
                  <div
                    key={q.id}
                    className={`relative aspect-square rounded-md ${bg} ${current ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-[var(--panel)]" : ""}`}
                    title={`Q${i + 1}: ${q.title}`}
                  >
                    <div className="grid h-full w-full place-items-center text-[10px] font-bold text-white/90">
                      {i + 1}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-3 text-[11px] text-[var(--muted)]">
              <Legend color="bg-emerald-500" label="Answered" />
              <Legend color="bg-slate-400" label="Skipped" />
              <Legend color="bg-[var(--border)]" label="Pending" />
            </div>
          </div>
        </div>
      </div>

      {/* End modal */}
      {showEndModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-2xl fade-in-up">
            <h3 className="text-lg font-bold">End interview now?</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              You've answered {answers.filter((a) => a.status === "answered").length} of {total} questions.
              Ending now will submit your current progress for AI evaluation.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowEndModal(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  endInterview();
                  setScreen("summary");
                }}
              >
                Yes, end & submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-lg bg-[color-mix(in_srgb,var(--panel)_60%,var(--bg))] p-2">
      <div className="text-sm font-bold">{value}</div>
      <div className="text-[10px] text-[var(--muted)]">{label}</div>
    </div>
  );
}
function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-sm ${color}`} />
      {label}
    </span>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    </svg>
  );
}
function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function SkipIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 4 15 12 5 20 5 4" />
      <line x1="19" y1="5" x2="19" y2="19" />
    </svg>
  );
}
function ExitIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
