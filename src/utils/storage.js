import { STATES } from '../data/states.js';
import { VEHICLE_CATEGORIES, AGE_BANDS, CHECKLIST_CATEGORIES } from '../data/learnerLicence.js';
import { getServiceById } from '../data/services.js';
// LocalStorage helpers for SARATHI ONE save & resume.
// Only non-sensitive preparation data is stored (service, state, step, checklist ticks,
// vehicle category + age band). Never store document numbers, Aadhaar, OTPs or passwords.

const KEY = 'sarathiOne.journey.v1';

export function loadJourney() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return {
      serviceId: typeof parsed.serviceId === 'string' && Boolean(getServiceById(parsed.serviceId)) ? parsed.serviceId : null,
      stateCode: STATES.some((state) => state.code === parsed.stateCode) ? parsed.stateCode : null,
      step: Number.isInteger(parsed.step) && parsed.step >= 1 && parsed.step <= 6 ? parsed.step : 1,
      checklist: Object.fromEntries(CHECKLIST_CATEGORIES.flatMap((c) => c.items).map((item) => [item.id, parsed.checklist?.[item.id] === true])),
      applicant: { vehicleCategory: VEHICLE_CATEGORIES.some((v) => v.id === parsed.applicant?.vehicleCategory) ? parsed.applicant.vehicleCategory : '', ageBand: AGE_BANDS.some((a) => a.id === parsed.applicant?.ageBand) ? parsed.applicant.ageBand : '', confirmed: parsed.applicant?.confirmed === true },
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null,
    };
  } catch (err) {
    console.warn('Could not read saved progress from localStorage.', err);
    return null;
  }
}

export function saveJourney(data) {
  try {
    const payload = { ...data, updatedAt: new Date().toISOString() };
    window.localStorage.setItem(KEY, JSON.stringify(payload));
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
