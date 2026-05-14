# UX Rationale

## Design Philosophy

Three principles guided every screen:

1. **Reduce candidate anxiety** — Interviews are stressful. Every UI element should make the candidate feel prepared, informed, and in control.
2. **Progressive disclosure** — Show only what's needed at each step. Don't overwhelm with all 6 questions on screen 1.
3. **Professional trust** — The UI must look like a real product a Fortune 500 company would use, not a student project. This means consistent spacing, restrained color, and polished micro-interactions.

---

## Screen-by-Screen UX Reasoning

### 1. Landing Screen

**Goal**: Convince the candidate this is a legitimate, professional platform.

| Element | UX reasoning |
|---|---|
| **Animated AI avatar** | Humanizes the AI interviewer immediately. The pulsing orb with waveform bars signals "this AI listens and responds." |
| **"AI-powered • 24/7 • Instant feedback" badge** | Sets expectations — the candidate knows this isn't a human. Removes the anxiety of "am I being watched by a real person?" |
| **Stats row (~25 min, 6 questions, 98%)** | Concrete numbers reduce uncertainty. Candidates can plan their time. |
| **"How it works" 4-step process** | Eliminates surprise. Every step is previewed before it happens. |
| **Feature cards** | Builds confidence in the platform's capabilities. "Fair & Unbiased" directly addresses candidate concerns about AI bias. |
| **Two CTAs** | Primary "Start Interview" for ready candidates. Secondary "Learn how it works" for cautious candidates who need more information first. Both lead to the same place — this is intentional to avoid decision paralysis. |

**What I deliberately omitted**: No login wall. No "create account." The task specifies a single session flow. Adding auth would add friction without value.

---

### 2. Candidate Details Screen

**Goal**: Collect information efficiently without feeling like a bureaucratic form.

| Element | UX reasoning |
|---|---|
| **"Step 1 of 3" pill** | Anchors the candidate in the flow. They know exactly where they are and how much is left. |
| **Icon-prefixed inputs** | Visual cues (user icon, email icon) help candidates identify fields without reading labels. Faster scanning. |
| **Skills as chips (not comma-separated text)** | Chips are deletable, countable, and visually distinct. A plain text field with "React, TypeScript, CSS" is ambiguous — did they mean 3 skills or 1? Chips make it unambiguous. |
| **Suggestion buttons below skills** | Reduces typing. One click adds "React" vs. typing 5 characters. Also subtly tells candidates what skills are relevant for this role. |
| **Resume upload as dashed-border drop zone** | The dashed border is a universal "drop here" affordance. The centered icon + text pattern matches Dropbox, Google Drive, and every file upload the candidate has seen before. |
| **Validation on submit, not on blur** | Validating on blur (when user leaves a field) feels aggressive. Validating on "Continue" click feels like a safety net — "we caught this before you moved on." |
| **Back button (ghost variant)** | Low visual weight because going back is a secondary action. It's available but doesn't compete with "Continue." |

---

### 3. Setup Screen

**Goal**: Build technical confidence. The candidate should feel "my setup works, I'm ready."

| Element | UX reasoning |
|---|---|
| **Camera preview as the largest element** | The candidate's biggest fear is "will my camera work?" Showing their face immediately answers this. |
| **"Allow Access" button (user gesture)** | Browsers require a user click to trigger `getUserMedia`. Auto-requesting on page load often gets silently blocked. An explicit button with a shield icon communicates "this is a security action." |
| **Real-time mic level bar** | Moving green bar = "my mic is working." Static bar = "something is wrong." This is more informative than a simple "Mic: ✓" checkmark. |
| **3 checklist items with status icons** | Traffic light pattern: green check = good, amber warning = fixable, red X = problem. Each item has an action button to fix the issue. |
| **Guidelines section** | 5 short rules presented as a checklist with check icons. The visual pattern "✓ already done" makes candidates feel prepared, even though they haven't done anything yet. |
| **Disabled "Start interview" until all green** | Prevents the candidate from entering a broken session. The button enables the moment all checks pass — this feels like a reward. |

**Micro-interaction**: The internet check has a 900ms simulated delay with a spinner. This is intentional — an instant "✓ Connected" feels fake. A brief check feels like the system actually tested something.

---

### 4. Interview Screen (Main Screen)

**Goal**: This is the core experience. Balance information density with focus on the current question.

