import { VEHICLE_CATEGORIES, AGE_BANDS } from '../data/learnerLicence.js';
import { STATES } from '../data/states.js';
// Small validation helpers used across SARATHI ONE pages.

export function validateStateSelection(stateCode) {
  if (!STATES.some((state) => state.code === stateCode)) {
    return 'Please select a State or Union Territory before continuing.';
  }
  return null;
}

export function validateApplicantDetails(applicant = {}) {
  const errors = {};
  if (!VEHICLE_CATEGORIES.some((v) => v.id === applicant?.vehicleCategory)) {
    errors.vehicleCategory = 'Please choose the vehicle category you want the licence for.';
  }
  if (!AGE_BANDS.some((a) => a.id === applicant?.ageBand)) {
    errors.ageBand = 'Please choose the age group that applies to you.';
  }
  if (applicant?.confirmed !== true) {
    errors.confirmed = 'Please confirm that you will verify these requirements on the official portal.';
  }
  return errors;
}

// Demo reference numbers look like S1-DEMO-100001
export function validateReferenceNumber(value) {
  const trimmed = (value || '').trim();
  if (!trimmed) {
    return 'Enter an application reference number to see its demo status.';
  }
  if (!/^S1-DEMO-\d{6}$/i.test(trimmed)) {
    return 'That does not look like a valid reference number. Sample format: S1-DEMO-100001 (use one of the sample numbers shown below).';
  }
  return null;
}

export function hasEssentialChecklistItems(essentialItems, checklist) {
  const pending = essentialItems.filter((item) => !checklist[item.id]);
  return { done: pending.length === 0, pending };
}
