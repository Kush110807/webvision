// SIMULATED application records for the demo status page.
// Every field here is invented sample data. Nothing is fetched from any government database.

export const DEMO_APPLICATIONS = [
  {
    reference: 'S1-DEMO-100001',
    service: "Learner's Licence",
    state: 'Delhi',
    applicant: 'Sample Applicant A (demo)',
    submittedOn: '2026-01-06',
    rto: 'Demo RTO Delhi-1',
    currentStageIndex: 3,
    stages: [
      { name: 'Application submitted', status: 'completed', date: '2026-01-06' },
      { name: 'Documents verified', status: 'completed', date: '2026-01-08' },
      { name: 'Fee payment recorded (demo)', status: 'completed', date: '2026-01-08' },
      { name: 'Learner’s Licence test scheduled', status: 'in-progress', date: 'Expected 2026-01-15' },
      { name: 'Learner’s Licence issued', status: 'pending', date: '—' },
    ],
    note: 'This sample is progressing normally; the demo test slot is pending.',
  },
  {
    reference: 'S1-DEMO-100002',
    service: "Learner's Licence",
    state: 'Delhi',
    applicant: 'Sample Applicant B (demo)',
    submittedOn: '2026-01-02',
    rto: 'Demo RTO Delhi-2',
    currentStageIndex: 1,
    stages: [
      { name: 'Application submitted', status: 'completed', date: '2026-01-02' },
      { name: 'Documents verification', status: 'action-required', date: 'Pending correction' },
      { name: 'Fee payment recorded (demo)', status: 'pending', date: '—' },
      { name: 'Learner’s Licence test', status: 'pending', date: '—' },
      { name: 'Learner’s Licence issued', status: 'pending', date: '—' },
    ],
    note: 'This sample needs a document correction — a common demo of an “action required” state.',
  },
  {
    reference: 'S1-DEMO-100003',
    service: 'Driving Licence (Permanent)',
    state: 'Maharashtra',
    applicant: 'Sample Applicant C (demo)',
    submittedOn: '2025-12-20',
    rto: 'Demo RTO MH-1',
    currentStageIndex: 5,
    stages: [
      { name: 'Application submitted', status: 'completed', date: '2025-12-20' },
      { name: 'Documents verified', status: 'completed', date: '2025-12-22' },
      { name: 'Fee payment recorded (demo)', status: 'completed', date: '2025-12-22' },
      { name: 'Driving test completed', status: 'completed', date: '2026-01-05' },
      { name: 'Licence printed', status: 'completed', date: '2026-01-08' },
      { name: 'Dispatched by post', status: 'in-progress', date: 'Expected 2026-01-12' },
    ],
    note: 'A completed sample: shows what a finished application timeline looks like.',
  },
];

export const SAMPLE_REFERENCES = DEMO_APPLICATIONS.map((a) => a.reference);

export function findDemoApplication(reference) {
  const needle = (reference || '').trim().toUpperCase();
  return DEMO_APPLICATIONS.find((a) => a.reference === needle) || null;
}
