# WebVision 2.0 — SARATHI frontend redesign (unofficial student prototype)

This project is a local React/Vite redesign of the publicly accessible SARATHI entry experience. It is **not** a government service, is not affiliated with the Government of India, and cannot submit or track real applications. The `/original` route preserves the team's existing public-page recreation for a before-and-after comparison.

## Run on Windows / VS Code

1. Open the folder containing `package.json` in VS Code.
2. In VS Code Terminal (PowerShell), run `npm.cmd install`.
3. Run `npm.cmd run dev` and open the printed local URL (normally http://localhost:5173/).
4. Run `npm.cmd run build` before submission. Codex's final release build passed; run it again on the presenting machine after pulling the final source.

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

See `REDESIGN_HANDOFF.md` for the initial UI changes and `CODEX_RELEASE_HANDOFF.md` for later functional repairs, exact files changed and verification evidence. The `/original` recreation was preserved.

## Final verification and known limitations

- Final release build: PASS (recorded by Codex; see `release-evidence/final-build.log`).
- Automated browser checks: 42 PASS, 0 FAIL, across the recorded routes and selected functional/responsive cases; see `release-evidence/`.
- This does not establish full accessibility, security or exhaustive browser compatibility.
- `npm audit` reported five unresolved dependency vulnerabilities (one high, four moderate); legacy styling and missing-asset warnings also remain. Do not expose the development server publicly.
- The app is an unofficial educational prototype using simulated status data; it cannot perform government transactions.

## Public reference

Official SARATHI: https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do
