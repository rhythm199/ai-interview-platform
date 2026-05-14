# Architecture Decisions

## 1. Why React + Vite + Tailwind (and not Next.js / Angular / Vue)

| Criterion | Decision | Reasoning |
|---|---|---|
| **Framework** | React 19 | The task is a frontend-only SPA with no routing, SSR, or API layer. React provides the component model and ecosystem without the overhead of a meta-framework. |
| **Build tool** | Vite 7 | Sub-second HMR, native ESM, zero-config JSX support. Faster than CRA/Webpack for a single-page prototype. |
| **Styling** | Tailwind CSS 4 | Utility-first avoids context-switching between files. Co-locating styles with markup makes component behavior immediately readable during review. |
| **No Next.js** | Intentional | Next.js adds routing, SSR, API routes — none of which this task requires. Adding it would signal over-engineering, not depth. |
| **No TypeScript** | Per requirement | The candidate requested pure JavaScript. In production I would use TypeScript for type safety across the interview context and question data models. |

### Trade-offs acknowledged

- **No routing library** — Screen transitions are managed by a single `screen` state in context. This is correct for 6 screens with linear flow. If the app grew to 20+ screens with deep-linking, I would introduce `react-router` with lazy-loaded route components.
- **No state library** — React Context is sufficient here. Redux/Zustand would be warranted if multiple unrelated feature domains needed shared state (e.g., admin dashboard + candidate view + analytics).
- **No animation library** — All animations use CSS `@keyframes`. This keeps bundle size small (~84KB gzipped). Framer Motion was removed to avoid an unnecessary 40KB dependency for transitions that CSS handles well.

---

## 2. Folder Structure

```
src/
├── App.jsx                    ← Root shell: provider + screen router + footer
├── main.jsx                   ← React DOM entry point
├── index.css                  ← CSS variables, keyframes, utility classes
│
├── context/
│   └── InterviewContext.jsx   ← Single source of truth for all interview state
│
├── data/
│   └── questions.js           ← Static question bank + coding problem definition
│
├── components/                ← Reusable, screen-agnostic UI primitives
│   ├── AIAvatar.jsx           ← Animated AI orb with waveform bars
│   ├── Button.jsx             ← 5 variants: primary, secondary, ghost, danger, success
│   ├── CandidatePreview.jsx   ← Camera feed / placeholder with mic/video controls
│   ├── Header.jsx             ← Sticky nav with step indicators + theme toggle
│   ├── Input.jsx              ← Text input + Select with label/error/icon slots
│   ├── ProgressBar.jsx        ← Gradient progress bar with 4 color options
│   ├── Timer.jsx              ← QuestionTimer (countdown) + ElapsedTimer (count-up)
│   └── Waveform.jsx           ← Animated bar visualizer for voice activity
│
├── screens/                   ← Full-page views, one per interview step
│   ├── LandingScreen.jsx
│   ├── CandidateDetailsScreen.jsx
│   ├── SetupScreen.jsx
│   ├── InterviewScreen.jsx
│   ├── CodingScreen.jsx
│   └── SummaryScreen.jsx
│
docs/                          ← Engineering documentation
tests/                         ← Integration test suite
```

### Why this structure?

1. **`components/` vs `screens/`** — Components are reusable across screens (Button appears everywhere). Screens are page-level compositions that are never reused. This makes the import graph predictable: screens import components, never the reverse.

2. **`context/` as a single file** — With one domain (interview session), a single context file is cleaner than splitting into actions/reducers/selectors. The file exports both `InterviewProvider` and `useInterview()` hook so consumers never touch the raw context.

3. **`data/` for static content** — Questions, coding problems, role options, and skill suggestions are static data. Extracting them from components means a future backend integration only needs to replace these imports with API calls.

---

## 3. State Management Design

### Single context, flat state

```
InterviewContext
├── screen          ← "landing" | "details" | "setup" | "interview" | "coding" | "summary"
├── theme           ← "light" | "dark"
├── candidate       ← { name, email, role, experience, skills[], resumeName }
├── currentQuestionIdx
├── answers[]       ← [{ qid, status: "answered"|"skipped"|"pending", confidence }]
├── codingCode      ← string (editor content)
├── codingLanguage  ← "JavaScript" | "TypeScript" | "Python"
├── startedAt       ← timestamp | null
└── endedAt         ← timestamp | null
```

### Why not useReducer?

`useState` with individual setters is simpler to read for 10 state fields. `useReducer` would be better if:
- Multiple actions modify the same fields simultaneously
- State transitions have complex validation rules
- We needed action logging/middleware

Neither applies here. Each setter maps 1:1 to a UI interaction.

### Why not localStorage persistence?

Interview sessions are intentionally ephemeral. Persisting partial state introduces edge cases (stale questions, expired timers, half-answered sessions). Only `theme` is persisted because it's a user preference, not session data.

---

## 4. Data Flow

```
User clicks "Start Interview"
  → LandingScreen calls setScreen("details")
    → App.jsx re-renders, mounts CandidateDetailsScreen
      → CandidateDetailsScreen reads candidate from context
      → User fills form → updateCandidate({ name: "..." })
        → Context updates → re-render with new values
      → User clicks "Continue" → validation → setScreen("setup")

User clicks "Submit Answer" on InterviewScreen
  → recordAnswer(qid, "answered", confidence)
    → answers[] updated in context
  → if (lastQuestion) → endInterview() + setScreen("summary")
  → else → setCurrentQuestion(idx + 1)
    → if (nextQuestion.type === "coding") → setScreen("coding")
    → else → stay on InterviewScreen (re-renders with new question)
```

### Key principle: screens don't talk to each other

Screens read from and write to context. They never import or reference other screens. This means:
- Any screen can be rendered independently for testing
- Screen ordering can be changed by modifying App.jsx alone
- Adding a new screen requires zero changes to existing screens

---

## 5. Performance Considerations

| Area | Approach |
|---|---|
| **Re-renders** | Context consumers only re-render when their specific values change. The context is flat (not nested objects), so shallow comparison works. |
| **Timers** | `setInterval` for elapsed timer, `setInterval` for question countdown. Both clean up on unmount. No memory leaks. |
| **Waveform** | 32 CSS-animated bars using `transform: scaleY()` (GPU-composited). No JS animation loop. |
| **Code editor** | Native `<textarea>` with monospace font. No syntax highlighting library (would add ~150KB). Line numbers are a separate column synced by line count. |
| **Bundle splitting** | Not needed — the entire app is 84KB gzipped. Code-splitting would add loading states for marginal savings. |

---

## 6. What I Would Change for Production

| Current (demo) | Production approach |
|---|---|
| Context for state | Zustand or Redux Toolkit with middleware for logging, persistence, and undo |
| CSS animations | Framer Motion for interruptible, physics-based transitions between screens |
| Fake transcript | WebSocket connection to speech-to-text service (Deepgram, AssemblyAI) |
| Simulated code execution | Sandboxed iframe with Pyodide/QuickJS or API call to Judge0 |
| Static questions | API-driven question bank with difficulty adaptation based on previous answers |
| No auth | OAuth2/OIDC for candidate identity + JWT for session |
| Single-file build | CDN-hosted chunks with service worker for offline resilience |
| No error boundary | React Error Boundary wrapping each screen with fallback UI and Sentry reporting |
| No i18n | `react-intl` with extracted message catalogs for multi-language support |
