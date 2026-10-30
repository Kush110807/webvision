// Learner's Licence preparation content for the Smart Licence Journey.
// Guidance is based on widely published Motor Vehicles Act / Sarathi public information.
// Anything that can change (fees, exact pass marks, RTO-wise requirements) is flagged
// as "confirm on the official portal" — this prototype never claims official authority.

export const OFFICIAL_PORTAL_URL = 'https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do';
export const PARIVAHAN_URL = 'https://parivahan.gov.in';

export const ELIGIBILITY_FACTS = [
  {
    id: 'age-18',
    title: 'Minimum age 18 — motorcycles with gear, cars and similar vehicles',
    body: 'In general, an applicant must be at least 18 years old to apply for a Learner’s Licence to drive a motorcycle with gear, a car, or an equivalent vehicle category.',
  },
  {
    id: 'age-16',
    title: 'Age 16–17 — motorcycles without gear (engine capacity limits apply)',
    body: 'Applicants aged 16 or above may apply for a Learner’s Licence for a motorcycle without gear (small engine capacity / certain electric two-wheelers), generally with parental or guardian consent. The exact engine-capacity limits are defined in the applicable rules — confirm them on the official portal.',
  },
  {
    id: 'age-20-transport',
    title: 'Age 20+ — transport vehicles (with additional conditions)',
    body: 'Learner’s Licence for transport vehicles generally requires the applicant to be at least 20 years old and to meet education-related conditions. Confirm the current conditions for transport vehicles on the official portal.',
  },
  {
    id: 'fitness',
    title: 'Physical fitness — self declaration (Form 1)',
    body: 'Applicants declare their physical fitness through the prescribed self-declaration form. A medical certificate (Form 1A) is generally required for transport vehicles and in certain other cases — verify what applies to you.',
  },
  {
    id: 'traffic-rules',
    title: 'Knowledge of traffic signs and rules',
    body: 'A Learner’s Licence test checks your knowledge of traffic signs, road safety and driving rules. Tests are typically computer based; the number of questions and the pass criteria can vary — confirm the current format on the official portal for your state.',
  },
];

export const ELIGIBILITY_CAVEAT =
  'Eligibility, forms and fees can vary by vehicle category, state/UT and applicable rules. Always confirm the current requirements on the official SARATHI portal before applying.';

// Checklist categories for Step 3. Items are preparation ticks only —
// NO document numbers, uploads or personal identifiers are ever collected.
export const CHECKLIST_CATEGORIES = [
  {
    id: 'proofs',
    title: 'Proofs to keep ready',
    note: 'Carry originals and keep soft copies ready for the application form. Which documents are accepted can vary by state.',
    items: [
      {
        id: 'age-proof',
        label: 'Age proof shortlisted',
        hint: 'Typical options: birth certificate, class 10 mark sheet, passport. Confirm the accepted list for your state.',
        essential: true,
      },
      {
        id: 'address-proof',
        label: 'Address proof shortlisted',
        hint: 'Typical options: Aadhaar card, passport, voter ID, utility bill. Confirm the accepted list for your state.',
        essential: true,
      },
      {
        id: 'photos',
        label: 'Recent passport-size photographs',
        hint: 'Keep a few recent photographs ready as required by the application.',
        essential: true,
      },
      {
        id: 'passport-softcopy',
        label: 'Soft copies (scans/photos) of the proofs',
        hint: 'For upload on the official portal. Do not upload documents anywhere except the official government site.',
        essential: false,
      },
    ],
  },
  {
    id: 'forms-fees',
    title: 'Forms and fees',
    note: 'Forms are usually filled on the official portal itself. This prototype never asks for form or document numbers.',
    items: [
      {
        id: 'form-1',
        label: 'Form 1 — self declaration of fitness, ready to sign',
        hint: 'The physical fitness self declaration is a standard part of the Learner’s Licence application.',
        essential: true,
      },
      {
        id: 'form-1a',
        label: 'Form 1A medical certificate (only if applicable to you)',
        hint: 'Generally required for transport vehicles and certain other cases. Check whether it applies to your category.',
        essential: false,
      },
      {
        id: 'fee-awareness',
        label: 'Checked the application fee for my state/UT',
        hint: 'Fees differ between states and categories. Look up the current fee on the official portal or your state RTO.',
        essential: false,
      },
    ],
  },
  {
    id: 'test-prep',
    title: 'Test preparation',
    note: 'The Learner’s Licence test is usually a computer-based test on traffic signs and rules.',
    items: [
      {
        id: 'rules-practice',
        label: 'Practised traffic signs and road safety questions',
        hint: 'Use official handbooks or practice question banks. The exact question format can vary by state.',
        essential: true,
      },
      {
        id: 'test-format',
        label: 'Know my test format (questions, language, pass criteria)',
        hint: 'Confirm the current test format and pass criteria for your state on the official portal.',
        essential: false,
      },
      {
        id: 'slot-check',
        label: 'Checked slot availability at my RTO',
        hint: 'Many states require booking a test or RTO visit slot through the official portal.',
        essential: false,
      },
    ],
  },
  {
    id: 'awareness',
    title: 'Eligibility awareness',
    note: 'A quick self-check so you do not reach the RTO unprepared.',
    items: [
      {
        id: 'age-eligible',
        label: 'I meet the age requirement for my vehicle category',
        hint: 'See the eligibility section in Step 2, and confirm rules for your category on the official portal.',
        essential: false,
      },
      {
        id: 'consent',
        label: 'I have parental/guardian consent (needed for 16–17 year olds, motorcycle without gear)',
        hint: 'Applies to younger applicants for motorcycles without gear. Confirm the exact rule for your state.',
        essential: false,
      },
    ],
  },
];

