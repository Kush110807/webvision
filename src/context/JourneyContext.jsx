import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadJourney, saveJourney, clearJourney } from '../utils/storage.js';

// Shared state for the whole SARATHI ONE experience.
// Persisted to localStorage (non-sensitive preparation data only).
const JourneyContext = createContext(null);

const EMPTY = {
  serviceId: null,
  stateCode: null,
  step: 1,
  checklist: {},
  applicant: {},
};

export function JourneyProvider({ children }) {
  const [journey, setJourney] = useState(() => ({ ...EMPTY, ...(loadJourney() || {}) }));
  const [resumeNotice, setResumeNotice] = useState(() => (loadJourney() ? 'restored' : null));

  const [saveAvailable, setSaveAvailable] = useState(true);

  // Auto-save on every change (this is the "Save & Resume" feature).
  useEffect(() => {
    setSaveAvailable(saveJourney(journey));
  }, [journey]);

  const update = useCallback((patch) => {
    setJourney((prev) => ({ ...prev, ...patch }));
  }, []);

  const setService = useCallback((serviceId) => update({ serviceId }), [update]);
  const setStateCode = useCallback((stateCode) => update({ stateCode }), [update]);
  const setStep = useCallback((step) => update({ step }), [update]);

  const toggleChecklist = useCallback((itemId, checked) => {
    setJourney((prev) => ({
      ...prev,
      checklist: { ...prev.checklist, [itemId]: Boolean(checked) },
    }));
  }, []);

  const setApplicant = useCallback((patch) => {
    setJourney((prev) => ({ ...prev, applicant: { ...prev.applicant, ...patch } }));
  }, []);

  const startOver = useCallback(() => {
    clearJourney();
    setJourney({ ...EMPTY });
    setResumeNotice(null);
  }, []);

  const dismissResumeNotice = useCallback(() => setResumeNotice(null), []);

  const value = useMemo(
    () => ({
      journey,
      saveAvailable,
      update,
      setService,
      setStateCode,
      setStep,
      toggleChecklist,
      setApplicant,
      startOver,
      resumeNotice,
      dismissResumeNotice,
    }),
    [journey, saveAvailable, update, setService, setStateCode, setStep, toggleChecklist, setApplicant, startOver, resumeNotice, dismissResumeNotice]
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error('useJourney must be used inside <JourneyProvider>');
  return ctx;
}
