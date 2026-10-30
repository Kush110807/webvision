import { useState } from 'react';
import { STATES } from '../data/states.js';
import { selectState } from '../services/state.js';

export default function StateSelector() {
  const [value, setValue] = useState('0');
  const [result, setResult] = useState(null);
  const onChange = (e) => {
    const code = e.target.value;
    setValue(code);
    setResult(code === '0' ? null : selectState(code));
  };
  const chosen = STATES.find((s) => s.code === value);
  return (
    <div className="col-md-12 padding0px" align="center">
      <h4 className="state-text" style={{ fontFamily: 'Times New Roman, Georgia, Serif', color: 'green', margin: '0 0 12px 0', letterSpacing: '0.5px' }}>
        Please select the State from where the service is to be taken
      </h4>
      <div className="state-selectionpage">
        <select name="stName" id="stfNameId" className="form-control input-sm select2" value={value} onChange={onChange} aria-label="Select State">
          <option value="0">---Select State Name---</option>
          {STATES.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
        </select>
      </div>
      {result && chosen && (
        <p className="demo-note" role="status">
          Demo only: you selected {chosen.name}. The real portal would now open that state's services.
        </p>
      )}
    </div>
  );
}
