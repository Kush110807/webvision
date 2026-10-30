# WebVision 2.0 — SARATHI frontend redesign (unofficial student prototype)

This project is a local React/Vite redesign of the publicly accessible SARATHI entry experience. It is **not** a government service, is not affiliated with the Government of India, and cannot submit or track real applications. The `/original` route preserves the team's existing public-page recreation for a before-and-after comparison.

## Run on Windows / VS Code

1. Open the folder containing `package.json` in VS Code.
2. In VS Code Terminal (PowerShell), run `npm.cmd install`.
3. Run `npm.cmd run dev` and open the printed local URL (normally http://localhost:5173/).
4. Run `npm.cmd run build` before submission. The build must succeed on your machine; it was not possible to complete dependency installation in the review environment.

## Present features

- Task-first redesigned landing screen with searchable State/UT selection and validation.
- Existing Delhi services dashboard, six-step Learner's Licence preparation journey, and simulated application-status lookup.
- Existing before reference at `/original`.
- Mobile-responsive layout and focus-visible keyboard styles.
- Visible official-site handoff and unofficial-prototype warnings.

## Limitations

- All chosen states intentionally go to the **Delhi demonstration dashboard**. They do not enable real state-specific government services.
- Application status uses invented demo records, not live data.
- The preparation journey is local and does not submit a licence application or verify government eligibility.
- Original SARATHI frontend resource ownership and licensing must be considered before public redistribution; the archive preserves the teammate-supplied images for local comparison.

## Redesigned files

See `REDESIGN_HANDOFF.md`. Existing journey, context, storage, dashboard, status routes and the `/original` React page were not modified in this pass.

## Public reference

Official SARATHI: https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do
