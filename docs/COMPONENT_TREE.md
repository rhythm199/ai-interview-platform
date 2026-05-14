# Component Tree

## Visual Hierarchy

```
<App>
  └── <InterviewProvider>          ← Context provider wrapping entire app
       └── <Shell>                 ← Reads `screen` from context, renders correct view
            ├── <Header />         ← Sticky nav (logo, step indicators 1-6, theme toggle)
            ├── <main>             ← Screen router (conditional rendering by screen state)
            │    ├── <LandingScreen />
            │    │    ├── AIAvatar (size="md", speaking)
            │    │    ├── Button (primary) → "Start Interview"
            │    │    ├── Button (secondary) → "Learn how it works"
            │    │    ├── Stat × 3
            │    │    ├── FeatureCard × 4
            │    │    └── Step × 4
            │    │
            │    ├── <CandidateDetailsScreen />
            │    │    ├── Input (name, with icon)
            │    │    ├── Input (email, with icon)
            │    │    ├── Select (role)
            │    │    ├── Select (experience)
            │    │    ├── Skills chip input (custom)
            │    │    ├── File upload area
            │    │    ├── Button (ghost) → "Back"
            │    │    └── Button (primary) → "Continue"
            │    │
            │    ├── <SetupScreen />
            │    │    ├── CandidatePreview (camera + mic + controls)
            │    │    ├── Mic level bar
            │    │    ├── CheckItem × 3 (internet, camera, mic)
            │    │    ├── Guidelines list
            │    │    ├── Button (ghost) → "Back"
            │    │    └── Button (primary, disabled until ready) → "Start interview"
            │    │
            │    ├── <InterviewScreen />
            │    │    ├── ElapsedTimer
            │    │    ├── ProgressBar
            │    │    ├── AIAvatar (size="md")
            │    │    ├── Question card (difficulty badge, type badge, prompt)
            │    │    ├── QuestionTimer (countdown circle)
            │    │    ├── Waveform (recording indicator)
            │    │    ├── Transcript area
            │    │    ├── Button × 4 (Start/Stop, Submit, Skip, End)
            │    │    ├── CandidatePreview (video + controls)
            │    │    ├── Confidence score panel
            │    │    ├── Question tracker grid (6 boxes)
            │    │    └── End Interview modal (conditional)
            │    │
            │    ├── <CodingScreen />
            │    │    ├── ElapsedTimer
            │    │    ├── QuestionTimer
            │    │    ├── ProgressBar
            │    │    ├── Problem statement panel
            │    │    ├── Code editor (textarea + line numbers)
            │    │    ├── Select (language)
            │    │    ├── Console output area
            │    │    ├── Button (secondary) → "Run Code"
            │    │    └── Button (primary) → "Submit Code"
            │    │
            │    └── <SummaryScreen />
            │         ├── AIAvatar (size="sm", not speaking)
            │         ├── ScoreCard × 4
            │         ├── ProgressBar × 5 (breakdown bars)
            │         ├── Strengths list
            │         ├── Improvements list
            │         ├── Candidate info card
            │         ├── Question tracker grid
            │         ├── Button (secondary) → "Download"
            │         └── Button (primary) → "Start new interview"
            │
            └── <Footer />         ← Copyright, privacy, terms, support links
```

---

## Shared Component Catalog

### Button

```
Props: variant, icon, children, disabled, onClick, className
Variants: primary | secondary | ghost | danger | success

Usage count: 28 instances across 6 screens
```

**Design decision**: One component, five visual variants. Every clickable action in the app uses this component. Consistency in padding (px-4 py-2.5), border-radius (rounded-xl), font weight (font-medium), and focus ring behavior is guaranteed.

**Why not separate components?** A `DangerButton`, `GhostButton` pattern would cause 5× the files with identical structure. The `variant` prop keeps the API surface small.

---

### Input + Select

```
Input props: label, placeholder, value, onChange, error, hint, icon, type
Select props: label, options[], value, onChange
```

**Design decision**: `Input` uses `forwardRef` so parent forms can access the DOM node for focus management. `Select` is a sibling export from the same file because they share identical label/border/focus styling.

**Error handling**: The `error` prop replaces `hint` text with red error text and adds a red border. This means validation messages are co-located with the field — no separate error summary panel needed.

---

### AIAvatar

```
Props: speaking (bool), size ("sm" | "md" | "lg"), label (string)
```

