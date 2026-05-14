import { useInterview } from "../context/InterviewContext";
import Button from "../components/Button";
import AIAvatar from "../components/AIAvatar";

export default function LandingScreen() {
  const { setScreen } = useInterview();

  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl animate-blob" />
        <div className="absolute right-1/4 top-40 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl animate-blob" style={{ animationDelay: "8s" }} />
        <div className="absolute inset-0 bg-grid opacity-60" />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div className="fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 text-xs font-medium text-[var(--muted)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              AI-powered • 24/7 available • Instant feedback
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Interview smarter with{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                Platform-Hire AI
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-[var(--muted)] sm:text-lg">
              Experience a professional, unbiased interview conducted by our AI interviewer.
              Get real-time feedback, coding evaluations, and a comprehensive performance
              report — all in one seamless session.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="primary" onClick={() => setScreen("details")} icon={<ArrowRightIcon />}>
                Start Interview
              </Button>
              <Button variant="secondary" onClick={() => setScreen("details")}>
                Learn how it works
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--border)] pt-6">
              <Stat value="~25 min" label="Avg. duration" />
              <Stat value="6" label="Questions" />
              <Stat value="98%" label="Candidate satisfaction" />
            </div>
          </div>

          {/* Right: AI showcase card */}
          <div className="relative fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-fuchsia-500/20 blur-2xl" />
            <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="ml-2">Live session preview</span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                  Demo
                </span>
              </div>

              <div className="mt-6 grid place-items-center">
                <AIAvatar speaking size="md" />
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--panel)_60%,var(--bg))] p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-indigo-500">
                  <SparkIcon /> Platform-Hire AI
                </div>
                <p className="text-sm text-[var(--ink)]">
                  “Welcome! I'll guide you through behavioral, technical, and coding
                  questions. Take your time — I'm listening.”
                </p>
                <div className="mt-3 flex items-center gap-1">
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--muted)]" />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--muted)]" style={{ animationDelay: "0.2s" }} />
                  <span className="typing-dot h-1.5 w-1.5 rounded-full bg-[var(--muted)]" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<BrainIcon />}
            title="Adaptive Questions"
            desc="Questions adjust in real-time based on your answers and experience level."
          />
          <FeatureCard
            icon={<CodeIcon />}
            title="Live Coding"
            desc="Built-in editor with syntax highlighting for hands-on technical evaluation."
          />
          <FeatureCard
            icon={<ChartIcon />}
            title="Instant Insights"
            desc="Receive a detailed performance report with strengths and improvement areas."
          />
          <FeatureCard
            icon={<ShieldIcon />}
            title="Fair & Unbiased"
            desc="Standardized evaluation ensures every candidate gets a consistent experience."
          />
        </div>

        {/* Instructions */}
        <div className="mt-20 rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                Before you begin
              </div>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">How it works</h2>
              <p className="mt-3 text-[var(--muted)]">
                A structured, 4-step process designed to showcase your skills.
              </p>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              <Step n={1} title="Share your profile" desc="Tell us your name, role, and skills." />
              <Step n={2} title="Check setup" desc="Verify camera, mic, and connection." />
              <Step n={3} title="Meet Platform-Hire" desc="Answer questions in a live session." />
              <Step n={4} title="Get feedback" desc="Review your personalized report." />
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="text-xl font-bold sm:text-2xl">{value}</div>
      <div className="text-xs text-[var(--muted)]">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-500">
        {icon}
      </div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-[var(--muted)]">{desc}</div>
    </div>
  );
}

function Step({ n, title, desc }) {
  return (
    <li className="flex gap-3 rounded-2xl border border-[var(--border)] p-4">
      <div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white">
        {n}
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-[var(--muted)]">{desc}</div>
      </div>
    </li>
  );
}

/* Icons */
function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}
function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2z" />
      <path d="M9.5 6h5M9.5 12h5M9.5 18h5" />
    </svg>
  );
}
function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
