import { InterviewProvider, useInterview } from "./context/InterviewContext";
import Header from "./components/Header";
import LandingScreen from "./screens/LandingScreen";
import CandidateDetailsScreen from "./screens/CandidateDetailsScreen";
import SetupScreen from "./screens/SetupScreen";
import InterviewScreen from "./screens/InterviewScreen";
import CodingScreen from "./screens/CodingScreen";
import SummaryScreen from "./screens/SummaryScreen";

function Shell() {
  const { screen } = useInterview();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Header />
      <main key={screen} className="fade-in-up">
        {screen === "landing" && <LandingScreen />}
        {screen === "details" && <CandidateDetailsScreen />}
        {screen === "setup" && <SetupScreen />}
        {screen === "interview" && <InterviewScreen />}
        {screen === "coding" && <CodingScreen />}
        {screen === "summary" && <SummaryScreen />}
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--panel)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-[var(--muted)] sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z" />
            </svg>
          </div>
          <span>© 2026 Platform-Hire AI. All rights reserved by Rhythm</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-[var(--ink)]">Privacy</a>
          <a href="#" className="hover:text-[var(--ink)]">Terms</a>
          <a href="#" className="hover:text-[var(--ink)]">Support</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <InterviewProvider>
      <Shell />
    </InterviewProvider>
  );
}