**Design decision**: The avatar is a CSS-only animated orb with waveform bars inside. Three concentric pulsing rings animate when `speaking=true`. The `size` prop controls both the outer container and inner orb dimensions.

**Why not a Lottie/video?** A 50KB Lottie file would look smoother but adds a runtime dependency and loading delay. CSS animations render on first paint and are GPU-composited.

---

### CandidatePreview

```
Props: muted, videoOn, onToggleMic, onToggleVideo, onAudioLevel, onPermissionGranted
```

**Design decision**: This component manages its own `getUserMedia` lifecycle. It requests camera+mic access via a user-gesture button click, handles all 4 states (idle → requesting → live → denied), and reports audio levels back to the parent via callback.

**State machine**:
```
idle ──[click Allow]──→ requesting ──[granted]──→ live
                                     ──[denied]──→ denied ──[click Retry]──→ requesting
```

**Why internal state?** Camera/mic permission is a device concern, not an interview concern. The parent (SetupScreen) only needs to know "is it granted?" via `onPermissionGranted`, not the internal state machine.

---

### Timer (QuestionTimer + ElapsedTimer)

```
QuestionTimer props: limitSec, running, onExpire
ElapsedTimer props: startedAt (timestamp)
```

**Design decision**: Two separate components because they serve opposite purposes:
- `QuestionTimer` counts **down** from a limit with a circular SVG progress ring
- `ElapsedTimer` counts **up** from a start timestamp

**`onExpire` callback**: When the countdown reaches 0, it calls `onExpire` which auto-skips the question. This prevents candidates from stalling indefinitely.

---

### ProgressBar

```
Props: value (0-100), label (optional), color ("indigo" | "emerald" | "amber" | "violet")
```

**Design decision**: The simplest component — a gradient-filled bar. Used in 3 contexts: interview progress, confidence score, and summary breakdown. The `color` prop avoids 4 separate components.

---

### Waveform

```
Props: bars (number, default 32), active (bool)
```

**Design decision**: Each bar has a CSS animation with staggered `animationDelay`. When `active=false`, `animationPlayState: paused` freezes the bars and `scaleY(0.25)` shrinks them. No JavaScript animation loop — pure CSS.

---

### Header

```
Props: none (reads from context)
```

**Design decision**: The header reads `screen`, `theme`, and `candidate` from context. It shows:
- Step indicators (1-6) with the current step highlighted
- Candidate name chip (only after details are filled)
- Theme toggle button

**Why no props?** The header needs `screen` to highlight the correct step and `candidate.name` for the chip. Passing these as props from App.jsx would create prop drilling through Shell. Context access is cleaner.

---

## Prop Flow Diagram

```
InterviewContext (global state)
       │
       ├──→ Header              reads: screen, theme, candidate
       ├──→ LandingScreen       writes: setScreen
       ├──→ CandidateDetailsScreen  reads: candidate  │  writes: updateCandidate, setScreen
       ├──→ SetupScreen         writes: startInterview, setScreen
       │     └──→ CandidatePreview  receives: muted, videoOn, callbacks
       ├──→ InterviewScreen     reads: currentQuestionIdx, answers, startedAt
       │     ├──→ AIAvatar      receives: speaking, size
       │     ├──→ CandidatePreview  receives: muted, videoOn, callbacks
       │     ├──→ QuestionTimer receives: limitSec, running, onExpire
       │     ├──→ Waveform      receives: active
       │     └──→ ProgressBar   receives: value
       ├──→ CodingScreen        reads: codingCode, codingLanguage
       │     └──→ QuestionTimer receives: limitSec, running, onExpire
       └──→ SummaryScreen       reads: candidate, answers, startedAt, endedAt
             └──→ ProgressBar × 5  receives: value, color
```

---

## Reusability Score

| Component | Screens used in | Reuse count |
|---|---|---|
| Button | All 6 | 28 |
| ProgressBar | Interview, Coding, Summary | 8 |
| AIAvatar | Landing, Interview, Summary | 3 |
| CandidatePreview | Setup, Interview | 2 |
| QuestionTimer | Interview, Coding | 2 |
| ElapsedTimer | Interview, Coding | 2 |
| Input/Select | Details, Coding | 6 |
| Waveform | Interview | 1 |
| Header | All 6 (via App) | 1 (global) |

Every component in `components/` is used in 2+ locations or is designed to be reusable if the app grows (e.g., Waveform could appear in a voice-note feature).
