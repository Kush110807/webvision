// Original page POSTs to stateSelectBean.do. The prototype cannot call the real portal,
// so selecting a state only returns a simulated result.
export function selectState(code) {
  return { code, simulated: true };
}
