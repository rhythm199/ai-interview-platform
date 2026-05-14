import { useInterview } from "../context/InterviewContext";
import { QUESTIONS } from "../data/questions";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import AIAvatar from "../components/AIAvatar";

export default function SummaryScreen() {
  const { candidate, answers, startedAt, endedAt, resetAll, setScreen } = useInterview();

  const attempted = answers.filter((a) => a.status === "answered").length;
  const skipped = answers.filter((a) => a.status === "skipped").length;
  const durationMs = (endedAt || Date.now()) - (startedAt || Date.now());
  const durationMin = Math.max(1, Math.round(durationMs / 60000));

  const avgConfidence = answers.length
    ? Math.round(answers.reduce((s, a) => s + a.confidence, 0) / answers.length)
    : 0;

  const overallScore = Math.min(100, Math.round(avgConfidence * 0.6 + attempted * 8 + 10));

  const strengths = [
    "Clear and structured communication",
    "Strong understanding of React fundamentals",
    "Good problem decomposition in coding",
  ];
  const improvements = [
    "Could elaborate more on trade-offs in design answers",
    "Consider edge cases explicitly during coding",
    "Work on pacing — some answers were rushed",
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      {/* Hero */}
      <div className="fade-in-up relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-fuchsia-500/10 p-8 shadow-2xl sm:p-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-500/30 to-violet-500/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 blur-3xl" />

        <div className="relative grid items-center gap-6 sm:grid-cols-[auto_1fr]">
          <AIAvatar speaking={false} size="sm" label="Session complete" />
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-500">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Submitted for review
            </div>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Great job, {candidate.name || "there"}!
            </h1>
            <p className="mt-2 max-w-2xl text-[var(--muted)]">
              Your interview has been completed and submitted to our AI for detailed evaluation.
              Below is a snapshot of your performance.
            </p>
          </div>
        </div>
      </div>

      {/* Score row */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ScoreCard label="Overall score" value={`${overallScore}`} suffix="/100" color="from-indigo-500 to-violet-500" />
        <ScoreCard label="Questions attempted" value={`${attempted}`} suffix={`/ ${QUESTIONS.length}`} color="from-emerald-500 to-teal-500" />
        <ScoreCard label="Time taken" value={`${durationMin}`} suffix="min" color="from-amber-500 to-orange-500" />
        <ScoreCard label="Skipped" value={`${skipped}`} color="from-rose-500 to-pink-500" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        {/* AI Evaluation */}
        <div className="fade-in-up rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-500">AI Evaluation</div>
              <h3 className="mt-1 text-xl font-bold">Performance breakdown</h3>
            </div>
            <span className="rounded-full bg-[var(--border)] px-2.5 py-1 text-[10px] font-semibold uppercase text-[var(--muted)]">
              Preliminary
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <BreakdownBar label="Technical knowledge" value={82} />
            <BreakdownBar label="Communication clarity" value={78} />
            <BreakdownBar label="Problem solving" value={75} />
            <BreakdownBar label="Coding proficiency" value={85} />
            <BreakdownBar label="Cultural fit signals" value={80} />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-500">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Strengths
              </div>
              <ul className="space-y-1.5 text-xs text-[var(--ink)]">
                {strengths.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-500">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
                </svg>
                Areas to improve
              </div>
              <ul className="space-y-1.5 text-xs text-[var(--ink)]">
                {improvements.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-amber-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Candidate info & next steps */}
        <div className="fade-in-up space-y-4" style={{ animationDelay: "0.05s" }}>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Candidate</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-bold text-white">
                {candidate.name ? candidate.name.charAt(0).toUpperCase() : "?"}
              </div>
              <div>
                <div className="font-semibold">{candidate.name || "Anonymous"}</div>
                <div className="text-xs text-[var(--muted)]">{candidate.email || "—"}</div>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--border)] pt-4 text-xs">
              <InfoRow label="Role" value={candidate.role} />
              <InfoRow label="Experience" value={candidate.experience} />
              <InfoRow label="Skills" value={candidate.skills.join(", ") || "—"} />
              <InfoRow label="Resume" value={candidate.resumeName || "Not uploaded"} />
            </dl>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Question tracker</div>
            <div className="mt-3 grid grid-cols-6 gap-2">
              {QUESTIONS.map((q, i) => {
                const ans = answers.find((a) => a.qid === q.id);
                const ok = ans?.status === "answered";
                const skip = ans?.status === "skipped";
                return (
                  <div
                    key={q.id}
                    className={`relative aspect-square rounded-lg border ${
                      ok ? "border-emerald-500/40 bg-emerald-500/10" :
                      skip ? "border-slate-400/40 bg-slate-400/10" :
                      "border-[var(--border)] bg-[color-mix(in_srgb,var(--panel)_60%,var(--bg))]"
                    }`}
                    title={`Q${i + 1}: ${q.title}`}
                  >
                    <div className="grid h-full w-full place-items-center text-xs font-bold text-[var(--ink)]">
                      {i + 1}
                    </div>
                    {ok && (
                      <div className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={3}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              What's next?
            </div>
            <ul className="space-y-1.5 text-xs text-[var(--muted)]">
              <li>• A recruiter will review your report within 48 hours.</li>
              <li>• You'll receive feedback via email.</li>
              <li>• You can retake a practice interview anytime.</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <Button variant="secondary" onClick={() => window.print()} icon={<PrintIcon />}>
                Download
              </Button>
              <Button variant="primary" onClick={() => { resetAll(); setScreen("landing"); }}>
                Start new interview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({
  label, value, suffix, color,
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-lg">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color}`} />
      <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{label}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <div className="text-3xl font-bold">{value}</div>
        {suffix && <div className="text-sm text-[var(--muted)]">{suffix}</div>}
      </div>
    </div>
  );
}

function BreakdownBar({ label, value }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-[var(--ink)]">{label}</span>
        <span className="font-semibold">{value}/100</span>
      </div>
      <ProgressBar value={value} color="indigo" />
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <dt className="text-[var(--muted)]">{label}</dt>
      <dd className="mt-0.5 truncate font-medium">{value}</dd>
    </div>
  );
}

function PrintIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}
