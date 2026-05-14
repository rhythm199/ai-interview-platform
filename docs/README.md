# Platform-Hire AI — Documentation

> Internal engineering docs for the AI Interview Platform frontend.

## Table of Contents

| Document | Description |
|---|---|
| [Architecture Decisions](./ARCHITECTURE.md) | Tech stack rationale, state management strategy, folder structure, data flow, and trade-offs |
| [Component Tree](./COMPONENT_TREE.md) | Visual component hierarchy, prop contracts, reusability patterns, and composition model |
| [UX Rationale](./UX_RATIONALE.md) | Design philosophy, screen-by-screen UX reasoning, accessibility, responsive strategy, and micro-interactions |

## Quick Facts

| Attribute | Value |
|---|---|
| **Framework** | React 19 (JavaScript, no TypeScript) |
| **Build tool** | Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **State** | React Context + `useReducer`-like hooks |
| **Testing** | JEST + React Testing Library |
| **Animation** | CSS keyframes (no runtime animation library) 
| **Screens** | 6 (Landing → Details → Setup → Interview → Coding → Summary) |
| **Components** | 8 reusable shared components |
| **Bundle size** | ~290 KB gzipped (~84 KB) |

## Assumptions

1. **Frontend-only scope** — No backend, no real AI, no real video recording or code execution. All are represented as realistic UI states.
2. **Browser APIs** — `getUserMedia` is called for camera/mic but gracefully degrades if denied or unavailable (sandboxed iframes, HTTP).
3. **Single session** — No persistent storage beyond `localStorage` for theme preference. Interview state resets on page reload.
4. **Modern browsers** — Targets latest Chrome, Firefox, Safari, Edge. No IE11 support.
