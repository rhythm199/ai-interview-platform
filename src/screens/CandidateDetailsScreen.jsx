import { useState } from "react";
import { useInterview } from "../context/InterviewContext";
import Button from "../components/Button";
import Input, { Select } from "../components/Input";

const ROLES = [
  { value: "Frontend Engineer", label: "Frontend Engineer" },
  { value: "Backend Engineer", label: "Backend Engineer" },
  { value: "Fullstack Engineer", label: "Fullstack Engineer" },
  { value: "Data Scientist", label: "Data Scientist" },
  { value: "Product Manager", label: "Product Manager" },
  { value: "UX Designer", label: "UX Designer" },
];

const EXPERIENCE = [
  { value: "0-1 years", label: "0-1 years (Junior)" },
  { value: "2-4 years", label: "2-4 years (Mid)" },
  { value: "5-7 years", label: "5-7 years (Senior)" },
  { value: "8+ years", label: "8+ years (Staff+)" },
];

const SUGGESTED_SKILLS = ["React", "JavaScript", "Node.js", "Python", "AWS", "System Design", "GraphQL", "Docker"];

export default function CandidateDetailsScreen() {
  const { candidate, updateCandidate, setScreen } = useInterview();
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});

  const addSkill = (skill) => {
    const s = skill.trim();
    if (s && !candidate.skills.includes(s)) {
      updateCandidate({ skills: [...candidate.skills, s] });
    }
    setSkillInput("");
  };

  const removeSkill = (s) => {
    updateCandidate({ skills: candidate.skills.filter((x) => x !== s) });
  };

  const validate = () => {
    const e = {};
    if (!candidate.name.trim()) e.name = "Please enter your name";
    if (!candidate.email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email)) e.email = "Enter a valid email";
    if (candidate.skills.length === 0) e.skills = "Add at least one skill";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onNext = () => {
    if (validate()) setScreen("setup");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="fade-in-up text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1 text-xs text-[var(--muted)]">
          Step 1 of 3
        </div>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Tell us about yourself</h1>
        <p className="mt-2 text-[var(--muted)]">
          We'll tailor your interview based on your profile.
        </p>
      </div>

      <div className="fade-in-up mt-8 rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-6 shadow-xl sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Full name"
            placeholder="Jane Doe"
            value={candidate.name}
            onChange={(e) => updateCandidate({ name: e.target.value })}
            error={errors.name}
            icon={<UserIcon />}
          />
          <Input
            label="Email"
            type="email"
            placeholder="jane@example.com"
            value={candidate.email}
            onChange={(e) => updateCandidate({ email: e.target.value })}
            error={errors.email}
            icon={<MailIcon />}
          />
          <Select
            label="Role applied for"
            options={ROLES}
            value={candidate.role}
            onChange={(e) => updateCandidate({ role: e.target.value })}
          />
          <Select
            label="Experience level"
            options={EXPERIENCE}
            value={candidate.experience}
            onChange={(e) => updateCandidate({ experience: e.target.value })}
          />
        </div>

        {/* Skills */}
        <div className="mt-5">
          <label className="mb-1.5 block text-xs font-medium">Skills / Technologies</label>
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3 py-2">
            {candidate.skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-300"
              >
                {s}
                <button onClick={() => removeSkill(s)} className="hover:text-red-500" aria-label={`Remove ${s}`}>
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </span>
            ))}
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addSkill(skillInput);
                } else if (e.key === "Backspace" && !skillInput && candidate.skills.length) {
                  removeSkill(candidate.skills[candidate.skills.length - 1]);
                }
              }}
              placeholder={candidate.skills.length ? "Add more…" : "e.g. React, JavaScript"}
              className="flex-1 min-w-[140px] bg-transparent py-1 text-sm outline-none placeholder:text-[var(--muted)]"
            />
          </div>
          {errors.skills && <p className="mt-1 text-xs text-red-500">{errors.skills}</p>}
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="text-[11px] text-[var(--muted)]">Suggestions:</span>
            {SUGGESTED_SKILLS.filter((s) => !candidate.skills.includes(s))
              .slice(0, 6)
              .map((s) => (
                <button
                  key={s}
                  onClick={() => addSkill(s)}
                  className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--muted)] transition hover:border-indigo-500 hover:text-indigo-500"
                >
                  + {s}
                </button>
              ))}
          </div>
        </div>

        {/* Resume upload */}
        <div className="mt-5">
          <label className="mb-1.5 block text-xs font-medium">Resume (optional)</label>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[var(--border)] bg-[color-mix(in_srgb,var(--panel)_60%,var(--bg))] p-6 transition hover:border-indigo-500/50 hover:bg-indigo-500/5">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) updateCandidate({ resumeName: f.name });
              }}
            />
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-violet-500/15 text-indigo-500">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <div className="text-sm font-medium">
              {candidate.resumeName ? candidate.resumeName : "Click to upload your resume"}
            </div>
            <div className="text-xs text-[var(--muted)]">PDF, DOC up to 5MB</div>
          </label>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setScreen("landing")}>
            Back
          </Button>
          <Button variant="primary" onClick={onNext} icon={<ArrowRightIcon />}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