| Element | UX reasoning |
|---|---|
| **3-column layout (AI / Question / Candidate)** | Left = AI interviewer (who's asking). Center = question + controls (what to do). Right = candidate preview + stats (feedback). This mirrors a real video call layout. |
| **AI avatar with pulsing animation** | When the AI is "speaking" (first 3 seconds per question), the avatar pulses faster and typing dots appear. This simulates a real interviewer thinking and speaking. |
| **Difficulty + type badges** | Color-coded badges (green=Easy, amber=Medium, red=Hard) set expectations. The "behavioral" / "technical" type badge helps candidates mentally switch gears. |
| **Circular countdown timer** | A filling/emptying circle is more glanceable than "02:45" text. The color shifts to red below 30 seconds — urgency without panic. |
| **Waveform visualizer** | When recording, animated bars move to simulate voice input. This gives immediate feedback: "the system is hearing me." Without this, candidates wonder "is it recording?" |
| **Live transcript area** | Simulated word-by-word transcript with a blinking caret. Even though it's fake data, the pattern of seeing your words appear on screen is deeply reassuring — "the AI understood me." |
| **4-button action bar** | Start/Stop → Submit → Skip → End. Ordered by frequency of use. The End button is ghost-styled and right-aligned to prevent accidental clicks. |
| **Confidence score panel** | Shows a number (78/100) with sub-metrics (Clarity, Depth, Pace). This is an AI evaluation placeholder, but it serves a UX purpose: candidates self-correct. If they see low "Clarity" they speak more clearly on the next question. |
| **Question tracker grid** | 6 colored squares showing answered/skipped/pending. A bird's-eye view of progress without leaving the screen. |
| **Tab focus warning** | If the candidate switches tabs, a red "Return to tab" badge appears and a warning counter increments. This is visible but non-blocking — we don't interrupt the interview. |
| **End Interview modal** | Confirmation dialog with the count of answered questions. Prevents accidental exits. The "Cancel" button is ghost (easy to click), the "Yes, end" button is red (deliberate action). |

**What I deliberately omitted**: No "Previous question" button. Going back creates ambiguity — "did they change their answer? Which version counts?" A forward-only flow is cleaner for evaluation.

---

### 5. Coding Screen

**Goal**: A realistic code editor that feels like LeetCode/HackerRank.

| Element | UX reasoning |
|---|---|
| **2-column layout (Problem / Editor)** | Mirrors every coding platform candidates have used. Problem on left, code on right. No learning curve. |
| **Traffic light dots (red/amber/green)** | The macOS window chrome pattern signals "this is an editor, not a text field." It's a visual cue that syntax matters here. |
| **Line numbers** | Candidates expect line numbers in a code editor. Without them, it feels like a `<textarea>`, not an IDE. |
| **Language selector** | JavaScript / TypeScript / Python. The dropdown is in the editor toolbar, not in a separate settings panel. Context-appropriate placement. |
| **"Autosaved" indicator** | Green dot + "Autosaved" text. Reduces the fear of losing work. The indicator briefly shows "Saving…" when code changes, then returns to "Autosaved" — this mimics Google Docs behavior. |
| **Run Code → Console output** | Simulated test results with pass/fail per test case. The output format matches `jest` / `pytest` — familiar to developers. |
| **Hint as `<details>` toggle** | Collapsed by default. Candidates who need a nudge can expand it. Candidates who don't won't see it cluttering the screen. |
| **Timer in the top bar** | Coding questions have longer time limits (15 min vs. 2-3 min for behavioral). The timer is less prominent here — coding anxiety is already high enough. |

---

### 6. Summary Screen

**Goal**: The candidate should leave feeling accomplished, regardless of performance.

| Element | UX reasoning |
|---|---|
| **"Great job, [Name]!" heading** | Positive reinforcement. Even if they scored 40/100, the greeting is warm. The AI evaluation is labeled "Preliminary" — signaling that a human recruiter will make the final call. |
| **4 score cards with gradient top borders** | Each card has a distinct color gradient. The visual variety prevents the "wall of numbers" problem. |
| **Strengths before improvements** | The strengths section appears first and uses green. The improvements section uses amber (not red). This is a deliberate positivity bias — the candidate should close the tab feeling good. |
| **Progress bars for breakdown** | 5 horizontal bars (Technical knowledge, Communication, Problem solving, Coding, Cultural fit). Bars are more scannable than numbers. The gradient fill makes high scores feel visually rewarding. |
| **"What's next?" section** | 3 bullet points explaining the recruiter review timeline. This answers the candidate's #1 post-interview question: "What happens now?" |
| **Download + Start new interview buttons** | Download triggers `window.print()` (browser's PDF save). "Start new interview" resets all state and returns to the landing screen. Both are in the same card so the candidate sees their options together. |

---

## Responsive Strategy

| Breakpoint | Behavior |
|---|---|
| **< 640px (mobile)** | Single column. Header shows logo + theme toggle only (step indicators hidden). Cards stack vertically. Action buttons stack 2×2. |
| **640-1024px (tablet)** | 2-column layouts where possible. Header shows truncated step labels. |
| **> 1024px (desktop)** | Full 3-column interview layout. All step indicators visible. Side-by-side problem/editor in coding. |

**Key decision**: The interview screen's 3-column layout collapses to a single scrollable column on mobile. The AI avatar, question, and candidate preview stack vertically. This isn't ideal for a real interview (you'd want picture-in-picture), but it's the correct responsive behavior for a frontend task submission.

---

## Accessibility Considerations

| Area | Implementation |
|---|---|
| **Color contrast** | All text meets WCAG AA (4.5:1 for body text, 3:1 for large text). Tested in both light and dark themes. |
| **Focus indicators** | All interactive elements have `focus:ring-2 focus:ring-indigo-500` with `ring-offset` for visibility. |
| **Keyboard navigation** | All buttons and inputs are native HTML elements with correct `tabIndex`. Modal traps focus. |
| **ARIA labels** | Toggle buttons have `aria-label` ("Toggle mic", "Toggle video"). The nav has `aria-label="Interview progress"`. |
| **Reduced motion** | Animations use `transform` and `opacity` (GPU-composited). A production version would add `prefers-reduced-motion` media query to disable animations. |
| **Screen reader** | Status changes (recording state, timer warnings) would need `aria-live="polite"` regions in production. Not implemented in this demo. |

---

## Dark Mode Implementation

**Strategy**: CSS custom properties on `:root` and `.dark` class.

```css
:root {
  --bg: #f8fafc;     /* Light background */
  --panel: #ffffff;   /* Card/panel surface */
  --ink: #0f172a;     /* Primary text */
  --muted: #64748b;   /* Secondary text */
  --border: #e2e8f0;  /* Borders and dividers */
}

.dark {
  --bg: #05060f;
  --panel: #0b0d1a;
  --ink: #f1f5f9;
  --muted: #94a3b8;
  --border: #1e2235;
}
```

**Why CSS variables over Tailwind `dark:` variant?** Both work, but CSS variables allow components to reference semantic colors (`var(--panel)`) without knowing which theme is active. This means zero `dark:` prefixes in component code — the theme switch happens at the CSS level.

**Persistence**: Theme preference is saved to `localStorage` as `Platform-Hire-theme`. On load, the app checks `localStorage` first, then falls back to `prefers-color-scheme` media query, then defaults to `dark`.

---

## Micro-Interactions Inventory

| Interaction | Implementation | Purpose |
|---|---|---|
| Button hover lift | `translateY(-1px)` on hover | Tactile feedback — buttons feel clickable |
| Card hover glow | Top border gradient appears on hover | Draws attention to interactive cards |
| AI avatar pulse | 3 concentric rings with staggered `scale` animation | Signals AI is "alive" and processing |
| Typing dots | 3 dots with staggered `translateY` bounce | Universal "someone is typing" indicator |
| Waveform bars | 32 bars with staggered `scaleY` animation | Voice activity visualization |
| Recording badge ping | Red dot with `animate-ping` | Urgent indicator that recording is active |
| Fade-in-up on mount | `opacity: 0 → 1` + `translateY(12px → 0)` | Smooth screen transitions without a routing library |
| Caret blink | `opacity` toggle every 500ms | Simulates text cursor in transcript area |
| Progress bar fill | `transition-all duration-500` | Smooth width changes as progress updates |
| Gradient blob float | `translate` + `scale` keyframes over 14s | Subtle background movement on landing page |

**Philosophy**: Every animation serves an information purpose. None are decorative-only. The waveform tells you "recording is active." The typing dots tell you "AI is thinking." Remove any animation and you lose a piece of information.
