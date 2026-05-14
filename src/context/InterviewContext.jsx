import { createContext, useContext, useState, useEffect } from "react";

const defaultCandidate = {
  name: "",
  email: "",
  role: "Frontend Engineer",
  experience: "2-4 years",
  skills: ["React", "JavaScript", "CSS"],
  resumeName: null,
};

const Ctx = createContext(null);

export function InterviewProvider({ children }) {
  const [screen, setScreen] = useState("landing");
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("Platform-Hire-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [candidate, setCandidate] = useState(defaultCandidate);
  const [currentQuestionIdx, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [codingCode, setCodingCode] = useState("");
  const [codingLanguage, setCodingLanguage] = useState("JavaScript");
  const [startedAt, setStartedAt] = useState(null);
  const [endedAt, setEndedAt] = useState(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("Platform-Hire-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const updateCandidate = (c) =>
    setCandidate((prev) => ({ ...prev, ...c }));

  const recordAnswer = (qid, status, confidence) => {
    setAnswers((prev) => {
      const exists = prev.find((a) => a.qid === qid);
      if (exists) {
        return prev.map((a) => (a.qid === qid ? { ...a, status, confidence } : a));
      }
      return [...prev, { qid, status, confidence }];
    });
  };

  const startInterview = () => setStartedAt(Date.now());
  const endInterview = () => setEndedAt(Date.now());
  const resetAll = () => {
    setScreen("landing");
    setCandidate(defaultCandidate);
    setCurrentQuestion(0);
    setAnswers([]);
    setCodingCode("");
    setStartedAt(null);
    setEndedAt(null);
  };

  return (
    <Ctx.Provider
      value={{
        screen,
        theme,
        candidate,
        currentQuestionIdx,
        answers,
        codingCode,
        codingLanguage,
        startedAt,
        endedAt,
        setScreen,
        toggleTheme,
        updateCandidate,
        setCurrentQuestion,
        recordAnswer,
        setCodingCode,
        setCodingLanguage,
        startInterview,
        endInterview,
        resetAll,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useInterview() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useInterview must be used within InterviewProvider");
  return c;
}
