import { useInterview } from "../context/InterviewContext";

export default function Header() {
  const { theme, toggleTheme, screen, candidate } = useInterview();
  const showCandidateChip = candidate.name && screen !== "landing" && screen !== "details";

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--panel)_75%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="hidden sm:block">
            <div className="text-sm font-semibold tracking-tight">Platform-Hire</div>
            <div className="text-xs text-[var(--muted)]">AI Interview Platform</div>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {["landing", "details", "setup", "interview", "coding", "summary"].map(
            (s, i) => {
              const active = screen === s;
              const label = ["Welcome", "Profile", "Setup", "Interview", "Coding", "Summary"][i];
              return (
                <div key={s} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      active
                        ? "bg-gradient-to-r from-indigo-500/15 to-violet-500/15 text-indigo-600 dark:text-indigo-300"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold ${
                        active
                          ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white"
                          : "bg-[var(--border)] text-[var(--muted)]"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {label}
                  </div>
                </div>
              );
            }
          )}
        </nav>

        <div className="flex items-center gap-2">
          {showCandidateChip && (
            <div className="hidden items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1.5 sm:flex">
              <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-[11px] font-bold text-white">
                {candidate.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-medium">{candidate.name}</span>
            </div>
          )}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--muted)] transition hover:text-[var(--ink)]"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 opacity-40 blur-md" />
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
        </svg>
      </div>
    </div>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
