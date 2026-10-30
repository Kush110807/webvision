# SARATHI ONE — Your Licence Journey, Simplified

**WebVision 2.0 | MAIT | Website Redesign Challenge**  
**Repository name:** `webvision`  
**Project status:** Proposed — implementation and testing pending  
**Website selected:** [SARATHI Parivahan](https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do)

> **Unofficial student prototype.** This project is not affiliated with, approved by or connected to the Government of India, SARATHI Parivahan, NIC or Apple. Actual government transactions must be completed on the official site.

## 1. Problem we have selected

India's SARATHI portal is an important entry point for learner's licence and driving licence services. We identified a specific user-experience challenge: **a first-time applicant must navigate state-first, information-heavy pages to discover the correct service, understand the process and prepare before applying.**

Our opportunities for improvement are:

- **Difficult service discovery:** the entry page prioritises state selection over clear explanations of common tasks.
- **Information overload:** notices and procedural guidance can compete with primary actions.
- **Uncertain next steps:** the licence journey is not presented as one concise, understandable sequence.
- **Inconsistent action clarity:** users benefit from stronger visual hierarchy, button states, validation and feedback.
- **Mobile-first accessibility:** the entry page recommends a desktop resolution of 1366 × 768 or higher; responsive layouts and keyboard usability deserve attention.

These are **usability observations**, not claims that SARATHI's entire original system is nonfunctional. The Government of India's UX4G Parivahan case study discusses related service-discovery, navigation and overloaded-instruction issues.

### Problem statement

**How might we help a first-time citizen discover, understand and prepare for the learner's licence journey through a clear, accessible, mobile-first interface — without misrepresenting an unofficial prototype as a government application portal?**

## 2. Our proposed solution

We propose **SARATHI ONE**, an independently implemented user-experience redesign that transforms a complicated entry path into a guided preparation journey.

**Primary product feature: Smart Licence Journey**

1. Choose the service — the MVP supports **Learner's Licence** end-to-end.
2. Select the relevant Indian state or union territory.
3. See an easy-to-understand overview of the general process.
4. Complete an interactive **preparation checklist**. State-dependent rules are explicitly marked as requiring official confirmation.
5. See a preparation progress summary and optionally resume non-sensitive preferences after a refresh.
6. Use a clear link to **continue on the official SARATHI website** for the real transaction.

**Supporting improvements**

- Minimalist, original, responsive home page with clear service cards.
- Logical information architecture, legible typography and consistent buttons.
- Helpful form feedback, keyboard focus visibility and reduced-motion support.
- Service previews for Driving Licence, Renewal and Application Status; these must not imply live government integrations.
- Accurate distinctions between **preparation complete** and **government application submitted**.

## 3. Public website inspection and extraction methodology

The team will **inspect publicly accessible pages and browser-delivered resources**, using Chrome DevTools (Elements, Sources and Network), `Ctrl+S` when appropriate, and permitted reference screenshots. This helps analyse page structure and visible behaviours.

**Extraction is bounded to public frontend references.** We will not attempt to obtain private source repositories, server-side code, databases, credentials, protected APIs or privileged user sessions. A browser-saved page is not the government's full editable codebase.

We will then **independently rebuild** the relevant user experience in React rather than distributing or misrepresenting the government's code. The inspection stage is limited to around 15 minutes of the hackathon.

## 4. Technical approach

- **Frontend:** React + Vite, JavaScript, CSS.
- **Icons:** `lucide-react` if permitted and available.
- **Persistence:** localStorage for non-sensitive service, state and checklist preferences only.
- **Architecture:** `/app` contains the frontend, with the Licence Journey isolated in `app/src/features/licence/`.
- **No backend dependencies:** no login, Aadhaar authentication, real application submission, payment, appointment booking, document upload or live status tracking.

We will not request or store actual Aadhaar/PAN numbers, driving licence numbers, dates of birth, names, phone numbers or identity documents.

## 5. Three parallel workstreams — one submission

- **Chat A, Core + Integration:** repository, Vite scaffold, design system, homepage, application routing, integration, production build and GitHub submission. Sole integration owner.
- **Chat B, Journey Feature:** implements `LicenceJourney.jsx` and `licence.css` in an isolated branch, following Chat A's agreed import contract. No edits to shell/configuration files.
- **Chat C, Alternative Feasibility + QA:** assesses **RTI Online** as a separate backup concept for the first 30 minutes. At the decision gate, the team locks exactly **one** target. If SARATHI remains viable, Chat C switches to independent testing and demo preparation.

This separation prevents conflicting edits and avoids spending the full 150 minutes on two competing sites.

## 6. MVP acceptance criteria (to be tested, not assumed complete)

- [ ] Repository named exactly `webvision`; README committed.
- [ ] `npm install` and `npm run dev` work in `/app`.
- [ ] Homepage and Learner's Licence entry work.
- [ ] State selection prevents continuing without a selection.
- [ ] Overview, checklist, summary and Back controls work.
- [ ] Non-sensitive selections can survive reload, if persistence is delivered.
- [ ] Official link is genuine, visible and clearly marked as external.
- [ ] Responsive checks at 320, 375, 768 and 1440px.
- [ ] Keyboard navigation, visible focus and error messages tested.
- [ ] `npm run build` passes.
- [ ] README updated to distinguish **implemented**, **incomplete** and **not tested** items before submission.

## 7. References

- [Official SARATHI service selection page](https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do)
- [Parivahan learner's licence FAQ](https://parivahan.gov.in/)
- [UX4G Parivahan usability case study](https://www.ux4g.gov.in/aboutus/case-studies/ux4g-parivahan-seva.php)
- [RTI Online — alternative feasibility reference, not the chosen product](https://rtionline.gov.in/)

## 8. Integrity and scope

This is a **student redesign and preparation prototype**. It does not issue licences, check official application status, accept government fees, verify eligibility or impersonate a government service. Any actual legal requirements and state-specific procedures must be verified on the official government website. Development and AI assistance remain subject to the organisers' instructions.
