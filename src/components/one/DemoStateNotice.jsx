import NoticeBanner from './NoticeBanner.jsx';
import { STATES } from '../../data/states.js';

export default function DemoStateNotice({ stateCode }) {
  const selected = STATES.find((state) => state.code === stateCode);
  if (!selected || selected.code === 'DL') return null;
  return (
    <NoticeBanner type="warning" title="Delhi demonstration only">
      You selected {selected.name}. This prototype shows the Delhi demo, not {selected.name} government services.
      Preparation guidance is general; confirm state-specific requirements on the official SARATHI portal.
    </NoticeBanner>
  );
}
