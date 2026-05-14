import { useEffect, useState } from "react";
import { useInterview } from "../context/InterviewContext";
import { QUESTIONS, CODING_PROBLEM } from "../data/questions";
import Button from "../components/Button";
import { QuestionTimer, ElapsedTimer } from "../components/Timer";
import ProgressBar from "../components/ProgressBar";
import { Select } from "../components/Input";

const LANGUAGES = ["JavaScript", "TypeScript", "Python"];

export default function CodingScreen() {
  const {
    currentQuestionIdx,
    setCurrentQuestion,
    recordAnswer,
    codingCode,
    setCodingCode,
    codingLanguage,
    setCodingLanguage,
    setScreen,
    endInterview,
    startedAt,
  } = useInterview();

  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState(null);
  const [autosaved, setAutosaved] = useState(true);

  const question = QUESTIONS[currentQuestionIdx];
  const total = QUESTIONS.length;

  // Initialize code if empty
  useEffect(() => {
    if (!codingCode) {
      const starter = CODING_PROBLEM.starterCode[codingLanguage]
        || CODING_PROBLEM.starterCode.JavaScript;
      setCodingCode(starter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codingLanguage]);

  // autosave indicator
  useEffect(() => {
    setAutosaved(false);
    const t = setTimeout(() => setAutosaved(true), 800);
    return () => clearTimeout(t);
  }, [codingCode]);

  const runCode = () => {
    setRunning(true);
    setOutput(null);
    setTimeout(() => {
      setRunning(false);
      // simulate pass on first case
      setOutput({
        ok: true,
        text: CODING_PROBLEM.testCases
          .map((tc, i) => `Test ${i + 1}: Input: ${tc.input}\n  Expected: ${tc.expected}\n  Output:   ${i === 0 ? tc.expected : "[1,0]"}\n  ${i === 0 ? "✓ Passed" : "✗ Failed"}`)
          .join("\n\n"),
      });
    }, 1400);
  };

  const submitCode = () => {
    recordAnswer(question.id, "answered", 85);
    if (currentQuestionIdx + 1 >= total) {
      endInterview();
      setScreen("summary");
    } else {
      setCurrentQuestion(currentQuestionIdx + 1);
      const next = QUESTIONS[currentQuestionIdx + 1];
      if (next.type === "coding") setScreen("coding");
      else setScreen("interview");
    }
  };

  const progressPct = (currentQuestionIdx / total) * 100;

  const lines = codingCode.split("\n");

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Top bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-3 sm:p-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">Session</div>
            <ElapsedTimer startedAt={startedAt} />
          </div>
          <div className="hidden h-8 w-px bg-[var(--border)] sm:block" />
          <div className="hidden sm:block">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">Coding challenge</div>
            <div className="text-sm font-semibold">
              Question {currentQuestionIdx + 1} of {total}
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {autosaved ? "Autosaved" : "Saving…"}
          </div>
        </div>
        <QuestionTimer
          limitSec={question.timeLimitSec}
          running={true}
          onExpire={submitCode}
        />
      </div>

      <div className="mb-4"><ProgressBar value={progressPct} label="Interview progress" /></div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        {/* Problem panel */}
        <div className="fade-in-up rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-500">
                {CODING_PROBLEM.difficulty}
              </span>
              <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] font-semibold uppercase text-[var(--muted)]">
                Coding
              </span>
            </div>
            <span className="text-xs text-[var(--muted)]">Arrays • Hash map</span>
          </div>
          <h3 className="mt-3 text-xl font-bold">{CODING_PROBLEM.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{CODING_PROBLEM.statement}</p>

          <div className="mt-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Examples</div>
            <div className="space-y-2">
              {CODING_PROBLEM.examples.map((ex, i) => (
                <div key={i} className="rounded-xl bg-[color-mix(in_srgb,var(--panel)_60%,var(--bg))] p-3 font-mono text-xs">
                  <div><span className="text-[var(--muted)]">Input: </span>{ex.input}</div>
                  <div><span className="text-[var(--muted)]">Output:</span> {ex.output}</div>
                  <div><span className="text-[var(--muted)]">Explanation:</span> <span className="text-[var(--ink)]">{ex.explanation}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Constraints</div>
            <ul className="space-y-1 text-xs text-[var(--muted)]">
              {CODING_PROBLEM.constraints.map((c, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-500">•</span>
                  <span className="font-mono">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Hints</div>
            <details className="group rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--panel)_60%,var(--bg))] p-3 text-xs">
              <summary className="cursor-pointer font-medium text-[var(--ink)] group-open:text-indigo-500">
                💡 Show hint #1
              </summary>
              <p className="mt-2 text-[var(--muted)]">
                Consider using a hash map to store complements as you iterate through the array.
              </p>
            </details>
          </div>
        </div>

        {/* Code editor */}
        <div className="fade-in-up overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)] shadow-xl" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--panel)_80%,var(--bg))] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <span className="ml-2 text-xs font-medium text-[var(--muted)]">
                solution.{codingLanguage === "Python" ? "py" : codingLanguage === "TypeScript" ? "ts" : "js"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Select
                options={LANGUAGES.map((l) => ({ value: l, label: l }))}
                value={codingLanguage}
                onChange={(e) => setCodingLanguage(e.target.value)}
                className="!py-1.5 !text-xs !w-auto"
              />
              <Button variant="ghost" onClick={() => {
                const starter = CODING_PROBLEM.starterCode[codingLanguage];
                setCodingCode(starter);
              }}>
                Reset
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-[auto_1fr] bg-[color-mix(in_srgb,var(--panel)_85%,var(--bg))] font-mono text-xs">
            <div className="border-r border-[var(--border)] px-3 py-3 text-right">
              {lines.map((_, i) => (
                <div key={i} className="ln leading-6">{i + 1}</div>
              ))}
            </div>
            <textarea
              value={codingCode}
              onChange={(e) => setCodingCode(e.target.value)}
              spellCheck={false}
              className="min-h-[340px] resize-none bg-transparent p-3 leading-6 text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
              style={{ tabSize: 2 }}
            />
          </div>

          {/* Output */}
          <div className="border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--panel)_85%,var(--bg))]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2 text-xs">
              <span className="font-semibold">Console output</span>
              {running && (
                <span className="flex items-center gap-1.5 text-[var(--muted)]">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 animate-spin" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Running…
                </span>
              )}
              {output && !running && (
                <span className={output.ok ? "text-emerald-500" : "text-red-500"}>
                  {output.ok ? "✓ 1/3 passed" : "✗ Failed"}
                </span>
              )}
            </div>
            <pre className="max-h-48 overflow-auto whitespace-pre-wrap p-4 font-mono text-xs text-[var(--ink)]">
              {output ? output.text : <span className="text-[var(--muted)]">Run your code to see output here.</span>}
            </pre>
          </div>

          {/* Action bar */}
          <div className="flex items-center justify-between gap-2 border-t border-[var(--border)] bg-[var(--panel)] p-3">
            <Button variant="ghost" onClick={() => setScreen("interview")}>
              ← Back
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={runCode} disabled={running} icon={<PlayIcon />}>
                Run Code
              </Button>
              <Button variant="primary" onClick={submitCode} icon={<CheckIcon />}>
                Submit Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
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
