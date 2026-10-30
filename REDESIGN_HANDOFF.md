# WebVision SARATHI — 60-minute redesign handoff

## What changed

- `src/pages/LandingPage.jsx`: state selector moved ahead of announcements; added large task-led hero, clear two-step messaging, explicit Delhi-demo limitation, prominent fraud warning.
- `src/styles/one/redesign.css` (new): accessible visual system for landing, nav, forms, cards, dashboard, steps, footer and responsive widths. All selectors scoped to `.so-app` to avoid modifying `/original`.
- `src/main.jsx`: imports the new CSS last.
- `src/App.jsx`: adds a keyboard skip-to-main link and an identified main landmark.
- `README.md`: updated to explain the existing implementation and limitations.
- `.gitignore`: protects generated assets and secrets when bringing this project to Git.

## Preserved on purpose

Existing routes: `/`, `/delhi`, `/journey`, `/status`, `/services/:serviceId`, `/state-selection`, `/original`. Existing state list, local storage, validation, status-demo data, learner licence logic and original-page recreation remain intact.

## Integration (do not overwrite an existing working repository blindly)

**Recommended:** Extract this complete ZIP as a new folder `sarathi-redesigned`, open in VS Code, run `npm.cmd install`, `npm.cmd run dev` and `npm.cmd run build`. Review browser results. The supplied ZIP excludes `node_modules`, `dist`, `.git` and credentials. Once verified, commit it to a new feature branch, not to an unreviewed shared `main`.

## Essential manual smoke tests

1. `/`: page opens; check 320px, 375px, 768px and desktop. No horizontal scroll.
2. State selection: empty Continue must show validation error.
3. Search for Delhi, choose it; Continue must open `/delhi` and show Delhi services.
4. Choose a different state, continue; verify the page still clearly labels the dashboard **Delhi demo**, not that state's real services.
5. `/journey`: advance/back through existing six steps; check checklist and state persistence on refresh.
6. `/status`: use an existing sample reference number and verify demo-only messaging.
7. `/original`: before reference remains visible; back link returns to redesigned `/`.
8. Check keyboard Tab/Enter/Escape, mobile menu, official outbound links and browser console.
9. Run `npm.cmd audit` and `npm.cmd run build`; record findings accurately before deploying.

## Verification performed by Chat A

- RAR entry inspection and source extraction: passed.
- JSX/JS syntax parsing with Babel parser across all 35 source files: passed.
- Production Vite build: **not tested** (npm dependency installation unavailable in execution container).
- End-to-end browser interaction: **not tested** (requires a running application).

## Claims for judges

Say: 'We retained the clone's original entry-page reference at /original, redesigned the state-first navigation and mobile usability, and preserved the existing Delhi demo flows.'
Do not say: 'We changed the live SARATHI portal' or 'We created a real government licence application.'
