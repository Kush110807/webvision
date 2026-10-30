// Service catalogue shown on the Services page and used across SARATHI ONE.
// `functional: true` means the prototype has a working guided experience for it.
export const SERVICES = [
  {
    id: "learner's-licence",
    title: "Learner's Licence",
    short: 'Prepare your Learner’s Licence application step by step with a guided checklist.',
    icon: 'GraduationCap',
    functional: true,
    route: '/state-selection',
    tags: ['Guided journey', 'Checklist', 'Save & resume'],
  },
  {
    id: 'driving-licence',
    title: 'Driving Licence',
    short: 'Learn what a Permanent Driving Licence application involves and what to prepare.',
    icon: 'Car',
    functional: false,
    route: '/services/driving-licence',
    tags: ['Informational'],
  },
  {
    id: 'licence-renewal',
    title: 'Licence Renewal',
    short: 'Understand the renewal process, timing and documents typically required.',
    icon: 'RefreshCw',
    functional: false,
    route: '/services/licence-renewal',
    tags: ['Informational'],
  },
  {
    id: 'application-status',
    title: 'Application Status',
    short: 'Look up a simulated status using a sample demo reference number.',
    icon: 'SearchCheck',
    functional: false,
    route: '/status',
    tags: ['Demo data only'],
  },
];

export function getServiceById(id) {
  return SERVICES.find((s) => s.id === id) || null;
}
