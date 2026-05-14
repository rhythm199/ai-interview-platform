# Platform-Hire AI — AI-Based Interview Platform

> A responsive, modern frontend UI for an AI-powered interview platform where interviews are conducted entirely by AI.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Jest](https://img.shields.io/badge/Tests-Jest_+_RTL-C21325?logo=jest)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Features Implemented](#-features-implemented)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Running Tests](#-running-tests)
- [Screens Overview](#-screens-overview)
- [Additional Features](#-additional-features)
- [Architecture & Docs](#-architecture--docs)
- [Assumptions](#-assumptions)
- [What I Would Change for Production](#-what-i-would-change-for-production)

---

## 🚀 Live Demo

Deploy the `dist/` folder to any static host, or run locally:

```bash
npm install
npm run dev
```

---

## 🖼️ Screenshots

| Landing | Interview Room | Coding Editor | Summary |
|---|---|---|---|
| Hero + AI avatar demo | 3-column layout with AI, question, candidate | Code editor + console | Score cards + evaluation |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 (JavaScript, no TypeScript) |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4 (utility-first, CSS variables for theming) |
| **State Management** | React Context API |
| **Testing** | Jest + React Testing Library + jest-dom |
| **Animations** | CSS @keyframes (no runtime animation library) |
| **Language** | 100% JavaScript (.jsx / .js) — zero TypeScript files |

---

## ✅ Features Implemented

### 6 Required Screens

| # | Screen | Description |
|---|---|---|
| 1 | **Landing / Welcome** | Hero section, AI avatar demo, stats, feature cards, "How it works" guide |
| 2 | **Candidate Details** | Name, email, role, experience, skills (chip input), resume upload |
| 3 | **Interview Setup** | Camera preview, mic level bar, internet check, device checklist, guidelines |
| 4 | **AI Interview Room** | AI avatar, question display, timer, recording controls, waveform, transcript, confidence score, question tracker |
| 5 | **Coding Section** | Problem statement, code editor with line numbers, language selector, run/submit, console output |
| 6 | **Interview Summary** | Score cards, AI evaluation breakdown, strengths/improvements, candidate info, next steps |

### Additional Creative Features

| Feature | Implementation |
|---|---|
| 🌙 Dark / Light mode | CSS variables + `localStorage` persistence + `prefers-color-scheme` detection |
| 🎯 Question difficulty indicator | Color-coded badges (Easy=green, Medium=amber, Hard=red) |
| 💬 AI typing animation | 3-dot bounce animation on AI message bubbles |
| 📊 Confidence score UI | Real-time score panel with Clarity, Depth, Pace sub-metrics |
| 🎵 Voice waveform animation | 32-bar CSS animated waveform visualizer |
| 📄 Resume analysis section | Upload area with placeholder for AI resume parsing |
| 💾 Auto-save status | "Saving…" → "Autosaved" indicator on code editor |
| ⚠️ Tab leave warning | Detects `visibilitychange`, shows red "Return to tab" badge + warning counter |
| 🎭 Candidate video preview | Camera/mic toggle buttons with getUserMedia support |
| 📱 Mobile responsive layout | Fully responsive across mobile, tablet, desktop |
| ✨ Smooth animations | Fade-in-up transitions, blob backgrounds, pulsing rings, caret blink |
| 🔄 End interview modal | Confirmation dialog with answered count before ending |
| 🖨️ Download report | Print/PDF export via `window.print()` |

---

## 📁 Project Structure

```
├── index.html                          ← HTML entry point
├── vite.config.js                      ← Vite + Vitest config
├── jest.config.js                      ← Jest configuration
├── babel.config.js                     ← Babel (JSX + ES modules)
├── package.json
│
├── src/
│   ├── App.jsx                         ← Root: Provider + Shell + Footer
│   ├── main.jsx                        ← React DOM entry
│   ├── index.css                       ← CSS variables, keyframes, utilities
│   │
│   ├── context/
│   │   └── InterviewContext.jsx        ← Global state (screen, candidate, answers, timers)
│   │
│   ├── data/
│   │   └── questions.js                ← 6 questions + coding problem definition
│   │
│   ├── components/                     ← 8 reusable UI components
│   │   ├── AIAvatar.jsx                ← Animated AI orb with waveform bars
│   │   ├── Button.jsx                  ← 5 variants: primary/secondary/ghost/danger/success
│   │   ├── CandidatePreview.jsx        ← Camera feed with getUserMedia + mic/video toggles
│   │   ├── Header.jsx                  ← Sticky nav with step indicators + theme toggle
│   │   ├── Input.jsx                   ← Text input + Select with label/error/icon
│   │   ├── ProgressBar.jsx             ← Gradient bar with 4 color options
│   │   ├── Timer.jsx                   ← QuestionTimer (countdown) + ElapsedTimer (count-up)
│   │   └── Waveform.jsx               ← 32-bar voice activity visualizer
│   │
│   └── screens/                        ← 6 full-page screen components
│       ├── LandingScreen.jsx
│       ├── CandidateDetailsScreen.jsx
│       ├── SetupScreen.jsx
│       ├── InterviewScreen.jsx
│       ├── CodingScreen.jsx
│       └── SummaryScreen.jsx
│
├── tests/                              ← Jest + RTL test suite
│   ├── setup.js                        ← @testing-library/jest-dom setup
│   ├── helpers.js                      ← Shared mocks + navigation helpers
│   ├── data/
│   │   └── questions.test.jsx          ← 15 tests
│   ├── context/
│   │   └── InterviewContext.test.jsx   ← 12 tests
│   ├── components/
│   │   ├── AIAvatar.test.jsx           ← 10 tests
│   │   ├── Button.test.jsx             ← 10 tests
│   │   ├── CandidatePreview.test.jsx   ← 6 tests
│   │   ├── Input.test.jsx              ← 10 tests
│   │   ├── ProgressBar.test.jsx        ← 8 tests
│   │   ├── Timer.test.jsx              ← 8 tests
│   │   └── Waveform.test.jsx           ← 4 tests
│   ├── screens/
│   │   ├── LandingScreen.test.jsx      ← 7 tests
│   │   ├── CandidateDetailsScreen.test.jsx ← 16 tests
│   │   ├── SetupScreen.test.jsx        ← 12 tests
│   │   ├── InterviewScreen.test.jsx    ← 19 tests
│   │   ├── CodingScreen.test.jsx       ← 14 tests
│   │   └── SummaryScreen.test.jsx      ← 13 tests
│   └── e2e/
│       └── fullFlow.test.jsx           ← 3 tests (complete lifecycle)
│
└── docs/                               ← Engineering documentation
    ├── README.md                       ← Docs index
    ├── ARCHITECTURE.md                 ← Tech decisions, state design, data flow
    ├── COMPONENT_TREE.md               ← Component hierarchy, prop contracts, reuse
    └── UX_RATIONALE.md                 ← Screen-by-screen UX reasoning, accessibility
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js 20+
- npm 9+

### Installation

```bash
git clone https://github.com/your-username/ai-interview-platform.git
cd ai-interview-platform
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Production Build

```bash
npm run build
```

Output: `dist/index.html` (single-file build, ~290KB / 84KB gzipped)

### Preview Build

```bash
npm run preview
```

---

## 🧪 Running Tests

### Run all tests

```bash
npm run test:unit
```

### Run with coverage

```bash
npx jest --coverage
```

### Test summary

```
Test Suites: 16 passed, 16 total
Tests:       167 passed, 167 total

-----------------------------|---------|----------|---------|---------|
File                         | % Stmts | % Branch | % Funcs | % Lines |
-----------------------------|---------|----------|---------|---------|
All files                    |   ~95%  |   ~90%   |   ~93%  |   ~96%  |
-----------------------------|---------|----------|---------|---------|
```

### Test file map

| Test file | Covers | # Tests |
|---|---|---|
| `questions.test.jsx` | Static data validation | 15 |
| `InterviewContext.test.jsx` | All context actions + edge cases | 12 |
| `Button.test.jsx` | 5 variants, icon, disabled, onClick | 10 |
| `ProgressBar.test.jsx` | Label, clamping, 4 color gradients | 8 |
| `Waveform.test.jsx` | Bar count, active/paused states | 4 |
| `AIAvatar.test.jsx` | Sizes, speaking/idle, pulse rings | 10 |
| `Input.test.jsx` | Label, hint, error, icon, Select | 10 |
| `Timer.test.jsx` | Countdown, onExpire, reset, elapsed | 8 |
| `CandidatePreview.test.jsx` | Camera states, denied fallback | 6 |
| `LandingScreen.test.jsx` | Hero, stats, features, navigation | 7 |
| `CandidateDetailsScreen.test.jsx` | Validation, skills, keyboard, upload | 16 |
| `SetupScreen.test.jsx` | Checks, guidelines, toggles | 12 |
| `InterviewScreen.test.jsx` | Recording, transcript, modal, tab warning | 19 |
| `CodingScreen.test.jsx` | Editor, run, language, reset, autosave | 14 |
| `SummaryScreen.test.jsx` | Scores, download, tracker, evaluation | 13 |
| `fullFlow.test.jsx` | Complete E2E lifecycle + theme toggle | 3 |

---

## 📱 Screens Overview

### 1. Landing Screen
- Animated AI avatar with pulsing rings and waveform bars
- "AI-powered • 24/7 available • Instant feedback" badge
- Stats: ~25 min duration, 6 questions, 98% satisfaction
- 4 feature cards with hover effects
- "How it works" 4-step guide

### 2. Candidate Details
- Form validation (name required, email format, skills required)
- Chip-based skill input with keyboard support (Enter, comma, Backspace)
- Suggested skills buttons (React, JavaScript, Node.js, etc.)
- Drag-and-drop resume upload area
- Role and experience dropdowns

### 3. Interview Setup
- Camera preview with real `getUserMedia` integration
- Real-time microphone level bar (WebAudio API analyser)
- Internet connectivity check (simulated)
- Traffic-light checklist (green ✓ / amber ⚠ / red ✗)
- 5 interview guidelines

### 4. AI Interview Room (Main Screen)
- 3-column layout: AI panel | Question + controls | Candidate preview
- AI avatar with speaking/idle animation
- Circular countdown timer (turns red below 30s)
- Recording waveform visualizer
- Live transcript with blinking cursor
- Confidence score with Clarity/Depth/Pace sub-metrics
- Question tracker (6-box grid)
- Tab focus detection with warning counter
- End Interview confirmation modal

### 5. Coding Section
- Problem statement with examples and constraints
- Code editor with line numbers and monospace font
- Language selector (JavaScript, TypeScript, Python)
- "Run Code" with simulated test output (pass/fail)
- Autosave indicator ("Saving…" → "Autosaved")
- Collapsible hint section
- Reset button restores starter code

### 6. Summary Dashboard
- "Great job, [Name]!" greeting
- 4 score cards: Overall, Attempted, Time, Skipped
- AI evaluation: 5 progress bars (Technical, Communication, Problem solving, Coding, Cultural fit)
- Strengths list (green) + Improvements list (amber)
- Candidate info card (name, email, role, skills, resume)
- Question tracker grid with check badges
- "What's next?" recruiter timeline
- Download (print) + Restart buttons

---

## 🏗️ Architecture & Docs

The `docs/` folder contains in-depth engineering documentation:

| Document | What it covers |
|---|---|
| **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** | Why React+Vite+Tailwind, folder structure rationale, state management design, data flow diagrams, performance considerations, production roadmap |
| **[COMPONENT_TREE.md](docs/COMPONENT_TREE.md)** | Visual component hierarchy, prop contracts for all 8 shared components, reusability scores, prop flow diagram |
| **[UX_RATIONALE.md](docs/UX_RATIONALE.md)** | Design philosophy, screen-by-screen UX reasoning, responsive strategy, accessibility audit, dark mode implementation, micro-interactions inventory |

---

## 📝 Assumptions

1. **Frontend-only scope** — No backend, no real AI, no real video recording, no real code execution. All represented as realistic UI states.
2. **Browser APIs** — `getUserMedia` is called for camera/mic but gracefully degrades if denied or unavailable (sandboxed iframes, HTTP pages).
3. **Single session** — No persistent storage beyond `localStorage` for theme preference. Interview state resets on page reload.
4. **Modern browsers** — Targets latest Chrome, Firefox, Safari, Edge. No IE11 support.
5. **Simulated data** — Questions, confidence scores, AI evaluation, and test results are hardcoded for demo purposes.

---

## 🔮 What I Would Change for Production

| Current (demo) | Production approach |
|---|---|
| React Context for state | Zustand or Redux Toolkit with middleware |
| CSS keyframe animations | Framer Motion for interruptible transitions |
| Fake transcript | WebSocket to speech-to-text service (Deepgram, AssemblyAI) |
| Simulated code execution | Sandboxed iframe with Pyodide/QuickJS or Judge0 API |
| Static questions | API-driven question bank with adaptive difficulty |
| No authentication | OAuth2/OIDC for candidate identity + JWT sessions |
| Single-file build | CDN-hosted chunks with service worker |
| No error boundary | React Error Boundary + Sentry error reporting |
| No i18n | `react-intl` with extracted message catalogs |
| No accessibility audit | Full WCAG 2.1 AA compliance + screen reader testing |

---

## 👤 Author

**Rhythm Shukla**

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
