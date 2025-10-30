## StartupPilot — Copilot instructions for AI coding agents

This repository contains a small React frontend (Vite) for the StartupPilot UI. The instructions below are meant to get an AI coding assistant immediately productive and avoid suggestions that conflict with the project's structure and conventions.

Key locations
- Frontend root: `frontend/` — main app lives here (Vite + React, Tailwind CSS).
- Entry point: `frontend/src/main.jsx` — sets up `BrowserRouter` and imports `index.css`.
- Routing and layout: `frontend/src/App.jsx` — Left/Right sidebars and page Routes (Dashboard, Team, Board, Settings, Project).
- Notable pages/components: `frontend/src/pages/Dashboard.jsx`, `frontend/src/components/StartupTicket.jsx`, `frontend/src/components/LeftSideBar.jsx`, `frontend/src/components/RightSideBar.jsx`.
- Build/dev scripts: `frontend/package.json` scripts: `dev` (vite), `build` (vite build), `preview` (vite preview), `lint` (eslint).

Big-picture architecture
- Single-page React application using client-side routing (`react-router-dom`). The layout is three-column: fixed `LeftSideBar`, central route-driven content (main pages), fixed `RightSideBar`. Keep changes to layout centralized in `App.jsx`.
- Tailwind is used for styling (see `tailwind.config.js` and `index.css` import in `main.jsx`). Avoid adding global CSS files that conflict with Tailwind utility classes unless necessary.
- State is mostly local React state in pages/components (no global store detected). If adding global state, prefer `@reduxjs/toolkit` (already a dependency) and put slices under a new `frontend/src/store/` directory.

Developer workflows (how to run/build/test)
- Start dev server (hot reload): from `frontend/` run `npm install` then `npm run dev` (Vite). The project expects `index.css` to be present and Tailwind to be configured.
- Production build: `npm run build` in `frontend/`.
- Lint: `npm run lint` (project uses ESLint with React plugin). Prefer small, targeted fixes for lint issues.

Project-specific conventions & patterns
- Files use `.jsx` and classic React function components. Keep JSX files `.jsx` (not `.tsx`) unless converting the repo to TypeScript.
- Layout: the main layout is implemented in `App.jsx` with sidebars as separate components. Prefer adding new pages under `frontend/src/pages/` and new shared UI under `frontend/src/components/`.
- Styling: Tailwind utility classes are used inline; avoid introducing new CSS frameworks. Small component-level styles can be added as CSS modules if necessary but prefer Tailwind utilities.
- Routing: Add pages by updating `App.jsx` Routes; use `react-router-dom` v7+ Route shape already present.

Integration points & external dependencies
- HTTP client: `axios` is already a dependency. If adding API integration, create a lightweight `frontend/src/api/` folder and centralize `axios` instances there.
- Icons: `@heroicons/react`, `lucide-react`, and MUI are installed—use whichever matches the component style. Avoid adding duplicate icon libraries.

When editing code, prefer minimal, localised changes
- Keep the current three-column layout intact unless the task requires a layout change; modify `App.jsx` and sidebars together.
- For new features, add unit or smoke tests if possible, but don't add heavy test frameworks unless requested.

Examples (use these code locations when referencing patterns)
- Add a new page: create `frontend/src/pages/MyPage.jsx` and add a Route in `frontend/src/App.jsx`.
- Add shared API helper: create `frontend/src/api/http.js` that exports a configured `axios` instance.
- Add Redux slice (if needed): add `frontend/src/store/slices/<slice>.js` and wire a `store/index.js` to the app root.

Restrictions / things to avoid
- Don't convert the repo to TypeScript or change package manager (npm) without explicit instruction.
- Avoid large refactors that touch unrelated components; prefer small, testable changes.

If unsure, ask these targeted questions
1. Should new API endpoints go in `frontend/src/api/`, or is there an external backend repo with a specific contract?
2. Is a global state solution required or should we keep local state for now?

---
If you want, I can incorporate additional backend or deployment details if you point me to other folders or repositories used with this frontend.
