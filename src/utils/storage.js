import { STATES } from '../data/states.js';
import { VEHICLE_CATEGORIES, AGE_BANDS, CHECKLIST_CATEGORIES } from '../data/learnerLicence.js';
import { getServiceById } from '../data/services.js';
// LocalStorage helpers for SARATHI ONE save & resume.
// Only non-sensitive preparation data is stored (service, state, step, checklist ticks,
// vehicle category + age band). Never store document numbers, Aadhaar, OTPs or passwords.

const KEY = 'sarathiOne.journey.v1';

// Apply the same allowlist on both read and write, including in-memory updates.
export function normalizeJourney(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const checklist = Object.fromEntries(CHECKLIST_CATEGORIES.flatMap((c) => c.items)
    .map((item) => [item.id, data.checklist?.[item.id] === true]));
  const applicant = {
    vehicleCategory: VEHICLE_CATEGORIES.some((v) => v.id === data.applicant?.vehicleCategory) ? data.applicant.vehicleCategory : '',
    ageBand: AGE_BANDS.some((a) => a.id === data.applicant?.ageBand) ? data.applicant.ageBand : '',
    confirmed: data.applicant?.confirmed === true,
  };
  let step = Number.isInteger(data.step) && data.step >= 1 && data.step <= 6 ? data.step : 1;
  const essentialsReady = CHECKLIST_CATEGORIES.flatMap((c) => c.items)
    .filter((item) => item.essential).every((item) => checklist[item.id]);
  if (step > 3 && !essentialsReady) step = 3;
  if (step > 4 && (!applicant.vehicleCategory || !applicant.ageBand || !applicant.confirmed)) step = 4;
  return {
    serviceId: typeof data.serviceId === 'string' && getServiceById(data.serviceId) ? data.serviceId : null,
    stateCode: STATES.some((state) => state.code === data.stateCode) ? data.stateCode : null,
    step, checklist, applicant,
  };
}

export function loadJourney() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? normalizeJourney(JSON.parse(raw)) : null;
  } catch (err) {
    console.warn('Could not read saved progress from localStorage.', err);
    return null;
  }
}

export function saveJourney(data) {
  try {
    const safe = normalizeJourney(data);
    if (!safe) return false;
    window.localStorage.setItem(KEY, JSON.stringify({ ...safe, updatedAt: new Date().toISOString() }));
    return true;
  } catch (err) {
    console.warn('Could not save progress to localStorage.', err);
    return false;
  }
}

export function clearJourney() {
  try {
    window.localStorage.removeItem(KEY);
    return true;
  } catch (err) {
    console.warn('Could not clear saved progress.', err);
    return false;
  }
}

export function hasSavedJourney() {
  return loadJourney() !== null;
}