export const ESSENTIAL_ITEMS = CHECKLIST_CATEGORIES.flatMap((c) => c.items).filter((i) => i.essential);

export const VEHICLE_CATEGORIES = [
  { id: 'mcwg', label: 'Motorcycle with gear (or car / equivalent)' },
  { id: 'mcwog', label: 'Motorcycle without gear (small engine / certain e-two-wheelers)' },
  { id: 'transport', label: 'Transport vehicle (goods/passenger)' },
];

export const AGE_BANDS = [
  { id: 'under-16', label: 'Under 16' },
  { id: '16-17', label: '16 – 17 years' },
  { id: '18-19', label: '18 – 19 years' },
  { id: '20-plus', label: '20 years or above' },
  { id: 'unsure', label: 'Prefer not to say / not sure' },
];

// Step 4 — what to prepare before continuing to the official portal.
export const PREPARATION_CHECKLIST = [
  'A device with internet access, so you can apply on the official SARATHI portal.',
  'Your proofs and photographs ready in the accepted file formats and size limits.',
  'A working mobile number and email for official communication (enter them only on the official portal — never on this prototype).',
  'Time to take the Learner’s Licence test at your RTO / through the online mode your state uses.',
  'The current fee amount for your state and vehicle category.',
];

// Guidance generated from the applicant's own selections (Step 4/5).
export function guidanceFor(applicant) {
  const out = [];
  if (applicant.ageBand === 'under-16') {
    out.push('Applicants under 16 are generally not eligible for a Learner’s Licence. Please verify the current rules on the official portal.');
  }
  if (applicant.ageBand === '16-17') {
    out.push('At 16–17 you can generally apply only for a motorcycle without gear, with parental or guardian consent.');
  }
  if (applicant.ageBand === '18-19' || applicant.ageBand === '20-plus') {
    out.push('You appear to meet the standard minimum age of 18 for motorcycles with gear and cars.');
  }
  if (applicant.vehicleCategory === 'transport') {
    out.push('Transport vehicle Learner’s Licences have extra conditions (minimum age, education, medical certificate Form 1A). Confirm them on the official portal.');
  }
  if (applicant.vehicleCategory === 'mcwog') {
    out.push('For motorcycles without gear, engine-capacity / vehicle-type limits apply. Confirm your vehicle fits the allowed category.');
  }
  if (out.length === 0) {
    out.push('Review the eligibility notes in Step 2 and confirm the requirements for your category on the official portal.');
  }
  return out;
}
